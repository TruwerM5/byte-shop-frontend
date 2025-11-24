import { Product } from '@/types';

export default function removeDuplicates(products: Product[]): Product[] {
    const map = new Map();
    products.forEach(product => map.set(product.id, product));
    return Array.from(map.values());
}