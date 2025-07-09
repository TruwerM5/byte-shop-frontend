'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import Logo from '@/components/Logo/Logo';
import './Header.scss';
import type { Route } from '@/types';
import { useMemo, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import Catalog from '@/components/Catalog/Catalog';

export default function Header({ locale }: { locale: string }) {
    const headerLinks = useMemo(
        () => [
            {
                id: 1,
                title: 'Home',
                href: '/',
            },
            {
                id: 2,
                title: 'Catalog',
            },
            {
                id: 3,
                title: 'About',
                href: '/',
            },
        ],
        [],
    );

    const catalogData: Route[] = useMemo(
        () => [
            {
                id: 1,
                title: 'CPU',
                href: '/cpu',
            },
            {
                id: 2,
                title: 'Graphic Cards',
                nestedRoutes: [
                    {
                        id: 31,
                        title: 'NVIDIA',
                        href: '/nvidia',
                    },
                    {
                        id: 32,
                        title: 'AMD Radeon',
                        href: '/amd-radeon',
                    },
                ],
            },
            {
                id: 3,
                title: 'RAM',
                href: '/ram',
            },
            {
                id: 4,
                title: 'Motherboards',
                href: '/motherboards',
            },
            {
                id: 5,
                title: 'Cases',
                href: '/cases',
            },
            {
                id: 6,
                title: 'Periphery',
                nestedRoutes: [
                    {
                        id: 7,
                        title: 'Keyboards',
                        href: '/keyboards',
                    },
                    {
                        id: 8,
                        title: 'Mice',
                        href: '/mice',
                    },
                    {
                        id: 9,
                        title: 'Monitors',
                        href: '/monitors',
                    },
                ],
            },
        ],
        [],
    );

    const path = usePathname();
    const t = useTranslations('common');

    const [isCatalogOpened, setIsCatalogOpened] = useState(false);

    function toggleCatalog() {
        setIsCatalogOpened(!isCatalogOpened);
    }

    return (
        <header className="header bg-black text-white px-[25px]">
            <nav className="header__nav">
                <Logo />
                <ul className="header__list">
                    {headerLinks.map((headerLink) => (
                        <li key={headerLink.id} className="header__list-item">
                            {headerLink.href ? (
                                <Link
                                    href={headerLink.href}
                                    className="header__button"
                                >
                                    {t(headerLink.title)}
                                </Link>
                            ) : (
                                <button
                                    onClick={toggleCatalog}
                                    className="header__button"
                                >
                                    {t(headerLink.title)}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
                {isCatalogOpened && (
                    <Catalog links={catalogData} toggleFn={toggleCatalog} />
                )}
                <LocaleSwitcher currentLocale={locale} />
            </nav>
        </header>
    );
}
