import { Ref, useEffect, useRef } from 'react';

const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [callback]);

    return ref;
};

export default useOutsideClick;
