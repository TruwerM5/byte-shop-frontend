import {Product } from '@/types';


export function filterProducts(products: Product[], filters: any) {
    const filtered = [];
    if(filters.price_min || filters.price_max) {
        const filteredByPrice = filterProductsByPrices(products, Number(filters.price_min), Number(filters.price_max)); 
        filtered.push(...filteredByPrice);
    }

    return filtered;
}

export function filterProductsByPrices(products: Product[], priceMin?: number, priceMax?: number) {
    return products.filter(product => {
        if(priceMin && priceMax) {
            return product.price >= priceMin && product.price <= priceMax;
        } else if(priceMin) {
            return product.price >= priceMin;
        } else if(priceMax) {
            return product.price <= priceMax;
        }
        return product;
    });
}