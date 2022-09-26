import { Classroom } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Variant } from '../../common/Button/Button';
import { Modal, ModalActions } from '../../common/Modal';

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
    <Modal
      title="Edit Classroom"
      description="Type in the information needed for your classroom"
      isOpen={isOpen}
      handleCancel={handleCancel}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <div>Name</div>
            <input
              placeholder="name"
              {...register('name', { required: true })}
            />
          </label>
          {errors.name?.type === 'required' && (
            <div className="text-red-500">Name is required</div>
          )}

          <label className="flex flex-col gap-2">
            <div>Description</div>
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
            variant={Variant.Primary}
            type="submit"
          >
            Save
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
