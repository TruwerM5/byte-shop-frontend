import Search from '@/components/Search/Search';
import ProductList from '@/components/ProductList/ProductList';
import Filters from '@/components/Filters/Filters';
import { getTranslations } from 'next-intl/server';
import './CategoryPage.scss';
import { fetchProductsByParamOrSlug } from '@/api/products';

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  return (
    <div className="category-page">
      <Search />
      <div className="category-page__inner">
        <div className="category-page__product-list-wrapper">
          <ProductList category={category} />
        </div>
      </div>
    </div>
  );
}
