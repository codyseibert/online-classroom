import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';
import { Modal, ModalActions } from '../../common/Modal';

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
    <Modal
      isOpen={isOpen}
      handleCancel={handleCancel}
      title="Create Assignment"
      description="enter the information for your new classroom"
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
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

        <ModalActions>
          <Button
            variant={Variant.Secondary}
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            variant={Variant.Primary}
            type="submit"
          >
            Create
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
