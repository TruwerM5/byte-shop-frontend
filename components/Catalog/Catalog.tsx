import { Route } from '@/types';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import Submenu from '@/components/Submenu/Submenu';
import { usePathname } from '@/i18n/navigation';
import './Catalog.scss';

export default function Catalog({
    links,
    toggleFn,
}: {
    links: Route[];
    toggleFn: () => void;
}) {
    const path = usePathname();
    const [activeSubmenuIndex, setActiveSubmenuIndex] = useState<number>(0);
    const nestedRoutes = useMemo(() => {
        const result: {
            id: number;
            href: string;
            title: string;
            parentId: number;
        }[] = [];

        links.forEach((link) => {
            if (link.nestedRoutes) {
                link.nestedRoutes.forEach((nestedRoute) => {
                    result.push({
                        parentId: link.id,
                        ...nestedRoute,
                    });
                });
            }
        });

        return result;
    }, []);

    function setActiveNestedId(id: number) {
        setActiveSubmenuIndex(id);
    }

    function closeAll() {
        toggleFn();
    }

    return (
        <div className="catalog" onMouseLeave={toggleFn}>
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
                        <li key={link.id} className="catalog__list-item">
                            {link.href ? (
                                <Link
                                    href={`/catalog${link.href}`}
                                    onClick={toggleFn}
                                    className={buttonClassName}
                                >
                                    {link.title}
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setActiveNestedId(link.id)}
                                    onMouseEnter={() =>
                                        setActiveNestedId(link.id)
                                    }
                                    className={buttonClassName}
                                >
                                    {link.title}
                                </button>
                            )}
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
