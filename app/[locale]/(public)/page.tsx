import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('common');
    return (
        <div className="page">
            <h1>{t('Home')}</h1>
        </div>
    );
}
