
import './CatalogSkeletonItem.scss';
import clsx from 'clsx';

export default function CatalogSkeletonItem() {
    return (
        <div className='catalog-skeleton-item min-h-[141px]'>
            <div className='catalog-skeleton-item__image skeleton rounded-[5px]'></div>
            <div className='catalog-skeleton-item__content'>
                <span className='catalog-skeleton-item__id skeleton rounded-[5px]'>ID: 000</span>
                <span className='catalog-skeleton-item__name skeleton rounded-[5px]'>
                    skeleton name
                </span>
                <span className='catalog-skeleton-item__popularity skeleton rounded-[5px]'>popularity</span>
                <span className='catalog-skeleton-item__price skeleton rounded-[5px]'>
                    99 999
                </span>
            </div>
        </div>
    )
}