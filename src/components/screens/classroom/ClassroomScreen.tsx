import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { trpc } from '../../../utils/trpc';
import assignmentsImage from '../../../assets/assignments.svg';
import { Button } from 'react-daisyui';
import { CreateAssignmentModal } from './CreateAssignmentModal';
import { Assignment } from '@prisma/client';
import { Table } from '../../common/Table/Table';
import Link from 'next/link';

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
  classroomId,
  openAssignmentModal,
}: {
  assignments: Assignment[];
  classroomId: number;
  openAssignmentModal: () => void;
}) => {
  const totalAssignments = assignments.length;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
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
        <Table
          headers={['Assignment Number', 'Name', 'Description']}
          rows={assignments.map((assignment, idx) => [
            idx + 1,
            assignment.name,
            assignment.description,
            (
              <div className="flex gap-4">
                <Link
                  href={`/classrooms/${classroomId}/assignments/${assignment.id}/edit`}
                >
                  <span className="link">Edit</span>
                </Link>
                <Link
                  href={`/classrooms/${classroomId}/assignments/${assignment.id}`}
                >
                  <span className="link">View</span>
                </Link>
              </div>
            ) as ReactNode,
          ])}
        />
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
      <div className="container m-auto flex flex-col gap-8">
        <h1 className="text-4xl mt-8">
          Manage your <b>{classroom?.name}</b> Classroom
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
    </>
  );
};
