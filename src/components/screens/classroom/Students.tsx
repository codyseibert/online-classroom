import Link from 'next/link';
import { ReactNode } from 'react';
import { EyeIcon } from '../../common/Icons/EyeIcon';
import { Table } from '../../common/Table/Table';
import profileImage from '../../../assets/profile.jpeg';
import Image from 'next/image';

export const Students = ({
  students,
}: {
  students: {
    image: string | null;
    id: string;
    name: string | null;
  }[];
}) => {
  const totalStudents = students.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <h3 className="text-2xl">{totalStudents} Student(s) Enrolled</h3>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={['Name', 'Grade', 'Actions']}
          rows={students.map((student) => [
            // eslint-disable-next-line react/jsx-key
            <div className="flex items-center gap-2">
              <Image
                width="30"
                height="30"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full"
                src={student.image ?? profileImage}
                alt=""
              />{' '}
              {student.name}
            </div>,
            '65% (D)',
            (
              <div className="flex gap-4">
                <Link
                  href={`/students/${student.id}`}
                  className="link flex gap-1 items-center"
                >
                  <EyeIcon /> View
                </Link>
              </div>
            ) as ReactNode,
          ])}
        />
      </div>
    </div>
  );
};
