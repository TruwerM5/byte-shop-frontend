import { Product } from '@/types';
import { fetchProductById } from '@/api/products';
import ClientProductPage from './ClientProductPage';
import { notFound } from 'next/navigation';

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;

    return <ClientProductPage productId={id} />;
}
