'use client';

import Search from '@/components/Search/Search';
import { useTranslations } from 'next-intl';

export default function ClientCalalogPage() {
  const tCommon = useTranslations('common');

  return (
    <>
      <Search />
      <div className="catalog-page">
        <h1>{tCommon('Catalog')}</h1>
        <div className="bestsellers">
          <h3>{tCommon('Bestsellers')}</h3>
        </div>
      </div>
    </>
  );
}
