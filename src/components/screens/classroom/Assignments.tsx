import { Assignment } from '@prisma/client';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Button, Variant } from '../../common/Button/Button';
import { EyeIcon } from '../../common/Icons/EyeIcon';
import { PencilSquare } from '../../common/Icons/PencilSquare';
import { Table } from '../../common/Table/Table';
import { DateTime } from 'luxon';

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
        <h2 className="text-2xl">
          Your Assignments ({totalAssignments} total)
        </h2>
        {hasAdminAccess && (
          <Button
            variant={Variant.Primary}
            onClick={openAssignmentModal}
          >
            Create an Assignment
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={['Number', 'Name', 'Description', 'Due Date', 'Actions']}
          rows={assignments.map((assignment) => [
            assignment.number,
            assignment.name,
            assignment.description,
            DateTime.fromISO(assignment.dueDate).toLocaleString(
              DateTime.DATE_MED
            ),
            (
              <div className="flex gap-4">
                <>
                  {hasAdminAccess && (
                    <Link
                      href={`/classrooms/${classroomId}/assignments/${assignment.id}/edit`}
                    >
                      <a className="link flex gap-1 items-center">
                        <PencilSquare /> Edit
                      </a>
                    </Link>
                  )}
                  <Link
                    href={`/classrooms/${classroomId}/assignments/${assignment.id}`}
                  >
                    <a className="link flex gap-1 items-center">
                      <EyeIcon /> View
                    </a>
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
