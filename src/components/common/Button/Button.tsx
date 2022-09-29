import React, { ReactNode } from 'react';

export enum Variant {
  Primary,
  Secondary,
  Danger,
}

export const Button = ({
  children,
  variant,
  ...rest
}: {
  children: ReactNode;
  variant: Variant;
  [key: string]: any;
}) => {
  const colors = {
    [Variant.Primary]:
      'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400',
    [Variant.Secondary]:
      'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400',
    [Variant.Danger]:
      'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400',
  };
  return (
    <button
      className={colors[variant]}
      {...rest}
    >
      {children}
    </button>
  );
};
