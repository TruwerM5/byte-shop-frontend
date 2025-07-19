import { useCartStore } from '@/store/cartStore';
import { FaCartShopping } from 'react-icons/fa6';
import './CartLink.scss';

export default function CartLink() {
    const cartStore = useCartStore();

    const count = cartStore.getCartCount();

    return (
        <span className="cart-link">
            <FaCartShopping />
            <span className="cart-link__count">{count}</span>
        </span>
    );
}
