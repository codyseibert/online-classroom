import { Dialog } from '@headlessui/react';
import { Classroom } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../common/Button/Button';

type EditClassroomForm = {
  name: string;
  description: string;
};

export const EditClassroomModal = ({
  onCancel,
  onComplete,
  isOpen,
  classroom,
}: {
  onCancel: () => void;
  onComplete: (formData: EditClassroomForm) => void;
  isOpen: boolean;
  classroom: Classroom;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditClassroomForm>({
    defaultValues: classroom,
  });

  const onSubmit = handleSubmit(async (data) => {
    onComplete(data);
    reset();
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
    >
      <Dialog.Panel>
        <Dialog.Title>Edit Classroom</Dialog.Title>
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
