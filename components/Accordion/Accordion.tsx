import { useTranslations } from 'next-intl';
import { useState } from 'react';
import clsx from 'clsx';
import './Accordion.scss';
import { RxTriangleDown } from 'react-icons/rx';

export default function Accordion(
{
    title,
    children
}: {
    title: string;
    children: React.ReactNode
}) {

    const tCommon = useTranslations('common');
    const [isOpened, setIsOpened] = useState(false);

    function handleClick() {
        setIsOpened(!isOpened);
    }

    return (
        <div className='accordion'>
            <button onClick={handleClick} className='accordion__title flex gap-[3px] items-center mb-[5px] font-bold'>
                <RxTriangleDown className={
                    clsx(
                        'transition-transform duration-300',
                        {'rotate-180': isOpened}
                    )} 
                />
                {tCommon(title)}, &#8381;
            </button>
            <div className={
                clsx(
                    'relative overflow-hidden max-h-0 transition-[max-height] duration-300 ease-in-out', 
                    {'max-h-[999px]': isOpened}
                )}>
                {children}
            </div>
        </div>
    )
}