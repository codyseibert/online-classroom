import React from 'react';
import { Modal, Button, Input } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';

type CreateClassroomForm = {
  name: string;
};

export const CreateClassroomModal = ({
  onCancel,
  onComplete,
}: {
  onCancel: () => void;
  onComplete: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClassroomForm>();

  const createClassroom = trpc.useMutation('classroom.createClassroom');

  const onSubmit = handleSubmit(async (data) => {
    await createClassroom.mutateAsync({ name: data.name });
    onComplete();
  });

  return (
    <div className="font-sans">
      <Modal open={true}>
        <Modal.Header className="font-bold">Create Classroom</Modal.Header>
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
              {/* <label className="flex flex-col gap-2">
                <div>Description:</div>
                <Textarea
                  {...register('description', { required: true })}
                  placeholder="description"
                />
                {errors.description?.type === 'required' && (
                  <div className="text-red-500">Description is required</div>
                )}
              </label> */}
            </div>
          </Modal.Body>

          <Modal.Actions>
            <Button
              onClick={onCancel}
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
    </div>
  );
};
