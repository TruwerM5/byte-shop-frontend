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
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import type { FilterQueryParams, FilterQueryKeys } from '@/types/filters';

type ProductsState = 'pending' | 'success' | 'error' | 'not-found';

export default function ProductList({ category }: { category: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { storeProducts, storeFilters } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsState, setProductsState] = useState<ProductsState>('pending');
  const defaultFilters: FilterQueryParams = {
    price_min: getSingleSearchParam('price_min'),
    price_max: getSingleSearchParam('price_max'),
    socket: getMupltipleSearchParams('socket'),
    line: getMupltipleSearchParams('line'),
    'cpu-manufacturer': getMupltipleSearchParams('cpu-manufacturer'),
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [message, setMessage] = useState('');
  const tCommon = useTranslations('common');
  const tSlugs = useTranslations('slugs');

  function handleSort(sorted: Product[]) {
    setProducts(sorted);
  }

  function applyFilters(newFilters: FilterQueryParams) {
    setFilters(newFilters);
  }

  function getSingleSearchParam(param: string) {
    return searchParams.get(param) || '';
  }

  function getMupltipleSearchParams(param: string) {
    return searchParams.get(param)?.toString().split(',') || [];
  }

  function getProducts(category: string, filters?: FilterQueryParams, signal?: AbortSignal) {
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
  }

  const isPending = productsState === 'pending';
  const isEmpty = products.length === 0;

  useEffect(() => {
    const controller = new AbortController();
    getProducts(category, filters, controller.signal);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]: [string, string | string[]]) => {
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
  }, [category, filters]);

  useEffect(() => {
    storeFilters(defaultFilters);
  }, []);

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
