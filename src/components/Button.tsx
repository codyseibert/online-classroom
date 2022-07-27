import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-secondaryDark hover:bg-secondary text-bgPrimary py-2 px-4 rounded mx-auto my-4"
    >
      {children}
    </button>
  );
};

export default Button;
