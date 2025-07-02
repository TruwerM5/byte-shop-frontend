
export default async function Product ({
    params
}: {
    params: {product: string}
}) {
    const { product } = await params;
    return (
        <h4>{product}</h4>
    )
}