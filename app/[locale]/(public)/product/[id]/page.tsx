import ClientProductPage from './ClientProductPage';

export default async function ProductPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  return <ClientProductPage productId={id} />;
}
