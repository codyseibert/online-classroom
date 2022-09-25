import React from 'react';
import { trpc } from '../../../utils/trpc';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { Students } from './Students';
import { NoStudents } from './NoStudents';

export const StudentsSection = ({ classroomId }: { classroomId: string }) => {
  const studentsQuery = trpc.useQuery([
    'classroom.getStudents',
    { classroomId },
  ]);

  const { data: students, isLoading } = studentsQuery;

  return (
    <EmptyStateWrapper
      isLoading={isLoading}
      data={students}
      EmptyComponent={<NoStudents />}
      NonEmptyComponent={<Students students={students ?? []} />}
    />
  );
};
