import React, { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { CreateAssignmentModal } from './CreateAssignmentModal';
import { EditClassroomModal } from './EditClassroomModal';
import { PencilSquare } from '../../common/Icons/PencilSquare';
import { NoAssignments } from './NoAssignments';
import { Assignments } from './Assignments';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { useCreateAssignment } from './hooks/useCreateAssignment';
import { useEditClassroom } from './hooks/useEditClassroom';
import { useSession } from '../../../libs/useSession';
import { StudentsSection } from './StudentsSection';
import { Button, Variant } from '../../common/Button/Button';
import { useRouter } from 'next/router';
import { SideNavigation } from './SideNavigation';

export const ClassroomScreen = ({ classroomId }) => {
  const [tab, setTab] = useState('dashboard');

  const assignmentsQuery = trpc.useQuery([
    'classroom.getAssignments',
    { classroomId },
  ]);

  const classroomQuery = trpc.useQuery([
    'classroom.getClassroom',
    { classroomId },
  ]);

  const unenrollMutation = trpc.useMutation('classroom.unenroll');

  const {
    openEditClassroomModal,
    closeEditModal,
    handleEditClassroomComplete,
    showEditClassroomModal,
  } = useEditClassroom({
    refreshClassroom: classroomQuery.refetch,
    classroomId,
  });

  const {
    showCreateAssignmentModal,
    closeAssignmentModal,
    openAssignmentModal,
    handleAssignmentModalComplete,
  } = useCreateAssignment({
    refetchAssignments: assignmentsQuery.refetch,
  });

  const session = useSession();
  const router = useRouter();

  const isLoadingAssignments = assignmentsQuery.isLoading;
  const assignments = assignmentsQuery.data;
  const classroom = classroomQuery.data;
  const hasAdminAccess = classroom?.userId === session.data?.user.id;
  const isStudent = session.data?.user.role === 'student';

  const handleUnenroll = async () => {
    if (confirm('are you sure you want to unenroll')) {
      await unenrollMutation.mutateAsync({ classroomId });
      router.push('/dashboard');
    }
  };

  return (
    <>
      <section className="py-4 flex items-center mt-8 gap-4">
        <h1 className="text-4xl font-bold">{classroom?.name}</h1>

        {hasAdminAccess && (
          <button
            className="flex link"
            onClick={openEditClassroomModal}
          >
            <PencilSquare /> Edit
          </button>
        )}

        {isStudent && (
          <Button
            variant={Variant.Primary}
            onClick={handleUnenroll}
          >
            Unenroll
          </Button>
        )}
      </section>

      <div className="container m-auto flex flex-col gap-8">
        <div className="flex">
          <SideNavigation
            tab={tab}
            setTab={setTab}
          />

          {tab === 'assignments' && (
            <EmptyStateWrapper
              isLoading={isLoadingAssignments}
              data={assignments}
              EmptyComponent={
                <NoAssignments openAssignmentModal={openAssignmentModal} />
              }
              NonEmptyComponent={
                <Assignments
                  hasAdminAccess={hasAdminAccess}
                  classroomId={classroomId}
                  assignments={assignments ?? []}
                  openAssignmentModal={openAssignmentModal}
                />
              }
            />
          )}

          {tab === 'students' && <StudentsSection classroomId={classroomId} />}
        </div>
      </div>

      <CreateAssignmentModal
        onCancel={closeAssignmentModal}
        onComplete={handleAssignmentModalComplete}
        isOpen={showCreateAssignmentModal}
        classroomId={classroomId}
      />

      {classroom && (
        <EditClassroomModal
          onCancel={closeEditModal}
          onComplete={handleEditClassroomComplete}
          isOpen={showEditClassroomModal}
          classroom={classroom}
        />
      )}
    </>
  );
};
