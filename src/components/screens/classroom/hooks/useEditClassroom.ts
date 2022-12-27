import { useState } from 'react';
import { trpc } from '../../../../utils/trpc';

export const useEditClassroom = ({ refreshClassroom, classroomId }) => {
  const [showEditClassroomModal, setShowEditClassroomModal] = useState(false);

  const editClassroomMutation = trpc.classroom.editClassroom.useMutation();

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
