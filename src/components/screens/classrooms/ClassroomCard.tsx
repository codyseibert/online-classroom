import Link from 'next/link';
import React from 'react';
import { Button } from '../../common/Button/Button';
import { Card } from '../../common/Card';

export const ClassroomCard = ({ classroom }) => {
  return (
    <Card
      title={classroom.name}
      body="ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
      nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."
    >
      <Link href={`/classrooms/${classroom.id}`}>
        <Button color="primary">Manage Classroom</Button>
      </Link>
    </Card>
  );
};
