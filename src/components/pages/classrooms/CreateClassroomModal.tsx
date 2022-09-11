import React, { useState } from 'react';
import { Modal, Button, Input, Textarea } from 'react-daisyui';
import { useForm } from 'react-hook-form';

export const CreateClassroomModal = ({ onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="font-sans">
      <Modal open={true}>
        <Modal.Header className="font-bold">Create Classroom</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
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
