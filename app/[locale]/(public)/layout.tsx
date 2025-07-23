import Header from '@/components/Header/Header';
import AlertsContainer from '@/components/AlertsContainer/AlertsContainer';

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
            <AlertsContainer />
            <Header locale={locale} />
            <main className="page">{children}</main>
        </>
    );
}
