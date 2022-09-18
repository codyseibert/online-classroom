import Image from 'next/image';
import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { trpc } from '../../../utils/trpc';
import assignmentsImage from '../../../assets/assignments.svg';
import { Button, Table } from 'react-daisyui';
import { CreateAssignmentModal } from './CreateAssignmentModal';
import { Assignment } from '@prisma/client';

const NoAssignments = ({ openAssignmentModal }) => {
  return (
    <div className="flex flex-col gap-8">
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

const Assignments = ({
  assignments,
  openAssignmentModal,
}: {
  assignments: Assignment[];
  openAssignmentModal: () => void;
}) => {
  const totalAssignments = assignments.length;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h3 className="text-2xl">
          Your Assignments ({totalAssignments} total)
        </h3>
        <Button
          onClick={openAssignmentModal}
          color="primary"
          size="sm"
        >
          Create An Assignment
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table zebra={true}>
          <Table.Head>
            <span>Assignment Number</span>
            <span>Name</span>
            <span>Description</span>
          </Table.Head>

          <Table.Body>
            {assignments.map((assignment, idx) => (
              <Table.Row key={assignment.id}>
                <span>{idx + 1}</span>
                <span>{assignment.name}</span>
                <span>{assignment.description}</span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export const ClassroomScreen = ({ classroomId }) => {
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] =
    useState(false);
  // TODO: fetch the assignments associated with this classroom <-----
  // TODO: fetch the classroom data <-----
  // TODO: ability to create new assignments
  // TODO: view the students currently enrolled
  const {
    data: assignments,
    isLoading: isLoadingAssignments,
    refetch: refetchAssignments,
  } = trpc.useQuery(['classroom.getAssignments', { classroomId }]);

  const { data: classroom } = trpc.useQuery([
    'classroom.getClassroom',
    { classroomId },
  ]);

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

  const showEmptyState =
    !isLoadingAssignments && assignments && assignments.length === 0;
  const showAssignments =
    !isLoadingAssignments && assignments && assignments.length > 0;

  return (
    <>
      <div className="container flex flex-col gap-8 m-auto">
        <h1 className="mt-8 text-4xl">
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
          {showAssignments && (
            <Assignments
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
    </>
  );
};
