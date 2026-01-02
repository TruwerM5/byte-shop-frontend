'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Accordion from '../Accordion/Accordion';
import { filterList } from '@/data/filters';
import { slugifyString } from '@/utils/slugify-query';
import './Filters.scss';
import { useProductStore } from '@/store/productStore';
import clsx from 'clsx';
import Button from '../Button/Button';
import type { AnyFilters, FilterKeys, KeyAnyFilters } from '@/types/filters';
import EMPTY_FILTERS from '@/constants/empty-filters';

type HandleInputChange = (newFilters: AnyFilters) => void;

export default function Filters({
  productSlug,
  applyFilters,
}: {
  productSlug: string;
  applyFilters: HandleInputChange;
}) {
  const { filters } = useProductStore((state) => state);
  const tCommon = useTranslations('common');
  const tDetails = useTranslations('details');
  const [isApplyBtnVisible, setIsApplyBtnVisible] = useState(false);
  const [newFilters, setNewFilters] = useState<AnyFilters>(filters);
  const hasFilters = Object.values(filters).some((filter) => {
    return filter.length > 0;
  });
  const handleInputChange = (query: KeyAnyFilters, value: string, isChecked?: boolean) => {
    setNewFilters((prev: AnyFilters) => {
      const current = prev[query];
      if (current === undefined) {
        return prev;
      }
      const updated = isChecked
        ? [...new Set([...current, value])]
        : Array.from(current).filter((v: string) => v !== value);

      return {
        ...prev,
        [query]: updated,
      };
    });
    setIsApplyBtnVisible(true);
  };

  const handlePriceInputChange = (query: 'price_min' | 'price_max', value: string) => {
    setNewFilters((prev: AnyFilters) => ({
      ...prev,
      [query]: value,
    }));
    setIsApplyBtnVisible(true);
  };

  const handleApplyBtnClick = () => {
    applyFilters(newFilters);
    setIsApplyBtnVisible(false);
  };

  function resetFilters() {
    applyFilters(EMPTY_FILTERS);
  }

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
              const key = filterItem.type;
              const slugValue = slugifyString(String(filterValue)).toUpperCase();
              const isChecked = !!newFilters[key]?.includes(slugValue);
              return (
                <FilterItem
                  key={'filter-item' + index}
                  query={filterItem.type}
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
      {hasFilters && (
        <Button onClick={resetFilters}>
          <span>Reset</span>
        </Button>
      )}
    </div>
  );
}

function FilterItem({
  query,
  value,
  isChecked,
  handleCheckboxChange,
}: {
  query: FilterKeys;
  value: string | number;
  isChecked: boolean;
  handleCheckboxChange: (query: FilterKeys, values: string, isChecked?: boolean) => void;
}) {
  const slugValue = slugifyString(String(value)).toUpperCase();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isTargetChecked = e.target.checked;
    handleCheckboxChange(query, slugValue, isTargetChecked);
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
  price?: string;
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
