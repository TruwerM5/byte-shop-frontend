'use client';

import { fetchProductsByParam } from '@/api/products';
import { useProductStore } from '@/store/productStore';
import { use, useEffect, useState } from 'react'
import Search from '@/components/Search/Search';
import ProductList from '@/components/ProductList/ProductList';
import { Product } from '@/types';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function CategoryPage ({
    params
}: {
    params: Promise<{ category: string }>
}) {
    const t = useTranslations('common');
    const { category } = useParams<{ category: string }>();
    const { storeProducts, getProductsByCategory } = useProductStore();

    const [products, setProducts] = useState<Product[] | null>(null);

    useEffect(() => {
        const productsFromStore = getProductsByCategory(category);
        if(!productsFromStore || productsFromStore.length === 0) {
            fetchProductsByParam(category).then(res => {
                if(res) {
                    storeProducts(res);
                    setProducts(res);
                }
            });
        } else {
            setProducts(productsFromStore);
        }
    }, [category, getProductsByCategory, storeProducts]);
    
    return (
        <>
            <Search />
            <div className='category-page flex'>
            <div className='category-page__sidebar'>Sidebar</div>
            {products ? (
                <ProductList products={products} />
            ) : (
                <span>{t('Nothing found matching your request')}</span>
            ) }
                
            </div>
        </>
    )
}