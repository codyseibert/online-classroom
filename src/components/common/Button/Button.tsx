import React from 'react';
import { Button as DaisyButton } from 'react-daisyui';

export const Button = ({ children, ...rest }) => {
  return <DaisyButton {...rest}>{children}</DaisyButton>;
};
