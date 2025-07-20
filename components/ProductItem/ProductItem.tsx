'use client';

import type { Product } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import ProductPopularuty from '@/components/Popularity/Popularity';
import AddToCartButton from '@/components/AddToCartButton/AddToCartButton';
import './ProductItem.scss';
import beautifyPrice from '@/utils/beautifyPrice';
export default function ProductItem({ product }: { product: Product }) {
    const imgSrc = `/images/products/${product.images[0]}`;

    const beautifiedPrice = beautifyPrice(product.price);

    return (
        <div className="product-item">
            <div className="product-item__image-wrapper">
                <Image
                    priority={true}
                    width="150"
                    height="150"
                    src={imgSrc}
                    alt={product.name}
                    className="product-item__image"
                />
            </div>
            <div className="product-item__content product-info">
                <div className="product-info__top">
                    <span className="product-info__id">ID: {product.id}</span>
                </div>
                <div className="product-info__bottom">
                    <Link
                        href={`/product/${product.id}`}
                        className="product-item__name"
                    >
                        {product.name}
                    </Link>
                    <ProductPopularuty popularity={4.6} />
                </div>
            </div>
            <div className="product-item__actions">
                <span className="product-item__price">
                    {beautifiedPrice} &#8381;
                </span>
                <AddToCartButton productId={product.id} />
            </div>
        </div>
    );
}
