import { create } from 'zustand';

interface CartStore {
  cart: { id: number | string; quantity: number }[];
  addToCart: (id: number | string) => void;
  removeFromCart: (id: number | string) => void;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: <{ id: number | string; quantity: number }[]>[],
  addToCart: (id: number | string) => {
    const cart = get().cart;
    const findItemInCart = cart.find((item) => item.id === id);

    if (findItemInCart) {
      set((state) => {
        return {
          cart: [{ id, quantity: findItemInCart.quantity + 1 }, ...state.cart.filter((item) => item.id !== id)],
        };
      });
    } else {
      set((state) => ({
        cart: [{ id, quantity: 1 }, ...state.cart],
      }));
    }

    localStorage.setItem('cart', JSON.stringify(get().cart));
  },

  removeFromCart: (id: number | string) => {
    set((state) => {
      const matchItem = state.cart.find((item) => item.id === id);

      if (matchItem && matchItem.quantity > 1) {
        return {
          cart: [{ id, quantity: matchItem.quantity - 1 }, ...state.cart.filter((item) => item.id !== id)],
        };
      }

      return {
        cart: [...state.cart.filter((item) => item.id !== id)],
      };
    });
  },

  getCartCount: () => {
    return get().cart.reduce((acc, item) => acc + item.quantity, 0);
  },
}));
