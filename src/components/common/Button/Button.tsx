import React, { ReactHTML, ReactNode } from 'react';

export enum Variant {
  Primary,
  Secondary,
  Danger,
}

const Button = React.forwardRef(
  (
    {
      children,
      variant = Variant.Primary,
      as = 'button',
      ...rest
    }: {
      children: ReactNode;
      variant: Variant;
      as?: keyof ReactHTML;
      [key: string]: any;
    },
    ref
  ) => {
    const colors = {
      [Variant.Primary]:
        'bg-blue-50 text-black px-4 py-2 rounded hover:bg-blue-100',
      [Variant.Secondary]:
        'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400',
      [Variant.Danger]:
        'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400',
    };
    const As = as;
    return (
      <As
        className={colors[variant]}
        {...rest}
      >
        {children}
      </As>
    );
  }
);

Button.displayName = 'Button';

export { Button };
