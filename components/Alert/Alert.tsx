'use client';

import { IoMdClose } from 'react-icons/io';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useAlertStore } from '@/store/alertStore';

export default function Alert () {

    const {isActive, message, type, instanceId, showAlert, hideAlert} = useAlertStore();

    const [progress, setProgress] = useState(0); 
    const [transitionEnabled, setTransitionEnabled] = useState(false);
    const timerId = useRef<any>(null);


    useEffect(() => {
        
        if(!isActive) return;
        if(timerId.current) {
            clearInterval(timerId.current);
        }

        setTransitionEnabled(false);
        setProgress(0);

        setTimeout(() => {
            setTransitionEnabled(true);
        }, 10);

        timerId.current = setInterval(() => {
            setProgress(p => p + 1);
        }, 50);

        return () => {
            if(timerId.current) {
                clearInterval(timerId.current);
            }
        }

    }, [instanceId]);

    useEffect(() => {
        if(isActive && progress > 100) {
            hideAlert();
            setProgress(0);
            return () => {
                if(timerId.current) {
                    
                    clearInterval(timerId.current);
                }
            }
        }
    }, [isActive, progress]);
    
    if(!isActive || progress > 100) return null;

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
            <div  className={clsx(
                    'alert__progress h-[2px] bg-white',
                        transitionEnabled && 'transition-all ease-linear'
                    )}
                style={{width: `${progress}%`}}>
            </div>
        </div>
    )

}