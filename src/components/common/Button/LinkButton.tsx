import React, { ReactNode } from 'react';

export enum LinkButtonVariant {
  Primary,
  Danger,
  Secondary,
}

const LinkButton = ({
  children,
  onClick,
  variant = LinkButtonVariant.Primary,
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: LinkButtonVariant;
}) => {
  const colors = {
    [LinkButtonVariant.Primary]:
      'text-sm text-blue-300 px-4 py-2 hover:text-blue-200 flex items-center gap-2',
    [LinkButtonVariant.Danger]:
      'text-sm text-red-300 px-4 py-2 hover:text-red-200 flex items-center gap-2',
    [LinkButtonVariant.Secondary]:
      'text-sm text-gray-700 px-4 py-2 hover:text-gray-800 flex items-center gap-2',
  };
  return (
    <button
      onClick={onClick}
      className={colors[variant]}
    >
      {children}
    </button>
  );
};

LinkButton.displayName = 'LinkButton';

export { LinkButton };
