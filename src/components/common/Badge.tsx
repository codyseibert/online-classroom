import { ReactNode } from 'react';

export enum BadgeVariant {
  Error,
}

export const Badge = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: BadgeVariant;
}) => {
  const colorMap = {
    [BadgeVariant.Error]:
      'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
  };

  const colors = colorMap[variant];

  return (
    <span
      className={`text-md font-semibold mr-2 px-2.5 py-0.5 rounded ${colors}`}
    >
      {children}
    </span>
  );
};
