export default function CatalogSkeleton() {
    const length = 5;

    return (
        <div className="catalog-skeleton w-full flex flex-col gap-[20px] min-h-[140px]">
            {Array.from({ length }).map((_, index) => (
                <CatalogSkeletonItem key={index} />
            ))}
        </div>
    );
}

function CatalogSkeletonItem() {
    return (
        <div className="min-h-[141px] flex items-center gap-[15px] py-[10px] border-b-1 border-b-solid border-b-[#d8d8d8]">
            <div className="skeleton rounded-[5px] w-[120px] h-[120px] delay-[.5s]"></div>
            <div className="w-full h-full min-h-[120px] flex flex-col justify-between">
                <span className="skeleton w-fit rounded-[5px]">ID: 000</span>
                <span className="max-w-[400px] skeleton rounded-[5px]">
                    skeleton name
                </span>
                <span className="block min-w-[80px] w-fit skeleton rounded-[5px]">
                    popularity
                </span>
                <span className="w-fit skeleton rounded-[5px]">99 999</span>
            </div>
        </div>
    );
}
