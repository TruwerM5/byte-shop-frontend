import Search from '@/components/Search/Search';
import ClientCategoryPage from './ClientCategoryPage';
import ProductList from '@/components/ProductList/ProductList';
import { fetchProductsByParamOrSlug } from '@/api/products';
import { getTranslations } from 'next-intl/server';

export default async function CategoryPage({
    params
}: {
    params: Promise<{category: string}>
}) {
    
    const { category } = await params;

    const products = await fetchProductsByParamOrSlug(category);
    const tProducts = await getTranslations('slugs');
    
    return (
        <>
            <Search />
            {/* <ClientCategoryPage /> */}
            <span>{tProducts(category)}</span>
            <ProductList products={products} />
        </>
    );
}
