'use client';

import { Product } from '@/types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import './SortCategories.scss';

type SortType = 'popularuty' | 'price-low' | 'price-high';

type Sort = {
    title: string;
    type: SortType;
}

export default function SortCategories({
    products,
    onSort
}: {
    products: Product[],
    onSort: (sorted: Product[]) => void
}) {


    const t = useTranslations('sortings');
    const sortings: Sort[] = [
        {
            title: 'Most popular first',
            type: 'popularuty',
        },{
            title: 'Cheapest first',
            type: 'price-low',
        },{
            title: 'The most expensive first',
            type: 'price-high',
        },
    ];

    const [currentSort, setCurrentSort] = useState<Sort>(sortings[0]);
    const [isOpened, setIsOpened] = useState(false);

    function handleClick(sort: Sort) {
        setCurrentSort(sort);
        const sorted = sortBy(sort.type);
        onSort(sorted);
    }

    function sortBy(sortType: SortType) {
        const sortedProducts = [...products];
        if(sortType === 'popularuty') {
            sortedProducts.sort((a, b) => b.popularity - a.popularity);
        } else if(sortType === 'price-high') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else {
            sortedProducts.sort((a, b) => a.price - b.price);
        }
        return sortedProducts;
    }

    return (
        <div className='sort-categories'>
            <div className='sort-categories__inner'>
                <span className='sort-categories__title'>
                    {t('Show')}:
                </span>
                <div className='sort-categories__list-inner'>
                    <button
                        onClick={() => setIsOpened(!isOpened)} 
                        className='sort-categories__button sort-categories__button_selected flex items-center'>
                        {t(currentSort.title)}
                        <GoTriangleDown />
                    </button>
                    { isOpened && 
                        <div className='sort-categories__list absolute top-full left-0'>
                            {sortings.map(sortItem => (
                                <button 
                                    key={sortItem.type} 
                                    onClick={() => handleClick(sortItem)}
                                    className='sort-categories__button'
                                >
                                    {t(sortItem.title)}
                                </button>
                            ))}
                        </div>
                    }
                </div>               
            </div>
        </div>
    )
}