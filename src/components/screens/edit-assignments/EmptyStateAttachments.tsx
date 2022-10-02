import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import teacherImage from '../../../assets/teacher.svg';
import { Button, Variant } from '../../common/Button/Button';

export const EmptyStateAttachments = () => {
  return (
    <div className="flex flex-col justify-center gap-8 w-1/3 items-center mx-auto">
      <Image
        width="150"
        height="150"
        src={teacherImage}
        alt="no classrooms found"
      />
      <div className="text-2xl">You have no attachments yet!</div>
    </div>
  );
};
