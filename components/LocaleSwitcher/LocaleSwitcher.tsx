'use client';
import { routing } from '@/i18n/routing';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { usePathname } from '@/i18n/navigation';
import useOutsideClick from '@/hooks/useOutsideClick';
import clsx from 'clsx';

import './LocaleSwitcher.scss';

export default function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const path = usePathname();
  const [isOpened, setIsOpened] = useState(false);

  const ref = useOutsideClick<HTMLUListElement>(() => {
    setIsOpened(false);
  });

  function toggleLocaleSwitcher() {
    setIsOpened(!isOpened);
  }

  const anotherLocales = routing.locales.filter((locale) => locale !== currentLocale);

  return (
    <div className="relative py-[15px]">
      <button
        onClick={() => toggleLocaleSwitcher()}
        className="uppercase cursor-pointer flex items-center justify-center gap-[5px]"
      >
        {currentLocale}
        <FaChevronDown
          className={clsx('transition-transform', {
            'rotate-180': isOpened,
          })}
        />
      </button>
      {isOpened && (
        <ul
          ref={ref}
          className="locale-switcher"
        >
          {anotherLocales.map((locale) => {
            const href = '/' + locale + path;
            const localeText = locale.toUpperCase();
            return (
              <li
                key={locale}
                className="w-full"
              >
                <Link
                  href={href}
                  className="block p-[5px] bg-black text-white hover:bg-white hover:text-black"
                >
                  {localeText}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
