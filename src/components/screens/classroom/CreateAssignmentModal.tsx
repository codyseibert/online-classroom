import React, { useRef } from 'react';
import { Modal, Button, Input, Textarea } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';

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
      open={isOpen}
      onClickBackdrop={handleCancel}
    >
      <Modal.Header className="font-bold">Create Assignment</Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <div>Name:</div>
              <Input
                placeholder="name"
                {...register('name', { required: true })}
              />
            </label>
            {errors.name?.type === 'required' && (
              <div className="text-red-500">Name is required</div>
            )}
            <label className="flex flex-col gap-2">
              <div>Description:</div>
              <Textarea
                {...register('description', { required: true })}
                placeholder="description"
              />
              {errors.description?.type === 'required' && (
                <div className="text-red-500">Description is required</div>
              )}
            </label>
          </div>
        </Modal.Body>

        <Modal.Actions>
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
        </Modal.Actions>
      </form>
    </Modal>
  );
};
