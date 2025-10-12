'use client';
import './CategoryPage.scss';
import { useTranslations } from 'next-intl';
import CatalogSkeleton from '@/components/UI/Skeletons/CatalogSkeleton/CatalogSkeleton';
import ProductList from '@/components/ProductList/ProductList';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types';
import { fetchProductsByParamOrSlug } from '@/api/products';

export default function ClientCategoryPage() {
    const { category } = useParams<{ category: string }>();
    const t = useTranslations('common');
    const tProducts = useTranslations('slugs');
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[] | null>(null);
    const { storeProducts, getProductsByCategory } = useProductStore();

    useEffect(() => {
        const productsFromStore = getProductsByCategory(category);
        if (!productsFromStore || productsFromStore.length === 0) {
            setIsLoading(true);
            fetchProductsByParamOrSlug(category)
            .then((res) => {
                if (res) {
                    storeProducts(res);
                    setProducts(res);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        } else {
            setProducts(productsFromStore);
        }
    }, [category, getProductsByCategory, storeProducts]);

    return (
        <div className='category-page'>
            <h3 className='category-page__title'>{tProducts(category)}</h3>
            <div className='category-page__inner'>
                <div className='category-page__sidebar'>Sidebar</div>
                {isLoading ? (
                    <CatalogSkeleton />
                ) : products && products.length > 0 ? (
                    <ProductList products={products} />
                ) : (
                    <span>{t('Nothing found matching your request')}</span>
                )}
            </div>
        </div>
    )
}