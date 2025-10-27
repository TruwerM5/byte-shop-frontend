'use client';

import type { Product } from '@/types';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.scss';

export default function ProductList({ products }: { products: Product[] | undefined }) {

    if(!products || products.length === 0) {
        return (
            <div>Not found</div>
        )
    }

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </div>
    );
}
