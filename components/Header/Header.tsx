'use client';

import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import Catalog from '@/components/Catalog/Catalog';
import CatalogMobile from '../CatalogMobile/CatalogMobile';
import Logo from '@/components/Logo/Logo';
import React, { useMemo, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';
import type { Header, CatalogData } from '@/types';
import CartLink from '../CartLink/CartLink';
import HeaderLinkItem from '../HeaderLinkItem/HeaderLinkItem';
import clsx from 'clsx';

import './Header.scss';

export default function Header({ locale }: { locale: string }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isCatalogOpened, setIsCatalogOpened] = useState(false);

  function toggleCatalog() {
    setIsCatalogOpened(!isCatalogOpened);
  }

  const headerLinks: Header = useMemo(
    () => [
      {
        id: 1,
        title: 'Home',
        href: '/',
        type: 'link',
      },
      {
        id: 2,
        title: 'Catalog',
        type: 'button',
        onClick: toggleCatalog,
      },
      {
        id: 3,
        title: 'About',
        href: '/about',
        type: 'link',
      },
      {
        id: 4,
        title: 'Cart',
        href: '/cart',
        component: <CartLink />,
        type: 'link',
      },
    ],
    [],
  );

  const catalogData: CatalogData[] = [
    {
      id: 1,
      title: 'CPU',
      href: '/cpu',
      nestedRoutes: [
        {
          parentId: 1,
          id: 11,
          href: '/amd-ryzen-5',
          title: 'AMD Ryzen 5',
        },
        {
          parentId: 1,
          id: 12,
          href: '/amd-ryzen-7',
          title: 'AMD Ryzen 7',
        },
        {
          parentId: 1,
          id: 13,
          href: '/amd-ryzen-9',
          title: 'AMD Ryzen 9',
        },
        {
          parentId: 1,
          id: 14,
          href: '/intel-core-i5',
          title: 'Intel Core i5',
        },
      ],
    },
    {
      id: 2,
      title: 'Graphics Cards',
      href: '/graphics-cards',
      nestedRoutes: [
        {
          parentId: 2,
          id: 31,
          title: 'NVIDIA',
          href: '/nvidia',
        },
        {
          parentId: 2,
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
      href: '/periphery',
      nestedRoutes: [
        {
          parentId: 6,
          id: 7,
          title: 'Keyboards',
          href: '/keyboards',
        },
        {
          parentId: 6,
          id: 8,
          title: 'Mice',
          href: '/mice',
        },
        {
          parentId: 6,
          id: 9,
          title: 'Monitors',
          href: '/monitors',
        },
      ],
    },
  ];

  const headerListWrapperClassName = clsx('header-list-wrapper', {
    active: isMenuOpened,
  });

  return (
    <header className="header bg-black text-white px-[25px]">
      <nav className="header__nav">
        <button
          className="header__burger-button"
          onClick={() => setIsMenuOpened(true)}
        >
          <RxHamburgerMenu className="header__burger-icon" />
        </button>
        <Logo />
        <div className={headerListWrapperClassName}>
          <ul className="header__list">
            {headerLinks.map((headerLink) => (
              <li
                key={headerLink.id}
                className="header__list-item"
              >
                <HeaderLinkItem link={headerLink} />
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsMenuOpened(false)}
            className="header__close-list-button close-list-button"
          >
            <IoMdClose />
          </button>
        </div>
        {isCatalogOpened && (
          <Catalog
            links={catalogData}
            closeCatalogFn={toggleCatalog}
          />
        )}
        <CatalogMobile
          buttons={catalogData}
          isOpened={isCatalogOpened}
          closeCatalogFn={toggleCatalog}
          closeAllFn={() => {
            setIsMenuOpened(false);
            toggleCatalog();
          }}
        />
        <LocaleSwitcher currentLocale={locale} />
      </nav>
    </header>
  );
}
