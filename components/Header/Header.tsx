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
                id: 3,
                title: 'CPU',
                href: '/catalog/cpu',
            },
            {
                id: 4,
                title: 'Graphics Cards',
                href: '/catalog/graphics-cards',
            },
            {
                id: 5,
                title: 'Motherboards',
                href: '/catalog/motherboards',
            },
            {
                id: 6,
                title: 'RAM',
                href: '/catalog/ram',
            },
            {
                id: 7,
                title: 'Power Supplies',
                href: '/catalog/power-supplies',
            },
            {
                id: 8,
                title: 'Cooling Systems',
                href: '/catalog/cooling',
            },
            {
                id: 9,
                title: 'Cases',
                href: '/catalog/cases',
            },
            {
                id: 10,
                title: 'Periphery',
                nestedRoutes: [
                    {
                        id: 11,
                        title: 'Keyboards',
                        href: '/catalog/keyboards',
                    },
                    {
                        id: 12,
                        title: 'Mice',
                        href: '/catalog/mice',
                    },
                    {
                        id: 13,
                        title: 'Monitors',
                        href: '/catalog/monitors'
                    },
                    {
                        id: 14,
                        title: 'Headphones',
                        href: '/catalog/headphones'
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

    const [openedMenus, setOpenedMenus] = useState<Set<number>>(new Set());

    function toggleMenu(id: number) {        
        setOpenedMenus(prev => {
            const newSet = new Set(prev);
            if(newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }

    function closeAllMenus() {
        setOpenedMenus(new Set());
    }

    return (
        <header className='header bg-black text-white px-[25px]'>
            <nav className='nav flex justify-center items-center'>
                <Logo />
                <ul className='header__list flex justify-center items-center gap-[120px] mx-auto'>
                    {headerLinks.map(link => {
                        
                        let linkClassName = 'menu-link header__link';
                        let hrefText = '';
                        
                        if(!link.nestedRoutes) {
                            hrefText = link.href.slice(1); 
                        }

                        const isLinkActive = path === link.href || path.startsWith(link.href + '/');

                        if (isLinkActive) {
                            linkClassName += ' header__link_active';
                        }

                        return (
                            <li className='header__item' key={link.id}>
                                {    
                                    <div
                                        className='header__item-inner'
                                    >
                                        {link.nestedRoutes ? (
                                            <button 
                                                onClick={() => toggleMenu(link.id)}
                                                className={linkClassName}
                                            >
                                                {t(link.title)}
                                            </button>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className={linkClassName}
                                                onClick={closeAllMenus}
                                            >
                                                {t(link.title)}
                                            </Link>
                                        )}
                                        { link.nestedRoutes && 
                                            <NestedMenu
                                                isActive={openedMenus.has(link.id)}
                                                links={link.nestedRoutes}
                                                openedMenus={openedMenus}
                                                toggleMenu={toggleMenu}
                                                closeAllFn={closeAllMenus}
                                            />
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