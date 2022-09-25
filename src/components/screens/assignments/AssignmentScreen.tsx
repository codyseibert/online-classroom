import React from 'react';
import { trpc } from '../../../utils/trpc';

export const AssignmentScreen = ({ classroomId, assignmentId }) => {
  const assignmentQuery = trpc.useQuery([
    'classroom.getAssignment',
    { assignmentId },
  ]);

  // const classroomQuery = trpc.useQuery([
  //   'classroom.getClassroom',
  //   { classroomId },
  // ]);

  return (
    <section>
      <h1 className="text-4xl">{assignmentQuery.data?.name}</h1>
      <p>{assignmentQuery.data?.description}</p>
    </section>
  );
};
