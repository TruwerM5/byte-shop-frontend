import Search from '@/components/Search/Search';
import ProductList from '@/components/ProductList/ProductList';
import './CategoryPage.scss';
import type { Category } from '@/types/filters';

export default async function Page({ params }: { params: Promise<{ category: Category }> }) {
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
