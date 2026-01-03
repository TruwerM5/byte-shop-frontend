import type { CpuProduct, Product } from '@/types';
import type { AnyFilters, Category } from '@/types/filters';
import removeDuplicates from './removeDuplicates';
import { getFilteredCPU } from './getFiltersFromUrl';

export function filterProducts(products: Product[], filters: AnyFilters, category: Category) {
  let filtered = [...products];

  const hasFilters = Object.values(filters).some((filter) => filter?.length > 0);

  if (!hasFilters) {
    return products;
  }

  if (Number(filters?.price_min) > 0 || Number(filters?.price_max) > 0) {
    let min = undefined;
    let max = undefined;
    if (filters.price_min) {
      min = Number(filters.price_min);
    }
    if (filters.price_max) {
      max = Number(filters.price_max);
    }
    const filteredByPrice = filterProductsByPrices(products, min, max);
    filtered = [...filteredByPrice];
  }

  switch (category) {
    case 'cpu':
      const CPUs = filtered.filter((product) => product.category === 'cpu');
      filtered = getFilteredCPU(CPUs, filters);
      break;
  }

  const uniques = removeDuplicates(filtered);
  return uniques;
}

export function filterProductsByPrices(products: Product[], priceMin?: number, priceMax?: number) {
  return products.filter((product) => {
    if (priceMin && priceMax) {
      return product.price >= priceMin && product.price <= priceMax;
    } else if (priceMin) {
      return product.price >= priceMin;
    } else if (priceMax) {
      return product.price <= priceMax;
    }
    return product;
  });
}
