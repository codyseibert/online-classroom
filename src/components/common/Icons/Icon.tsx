import { FC } from 'react';

const sizes = {
  lg: 'w-6 h-6',
  md: 'w-4 h-4',
  sm: 'w-3 h-3',
};

type IconWithSizeClass = {
  sizeClass: string;
};

export const withSize = (Icon: FC<IconWithSizeClass>) => {
  const component = ({ size = 'md' }: { size?: keyof typeof sizes }) => (
    <Icon sizeClass={sizes[size]} />
  );
  component.displayName = Icon.displayName;
  return component;
};
