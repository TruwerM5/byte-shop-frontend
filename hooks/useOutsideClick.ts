import { Ref, useEffect, useRef } from 'react';

const useOutsideClick = <T extends HTMLElement>(callback: () => void) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node) &&
                !ref.current.classList.contains('catalog')
            ) {
                console.log(ref.current.classList);
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
