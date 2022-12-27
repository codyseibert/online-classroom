import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';
import { FormGroup } from '../../common/Form/FormGroup/FormGroup';
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

  const createClassroom = trpc.classroom.createClassroom.useMutation();

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
      title="Create a Class"
      description="Create a class to teach your students."
    >
      <ModalForm onSubmit={onSubmit}>
        <FormGroup
          label="Name"
          error={errors.name && 'Name is required'}
          name="name"
        >
          <input
            id="name"
            {...register('name', { required: true })}
          />
        </FormGroup>

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
