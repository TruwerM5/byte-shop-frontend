'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Accordion from '../Accordion/Accordion';
import { filterList } from '@/data/filters';
import { slugifyString } from '@/utils/slugify-query';
import './Filters.scss';
import { useProductStore } from '@/store/productStore';
import clsx from 'clsx';
import type { FilterQueryParams, FilterQueryKeys } from '@/types/filters';

type HandleInputChange = (newFilters: FilterQueryParams) => void;

export default function Filters({
  productSlug,
  applyFilters,
}: {
  productSlug: string;
  applyFilters: HandleInputChange;
}) {
  const filters = useProductStore((state) => state.filters);
  const tCommon = useTranslations('common');
  const tDetails = useTranslations('details');
  const [isApplyBtnVisible, setIsApplyBtnVisible] = useState(false);
  const [newFilters, setNewFilters] = useState<FilterQueryParams>(filters);

  const handleInputChange = (query: string, value: string, isChecked?: boolean) => {
    setNewFilters((prev: any) => {
      const current = prev[query] || [];
      const updated = isChecked ? [...new Set([...current, value])] : current.filter((v: string) => v !== value);

      return {
        ...prev,
        [query]: updated,
      };
    });
    setIsApplyBtnVisible(true);
  };

  const handlePriceInputChange = (query: 'price_min' | 'price_max', value: string) => {
    setNewFilters((prev: any) => ({
      ...prev,
      [query]: value,
    }));
    setIsApplyBtnVisible(true);
  };

  const handleApplyBtnClick = () => {
    applyFilters(newFilters);
    setIsApplyBtnVisible(false);
  };

  useEffect(() => {
    setNewFilters(filters);
  }, [filters]);

  const checkboxFiltersForCategory = filterList.find((filter) => filter.slug === productSlug);

  return (
    <div className="filters">
      <span className="filters__title">{tCommon('Filters')}</span>

      <Accordion title={`${tCommon('Price')}, ₽`}>
        <div className="flex gap-[10px]">
          <FilterPriceInput
            type="price_min"
            price={newFilters.price_min}
            handlePriceInputChange={handlePriceInputChange}
          />
          <FilterPriceInput
            type="price_max"
            price={newFilters.price_max}
            handlePriceInputChange={handlePriceInputChange}
          />
        </div>
      </Accordion>
      {checkboxFiltersForCategory?.filters.map((filterItem) => (
        <Accordion
          key={filterItem.id}
          title={tDetails(filterItem.title)}
        >
          <div className="filter-item-wrapper flex flex-col gap-[2px] relative">
            {filterItem.values.map((filterValue, index) => {
              const lowerCaseTitle = filterItem.title.toLowerCase();
              const key = lowerCaseTitle as FilterQueryKeys;
              const slugValue = slugifyString(filterValue).toUpperCase();
              const isChecked = !!newFilters[key]?.includes(slugValue);
              return (
                <FilterItem
                  key={'filter-item' + index}
                  query={filterItem.title}
                  value={filterValue}
                  handleCheckboxChange={handleInputChange}
                  isChecked={isChecked}
                />
              );
            })}
          </div>
        </Accordion>
      ))}
      <ApplyFiltersButton
        onClick={handleApplyBtnClick}
        className={clsx({
          hidden: !isApplyBtnVisible,
          block: isApplyBtnVisible,
        })}
      />
    </div>
  );
}

function FilterItem({
  query,
  value,
  isChecked,
  handleCheckboxChange,
}: {
  query: string;
  value: string;
  isChecked: boolean;
  handleCheckboxChange: (query: string, values: string, isChecked?: boolean) => void;
}) {
  const slugValue = slugifyString(value).toUpperCase();
  const uglifiedQuery = slugifyString(query).toLowerCase();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isTargetChecked = e.target.checked;
    handleCheckboxChange(uglifiedQuery, slugValue, isTargetChecked);
  }

  return (
    <div className="relative filter-item flex flex-col gap-[5px] px-2 py-1 hover:bg-zinc-100 hover:text-primary-blue">
      <label
        htmlFor={slugValue}
        className="flex gap-[5px] cursor-pointer w-fit"
      >
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
  );
}

function FilterPriceInput({
  type,
  price,
  handlePriceInputChange,
}: {
  type: 'price_min' | 'price_max';
  price: string;
  handlePriceInputChange: (query: 'price_min' | 'price_max', value: string) => void;
}) {
  const placeholder = type === 'price_min' ? 'min' : 'max';
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(type, value);
  }

  function setQuery(query: 'price_min' | 'price_max', value: string) {
    handlePriceInputChange(query, value);
  }

  return (
    <input
      onChange={onInputChange}
      className="filters__price-input"
      type="text"
      placeholder={placeholder}
      defaultValue={price}
    />
  );
}

function ApplyFiltersButton({ onClick, className }: { onClick: () => void; className: string }) {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      apply
    </button>
  );
}
