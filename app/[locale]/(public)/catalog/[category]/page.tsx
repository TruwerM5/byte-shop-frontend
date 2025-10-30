import Search from '@/components/Search/Search';
import ProductList from '@/components/ProductList/ProductList';
import { getTranslations } from 'next-intl/server';
import './CategoryPage.scss';
import { fetchProductsByParamOrSlug } from '@/api/products';

export default async function Page({
    params
}: {
    params: Promise<{ category: string }>
}) {
    
    const { category } = await params;
    const [products, tProducts, tCommon] = await Promise.all([
        fetchProductsByParamOrSlug(category),
        getTranslations('slugs'),
        getTranslations('common'),
    ]);
    const hasAnyProducts = products && products.length > 0;

    return (
        <div className='category-page'>
            <Search />
            <h3 className='category-page__title'>{tProducts(category)}</h3>
            <div className='category-page__inner'>
                <div className='category-page__sidebar'>Sidebar</div>
                {hasAnyProducts ? (
                    <div className='category-page__product-list-wrapper'>
                        <ProductList serverProducts={products} />
                    </div>
                    ) : (
                    <p>{tCommon('Nothing found matching your request')}</p>
                )}
            </div>
        </div>
    );
}
