import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

export enum Variant {
  PRIMARY,
  SECONDARY,
  DANGER
}

const Button: FC<{
  children: ReactNode,
  variant: Variant,
  [x: string]: any;
}> =
  ({ children, variant = Variant.PRIMARY, ...rest }) => {
    return (
      <button
        {...rest}
        className={classNames(
          variant === Variant.PRIMARY && 'bg-secondaryDark hover:bg-secondary',
          variant === Variant.DANGER && 'bg-bgDanger hover:bg-bgDangerLight',
          'text-bgPrimary py-2 px-4 rounded mx-auto my-4'
        )}
      >
        {children}
      </button>
    );
  };

export default Button;