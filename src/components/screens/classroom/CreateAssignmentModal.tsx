import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';
import { Dialog } from '@headlessui/react';
import { Button } from '../../common/Button/Button';

type CreateAssignmentForm = {
  name: string;
  description: string;
};

export const CreateAssignmentModal = ({
  onCancel,
  onComplete,
  isOpen,
  classroomId,
}: {
  onCancel: () => void;
  onComplete: () => void;
  isOpen: boolean;
  classroomId: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAssignmentForm>();

  const createAssignment = trpc.useMutation('classroom.createAssignment');

  const onSubmit = handleSubmit(async (data) => {
    await createAssignment.mutateAsync({
      name: data.name,
      classroomId,
      description: data.description,
    });
    reset();
    onComplete();
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
    >
      <Dialog.Panel>
        <Dialog.Title>Create Assignment</Dialog.Title>
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
            <label className="flex flex-col gap-2">
              <div>Description:</div>
              <textarea
                {...register('description', { required: true })}
                placeholder="description"
              />
              {errors.description?.type === 'required' && (
                <div className="text-red-500">Description is required</div>
              )}
            </label>
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
