import Image from 'next/image';
import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { trpc } from '../../../utils/trpc';
import teacherImage from '../../../assets/teacher.svg';
import { Button } from 'react-daisyui';
import { CreateClassroomModal } from './CreateClassroomModal';

export const ClassroomScreen = () => {
  const { data: classrooms, isLoading } = trpc.useQuery([
    'classroom.getClassroomsForTeacher',
  ]);

  const showEmptyState = !isLoading && classrooms && classrooms.length === 0;
  const showClassrooms = !isLoading && classrooms && classrooms.length > 0;
  const [showCreateClassroomModal, setShowCreateClassroomModal] =
    useState(false);

  return (
    <div>
      <h1 className="container m-auto text-4xl mt-8">Your Classrooms</h1>

      <div className="flex justify-center">
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}
        {showEmptyState && (
          <div className="flex flex-col justify-center gap-8">
            <Image
              width="300"
              height="300"
              src={teacherImage}
              alt="no classrooms found"
            />
            <div className="text-2xl">You have no classrooms yet!</div>
            <Button
              onClick={() => setShowCreateClassroomModal(true)}
              color="primary"
            >
              Create A Classroom
            </Button>
          </div>
        )}
        {showClassrooms && (
          <div>
            {classrooms?.map((classroom) => (
              <>{classroom.name}</>
            ))}
          </div>
        )}
      </div>

      {showCreateClassroomModal && (
        <CreateClassroomModal
          onCancel={() => setShowCreateClassroomModal(false)}
        />
      )}
    </div>
  );
};
