import './CategoryPage.scss';
import CatalogSkeleton from '@/components/UI/Skeletons/CatalogSkeleton/CatalogSkeleton';
import ProductList from '@/components/ProductList/ProductList';
import SortCategories from '@/components/SortCategories/SortCategories';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types';
import { fetchProductsByParamOrSlug } from '@/api/products';

export default function ClientCategoryPage() {
    const { category } = useParams<{ category: string }>();
    const t = useTranslations('common');
    const tProducts = useTranslations('slugs');
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[] | null>(null);
    const { storeProducts, getProductsByCategory } = useProductStore();
    const defaultProducts: Product[] = [];

    useEffect(() => {
        const productsFromStore = getProductsByCategory(category);
        if (!productsFromStore || productsFromStore.length === 0) {
            fetchProductsByParamOrSlug(category)
            .then((res) => {
                if (res) {
                    storeProducts(res);
                    setProducts(res);
                    defaultProducts.push(...res);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        } else {
            setProducts(productsFromStore);
            setIsLoading(false);
        }
    }, [category, getProductsByCategory, storeProducts]);

    function handleSort(sorted: Product[]) {
        setProducts(sorted);
    }

    return (
        <div className='category-page'>
            <h3 className='category-page__title'>{tProducts(category)}</h3>
            <div className='category-page__inner'>
                <div className='category-page__sidebar'>Sidebar</div>
                {isLoading ? (
                    <CatalogSkeleton />
                ) : products && products.length > 0 ? (
                    <div className='category-page__product-list-wrapper'>
                        <SortCategories
                            products={products} 
                            onSort={handleSort} 
                        />
                        <ProductList products={products} />
                    </div>
                ) : (
                    <span>{t('Nothing found matching your request')}</span>
                )}
            </div>
        </div>
    )
}