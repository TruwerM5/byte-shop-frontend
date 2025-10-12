import Search from '@/components/Search/Search';
import ClientCategoryPage from './ClientCategoryPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


async function delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}
export default async function CategoryPage() {
    await new Promise((r) => setTimeout(r, 1000));
    return (
        <>
            <Search />
            <ClientCategoryPage />
        </>
    );
}
