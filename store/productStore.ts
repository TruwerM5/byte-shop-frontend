import { create } from 'zustand';
import type { Product } from '@/types';
import { filterProducts } from '@/utils/filterProducts';

interface ProductStore {
    products: Product[];
    storeProducts: (products: Product[]) => void;
    getProductById: (id: number) => Product | undefined;
    getProductsByCategory: (category: string, filters?: any) => Product[] | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: <Product[]>[],
    storeProducts: (newProducts: Product[]) => {
        set((state) => {
            const uniqueExistingProducts = state.products.filter(
                (existingProduct) =>
                    !newProducts.some(
                        (newProduct) => newProduct.id === existingProduct.id,
                    ),
            );

            return {
                products: [...uniqueExistingProducts, ...newProducts],
            };
        });
    },

    getProductById: (id: number) => {
        const { products } = get();
        return products.find((product) => product.id === id);
    },

    getProductsByCategory(category, filters?: any) {
        const { products } = get();
        const categoryProducts = products.filter((product) => 
            product.category === category || product.slugs.includes(category)
        );
        
        return filterProducts(categoryProducts, filters);
    },
}));
