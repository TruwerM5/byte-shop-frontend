'use client';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { beutifyFilterInputPrice } from '@/utils/beautifyPrice';
import Accordion from '../Accordion/Accordion';
import { filterList } from '@/data/filters';
import { slugifyString } from '@/utils/slugify-query';
import './Filters.scss';
import { useProductStore } from '@/store/productStore';
import clsx from 'clsx';

type HandleInputChange = () => void;

export default function Filters({
    productSlug,
    applyFilters
}: {
    productSlug: string;
    applyFilters: HandleInputChange;
}) {
    const filters = useProductStore(state => state.filters);
    const tCommon = useTranslations('common');
    const tDetails = useTranslations('details');
    const [isApplyBtnVisible, setIsApplyBtnVisible] = useState(false);
    const [newFilters, setNewFilters] = useState<any>(filters);

    const handleInputChange = (query: string, value: string, isChecked?: boolean) => {
        setNewFilters((prev: any) => {
            const current = prev[query] || [];
            const updated = isChecked
            ? [...new Set([...current, value])]
            : current.filter((v: string) => v !== value);

            return {
                ...prev,
                [query]: updated,
            }
        });

        setIsApplyBtnVisible(true);
    };

    const handleApplyBtnClick = () => {
        applyFilters();
        setIsApplyBtnVisible(false);
    }

    useEffect(() => {
        setNewFilters(filters);
    }, [filters]);

    const filtersForCategory = filterList.find(filter => filter.slug === productSlug);

    return (
        <div className='filters'>
            <span className='filters__title'>
                {tCommon('Filters')}
            </span>
            <Accordion title={`${tCommon('Price')}, ₽`}>
                <div className='flex gap-[10px]'>
                    <FilterPriceInput
                        type='from'
                        setQueryCallback={handleInputChange}
                    />
                    <FilterPriceInput
                        type='to'
                        setQueryCallback={handleInputChange}
                    />
                </div>
            </Accordion>
            {filtersForCategory?.filters.map(filterItem => (
                <Accordion key={filterItem.id} title={tDetails(filterItem.title)}>
                    <div className='filter-item-wrapper flex flex-col gap-[2px] relative'>
                        {filterItem.values.map((filterValue, index) => {
                            const lowerCaseTitle = filterItem.title.toLowerCase();
                            const isChecked = newFilters[lowerCaseTitle]?.includes(filterValue);
                            return (
                                <FilterItem
                                    key={'filter-item'+index}
                                    query={filterItem.title}
                                    value={filterValue}
                                    handleCheckboxChange={handleInputChange}
                                    isChecked={isChecked}
                                />
                            )
                        })}
                    </div>
                </Accordion>
            ))}
            <ApplyFiltersButton
                onClick={handleApplyBtnClick}
                className={clsx({
                    'hidden': !isApplyBtnVisible,
                    'block': isApplyBtnVisible,
                })}
            />
        </div>
    )
}

function FilterItem({
    query,
    value,
    isChecked,
    handleCheckboxChange
}: {
    query: string;
    value: string;
    isChecked: boolean;
    handleCheckboxChange: (query: string, values: string, isChecked?: boolean) => void;
}) {

    const slugValue = slugifyString(value);
    const uglifiedQuery = slugifyString(query);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const isTargetChecked = e.target.checked;
        handleCheckboxChange(uglifiedQuery, value, isTargetChecked);
    }

    return (
        <div className='relative filter-item flex flex-col gap-[5px] px-2 py-1 hover:bg-zinc-100 hover:text-primary-blue'>
            <label htmlFor={slugValue} className='flex gap-[5px] cursor-pointer w-fit'>
                <input
                    type="checkbox"
                    id={slugValue}
                    name={slugValue}
                    value={slugValue}
                    onChange={handleChange}
                    checked={!!isChecked}
                />
                {value}
            </label>            
        </div>
    )
}

function FilterPriceInput({
    type,
    setQueryCallback
}: {
    type: 'from' | 'to';
    setQueryCallback: (query: string, value: string) => void
}) {
    const searchParams = useSearchParams();
    const queryParams = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();
    const placeholder = type === 'from' ? 'min' : 'max';
    const query = type === 'from' ? 'price_min' : 'price_max';
    const currentQuery = searchParams.get(query) || '';
    const [price, setPrice] = useState<string>(currentQuery);

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = removeNonNumbers(e.target.value);
        e.target.value = value;
        if(value.length === 0) {
            setQuery(query, value);
            return;
        }
        if(Number(value) === 0) {
            e.target.value = '';
            return;
        } 
        setPrice(value);
        setQuery(query, value);
        e.target.value = beutifyFilterInputPrice(value);
    }

    function setQuery(query: string, value: string) {
        if(query && value) {
            queryParams.set(query, value);
        } else {
            queryParams.delete(query);
        }
        replace(`${pathname}?${queryParams}`);
        setQueryCallback(query, value);
    }

    function removeNonNumbers(value: string) {
        return value.split('').filter(c => !isNaN(Number(c)) && c !== ' ').join('');
    }

    return (
        <input
            onChange={onInputChange}
            className='filters__price-input'
            type='text'
            placeholder={placeholder}
            value={beutifyFilterInputPrice(price)}
        />
    )
}

function ApplyFiltersButton({
    onClick,
    className
}: {
    onClick: () => void;
    className: string;
}) {
    return (
        <button onClick={onClick} className={className}>
            apply
        </button>
    )
}