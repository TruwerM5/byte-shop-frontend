import type { HeaderLink, HeaderButton } from '@/types';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HeaderLinkItem({
    link,
    onClick
}: {
    link: HeaderLink | HeaderButton;
    onClick: () => void;
}) {
    const t = useTranslations('common');
    const title = t(link.title);
    if (link.type === 'link') {
        const content = link.component ?? title;
        return (
            <Link href={link.href} onClick={onClick} className="header__button">
                {content}
            </Link>
        );
    }

    return (
        <button onClick={link.onClick} className="header__button">
            {title}
        </button>
    );
}
