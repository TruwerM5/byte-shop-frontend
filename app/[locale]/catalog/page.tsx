import { useTranslations } from "next-intl"


export default function CatalogPage() {
    const t = useTranslations('common');
    return (
        <div>
            <h1>{t('Catalog')}</h1>
        </div>
    )
}