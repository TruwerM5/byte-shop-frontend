'use client';

import type { Product } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductItem({
    product
}: {
    product: Product
}) {

    const imgSrc = `/images/products/${product.images[0]}`;
    
    return (
        <div className='product-item'>
            <Image priority={true} width='120' height='120' src={imgSrc} alt={product.name} />
            <Link href={`/product/${product.id}`}>{product.name}</Link>
        </div>
    );
}