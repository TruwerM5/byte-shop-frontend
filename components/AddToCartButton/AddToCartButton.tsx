import { useTranslations } from 'next-intl';
import { FaCartShopping } from 'react-icons/fa6';
import './AddToCartButton.scss';
import { useCartStore } from '@/store/cartStore';
import { Link } from '@/i18n/navigation';
import { useEffect } from 'react';

export default function AddToCartButton({
    productId,
}: {
    productId: number | string;
}) {
    const t = useTranslations('common');

    const cart = useCartStore(state => state.cart);
    const addToCart = useCartStore(state => state.addToCart);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const itemInCartAmount = cart.find(item => item.id === productId && item.quantity > 0)?.quantity || 0;

    function add() {
        addToCart(productId);
    }

    function remove() {
        removeFromCart(productId);
    }

    if(itemInCartAmount > 0) {
        return (
            <span className="flex items-center gap-[5px]">
                <Link href="/cart">{t("In cart")}</Link>
                <span className="flex items-center">
                    <button onClick={add}>+</button>
                    {itemInCartAmount}
                    <button onClick={remove}>-</button>
                </span>
            </span>
        )
    }

    return (
        <button onClick={add} className="add-to-cart-button">
            <FaCartShopping className="add-to-cart-button__icon" />
            <span className="add-cart-button__text">{t('Add to Cart')}</span>
        </button>
    );
}
