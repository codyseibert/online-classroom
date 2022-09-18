import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { trpc } from '../../../utils/trpc';
import { CreateAssignmentModal } from './CreateAssignmentModal';
import { EditClassroomModal } from './EditClassroomModal';
import { PencilSquare } from '../../common/Icons/PencilSquare';
import { NoAssignments } from './NoAssignments';
import { Assignments } from './Assignments';

export const ClassroomScreen = ({ classroomId }) => {
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] =
    useState(false);
  const [showEditClassroomModal, setShowEditClassroomModal] = useState(false);

  const {
    data: assignments,
    isLoading: isLoadingAssignments,
    refetch: refetchAssignments,
  } = trpc.useQuery(['classroom.getAssignments', { classroomId }]);

  const editClassroomMutation = trpc.useMutation('classroom.editClassroom');

  const classroomQuery = trpc.useQuery([
    'classroom.getClassroom',
    { classroomId },
  ]);

  const classroom = classroomQuery.data;

  const closeAssignmentModal = () => {
    setShowCreateAssignmentModal(false);
  };

  const openAssignmentModal = () => {
    setShowCreateAssignmentModal(true);
  };

  const openEditClassroomModal = () => {
    setShowEditClassroomModal(true);
  };

  const closeEditModal = () => {
    setShowEditClassroomModal(false);
  };

  const handleAssignmentModalComplete = () => {
    refetchAssignments();
    closeAssignmentModal();
  };

  const handleEditClassroomComplete = async (updatedClassroomData) => {
    await editClassroomMutation.mutateAsync({
      ...updatedClassroomData,
      classroomId,
    });
    classroomQuery.refetch();
    setShowEditClassroomModal(false);
  };

  const showEmptyState =
    !isLoadingAssignments && assignments && assignments.length === 0;
  const showAssignments =
    !isLoadingAssignments && assignments && assignments.length > 0;

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
          {isLoadingAssignments && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          )}
          {showEmptyState && (
            <NoAssignments openAssignmentModal={openAssignmentModal} />
          )}
          {showAssignments && (
            <Assignments
              classroomId={classroomId}
              assignments={assignments}
              openAssignmentModal={openAssignmentModal}
            />
          )}
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
