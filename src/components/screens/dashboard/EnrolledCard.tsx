import Link from 'next/link';
import React from 'react';
import { Button, Variant } from '../../common/Button/Button';
import { Card } from '../../common/Card';

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
      <div className="flex justify-end">
        <Link href={`/classrooms/${classroom.id}`}>
          <Button
            variant={Variant.Primary}
            color="primary"
          >
            View
          </Button>
        </Link>
      </div>
    </Card>
  );
};
