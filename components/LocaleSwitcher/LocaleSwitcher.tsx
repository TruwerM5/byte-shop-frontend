'use client';
import { routing } from "@/i18n/routing";
import Link from 'next/link'
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher({
    currentLocale
}: {
    currentLocale: string
}) { 
    const path = usePathname();
    const [isOpened, setIsOpened] = useState(false);

    function toggleLocaleSwitcher() {
        setIsOpened(!isOpened);
    };

    let iconClassName = 'transition-transform ';
    if (isOpened) {
        iconClassName += 'rotate-180';
    }

    const anotherLocales = routing.locales.filter(locale => locale !== currentLocale);

    return (
        <div className="relative py-[15px]">
            <button 
                onClick={() => toggleLocaleSwitcher()} 
                className="uppercase cursor-pointer flex items-center justify-center gap-[5px]">
                    {currentLocale}
                <FaChevronDown className={iconClassName} />
            </button>
            {isOpened && (
                <ul className="absolute top-full left-0 flex flex-col border-1 border-black border-solid min-w-[50px] bg-white text-black">
                    {
                        anotherLocales.map(locale => {
                            const href = '/' + locale + path;
                            const localeText = locale.toUpperCase();
                            return (
                                <li key={locale} className="w-full">
                                    <Link href={href} className="block p-[5px] bg-black text-white hover:bg-white hover:text-black">
                                        {localeText}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            )}
        </div>
    )
}