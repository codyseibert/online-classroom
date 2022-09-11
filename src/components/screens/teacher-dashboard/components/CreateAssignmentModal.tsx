import React from 'react';
import { Modal, Button, Input, Textarea } from 'react-daisyui';

export const CreateAssignmentModal = ({
  setFormValue,
  errors,
  form,
  createAssignment,
  closeCreateAssignmentModal,
}: {
  setFormValue: ({
    key,
    value,
  }: {
    key: 'name' | 'description';
    value: string;
  }) => void;
  errors: Record<'name' | 'description', string>;
  form: Record<'name' | 'description', string>;
  createAssignment: () => void;
  closeCreateAssignmentModal: () => void;
}) => {
  return (
    <div className="font-sans">
      <Modal open={true}>
        <Modal.Header className="font-bold">
          Create Assignment Modal
        </Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAssignment();
          }}
        >
          <Modal.Body>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <div>Name:</div>
                <Input
                  placeholder="name"
                  value={form.name}
                  onChange={(e) =>
                    setFormValue({
                      key: 'name',
                      value: e.target.value,
                    })
                  }
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name}</div>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <div>Description:</div>
                <Textarea
                  placeholder="description"
                  value={form.description}
                  onChange={(e) =>
                    setFormValue({
                      key: 'description',
                      value: e.target.value,
                    })
                  }
                />
                {errors.description && (
                  <div className="text-red-500">{errors.description}</div>
                )}
              </label>
            </div>
          </Modal.Body>

          <Modal.Actions>
            <Button
              type="button"
              onClick={() => {
                closeCreateAssignmentModal();
              }}
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
