'use client';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Filters({
    applyFilters
}: {
    applyFilters: (query: string, value: string) => void;
}) {
    const t = useTranslations('common');

    function handleInputChange(query: string, value: string) {
        applyFilters(query, value);
    }

    return (
        <div className='filters'>
            <span className='filters__title'>
                {t('Filters')}
            </span>
            <div className='flex gap-[10px]'>
                <FilterPriceInput 
                    type='from' 
                    initialValue={''} 
                    setQueryCallback={handleInputChange}
                />
                <FilterPriceInput 
                    type='to' 
                    initialValue={''} 
                    setQueryCallback={handleInputChange}
                />
            </div>
        </div>
    )
}

function FilterPriceInput({
    type,
    initialValue,
    setQueryCallback
}: {
    type: 'from' | 'to';
    initialValue: string;
    setQueryCallback: (query: string, value: string) => void;
}) {

    const searchParams = useSearchParams();
    const queryParams = new URLSearchParams(searchParams.toString());
    const pathname = usePathname();
    const { replace } = useRouter();
    const placeholder = type === 'from' ? 'min' : 'max';
    const query = type === 'from' ? 'price_min' : 'price_max';
    const currentQuery = searchParams.get(query)?.toString() || '';
    const [price, setPrice] = useState<string>(currentQuery);
    
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if(isNaN(Number(value))) {
            e.target.value = '';
            return;
        }
        setPrice(value);
        setQuery(query, value);
    }

    function setQuery(query: string, value: string) {
        if(query && value) {
            queryParams.set(query, value);
        } else {
            queryParams.delete(query);
        }
        replace(`${pathname}?${queryParams.toString()}`);
        setQueryCallback(query, value);
    }

    return (
        <input
            onChange={onInputChange}
            className='filters__price-input max-w-1/2 border-1 border-b border-black rounded-[3px] px-[5px] py-[3px] outline-none' 
            type='text' 
            placeholder={placeholder}
            defaultValue={price}
        />
    )

}