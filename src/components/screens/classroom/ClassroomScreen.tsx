import React from 'react';
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
import { SideNavigation, tabAtom, TabName } from './SideNavigation';
import { useAtom } from 'jotai';
import { MainHeading } from '../../common/MainHeading';

export const ClassroomScreen = ({ classroomId }) => {
  const [selectedTab] = useAtom(tabAtom);

  const assignmentsQuery = trpc.useQuery([
    'classroom.getAssignments',
    { classroomId },
  ]);

  const classroomQuery = trpc.useQuery([
    'classroom.getClassroom',
    { classroomId },
  ]);

  const classrooms = trpc.useQuery(['student.getClassrooms']);

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
    classroomId,
  });

  const session = useSession();
  const router = useRouter();

  const isLoadingAssignments = assignmentsQuery.isLoading;
  const assignments = assignmentsQuery.data;
  const classroom = classroomQuery.data;
  const hasAdminAccess = classroom?.userId === session.data?.user.id;
  // const isStudent = session.data?.user.role === 'student';
  const showUnenroll = classrooms.data?.some(({ id }) => id === classroomId);

  const handleUnenroll = async () => {
    if (confirm('are you sure you want to unenroll')) {
      await unenrollMutation.mutateAsync({ classroomId });
      router.push('/dashboard');
    }
  };

  return (
    <>
      <MainHeading title={classroom?.name ?? 'loading...'}>
        {hasAdminAccess && (
          <button
            className="flex link"
            onClick={openEditClassroomModal}
          >
            <PencilSquare /> Edit
          </button>
        )}

        {showUnenroll && (
          <Button
            variant={Variant.Danger}
            onClick={handleUnenroll}
          >
            Unenroll
          </Button>
        )}
      </MainHeading>

      <div className="flex mb-12">
        <SideNavigation />

        <section className="grow">
          {selectedTab === TabName.Assignment && (
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

          {selectedTab === TabName.Students && (
            <StudentsSection classroomId={classroomId} />
          )}
        </section>
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
