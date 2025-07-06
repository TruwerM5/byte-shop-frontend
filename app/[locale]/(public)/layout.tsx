
import Header from '@/components/Header/Header'

export default async function PublicLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {locale: string},
}) {

    const {locale} = await params;

    return (
        <>
            <Header locale={locale} />
            <main className='page'>
                {children}
            </main>
        </>
    )
}