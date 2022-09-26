import React from 'react';
import assignmentsImage from '../../../assets/assignments.svg';
import Image from 'next/image';
import { Button } from '../../common/Button/Button';

export const NoStudents = () => {
  return (
    <div className="flex flex-col gap-8">
      <Image
        width="300"
        height="300"
        src={assignmentsImage}
        alt="no students enrolled"
      />
      <div className="text-2xl text-center">
        You have no students enrolled yet!
      </div>
      <div className="text-center">
        <Button color="primary">Send Email Invite</Button>
      </div>
    </div>
  );
};
