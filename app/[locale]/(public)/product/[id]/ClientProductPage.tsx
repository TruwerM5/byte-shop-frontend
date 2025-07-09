'use client';

import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { fetchProductById } from '@/api/products';

export default function ClientProductPage({
    initialProduct,
    productId,
}: {
    initialProduct: Product;
    productId: number;
}) {
    const [product, setProduct] = useState<Product>(initialProduct);
    const { getProductById, storeProducts, products } = useProductStore();

    useEffect(() => {
        const storeProduct = getProductById(productId);
        if (storeProduct) {
            setProduct(storeProduct);
            return;
        }

        if (!initialProduct) {
            fetchProductById(productId).then((res) => {
                if (res) {
                    setProduct(res);
                    storeProducts([...products, res]);
                }
            });
        }
    }, [productId, initialProduct]);

    return (
        <div>
            <h1>{product.brand}</h1>
            <p>Price: {product.price}</p>
        </div>
    );
}
