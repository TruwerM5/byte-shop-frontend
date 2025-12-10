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
        values: string[];
    }[];
}

export type Filters = PriceFilter | CheckboxFilter;

export interface FilterQueryParams {
    price_min: string;
    price_max: string;
    socket?: string[];
    line?: string[];
    'cpu-manufacturer'?: string[];
}

export type FilterQueryKeys = keyof FilterQueryParams;