import { User } from '@prisma/client';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Table } from '../../common/Table/Table';

export const Students = ({ students }: { students: User[] }) => {
  const totalStudents = students.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <h3 className="text-2xl">{totalStudents} Student(s) Enrolled</h3>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={['Student Number', 'Name', 'Grade', 'Actions']}
          rows={students.map((student, idx) => [
            idx + 1,
            student.name,
            '65% (D)',
            (
              <div className="flex gap-4">
                <Link href={`/students/${student.id}`}>
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
