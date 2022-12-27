import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';

export const ClassroomOverviewScreen = ({
  classroomId,
}: {
  classroomId: string;
}) => {
  const classroomQuery = trpc.classroom.getClassroom.useQuery({ classroomId });
  const userQuery = trpc.user.getUser.useQuery();
  const router = useRouter();
  const enrollMutation = trpc.classroom.enrollInClassroom.useMutation();

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
        variant={Variant.Primary}
        onClick={handleEnroll}
      >
        Enroll
      </Button>
    </div>
  );
};
