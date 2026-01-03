'use client';

import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '@/store/productStore';
import { fetchProductsByParamOrSlug } from '@/api/products';
import CatalogSkeleton from '@/components/UI/Skeletons/CatalogSkeleton/CatalogSkeleton';
import SortCategories from '@/components/SortCategories/SortCategories';
import ProductItem from '@/components/ProductItem/ProductItem';
import Filters from '@/components/Filters/Filters';
import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import './ProductList.scss';
import getFiltersFromUrl from '@/utils/getFiltersFromUrl';
import type { Product } from '@/types';
import type { AnyFilters, Category } from '@/types/filters';

type ProductsState = 'pending' | 'success' | 'error' | 'not-found';

export default function ProductList({ category }: { category: Category }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { storeProducts, storeFilters } = useProductStore((state) => state);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsState, setProductsState] = useState<ProductsState>('pending');
  const getFiltersByCategory = useCallback(() => getFiltersFromUrl(searchParams, category), [searchParams, category]);

  const [filters, setFilters] = useState<AnyFilters>({});
  const [message, setMessage] = useState('');
  const tCommon = useTranslations('common');
  const tSlugs = useTranslations('slugs');

  function handleSort(sorted: Product[]) {
    setProducts(sorted);
  }

  function applyFilters(newFilters: AnyFilters) {
    setFilters(newFilters);
    storeFilters(newFilters);
  }

  const getProducts = useCallback(
    (category: Category, filters: AnyFilters, signal?: AbortSignal) => {
      setProductsState('pending');
      fetchProductsByParamOrSlug(category, 0, filters)
        .then((res) => {
          if (!res || signal?.aborted) {
            return;
          }

          if (res.length > 0) {
            setProducts(res);
            storeProducts(res);
            setProductsState('success');
            return;
          }
          setProducts([]);
          setProductsState('not-found');
        })
        .catch((err) => {
          setProductsState('error');
          setMessage(err);
        });
    },
    [storeProducts],
  );

  const isPending = productsState === 'pending';
  const isEmpty = products.length === 0;

  useEffect(() => {
    const controller = new AbortController();
    getProducts(category, filters, controller.signal);
    const params = new URLSearchParams();
    if (!filters) {
      return undefined;
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length > 0) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });
    replace(`${pathname}?${params}`);
    return () => {
      controller.abort();
    };
  }, [category, filters, pathname]);

  useEffect(() => {
    const defaultFilters = getFiltersByCategory();
    setFilters(defaultFilters);
  }, [getFiltersByCategory]);

  if (productsState === 'error') {
    return <p className="error">{message}</p>;
  }

  return (
    <>
      <h3 className="category-page__title">{tSlugs(category)}</h3>
      <div className="products-wrapper">
        <div className="filters-wrapper">
          <Filters
            productSlug={category}
            applyFilters={applyFilters}
          />
        </div>
        <div className="product-list-wrapper">
          {isPending && <CatalogSkeleton />}
          {products.length > 0 && !isPending && (
            <>
              <div className="applied-filters">Applied filters</div>
              <SortCategories
                products={products}
                onSort={handleSort}
              />
              <div className="product-list">
                {products.map((product) => (
                  <ProductItem
                    product={product}
                    key={product.id}
                  />
                ))}
              </div>
            </>
          )}
          {isEmpty && <p className="not-found-message">{tCommon('Nothing found matching your request')}</p>}
        </div>
      </div>
    </>
  );
}
