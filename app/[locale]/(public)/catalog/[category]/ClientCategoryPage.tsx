'use client';

import { Product } from '@/types';
import Search from '@/components/Search/Search';
import ProductList from '@/components/ProductList/ProductList';
import { useProductStore } from '@/store/productStore';
import { useEffect } from 'react';

export default function ClientCategoryPage({
    serverProducts,
}: {
    serverProducts: Product[];
}) {
    const { products, storeProducts } = useProductStore();

    useEffect(() => {
        if (!products) {
            storeProducts(serverProducts);
        }
    }, [serverProducts, products]);

    return (
        <>
            <Search />
            <div className="category-page flex">
                <div className="category-page__sidebar">Sidebar</div>
                <ProductList products={serverProducts} />
            </div>
        </>
    );
}
