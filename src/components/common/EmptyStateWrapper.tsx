import React, { ReactNode } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const EmptyStateWrapper = ({
  isLoading,
  showEmptyState,
  EmptyComponent,
  NonEmptyComponent,
}: {
  isLoading: boolean;
  showEmptyState: boolean;
  EmptyComponent: ReactNode;
  NonEmptyComponent: ReactNode;
}) => {
  return (
    <div>
      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#6466f1"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : showEmptyState ? (
        EmptyComponent
      ) : (
        NonEmptyComponent
      )}
    </div>
  );
};
