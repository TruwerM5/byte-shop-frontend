import CatalogSkeletonItem from '../CatalogSkeletonItem/CatalogSkeletonItem';

export default function CatalogSkeleton() {
    const length = 5;

    return (
        <div className='catalog-skeleton w-full flex flex-col gap-[20px] min-h-[140px]'>
            {Array.from({length}).map((_, index) => (
                <CatalogSkeletonItem key={index} />
            ))}
        </div>
    )
}