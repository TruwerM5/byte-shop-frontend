'use client';

import { useTranslations } from 'next-intl';
export default function AboutPage() {
    const t = useTranslations('common');

    return (
        <div className="about-page">
            <h1>{t('About')}</h1>
        </div>
    );
}
