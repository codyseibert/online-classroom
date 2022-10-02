import React, { ReactNode } from 'react';

export enum LinkButtonVariant {
  Primary,
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
