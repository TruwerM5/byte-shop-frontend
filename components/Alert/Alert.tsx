'use client';

import { IoMdClose } from 'react-icons/io';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useAlertStore } from '@/store/alertStore';
import './Alert.scss';

export default function Alert({ id, type, message }: { id: number; type: 'error' | 'success'; message: string }) {
  const { hideAlert } = useAlertStore();
  const [progress, setProgress] = useState(0);
  const timerId = useRef<any>(null);

  useEffect(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }

    setProgress(0);

    timerId.current = setInterval(() => {
      setProgress((p) => p + 1);
    }, 50);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [id]);

  useEffect(() => {
    if (progress >= 100) {
      hideAlert(id);
      clearInterval(timerId.current);
    }
  }, [progress]);

  return (
    <div
      className={clsx('alert relative p-[30px] text-white', {
        'alert_status-success': type === 'success',
        'alert_status-error': type === 'error',
      })}
    >
      <button
        className="alert__close-button"
        onClick={() => {
          if (timerId.current) {
            clearInterval(timerId.current);
          }
          hideAlert(id);
        }}
      >
        <IoMdClose />
      </button>
      <span className="alert__message">{message}</span>
      <div
        className={'alert__progress'}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
