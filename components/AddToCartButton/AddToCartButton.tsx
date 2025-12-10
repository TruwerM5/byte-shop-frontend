import { useTranslations } from 'next-intl';
import { FaCartShopping } from 'react-icons/fa6';
import './AddToCartButton.scss';
import { useCartStore } from '@/store/cartStore';
import { Link } from '@/i18n/navigation';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useAlertStore } from '@/store/alertStore';

export default function AddToCartButton({ productId }: { productId: number | string }) {
  const t = useTranslations('common');

  const { showAlert } = useAlertStore();

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const itemInCartAmount = cart.find((item) => item.id === productId && item.quantity > 0)?.quantity || 0;

  function add() {
    addToCart(productId);
    showAlert(t('The item has been added to cart'), 'success');
  }

  function remove() {
    removeFromCart(productId);
    showAlert(t('The item has been removed from cart'), 'success');
  }

  if (itemInCartAmount > 0) {
    return (
      <span className="add-to-cart">
        <Link
          href="/cart"
          className="add-to-cart__link"
        >
          {t('In cart')}
        </Link>
        <span className="add-to-cart__inner">
          <button
            onClick={remove}
            className="add-to-cart__action-btn"
          >
            <FiMinus />
          </button>
          <span className="add-to-cart__quantity">{itemInCartAmount}</span>
          <button
            onClick={add}
            className="add-to-cart__action-btn"
          >
            <FiPlus />
          </button>
        </span>
      </span>
    );
  }

  return (
    <button
      onClick={add}
      className="add-to-cart-button"
    >
      <FaCartShopping className="add-to-cart-button__icon" />
      <span className="add-cart-button__text">{t('Add to Cart')}</span>
    </button>
  );
}
