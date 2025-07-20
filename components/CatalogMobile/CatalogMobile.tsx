import { CatalogData } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import './CatalogMobile.scss';
import { IoMdClose } from 'react-icons/io';

export default function CatalogMobile({
    buttons,
    isOpened,
    closeCatalogFn,
    closeAllFn
}: {
    buttons: CatalogData[];
    isOpened: boolean;
    closeCatalogFn: () => void;
    closeAllFn: () => void;
}) {
    const t = useTranslations('products');

    const [openedSubmenuIndex, setOpenedSubmenuIndex] = useState(0);

    function toggleSubmenu(id: number) {
        if (id === openedSubmenuIndex) {
            setOpenedSubmenuIndex(0);
        } else {
            setOpenedSubmenuIndex(id);
        }
    }

    function closeAll() {
        setOpenedSubmenuIndex(0);
        closeAllFn();
    }

    const buttonsWithAllCategories: CatalogData[] = buttons.map((btn) => {
        if (btn.nestedRoutes) {
            return {
                ...btn,
                nestedRoutes: [
                    ...btn.nestedRoutes,
                    {
                        id: btn.id,
                        title: 'All Categories',
                        href: btn.href,
                        parentId: btn.id,
                    },
                ],
            };
        }
        return btn;
    });

    if (!isOpened) return null;

    return (
        <div className="catalog-mobile" onClick={(e) => e.stopPropagation()}>
            <button
                className="catalog-mobile__close-button"
                onClick={closeCatalogFn}
            >
                <IoMdClose className="catalog-mobile__close-icon" />
            </button>

            <ul className="catalog-mobile__list">
                {buttonsWithAllCategories.map((btn) => {
                    let submenuClassName = 'catalog-mobile__submenu';
                    if (btn.id === openedSubmenuIndex) {
                        submenuClassName += ' catalog-mobile__submenu_opened';
                    }
                    return (
                        <li key={btn.id} className="catalog-mobile__item">
                            {btn.nestedRoutes ? (
                                <>
                                    <button
                                        className="catalog-mobile__button mb-[15px]"
                                        onClick={() => toggleSubmenu(btn.id)}
                                    >
                                        {t(btn.title)}
                                    </button>
                                    <ul className={submenuClassName}>
                                        {btn.nestedRoutes &&
                                            btn.nestedRoutes.map(
                                                (nestedRoute) => (
                                                    <li
                                                        key={nestedRoute.id}
                                                        className="catalog-mobile__submenu-item"
                                                    >
                                                        <Link
                                                            href={`/catalog/${nestedRoute.href}`}
                                                            onClick={closeAll}
                                                            className="catalog-mobile__button"
                                                        >
                                                            {t(
                                                                nestedRoute.title,
                                                            )}
                                                        </Link>
                                                    </li>
                                                ),
                                            )}
                                    </ul>
                                </>
                            ) : (
                                <Link
                                    href={`/catalog/${btn.href}`}
                                    className="catalog-mobile__button"
                                    onClick={closeAll}
                                >
                                    {t(btn.title)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
