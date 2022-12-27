import React from 'react';
import { trpc } from '../../../utils/trpc';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { MainHeading } from '../../common/MainHeading';
import { EmptyStateDashboard } from './EmptyStateDashboard';
import { EnrolledList } from './EnrolledList';

export const DashboardScreen = () => {
  const enrolledClassroomsQuery = trpc.student.getClassrooms.useQuery();

  const { data: classrooms, isLoading } = enrolledClassroomsQuery;

  return (
    <div>
      <MainHeading title="Your Classrooms" />

      <EmptyStateWrapper
        isLoading={isLoading}
        data={classrooms}
        EmptyComponent={<EmptyStateDashboard />}
        NonEmptyComponent={<EnrolledList classrooms={classrooms ?? []} />}
      />
    </div>
  );
};
