import { create } from 'zustand';
import type { Product } from '@/types';
import { filterProducts } from '@/utils/filterProducts';

interface ProductStore {
    products: Product[];
    filters: any;
    storeProducts: (products: Product[]) => void;
    getProductById: (id: number) => Product | undefined;
    storeFilters: (newFilters: any) => void;
    getFilters: () => any;
    getProductsByCategory: (category: string, filters?: any) => Product[] | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: <Product[]>[],
    filters: <any>{},
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
    storeFilters(newFilters: any) {
        set(() => ({filters: newFilters}));
    },
    getFilters() {
        const {filters} = get();
        return filters;
    }
}));
