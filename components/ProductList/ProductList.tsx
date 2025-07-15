'use client';

import type { Product } from '@/types';
import ProductItem from '../ProductItem/ProductItem';

export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </div>
    );
}
