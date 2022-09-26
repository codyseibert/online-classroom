import Image from 'next/image';
import React, { ReactNode } from 'react';
import student from '../../assets/student.jpeg';

export const Card = ({
  children,
  title,
  body,
}: {
  children: ReactNode;
  title: string;
  body: string;
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        className="w-full"
        src={student}
        alt="a student"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{body}</p>
      </div>
      <div className="px-6 pt-4 pb-2">{children}</div>
    </div>
  );
};
