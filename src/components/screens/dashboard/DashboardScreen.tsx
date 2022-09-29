import React from 'react';
import { trpc } from '../../../utils/trpc';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { EmptyStateDashboard } from './EmptyStateDashboard';
import { EnrolledList } from './EnrolledList';

export const DashboardScreen = () => {
  const enrolledClassroomsQuery = trpc.useQuery(['student.getClassrooms']);

  const { data: classrooms, isLoading } = enrolledClassroomsQuery;

  return (
    <div className="mt-16">
      <EmptyStateWrapper
        isLoading={isLoading}
        data={classrooms}
        EmptyComponent={<EmptyStateDashboard />}
        NonEmptyComponent={<EnrolledList classrooms={classrooms ?? []} />}
      />
    </div>
  );
};
