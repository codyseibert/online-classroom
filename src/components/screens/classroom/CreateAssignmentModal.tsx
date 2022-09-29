import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';
import { FormGroup } from '../../common/Form/FormGroup/FormGroup';
import { Modal, ModalActions, ModalForm } from '../../common/Modal';

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
      description="Enter the information for your new classroom"
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

        <FormGroup
          label="Description"
          error={errors.description && 'Description is required'}
          name="description"
        >
          <input
            id="description"
            {...register('description', { required: true })}
          />
        </FormGroup>

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
      </ModalForm>
    </Modal>
  );
};
