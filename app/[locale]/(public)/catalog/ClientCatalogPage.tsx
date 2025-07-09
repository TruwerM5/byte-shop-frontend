'use client';

import Search from '@/components/Search/Search';
import { Product } from '@/types';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function ClientCalalogPage({
    serverProducts,
}: {
    serverProducts: Product[];
}) {
    const [products, setProducts] = useState(serverProducts);
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
