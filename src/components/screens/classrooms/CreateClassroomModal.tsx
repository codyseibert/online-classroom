import { Dialog } from '@headlessui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';
import { Modal, ModalActions, ModalForm } from '../../common/Modal';

type CreateClassroomForm = {
  name: string;
};

export const CreateClassroomModal = ({
  onCancel,
  onComplete,
  isOpen,
}: {
  onCancel: () => void;
  onComplete: () => void;
  isOpen: boolean;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClassroomForm>();

  const createClassroom = trpc.useMutation('classroom.createClassroom');

  const onSubmit = handleSubmit(async (data) => {
    await createClassroom.mutateAsync({ name: data.name });
    reset();
    onComplete();
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      handleCancel={handleCancel}
      title="Create Classroom"
      description="This will permanently deactivate your account"
    >
      <ModalForm onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <div>Name:</div>
            <input
              placeholder="name"
              {...register('name', { required: true })}
            />
          </label>
          {errors.name?.type === 'required' && (
            <div className="text-red-500">Name is required</div>
          )}
        </div>

        <ModalActions>
          <Button
            onClick={handleCancel}
            type="button"
            variant={Variant.Secondary}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={Variant.Primary}
          >
            Create
          </Button>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};
