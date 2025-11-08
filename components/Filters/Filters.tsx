'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { beutifyFilterInputPrice } from '@/utils/beautifyPrice';
import Accordion from '../Accordion/Accordion';
import './Filters.scss';

export default function Filters({
    productSlug,
    applyFilters
}: {
    productSlug: string;
    applyFilters: (query: string, value: string) => void;
}) {
    const t = useTranslations('common');

    const handleInputChange = useDebouncedCallback((query: string, value: string) => {
        applyFilters(query, value);
    }, 300);

    return (
        <div className='filters'>
            <span className='filters__title'>
                {t('Filters')}
            </span>
            <Accordion title='Price'>
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
        </div>
    )
}

function FilterPriceInput({
    type,
    setQueryCallback
}: {
    type: 'from' | 'to';
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
        const value = removeNonNumbers(e.target.value);
        e.target.value = value;
        if(value.length === 0) {
            setQuery(query, value);
            return;
        }
        if(Number(value) === 0) {
            e.target.value = '';
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
        replace(`${pathname}?${queryParams.toString()}`);
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
            defaultValue={beutifyFilterInputPrice(price)}
        />
    )

}