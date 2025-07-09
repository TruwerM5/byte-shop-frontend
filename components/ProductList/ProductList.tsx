'use client';

import type { Product } from '@/types';
import ProductItem from '../ProductItem/ProductItem';
import { useEffect } from 'react';
export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="product-list grid grid-cols-3">
            {products.map((product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </div>
    );
}
