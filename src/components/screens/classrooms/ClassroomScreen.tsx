import Image from 'next/image';
import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { trpc } from '../../../utils/trpc';
import teacherImage from '../../../assets/teacher.svg';
import { Button, Card } from 'react-daisyui';
import { CreateClassroomModal } from './CreateClassroomModal';

const NoClassroomsComponent = ({ openClassroomModal }) => {
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

const ClassroomCard = ({ classroom }) => {
  return (
    <Card className="bg-white">
      <Card.Image
        src="https://api.lorem.space/image/shoes?w=400&h=225"
        alt="Shoes"
      />
      <Card.Body>
        <Card.Title tag="h2">{classroom.name}</Card.Title>
        <p>...</p>
        <Card.Actions className="justify-end">
          <Button color="primary">Manage Classroom</Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};

const ClassroomsView = ({ openClassroomModal, classrooms }) => {
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
        {classrooms?.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            classroom={classroom}
          />
        ))}
      </div>
    </div>
  );
};

export const ClassroomScreen = () => {
  const [showCreateClassroomModal, setShowCreateClassroomModal] =
    useState(false);

  const {
    data: classrooms,
    isLoading,
    refetch: refetchClassrooms,
  } = trpc.useQuery(['classroom.getClassroomsForTeacher']);

  const closeClassroomModal = () => {
    setShowCreateClassroomModal(false);
  };

  const openClassroomModal = () => {
    setShowCreateClassroomModal(true);
  };

  const handleClassroomModalComplete = () => {
    refetchClassrooms();
    closeClassroomModal();
  };

  const showEmptyState = !isLoading && classrooms && classrooms.length === 0;
  const showClassrooms = !isLoading && classrooms && classrooms.length > 0;

  return (
    <>
      <div className="container m-auto flex flex-col gap-4">
        <h1 className="text-4xl mt-8">Your Classrooms</h1>

        <div>
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
            <NoClassroomsComponent openClassroomModal={openClassroomModal} />
          )}
          {showClassrooms && (
            <ClassroomsView
              classrooms={classrooms}
              openClassroomModal={openClassroomModal}
            />
          )}
        </div>
      </div>

      <CreateClassroomModal
        onCancel={closeClassroomModal}
        onComplete={handleClassroomModalComplete}
        isOpen={showCreateClassroomModal}
      />
    </>
  );
};
