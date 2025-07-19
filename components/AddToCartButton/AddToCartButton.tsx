import { useTranslations } from 'next-intl';
import { FaCartShopping } from 'react-icons/fa6';
import './AddToCartButton.scss';

export default function AddToCartButton({
    productId,
}: {
    productId: number | string;
}) {
    const t = useTranslations('common');

    return (
        <button className="add-to-cart-button">
            <FaCartShopping className="add-to-cart-button__icon" />
            <span className="add-cart-button__text">{t('Add to Cart')}</span>
        </button>
    );
}
