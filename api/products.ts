import { products } from '@/data/products';
import type { Product } from '@/types';

export const fetchAllProducts = async (): Promise<Product[] | undefined> => {
    return new Promise((res, rej) => {
        return res(products);
    });
};

export const fetchProductsByParamOrSlug = async (
    param: string,
    page = 0,
): Promise<Product[] | undefined> => {
    if (page === 0) {
        const res = products.filter((product) => product.category === param || product.slugs.includes(param));
        return res;
    }
    const res = products.slice(page, page + 10);
    return res;
};

export const fetchProductById = async (
    id: number,
): Promise<Product | undefined> => {
    return products.find((product) => product.id === id);
};
