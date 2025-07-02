import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
 
export default function HomePage() {
  const t = useTranslations('common');
  return (
    <div>
      <h1>{t('Home')}</h1>
    </div>
  );
}