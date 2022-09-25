import { Classroom } from '@prisma/client';
import React from 'react';
import { EnrolledCard } from './EnrolledCard';

export const EnrolledList = ({ classrooms }: { classrooms: Classroom[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {classrooms.map((classroom) => (
          <EnrolledCard
            key={classroom.id}
            classroom={classroom}
          />
        ))}
      </div>
    </div>
  );
};
