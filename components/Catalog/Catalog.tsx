import Link from 'next/link';
import { useState, useMemo } from 'react';
import Submenu from '@/components/Submenu/Submenu';
import { usePathname } from '@/i18n/navigation';
import './Catalog.scss';
import { useTranslations } from 'next-intl';
import type { NestedRoute, CatalogData } from '@/types';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function Catalog({ links, closeCatalogFn }: { links: CatalogData[]; closeCatalogFn: () => void }) {
  const t = useTranslations('products');
  const path = usePathname();
  const ref = useOutsideClick<HTMLDivElement>(() => {
    closeCatalogFn();
  });
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState<number>(0);
  const nestedRoutes = useMemo(() => {
    const result: NestedRoute[] = [];

    links.forEach((link) => {
      if (link.nestedRoutes) {
        link.nestedRoutes.forEach((nestedRoute) => {
          result.push({ ...nestedRoute });
        });
      }
    });

    return result;
  }, [links]);

  function setActiveNestedId(id: number) {
    setActiveSubmenuIndex(id);
  }

  function closeAll() {
    closeCatalogFn();
  }

  return (
    <div
      className="catalog"
      onMouseLeave={closeCatalogFn}
      ref={ref}
    >
      <ul className="catalog__list">
        {links.map((link) => {
          let buttonClassName = 'catalog__button';
          const isActiveLink = link.href && path.includes(link.href);

          if (link.id === activeSubmenuIndex) {
            buttonClassName += ' catalog__button_active-button';
          } else if (isActiveLink) {
            buttonClassName += ' catalog__button_active-link';
          }
          return (
            <li
              key={link.id}
              className="catalog__list-item"
            >
              <Link
                href={`/catalog${link.href}`}
                onClick={closeCatalogFn}
                onMouseEnter={() => setActiveNestedId(link.id)}
                className={buttonClassName}
              >
                {t(link.title)}
              </Link>
            </li>
          );
        })}
      </ul>
      <Submenu
        nestedRoutes={nestedRoutes}
        activeIndex={activeSubmenuIndex}
        setActiveIndex={closeAll}
      />
    </div>
  );
}
