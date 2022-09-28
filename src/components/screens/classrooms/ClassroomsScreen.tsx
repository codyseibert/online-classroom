import React, { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { CreateClassroomModal } from './CreateClassroomModal';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { EmptyStateClassrooms } from './EmptyStateClassrooms';
import { ClassroomsList } from './ClassroomsList';
import { Button, Variant } from '../../common/Button/Button';

export const ClassroomsScreen = () => {
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

  return (
    <>
      <div className="container m-auto flex flex-col gap-8">
        <section className="flex gap-8 items-end">
          <h1 className="text-4xl mt-8">Your Classrooms</h1>

          <Button
            variant={Variant.Primary}
            onClick={openClassroomModal}
          >
            Create a Class
          </Button>
        </section>

        <div>
          <EmptyStateWrapper
            isLoading={isLoading}
            data={classrooms}
            EmptyComponent={
              <EmptyStateClassrooms openClassroomModal={openClassroomModal} />
            }
            NonEmptyComponent={<ClassroomsList classrooms={classrooms ?? []} />}
          />
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
