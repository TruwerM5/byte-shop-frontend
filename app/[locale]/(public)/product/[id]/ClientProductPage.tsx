'use client';

import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { fetchProductById } from '@/api/products';

export default function ClientProductPage({
    productId,
}: {
    
    productId: number;
}) {
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(true);
    const { getProductById, storeProducts, products } = useProductStore();

    useEffect(() => {
        const storeProduct = getProductById(Number(productId));
        if (storeProduct) {
            setProduct(storeProduct);
            setIsLoading(false);
            return;
        } else {
            fetchProductById(Number(productId)).then((res) => {
                if (res) {                    
                    setProduct(res);
                    storeProducts([...products, res]);
                    setIsLoading(false);
                }
            });
        }
    }, [productId]);

    if(isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    if(!product) {
        return (
            <p>Not found</p>
        )
    }

    return (
        <div>
            <h1>{product.brand}</h1>
            <p>Price: {product.price}</p>
        </div>
    );
}
