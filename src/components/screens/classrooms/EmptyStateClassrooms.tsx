import Image from 'next/image';
import React from 'react';
import teacherImage from '../../../assets/teacher.svg';
import { Button } from '../../common/Button/Button';

export const EmptyStateClassrooms = ({ openClassroomModal }) => {
  return (
    <div className="flex flex-col justify-center gap-8">
      <Image
        width="300"
        height="300"
        src={teacherImage}
        alt="no classrooms found"
      />
      <div className="text-2xl">You have no classrooms yet!</div>
      <Button
        onClick={openClassroomModal}
        color="primary"
      >
        Create A Classroom
      </Button>
    </div>
  );
};
