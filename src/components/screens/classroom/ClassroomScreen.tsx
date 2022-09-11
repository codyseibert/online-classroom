import Image from 'next/image';
import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { trpc } from '../../../utils/trpc';
import assignmentsImage from '../../../assets/assignments.svg';
import { Button } from 'react-daisyui';
import { CreateAssignmentModal } from './CreateAssignmentModal';

const NoAssignments = ({ openAssignmentModal }) => {
  return (
    <div className="flex flex-col justify-center gap-8">
      <Image
        width="300"
        height="300"
        src={assignmentsImage}
        alt="no classrooms found"
      />
      <div className="text-2xl text-center">You have no assignments yet!</div>
      <div className="text-center">
        <Button
          onClick={openAssignmentModal}
          color="primary"
        >
          Create An Assignment
        </Button>
      </div>
    </div>
  );
};

const Assignments = () => {
  return <div>Assignments</div>;
};

export const ClassroomScreen = ({ classroomId }) => {
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] =
    useState(false);
  // TODO: fetch the assignments associated with this classroom <-----
  // TODO: fetch the classroom data <-----
  // TODO: ability to create new assignments
  // TODO: view the students currently enrolled
  const { data: assignments, isLoading: isLoadingAssignments } = trpc.useQuery([
    'classroom.getAssignments',
    { classroomId },
  ]);

  const { data: classroom } = trpc.useQuery([
    'classroom.getClassroom',
    { classroomId },
  ]);

  const {
    data: classrooms,
    isLoading,
    refetch: refetchClassrooms,
  } = trpc.useQuery(['classroom.getClassroomsForTeacher']);

  const closeAssignmentModal = () => {
    setShowCreateAssignmentModal(false);
  };

  const openAssignmentModal = () => {
    setShowCreateAssignmentModal(true);
  };

  const handleAssignmentModalComplete = () => {
    refetchClassrooms();
    closeAssignmentModal();
  };

  const showEmptyState =
    !isLoadingAssignments && assignments && assignments.length === 0;
  const showAssignments =
    !isLoadingAssignments && assignments && assignments.length > 0;

  return (
    <>
      <div className="container m-auto flex flex-col gap-4">
        <h1 className="text-4xl mt-8">
          Manage your <b>{classroom?.name}</b>
        </h1>

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
          {showAssignments && <Assignments />}
        </div>
      </div>

      <CreateAssignmentModal
        onCancel={closeAssignmentModal}
        onComplete={handleAssignmentModalComplete}
        isOpen={showCreateAssignmentModal}
        classroomId={classroomId}
      />
    </>
  );
};
