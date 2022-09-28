import { Classroom } from '@prisma/client';
import React from 'react';
import { ClassroomCard } from './ClassroomCard';

export const ClassroomsList = ({ classrooms }: { classrooms: Classroom[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-3 gap-4">
        {classrooms.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            classroom={classroom}
          />
        ))}
      </ul>
    </div>
  );
};
