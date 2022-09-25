import { Assignment, Classroom } from '@prisma/client';
import { User } from 'next-auth';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from 'react-daisyui';
import { Table } from '../../common/Table/Table';

export const Assignments = ({
  assignments,
  hasAdminAccess,
  classroomId,
  openAssignmentModal,
}: {
  assignments: Assignment[];
  hasAdminAccess: boolean;
  classroomId: string;
  openAssignmentModal: () => void;
}) => {
  const totalAssignments = assignments.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <h3 className="text-2xl">
          Your Assignments ({totalAssignments} total)
        </h3>
        {hasAdminAccess && (
          <Button
            onClick={openAssignmentModal}
            color="primary"
            size="sm"
          >
            Create An Assignment
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={['Assignment Number', 'Name', 'Description', 'Actions']}
          rows={assignments.map((assignment, idx) => [
            idx + 1,
            assignment.name,
            assignment.description,
            (
              <div className="flex gap-4">
                <>
                  {hasAdminAccess && (
                    <Link
                      href={`/classrooms/${classroomId}/assignments/${assignment.id}/edit`}
                    >
                      <span className="link">Edit</span>
                    </Link>
                  )}
                  <Link
                    href={`/classrooms/${classroomId}/assignments/${assignment.id}`}
                  >
                    <span className="link">View</span>
                  </Link>
                </>
              </div>
            ) as ReactNode,
          ])}
        />
      </div>
    </div>
  );
};
