import Search from '@/components/Search/Search';
import ProductList from '@/components/ProductList/ProductList';
import Filters from '@/components/Filters/Filters';
import { getTranslations } from 'next-intl/server';
import './CategoryPage.scss';
import { fetchProductsByParamOrSlug } from '@/api/products';

export default async function Page({
    params
}: {
    params: Promise<{ category: string }>
}) {
    
    const { category } = await params;
    const [tProducts, tCommon] = await Promise.all([
        getTranslations('slugs'),
        getTranslations('common'),
    ]);

    return (
        <div className='category-page'>
            <Search />
            <h3 className='category-page__title'>{tProducts(category)}</h3>
            <div className='category-page__inner'>                
                <div className='category-page__product-list-wrapper'>
                    <ProductList category={category} />
                </div>    
            </div>
        </div>
    );
}
