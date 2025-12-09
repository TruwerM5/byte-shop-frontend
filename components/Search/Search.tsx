'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { IoSearch } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

import './Search.scss';

export default function Search() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const t = useTranslations('common');

    const [searchValue, setSearchValue] = useState(search || '');

    let placeholderClassName = '';

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function onFocus(e: React.FocusEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function clearSearchValue() {
        setSearchValue('');
    }

    return (
        <div className="search">
            <input
                type="text"
                name="search"
                id="search"
                value={searchValue}
                onChange={onChange}
                onFocus={onFocus}
                className="search__input"
            />
            <span
                className={clsx('search__placeholder', {
                    search__placeholder_moved: searchValue.length > 0,
                })}
            >
                {t('Product name or ID')}
            </span>
            {searchValue.length > 0 && (
                <button className="search__button search__button_clear">
                    <IoMdClose
                        className="search__icon search__close-icon"
                        onClick={clearSearchValue}
                    />
                </button>
            )}
            <button className="search__button search__button_search">
                <IoSearch className="search__icon search__search-icon" />
            </button>
        </div>
    );
}
