import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import type { NestedRoute } from '@/types';
export default function Submenu({
    nestedRoutes,
    activeIndex,
    setActiveIndex,
}: {
    nestedRoutes: NestedRoute[];
    activeIndex: number;
    setActiveIndex: () => void;
}) {
    const t = useTranslations('products');
    const path = usePathname();

    function closeAll(e: React.MouseEvent<HTMLAnchorElement>, id: number) {
        setActiveIndex();
    }

    return (
        <ul className="catalog__list">
            {nestedRoutes
                .filter((nestedRoute) => nestedRoute.parentId === activeIndex)
                .map((route) => {
                    let buttonClassName = 'catalog__button';
                    const isActiveLink =
                        route.href && path.includes(route.href);

                    if (isActiveLink) {
                        buttonClassName += ' catalog__button_active-link';
                    }

                    return (
                        <li key={route.id} className="catalog__list-item">
                            <Link
                                href={`/catalog${route.href}`}
                                onClick={(e) => closeAll(e, 0)}
                                className={buttonClassName}
                            >
                                {t(route.title)}
                            </Link>
                        </li>
                    );
                })}
        </ul>
    );
}
