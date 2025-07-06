import type { NestedRoute, Route } from '@/types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import './NestedMenu.scss';
import { usePathname } from '@/i18n/navigation';
import { useState } from 'react';

export default function NestedMenu({
    links,
    isActive,
    closeAllFn
}: {
    links: Route[],
    isActive: Boolean,
    closeAllFn: () => void
}) {
    const path = usePathname();
    const t = useTranslations('products');
 
    const [isNestedOpened, setIsNestedOpened] = useState(() => false);

    function toggleMenu(e: React.MouseEvent<HTMLLIElement>) {
        e.stopPropagation();
        setIsNestedOpened(!isNestedOpened);
    }

    function isNestedRoute(route: Route): route is Route & { nestedRoutes: Route[] } {
        return 'nestedRoutes' in route;
    }

    return isActive ? (
        <div className='nested-menu'>
            <ul className='nested-menu__list'>
                {
                    links.map(link => {
                        let linkClassName = 'nested-menu__link menu-link';
                        if (path === link.href) {
                            linkClassName += ' nested-menu__link_active';
                        }

                        if(link.nestedRoutes) {
                            return (
                                <li key={link.id} className='nested-menu__item relative' 
                                    onClick={toggleMenu}
                                >
                                    <button className={linkClassName + ' w-full'}>
                                        {t(link.title)}
                                    </button>
                                    <ul className="absolute left-full top-0">
                                        {
                                            link.nestedRoutes.map(nestedLink => {
                                                return (
                                                    <li
                                                        className="nested-menu__item" key={nestedLink.id}
                                                    >
                                                        <NestedMenu 
                                                            links={link.nestedRoutes} 
                                                            isActive={isNestedOpened} 
                                                            closeAllFn={closeAllFn} 
                                                        />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        }

                        return (
                            <li key={link.id} className='nested-menu__item relative'>
                                <Link href={link.href} className={linkClassName} onClick={closeAllFn}>
                                    {t(link.title)}
                                </Link>          
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    ) : null;
}