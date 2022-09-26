import Image from 'next/image';
import assignmentsImage from '../../../assets/assignments.svg';
import { Button } from '../../common/Button/Button';

export const NoAssignments = ({ openAssignmentModal }) => {
  return (
    <div className="flex flex-col gap-8">
      <Image
        width="300"
        height="300"
        src={assignmentsImage}
        alt="no classrooms found"
      />
      <div className="text-2xl text-center">You have no assignments yet!</div>
      <div className="text-center">
        <Button
          onClick={openAssignmentModal}
          color="primary"
        >
          Create An Assignment
        </Button>
      </div>
    </div>
  );
};
