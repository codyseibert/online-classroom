import { useRouter } from 'next/router';
import { useState } from 'react';

export const useCreateAssignment = ({ classroomId }) => {
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] =
    useState(false);

  const router = useRouter();

  const closeAssignmentModal = () => {
    setShowCreateAssignmentModal(false);
  };

  const openAssignmentModal = () => {
    setShowCreateAssignmentModal(true);
  };

  const handleAssignmentModalComplete = (assignmentId: string) => {
    closeAssignmentModal();
    router.push(`/classrooms/${classroomId}/assignments/${assignmentId}/edit`);
  };

  return {
    showCreateAssignmentModal,
    closeAssignmentModal,
    openAssignmentModal,
    handleAssignmentModalComplete,
  };
};
