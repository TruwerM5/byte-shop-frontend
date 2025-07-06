'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import Logo from '@/components/Logo/Logo';
import './Header.scss';
import type { HeaderLinks, Route } from '@/types';
import NestedMenu from '../NestedMenu/NestedMenu';
import { MouseEventHandler, useMemo, useState } from 'react';
import { usePathname } from '@/i18n/navigation';


export default function Header ({
    locale
}: {
    locale: string
}) {

    const headerLinks: Route[] = useMemo(() => [
    {
        id: 1,
        title: 'Home',
        href: '/',
    },
    {
        id: 2,
        title: 'Catalog',
        nestedRoutes: [
            {
                id: 1,
                title: 'CPU',
                href: '/catalog/cpu',
            },
            {
                id: 2,
                title: 'Graphics Cards',
                href: '/catalog/graphics-cards',
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
            },
            {
                id: 8,
                title: 'Periphery',
                nestedRoutes: [
                    {
                        id: 9,
                        title: 'Keyboards',
                        href: '/catalog/keyboards',
                    },
                    {
                        id: 10,
                        title: 'Mice',
                        href: '/catalog/mice',
                    },
                    {
                        id: 11,
                        title: 'Monitors',
                        href: '/catalog/monitors'
                    }
                ]
            }
            // {
            //     id: 8,
            //     title: 'Keyboards',
            //     href: '/catalog/keyboards',
            // },
            // {
            //     id: 9,
            //     title: 'Mice',
            //     href: '/catalog/mice',
            // },
            // {
            //     id: 10,
            //     title: 'Monitors',
            //     href: '/catalog/monitors',
            // },
            // {
            //     id: 11,
            //     title: 'Headphones',
            //     href: '/catalog/headphones',
            // },
            // {
            //     id: 12,
            //     title: 'Laptops',
            //     href: '/catalog/laptops',
            // }
        ]
    },
    {
        id: 3,
        title: 'About',
        href: '/about'
    }
], []);

    const path = usePathname();
    const t = useTranslations('common');

    const [isShowNestedMenu, setIsShowNestedMenu] = useState(false);

    function isNestedRoute(route: Route): route is Route & { nestedRoutes: Route[] } {
        return 'nestedRoutes' in route;
    }

    function toggleMenu(e: any) {        
        setIsShowNestedMenu(!isShowNestedMenu);
    }

    return (
        <header className='header bg-black text-white px-[25px]'>
            
            <nav className='nav flex justify-center items-center'>
                <Logo />
                <ul className='header__list flex justify-center items-center gap-[120px] mx-auto'>
                    {headerLinks.map(link => {
                        
                        const isNested = 'nestedRoutes' in link;
                        let linkClassName = 'menu-link header__link';
                        let hrefText = '';
                        const separatePath = path.split('/').filter(p => p.length);
                        
                        if(!isNestedRoute(link)) {
                            hrefText = link.href.slice(1); 
                        }
                        const isActiveIndexPage = path === '/' && link.href === '/';
                        const isLinkActive = separatePath.includes(hrefText) && !separatePath.includes('/') || isActiveIndexPage;
                        if (isLinkActive) {
                            linkClassName += ' header__link_active';
                        }

                        return (
                        <li className='header__item' key={link.id}>
                            {    
                                <div
                                    className='header__item-inner'
                                    onClick={toggleMenu}
                                >
                                    {link.nestedRoutes ? (
                                        <button 
                                            onClick={toggleMenu}
                                            className={linkClassName}
                                        >
                                            {t(link.title)}
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={linkClassName}
                                            
                                        >
                                            {t(link.title)}
                                        </Link>
                                    )}
                                    { isNestedRoute(link) && 
                                        <NestedMenu isActive={isShowNestedMenu} links={link.nestedRoutes} closeAllFn={() => setIsShowNestedMenu(false)} />
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