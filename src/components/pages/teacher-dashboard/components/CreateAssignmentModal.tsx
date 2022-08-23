import React, { FC } from 'react';
import { Modal, Button } from 'react-daisyui';
import { TeacherDashboardControllerProps } from '../teacherDashboardController';

type Props = {
  controller: TeacherDashboardControllerProps
}

export const CreateAssignmentModal: FC<Props> = ({ controller }) => {
  const { actions } = controller;

  return (
    <div className="font-sans">
      <Modal
        open={true}>
        <Modal.Header className="font-bold">
          Congratulations random Interner user!
        </Modal.Header>
        <form
          onSubmit={e => {
            e.preventDefault();
            actions.createAssignment();
          }}
        >
          <Modal.Body>
            <div className="flex flex-col">
              <input
                placeholder="name"
                onChange={e => actions.setFormValue({
                  key: 'name',
                  value: e.target.value
                })} />
              <input

                placeholder="description"
                onChange={e => actions.setFormValue({
                  key: 'description',
                  value: e.target.value
                })} />
            </div>
          </Modal.Body>

          <Modal.Actions>
            <Button
              type="button"
              onClick={() => {
                actions.closeCreateAssignmentModal();
              }}>
              Cancel
            </Button>
            <Button
              color='primary'
              type="submit"
            >
              Create
            </Button>
          </Modal.Actions>
        </form>

      </Modal>
    </div >
  );
};
