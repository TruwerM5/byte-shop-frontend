import { useTranslations } from "next-intl";

export default function AboutPage() {

    const t = useTranslations('common');

    return (
        <div>
            <h1>{t('About')}</h1>
        </div>
    )
}