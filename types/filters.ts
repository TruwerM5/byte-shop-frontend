export interface PriceFilter {
  type: 'price';
  filters: {
    id: number;
    key: 'price_min' | 'price_max';
    value: string;
  }[];
}
export interface CheckboxFilter {
  type: 'checkbox';
  slug: string;
  filters: {
    id: number;
    title: string;
    values: string[] | number[];
    type: FilterKeys;
  }[];
}

export type Filters = PriceFilter | CheckboxFilter;

export type BaseFilterQueryParams = {
  price_min?: string;
  price_max?: string;
};

export type Category = 'cpu' | 'graphics-card' | 'ram';
export interface CPUFilters {
  category: 'cpu';
  line?: string[];
  core?: string[];
  socket?: string[];
}

export type CPUFiltersKey = 'line' | 'core' | 'socket';
export type GraphicsCardFiltersKey = 'cpu-manufacturer';
export type RamFiltersKey = 'capacity';
export interface GraphicsCardFilters {
  category: 'graphics-card';
  'cpu-manufacturer'?: string[];
}
export interface RamFilters {
  category: 'ram';
  capacity?: string[];
}
export interface EmptyFilters {
  category: 'all';
}

export type FilterKeys = 'line' | 'core' | 'cpu-manufacturer' | 'socket' | 'capacity';
type CheckboxSelection = Partial<Record<FilterKeys, string[]>>;

export type AnyFilters = BaseFilterQueryParams & CheckboxSelection;
export type KeyAnyFilters = keyof AnyFilters;
