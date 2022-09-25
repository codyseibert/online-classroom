import Link from 'next/link';
import React from 'react';
import { Card } from 'react-daisyui';
import { Button } from '../../common/Button/Button';

export const EnrolledCard = ({ classroom }) => {
  return (
    <Card className="bg-white">
      <Card.Image
        src="https://api.lorem.space/image/shoes?w=400&h=225"
        alt="Shoes"
      />
      <Card.Body>
        <Card.Title tag="h2">{classroom.name}</Card.Title>
        <p>
          You has <a className="text-blue-400">1 assignment</a> due soon on
          9/28/2022
        </p>
        <Card.Actions className="justify-end">
          <Link href={`/classrooms/${classroom.id}`}>
            <Button color="primary">View</Button>
          </Link>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};
