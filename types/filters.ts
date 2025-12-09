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