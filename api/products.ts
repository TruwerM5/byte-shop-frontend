import { products } from '@/data/products';
import type { Product } from '@/types';
import { filterProducts } from '@/utils/filterProducts';

export const fetchAllProducts = async (): Promise<Product[] | undefined> => {
    return new Promise((res, rej) => {
        return res(products);
    });
};

export const fetchProductsByParamOrSlug = async (
    param: string,
    page = 0,
    filters?: any,
): Promise<Product[] | undefined> => {
    if (page === 0) {
        let res = products.filter(
            (product) =>
                product.category === param || product.slugs.includes(param),
        );
        if (Object.keys(filters).length > 0) {
            res = filterProducts(res, filters);
        }

        res.sort((a, b) => b.popularity - a.popularity);
        return new Promise((resolve) => {
            setTimeout(() => resolve(res), 3000);
        });
    }
    const res = products.slice(page, page + 10);
    return res;
};

export const fetchProductById = async (
    id: number,
): Promise<Product | undefined> => {
    const product = products.find((product) => product.id === id);
    return new Promise((res) => {
        setTimeout(() => res(product), 2000);
    });
};
