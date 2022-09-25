import { useState } from 'react';

export const useCreateAssignment = ({ refetchAssignments }) => {
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
