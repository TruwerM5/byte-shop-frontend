

import { Product } from '@/types';
import { fetchProductById } from '@/api/products';
import ClientProductPage from './ClientProductPage';
import { notFound } from 'next/navigation';

export default async function ProductPage({
    params
}: {
    params: { id: number }
}) {

    const { id } = await params; 

    const initialProduct = await fetchProductById(Number(id));

    if(!initialProduct) {
        notFound();
    }

    return (
        <ClientProductPage initialProduct={initialProduct} productId={id} />
    );
}