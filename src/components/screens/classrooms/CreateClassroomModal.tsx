import { Dialog } from '@headlessui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';
import { Button } from '../../common/Button/Button';

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
    console.log('here');
    reset();
    onCancel();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
    >
      <Dialog.Panel>
        <Dialog.Title>Create Classroom</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <form onSubmit={onSubmit}>
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

          <Button
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
          >
            Create
          </Button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};
