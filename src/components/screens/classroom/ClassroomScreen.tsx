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

export const ClassroomScreen = ({ classroomId }) => {
  const assignmentsQuery = trpc.useQuery([
    'classroom.getAssignments',
    { classroomId },
  ]);

  const classroomQuery = trpc.useQuery([
    'classroom.getClassroom',
    { classroomId },
  ]);

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

  const isLoadingAssignments = assignmentsQuery.isLoading;
  const assignments = assignmentsQuery.data;
  const classroom = classroomQuery.data;
  const hasAdminAccess = classroom?.userId === session.data?.user.id;

  return (
    <>
      <div className="container m-auto flex flex-col gap-8">
        <div className="flex items-center mt-8 gap-4">
          <h1 className="text-4xl">
            Manage your <b>{classroom?.name}</b> Classroom
          </h1>
          {hasAdminAccess && (
            <button
              className="flex link"
              onClick={openEditClassroomModal}
            >
              <PencilSquare /> Edit
            </button>
          )}
        </div>

        <div>
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
        </div>

        <StudentsSection classroomId={classroomId} />
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
