import Header from '@/components/Header/Header';
import Alert from '@/components/Alert/Alert';

export default async function PublicLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;

    return (
        <>
            <Alert />
            <Header locale={locale} />
            <main className="page">{children}</main>
        </>
    );
}
