import { useCartStore } from '@/store/cartStore';
import { FaCartShopping } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import './CartLink.scss';

export default function CartLink() {
    const t = useTranslations('common');
    const cartStore = useCartStore();
    const count = cartStore.getCartCount();

    return (
        <span className="cart-link">
            <span className="cart-link__title">{t('Cart')}</span>
            <span className="cart-link__inner">
                <FaCartShopping />
                <span className="cart-link__count">{count}</span>
            </span>
        </span>
    );
}
