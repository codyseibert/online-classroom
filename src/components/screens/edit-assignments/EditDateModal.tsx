import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';
import { FormGroup } from '../../common/Form/FormGroup/FormGroup';
import { Modal, ModalActions, ModalForm } from '../../common/Modal';
import { DateTime, Duration } from 'luxon';

type EditDateForm = {
  dueDate: string;
};

export const EditDateModal = ({
  onCancel,
  initialDueDate,
  onComplete,
  isOpen,
  assignmentId,
}: {
  initialDueDate: string;
  onCancel: () => void;
  onComplete: () => void;
  isOpen: boolean;
  assignmentId: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditDateForm>();

  useEffect(() => {
    reset({
      dueDate: DateTime.fromISO(initialDueDate).toFormat('yyyy-MM-dd'),
    });
  }, [initialDueDate, reset]);

  const updateDueDate = trpc.useMutation('assignment.updateDueDate');

  const onSubmit = handleSubmit(async (data) => {
    const dur = Duration.fromObject({ day: 1, seconds: -1 }); // TODO: this seems like backend business logic
    await updateDueDate.mutateAsync({
      assignmentId,
      dueDate: DateTime.fromISO(data.dueDate).plus(dur).toISO(),
    });
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
      description="Enter the information for your new assignment."
    >
      <ModalForm onSubmit={onSubmit}>
        <FormGroup
          label="Due Date"
          error={errors.dueDate && 'Due date is required'}
          name="dueDate"
        >
          <input
            type="date"
            id="dueDate"
            {...register('dueDate', { required: true })}
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
            Update
          </Button>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};
