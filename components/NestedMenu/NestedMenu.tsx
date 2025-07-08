import type { Route } from '@/types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import './NestedMenu.scss';
import { usePathname } from '@/i18n/navigation';

export default function NestedMenu({
    links,
    isActive,
    openedMenus,
    toggleMenu,
    closeAllFn,
    className
}: {
    links: Route[];
    isActive: Boolean;
    openedMenus: Set<number>;
    closeAllFn: () => void;
    toggleMenu: (id: number) => void;
    className?: string;
    
}) {
    const path = usePathname();
    const t = useTranslations('products');

    
    let getClassName = 'nested-menu';

    if(isActive) {
        getClassName += ' opened';
    }
    if(className) {
        getClassName += className;
    }

    return (
        <div className={getClassName}>
            <ul className="nested-menu__list">
                {links.map(link => {
                const isActiveLink = path === link.href;
                const linkClassName = `nested-menu__link menu-link${isActiveLink ? ' nested-menu__link_active' : ''}`;

                    return (
                        <li key={link.id} className="nested-menu__item relative">
                        {link.nestedRoutes ? (
                            <>
                            <button
                                className={`${linkClassName} w-full text-left`}
                                onClick={() => toggleMenu(link.id)}
                            >
                                {t(link.title)}
                            </button>
                            <NestedMenu
                                links={link.nestedRoutes!}
                                isActive={openedMenus.has(link.id)}
                                openedMenus={openedMenus}
                                toggleMenu={toggleMenu}
                                closeAllFn={closeAllFn}
                                className=' nested-menu_relative'
                            />
                            </>
                        ) : (
                            <Link href={link.href} className={linkClassName} onClick={closeAllFn}>
                            {t(link.title)}
                            </Link>
                        )}
                        </li>
                    );
                })}
            </ul>
        </div>
  );
}