import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '@/styles/style.scss';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ByteShop',
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {

  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
            {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}