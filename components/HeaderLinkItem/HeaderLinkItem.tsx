import type { HeaderLink, HeaderButton } from '@/types';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HeaderLinkItem({ link }: { link: HeaderLink | HeaderButton }) {
  const t = useTranslations('common');
  const title = t(link.title);
  if (link.type === 'link') {
    const content = link.component ?? title;
    return (
      <Link
        href={link.href}
        className="header__button"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={link.onClick}
      className="header__button"
    >
      {title}
    </button>
  );
}
