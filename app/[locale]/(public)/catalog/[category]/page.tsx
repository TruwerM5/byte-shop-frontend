'use client';

import { fetchProductsByParamOrSlug } from '@/api/products';
import { useProductStore } from '@/store/productStore';
import { use, useEffect, useMemo, useState } from 'react';
import Search from '@/components/Search/Search';
import ProductList from '@/components/ProductList/ProductList';
import { Product } from '@/types';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import './CategoryPage.scss';
import CatalogSkeleton from '@/components/UI/Skeletons/CatalogSkeleton/CatalogSkeleton';

export default function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const t = useTranslations('common');
    const tProducts = useTranslations('slugs');
    const { category } = useParams<{ category: string }>();
    const { storeProducts, getProductsByCategory } = useProductStore();

    const [products, setProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
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
        <>
            <Search />
            <div className="category-page">
                <h3 className="category-page__title">{tProducts(category)}</h3>
                <div className="category-page__inner">
                    <div className="category-page__sidebar">Sidebar</div>
                    {isLoading ? (
                        <CatalogSkeleton />
                    ) : products && products.length > 0 ? (
                        <ProductList products={products} />
                    ) : (
                        <span>{t('Nothing found matching your request')}</span>
                    )}
                </div>
            </div>
        </>
    );
}
