'use client';

import ProductItem from '../ProductItem/ProductItem';
import './ProductList.scss';
import SortCategories from '@/components/SortCategories/SortCategories';
import { Product } from '@/types';
import { useState } from 'react';

export default function ProductList({ 
    serverProducts 
}: { 
    serverProducts: Product[]
}) {

    const [clientProducts, setClientProducts] = useState(serverProducts);

    function handleSort(sorted: Product[]) {
        setClientProducts(sorted);
    }

    return (
        <>
            <SortCategories products={clientProducts} onSort={handleSort} />
            <div className='product-list'>
                {clientProducts.map((product) => (
                    <ProductItem product={product} key={product.id} />
                ))}
            </div>
        </>
    );
}
