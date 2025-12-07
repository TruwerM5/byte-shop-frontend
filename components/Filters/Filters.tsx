'use client';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { beutifyFilterInputPrice } from '@/utils/beautifyPrice';
import Accordion from '../Accordion/Accordion';
import { filterList } from '@/data/filters';
import { slugifyString } from '@/utils/slugify-query';
import './Filters.scss';

type HandleInputChange = (key: string, values: string[]) => void;

export default function Filters({
    productSlug,
    applyFilters
}: {
    productSlug: string;
    applyFilters: (newFilters: any) => void;
}) {
    const tCommon = useTranslations('common');
    const tDetails = useTranslations('details');
    const appliedFilters: any = {};
    const handleInputChange = useDebouncedCallback<HandleInputChange>((newFilters) => {
        applyFilters(newFilters);
    }, 300);

    const handleChecboxChange: HandleInputChange = (newFilters) => {
        applyFilters(newFilters);
    };

    const handleInputItemChange = (key: string, values: string[]) => {
        console.log(values);
        if(values.length === 0) {
            return;
        } 
        
        if(!appliedFilters[key] || appliedFilters[key]?.length === 0) {
            appliedFilters[key] = values;
        } else {
            appliedFilters[key] = appliedFilters[key].concat(values);
        }

        console.log(appliedFilters);
    }

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
            {filtersForCategory && filtersForCategory.filters.map(filterItem => (
                <Accordion key={filterItem.id} title={tDetails(filterItem.title)}>
                    <div className='filter-item-wrapper flex flex-col gap-[2px]'>
                        {filterItem.values.map((filterValue, index) => {
                            return (
                                <FilterItem
                                    key={index}
                                    query={filterItem.title}
                                    value={filterValue}
                                    handleCheckboxChange={handleInputItemChange}
                                />
                            )
                        })}
                    </div>
                </Accordion>
            ))}
        </div>
    )
}

function FilterItem({
    query,
    value,
    handleCheckboxChange
}: {
    query: string;
    value: string;
    handleCheckboxChange: HandleInputChange;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const { replace } = useRouter();
    const slugValue = slugifyString(value);
    const uglifiedQuery = slugifyString(query);
    const hasQueryString = searchParams.get(uglifiedQuery);
    const [isChecked, setIsChecked] = useState(!!hasQueryString?.split(',').includes(slugValue));

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const isTargetChecked = e.target.checked;
        const updatedValues = updateQueryArray(queryParams, uglifiedQuery, slugValue, isTargetChecked);
        const values = isTargetChecked ? [slugValue] : [];
        setIsChecked(isTargetChecked);
        handleCheckboxChange(uglifiedQuery, values);
        // replace(`${pathname}?${queryParams}`);
    }

    function updateQueryArray(params: URLSearchParams, key: string, value: string, checked: boolean) {
        let current = params.get(key)?.split(',') ?? [];

        if(checked) {
            current = [...new Set([...current, value])];
        } else {
            current = current.filter(v => v !== value);
        }

        if(current.length > 0) {
            params.set(key, current.join(','));
        } else {
            params.delete(key);
        }

        return current;
    }

    return (
        <div className='filter-item flex flex-col gap-[5px] px-2 py-1 hover:bg-zinc-100 hover:text-primary-blue'>
            <label htmlFor={slugValue} className='flex gap-[5px] cursor-pointer'>
                <input
                    type="checkbox"
                    id={slugValue}
                    name={slugValue}
                    defaultValue={slugValue}
                    onChange={handleChange}
                    checked={isChecked}
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
    setQueryCallback: HandleInputChange
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
        // setQueryCallback(query, value ? [value] : []);
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
    handleApply
}: {
    handleApply: () => void
}) {
    return (
        <button onClick={handleApply}>
            apply
        </button>
    )
}