import { create } from 'zustand';
import type { Product } from '@/types';

interface ProductStore {
    products: Product[];
    storeProducts: (products: Product[]) => void;
    getProductById: (id: number) => Product | undefined;
    getProductsByCategory: (category: string) => Product[] | undefined;
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

    getProductsByCategory(category) {
        const { products } = get();
        return products.filter((product) => product.category === category);
    },
}));
