import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { trpc } from '../../../utils/trpc';
import { Button } from '../../common/Button/Button';

export const ClassroomOverviewScreen = ({
  classroomId,
}: {
  classroomId: string;
}) => {
  const classroomQuery = trpc.useQuery([
    'classroom.getClassroom',
    { classroomId },
  ]);

  const userQuery = trpc.useQuery(['user.getUser']);
  const router = useRouter();

  const enrollMutation = trpc.useMutation('classroom.enrollInClassroom');

  const classroom = classroomQuery.data;

  const handleEnroll = async () => {
    await enrollMutation.mutateAsync({ classroomId });
    router.push(`/classrooms/${classroomId}`);
  };

  useEffect(() => {
    if (!userQuery.data) return;
    if (!classroomId) return;
    if (!router) return;
    if (
      !userQuery.data.enrolledIn.find(
        (classroom) => classroom.id === classroomId
      )
    )
      return;
    router.push(`/classrooms/${classroomId}`);
  }, [userQuery.data, classroomId, router]);

  return (
    <div className="container m-auto">
      <h2>{classroom?.name}</h2>
      <h2>{classroom?.description}</h2>
      <Button
        color="primary"
        onClick={handleEnroll}
      >
        Enroll
      </Button>
    </div>
  );
};
