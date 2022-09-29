import React, { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { CreateClassroomModal } from './CreateClassroomModal';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { EmptyStateClassrooms } from './EmptyStateClassrooms';
import { ClassroomsList } from './ClassroomsList';
import { Button, Variant } from '../../common/Button/Button';
import { MainHeading } from '../../common/MainHeading';

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
      <MainHeading title={'My Classrooms'}>
        <Button
          variant={Variant.Primary}
          onClick={openClassroomModal}
        >
          Create a Class
        </Button>
      </MainHeading>

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

      <CreateClassroomModal
        onCancel={closeClassroomModal}
        onComplete={handleClassroomModalComplete}
        isOpen={showCreateClassroomModal}
      />
    </>
  );
};
