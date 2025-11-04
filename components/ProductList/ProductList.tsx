'use client';

import ProductItem from '../ProductItem/ProductItem';
import Filters from '../Filters/Filters';
import './ProductList.scss';
import SortCategories from '@/components/SortCategories/SortCategories';
import { Product } from '@/types';
import { useState, useEffect } from 'react';
import { useProductStore } from '@/store/productStore';
import { fetchProductsByParamOrSlug } from '@/api/products';
import CatalogSkeleton from '@/components/UI/Skeletons/CatalogSkeleton/CatalogSkeleton';
import { useTranslations } from 'next-intl';
type ProductsState = 'pending' | 'success' | 'error' | 'not-found';

export default function ProductList({ 
    category
}: { 
    category: string;
}) {
    
    const { storeProducts, getProductsByCategory } = useProductStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [productsState, setProductsState] = useState<ProductsState>('pending');
    const [filters, setFilters] = useState({});
    const [message, setMessage] = useState('');
    const tCommon = useTranslations('common');

    function handleSort(sorted: Product[]) {
        setProducts(sorted);
    }

    function applyFilters(query: string, value: string) {
        const newFilters = {...filters, [query]: value};
        setFilters(newFilters);
    }

    function getProducts(category: string, filters?: any) {
        setProductsState('pending');
        fetchProductsByParamOrSlug(category, 0, filters)
        .then(res => {
            if(res && res.length > 0) {
                setProducts(res);
                storeProducts(res);
                setProductsState('success');
                return;
            }
            setProducts([]);
            setProductsState('not-found');
        })
        .catch(err => {
            setProductsState('error');
            setMessage(err);
        });
    }

    useEffect(() => {
        const productFromStore = getProductsByCategory(category, filters);
        if(productFromStore && productFromStore.length > 0) {
            setProducts(productFromStore);
            setProductsState('success');
        } else {
            getProducts(category, filters);
        }
    },  [category, filters, getProductsByCategory, storeProducts]);

    if(productsState === 'pending') {
        return <CatalogSkeleton />
    }

    if(productsState === 'error') {
        return <p className='error'>{message}</p>
    } 

    return (
        <div className='products-wrapper'>
            <div className='filters-wrapper'>
                <Filters applyFilters={applyFilters} />
            </div>
            <div className='product-list-wrapper'>
                {products.length > 0 ? (
                    <>
                        <div className='applied-filters'>
                            Applied filters
                        </div>
                        <SortCategories products={products} onSort={handleSort} />
                        <div className='product-list'>
                            {products.map((product) => (
                                <ProductItem product={product} key={product.id} />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className='not-found-message'>{tCommon('Nothing found matching your request')}</p>
                )}
            </div>
        </div>      
    );
}
