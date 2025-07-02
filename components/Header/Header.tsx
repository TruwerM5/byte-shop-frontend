'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import Logo from '@/components/Logo/Logo';
import './Header.scss';
import type { HeaderLinks } from '@/types';
import NestedMenu from '../NestedMenu/NestedMenu';
import { useMemo, useState } from 'react';
import { usePathname } from '@/i18n/navigation';


export default function Header ({
    locale
}: {
    locale: string
}) {

    const headerLinks: HeaderLinks[] = useMemo(() => [
    {
        id: 1,
        title: 'Home',
        href: '/',
    },{
        id: 2,
        title: 'Catalog',
        href: '/catalog',
        nestedRoutes: [
            {
                id: 1,
                title: 'CPU',
                href: '/catalog/cpu'
            },
            {
                id: 2,
                title: 'Graphics Cards',
                href: '/catalog/graphisc-cards',
            },
            {
                id: 3,
                title: 'Motherboards',
                href: '/catalog/motherboards',
            },
            {
                id: 4,
                title: 'RAM',
                href: '/catalog/ram',
            },
            {
                id: 5,
                title: 'Power Supplies',
                href: '/catalog/power-supplies',
            },
            {
                id: 6,
                title: 'Cooling Systems',
                href: '/catalog/cooling',
            },
            {
                id: 7,
                title: 'Cases',
                href: '/catalog/cases',
            }
        ]
    },{
        id: 3,
        title: 'About',
        href: '/about'
    }
], []);

    const path = usePathname();
    const t = useTranslations('common');

    const [isShowNestedMenu, setIsShowNestedMenu] = useState(false);

    function closeNestedMenu(isNested: boolean) {
        return isNested && setIsShowNestedMenu(false);
    }

    function openNestedMenu(isNested: boolean) {
        return isNested && setIsShowNestedMenu(true);
    }

    return (
        <header className='header bg-black text-white px-[25px]'>
            
            <nav className='nav flex justify-center items-center'>
                <Logo />
                <ul className='header__list flex justify-center items-center gap-[120px] mx-auto'>
                    {headerLinks.map(link => {
                        
                        const isNested = 'nestedRoutes' in link;
                        let linkClassName = 'menu-link header__link';
                        
                        const separatePath = path.split('/').filter(p => p.length);
                        const hrefText = link.href.slice(1);
                        const isActiveIndexPage = path === '/' && link.href === '/';
                        const isLinkActive = separatePath.includes(hrefText) && !separatePath.includes('/') || isActiveIndexPage;
                        if (isLinkActive) {
                            linkClassName += ' header__link_active';
                        }

                        return (
                        <li className='header__item' key={link.id}>
                            {    
                                    <div
                                        onMouseEnter={() => openNestedMenu(isNested)}
                                        onMouseLeave={() => closeNestedMenu(isNested)}  
                                        onClick={() => closeNestedMenu(isNested)}
                                        className="header__item-inner"
                                    >
                                        <Link
                                            href={link.href}
                                            className={linkClassName}
                                        >
                                            {t(link.title)}
                                        </Link>
                                            { isNested && 
                                                <NestedMenu isActive={isShowNestedMenu} links={link.nestedRoutes} />
                                            } 
                                    </div>
                            }
                        </li>
                        )
                    })}
                </ul>
                <LocaleSwitcher currentLocale={locale} />
            </nav>
        </header>
    )
};