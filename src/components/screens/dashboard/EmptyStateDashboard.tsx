import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import teacherImage from '../../../assets/teacher.svg';

export const EmptyStateDashboard = () => {
  return (
    <div className="flex flex-col justify-center gap-8 w-1/3 items-center mx-auto">
      <Image
        width="300"
        height="300"
        src={teacherImage}
        alt="no classrooms found"
      />
      <div className="text-2xl">You have no classrooms yet!</div>
      <Link href="/browse-classrooms">
        <a className="btn btn-primary">Browser for Classrooms</a>
      </Link>
    </div>
  );
};
