import { Assignment } from '@prisma/client';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Button, Variant } from '../../common/Button/Button';
import { EyeIcon } from '../../common/Icons/EyeIcon';
import { Table } from '../../common/Table/Table';
import { DateTime } from 'luxon';
import { trpc } from '../../../utils/trpc';
import { useSession } from '../../../libs/useSession';

export const StudentAssignments = ({
  assignments,
  classroomId,
}: {
  assignments: Assignment[];
  classroomId: string;
}) => {
  const totalAssignments = assignments.length;

  const session = useSession();

  const submissionsQuery = trpc.submission.getSubmissionForStudent.useQuery(
    {
      classroomId,
      studentId: session.data?.user.id,
    },
    {
      enabled: !!session.data,
    }
  );

  const getSubmission = (assignmentId: string) => {
    return submissionsQuery.data?.find(
      (submission) => submission.assignmentId === assignmentId
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <h2 className="text-2xl">
          Your Assignments ({totalAssignments} total)
        </h2>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={['Number', 'Grade', 'Name', 'Due Date', 'Actions']}
          rows={assignments.map((assignment, idx) => [
            assignment.number,
            getSubmission(assignment.id)?.grade ?? 'N/A',
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
                  href={`/classrooms/${classroomId}/assignments/${assignment.id}`}
                  className="link flex gap-1 items-center"
                >
                  <EyeIcon /> View
                </Link>
              </span>
            ) as ReactNode,
          ])}
        />
      </div>
    </div>
  );
};
