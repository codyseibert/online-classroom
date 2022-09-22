import React, { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { CreateAssignmentModal } from './CreateAssignmentModal';
import { EditClassroomModal } from './EditClassroomModal';
import { PencilSquare } from '../../common/Icons/PencilSquare';
import { NoAssignments } from './NoAssignments';
import { Assignments } from './Assignments';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';

const useEditClassroom = ({ refreshClassroom, classroomId }) => {
  const [showEditClassroomModal, setShowEditClassroomModal] = useState(false);

  const editClassroomMutation = trpc.useMutation('classroom.editClassroom');

  const openEditClassroomModal = () => {
    setShowEditClassroomModal(true);
  };

  const closeEditModal = () => {
    setShowEditClassroomModal(false);
  };

  const handleEditClassroomComplete = async (updatedClassroomData) => {
    await editClassroomMutation.mutateAsync({
      ...updatedClassroomData,
      classroomId,
    });
    refreshClassroom();
    setShowEditClassroomModal(false);
  };

  return {
    openEditClassroomModal,
    closeEditModal,
    handleEditClassroomComplete,
    showEditClassroomModal,
  };
};

const useCreateAssignment = ({ refetchAssignments }) => {
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] =
    useState(false);

  const closeAssignmentModal = () => {
    setShowCreateAssignmentModal(false);
  };

  const openAssignmentModal = () => {
    setShowCreateAssignmentModal(true);
  };

  const handleAssignmentModalComplete = () => {
    refetchAssignments();
    closeAssignmentModal();
  };

  return {
    showCreateAssignmentModal,
    closeAssignmentModal,
    openAssignmentModal,
    handleAssignmentModalComplete,
  };
};

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

  const isLoadingAssignments = assignmentsQuery.isLoading;
  const assignments = assignmentsQuery.data;
  const classroom = classroomQuery.data;

  return (
    <>
      <div className="container m-auto flex flex-col gap-8">
        <div className="flex items-center mt-8 gap-4">
          <h1 className="text-4xl">
            Manage your <b>{classroom?.name}</b> Classroom
          </h1>
          <button
            className="flex link"
            onClick={openEditClassroomModal}
          >
            <PencilSquare /> Edit
          </button>
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
                classroomId={classroomId}
                assignments={assignments ?? []}
                openAssignmentModal={openAssignmentModal}
              />
            }
          />
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
