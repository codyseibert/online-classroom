import { Assignment } from '@prisma/client';
import React, { FC } from 'react';
import { Card, Button } from 'react-daisyui';
import { TeacherDashboardControllerProps } from '../TeacherDashboard';

type Props = {
  assignment: Assignment;
  controller: TeacherDashboardControllerProps;
};

export const AssignmentCard: FC<Props> = ({ assignment, controller }) => {
  return (
    <Card>
      <Card.Image
        src="https://api.lorem.space/image/shoes?w=400&h=225"
        alt="Shoes"
      />
      <Card.Body className="bg-white">
        <Card.Title tag="h2">{assignment.name}</Card.Title>
        <p>{assignment.description}</p>
        <Card.Actions className="justify-end">
          <Button
            variant="link"
            color="warning"
            className="text-bgDanger"
            onClick={() => controller.actions.deleteAssignment(assignment.id)}
          >
            Remove
          </Button>
          <Button
            variant="link"
            color="primary"
          >
            View
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};
