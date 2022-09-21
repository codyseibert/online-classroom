import Link from 'next/link';
import React from 'react';
import { Card } from 'react-daisyui';
import { Button } from '../../common/Button/Button';

export const ClassroomCard = ({ classroom }) => {
  return (
    <Card className="bg-white">
      <Card.Image
        src="https://api.lorem.space/image/shoes?w=400&h=225"
        alt="Shoes"
      />
      <Card.Body>
        <Card.Title tag="h2">{classroom.name}</Card.Title>
        <p>...</p>
        <Card.Actions className="justify-end">
          <Link href={`/classrooms/${classroom.id}`}>
            <Button color="primary">Manage Classroom</Button>
          </Link>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};
