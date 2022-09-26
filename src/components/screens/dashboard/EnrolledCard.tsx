import Link from 'next/link';
import React from 'react';
import { Button } from '../../common/Button/Button';

export const EnrolledCard = ({ classroom }) => {
  return (
    <Card
      title={classroom.name}
      body={
        <span>
          You has <a className="text-blue-400">1 assignment</a> due soon on
          9/28/2022
        </span>
      }
    >
      <Link href={`/classrooms/${classroom.id}`}>
        <Button color="primary">View</Button>
      </Link>
    </Card>
  );
};
