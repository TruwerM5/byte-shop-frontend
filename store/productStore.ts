import { create } from 'zustand';
import type { Product } from '@/types';
import { filterProducts } from '@/utils/filterProducts';
import type { AnyFilters, Category } from '@/types/filters';

interface ProductStore {
  products: Product[];
  filters: AnyFilters;
  storeProducts: (products: Product[]) => void;
  getProductById: (id: number) => Product | undefined;
  storeFilters: (newFilters: AnyFilters) => void;
  getProductsByCategory: (category: Category, filters: AnyFilters) => Product[] | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: <Product[]>[],
  filters: {
    line: [],
    socket: [],
    core: [],
  },
  storeProducts: (newProducts: Product[]) => {
    set((state) => {
      const uniqueExistingProducts = state.products.filter(
        (existingProduct) => !newProducts.some((newProduct) => newProduct.id === existingProduct.id),
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

  getProductsByCategory(category: Category, filters: AnyFilters) {
    const { products } = get();
    const categoryProducts = products.filter(
      (product) => product.category === category || product.slugs.includes(category),
    );

    return filterProducts(categoryProducts, filters, category);
  },
  storeFilters(newFilters: AnyFilters) {
    set(() => ({ filters: { ...newFilters } }));
  },
}));
