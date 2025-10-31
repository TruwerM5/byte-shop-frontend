'use client';

import ProductItem from '../ProductItem/ProductItem';
import './ProductList.scss';
import SortCategories from '@/components/SortCategories/SortCategories';
import { Product } from '@/types';
import { useState, useEffect } from 'react';
import { useProductStore } from '@/store/productStore';

export default function ProductList({ 
    serverProducts 
}: { 
    serverProducts: Product[]
}) {

    const { storeProducts } = useProductStore();
    const [clientProducts, setClientProducts] = useState(serverProducts);

    function handleSort(sorted: Product[]) {
        setClientProducts(sorted);
    }

    useEffect(() => {
        storeProducts(serverProducts);
    }, [serverProducts]);
    
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
