import React, { ReactNode } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { isEmpty } from 'lodash';

export const EmptyStateWrapper = ({
  isLoading,
  data,
  EmptyComponent,
  NonEmptyComponent,
}: {
  isLoading: boolean;
  data: any;
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
      ) : isEmpty(data) ? (
        EmptyComponent
      ) : (
        NonEmptyComponent
      )}
    </div>
  );
};
