import type { Route } from "@/types";
import Link from "next/link";
import { useTranslations } from "next-intl";
import "./NestedMenu.scss";
import { usePathname } from "@/i18n/navigation";

export default function NestedMenu({
    links,
    isActive
}: {
    links: Route[],
    isActive: Boolean
}) {
    const path = usePathname();
    const t = useTranslations('products');
    
    return isActive ? (
        <div className="nested-menu">
            <ul className="nested-menu__list">
                {
                    links.map(link => {
                        
                        let linkClassName = 'nested-menu__link menu-link';
                        if (path === link.href) {
                            linkClassName += ' nested-menu__link_active';
                        }
                        return (
                            <li key={link.id} className="nested-menu__item">
                                <Link href={link.href} className={linkClassName}>
                                    {t(link.title)}
                                </Link>                    
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    ) : null;
}