import { fetchAllProducts } from '@/api/products';
import ClientCalalogPage from './ClientCatalogPage';

export default async function CatalogPage() {
  const serverProducts = await fetchAllProducts();

  if (!serverProducts) {
    return <h1>Not found</h1>;
  }

  return <ClientCalalogPage serverProducts={serverProducts} />;
}
