import React from 'react';
import clsx from 'clsx';

export default function Button({
  onClick,
  children,
  classList = '',
  type = 'default',
}: {
  onClick: () => void;
  children: React.ReactNode;
  classList?: string;
  type?: 'custom' | 'default' | 'primary' | 'secondary';
}) {
  return (
    <button
      className={clsx(`button-component`, {
        'button-component_default': type === 'default',
        'button-component_secondary': type === 'secondary',
        'button-component_primary': type === 'primary',
        [classList]: classList && type === 'custom',
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
