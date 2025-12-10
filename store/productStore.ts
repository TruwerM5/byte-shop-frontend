import { create } from 'zustand';
import type { Product } from '@/types';
import { filterProducts } from '@/utils/filterProducts';
import type { FilterQueryParams } from '@/types/filters';

interface ProductStore {
  products: Product[];
  filters: FilterQueryParams;
  storeProducts: (products: Product[]) => void;
  getProductById: (id: number) => Product | undefined;
  storeFilters: (newFilters: FilterQueryParams) => void;
  getFilters: () => any;
  clearFilters: () => void;
  getProductsByCategory: (category: string, filters?: any) => Product[] | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: <Product[]>[],
  filters: <FilterQueryParams>{},
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

  getProductsByCategory(category, filters?: FilterQueryParams) {
    const { products } = get();
    const categoryProducts = products.filter(
      (product) => product.category === category || product.slugs.includes(category),
    );

    return filterProducts(categoryProducts, filters);
  },
  storeFilters(newFilters: FilterQueryParams) {
    set(() => ({ filters: newFilters }));
  },
  getFilters() {
    const { filters } = get();
    return filters;
  },
  clearFilters() {
    // TODO: extract to variable
    set(() => ({
      filters: {
        price_max: '',
        price_min: '',
        socket: [],
        line: [],
        'cpu-manufacturer': [],
      },
    }));
  },
}));
