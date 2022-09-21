import { Classroom } from '@prisma/client';
import React from 'react';
import { Button } from '../../common/Button/Button';
import { ClassroomCard } from './ClassroomCard';

export const ClassroomsList = ({
  classrooms,
  openClassroomModal,
}: {
  classrooms: Classroom[];
  openClassroomModal: any;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button
          onClick={openClassroomModal}
          color="primary"
        >
          Create A Classroom
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {classrooms.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            classroom={classroom}
          />
        ))}
      </div>
    </div>
  );
};
