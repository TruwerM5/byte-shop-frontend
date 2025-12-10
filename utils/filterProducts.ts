import { Product } from '@/types';
import removeDuplicates from './removeDuplicates';

export function filterProducts(products: Product[], filters: any) {
  let filtered = [...products];
  const hasFilters = Object.values(filters).some((filter: any) => filter?.length > 0);

  if (!hasFilters) {
    return products;
  }

  if (filters?.price_min > 0 || filters?.price_max > 0) {
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

  if (filters.socket.length > 0) {
    const filteredBySocket = filterProductsBySocket(filtered, filters.socket);
    filtered = [...filteredBySocket];
  }

  if (filters.line.length > 0) {
    const filteredByCPULine = filterProductsByCPULine(filtered, filters.line);
    filtered = [...filteredByCPULine];
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

export function filterProductsBySocket(products: Product[], sockets: string[]) {
  return products.filter((product) => {
    if (product.category === 'cpu') {
      const upperCaseProduct = product.socket.toUpperCase();
      return sockets.map((socket) => socket.toUpperCase()).includes(upperCaseProduct);
    }
  });
}

export function filterProductsByCPULine(products: Product[], lines: string[]) {
  return products.filter((product) => {
    if (product.category === 'cpu') {
      const upperCaseProductLine = product.line?.toUpperCase();
      return lines.map((line) => line.toUpperCase()).includes(upperCaseProductLine);
    }
  });
}
