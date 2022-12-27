import { Assignment } from '@prisma/client';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Button, Variant } from '../../common/Button/Button';
import { PencilSquare } from '../../common/Icons/PencilSquare';
import { Table } from '../../common/Table/Table';
import { DateTime } from 'luxon';

export const TeacherAssignments = ({
  assignments,
  classroomId,
  openAssignmentModal,
}: {
  assignments: Assignment[];
  classroomId: string;
  openAssignmentModal: () => void;
}) => {
  const totalAssignments = assignments.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <h2 className="text-2xl">
          Your Assignments ({totalAssignments} total)
        </h2>
        <Button
          variant={Variant.Primary}
          onClick={openAssignmentModal}
        >
          Create an Assignment
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={['Number', 'Name', 'Due Date', 'Actions']}
          rows={assignments.map((assignment, idx) => [
            assignment.number,
            assignment.name,
            <span
              key={idx}
              className="whitespace-nowrap"
            >
              {DateTime.fromISO(assignment.dueDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </span>,
            (
              <span className="flex gap-4">
                <Link
                  href={`/classrooms/${classroomId}/assignments/${assignment.id}/edit`}
                  className="link flex gap-1 items-center"
                >
                  <PencilSquare /> Edit
                </Link>
              </span>
            ) as ReactNode,
          ])}
        />
      </div>
    </div>
  );
};
