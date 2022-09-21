import React, { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { CreateClassroomModal } from './CreateClassroomModal';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { EmptyStateClassrooms } from './EmptyStateClassrooms';
import { ClassroomsList } from './ClassroomsList';

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
      <div className="container m-auto flex flex-col gap-4">
        <h1 className="text-4xl mt-8">Your Classrooms</h1>

        <div>
          <EmptyStateWrapper
            isLoading={isLoading}
            showEmptyState={classrooms?.length === 0}
            EmptyComponent={
              <EmptyStateClassrooms openClassroomModal={openClassroomModal} />
            }
            NonEmptyComponent={
              <ClassroomsList
                classrooms={classrooms ?? []}
                openClassroomModal={openClassroomModal}
              />
            }
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
