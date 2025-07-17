import { create } from 'zustand';
import type { Product } from '@/types';
import { products } from '@/data/products';

interface CartStore {
    cart: (number | string)[];
    addToCart: (id: number) => void;
    getCart: () => Product[];
    getCartCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: <(number | string)[]>([]),
    addToCart: (id: number | string) => {
        set(state => ({
            cart: [...state.cart, id]
        }))
    },
    getCart: () => {
        const { cart } = get();
        return products.filter(product => cart.includes(product.id));
    },
    getCartCount: () => {
        const { getCart } = get();
        const cart = getCart();
        return cart.length;
    }
}));