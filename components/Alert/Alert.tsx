'use client';

import { IoMdClose } from 'react-icons/io';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useAlertStore } from '@/store/alertStore';

export default function Alert () {

    const {isActive, message, type, showAlert, hideAlert} = useAlertStore();

    const [progress, setProgress] = useState(0); 
    const timerId = useRef<any>(null);

    useEffect(() => {
        if(!isActive) return;
        setProgress(0);
        if(timerId.current) clearInterval(timerId.current);
        timerId.current = setInterval(() => {
            setProgress((prev) => {
                if(prev >= 100) {
                    clearInterval(timerId.current);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        console.log('qweqwe');
        return () => {
            if(timerId.current) {
                clearInterval(timerId.current);
            }
        }
    }, [isActive]);

    useEffect(() => {
        if(progress === 100 && isActive) {
            hideAlert();
        }
    }, [progress, isActive, hideAlert])

    if(!isActive) return null;

    return (
        <div className={clsx("alert fixed z-20 top-[10px] right-[20px] p-[30px] text-white", {
            'bg-blue-600': type === 'success',
            'bg-red-400': type === 'error'
        })}>
            <button className="alert__close-button absolute top-[5px] right-[5px] text-white text-[10px]" 
                onClick={hideAlert}
            >
                <IoMdClose />
            </button>
            <span className="alert__message">
                {message}
            </span>
            <div className="alert__progress h-[2px] bg-white transition-all ease-linear" 
                style={{width: `${progress}%`}}>
            </div>
        </div>
    )

}