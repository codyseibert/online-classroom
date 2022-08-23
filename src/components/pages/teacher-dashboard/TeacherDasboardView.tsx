import React, { FC } from 'react';
import { AssignmentCard } from './components/AssignmentCard';
import { CreateAssignmentModal } from './components/CreateAssignmentModal';
import { TeacherDashboardControllerProps } from './teacherDashboardController';

export const TeacherDashboardView: FC<TeacherDashboardControllerProps> = (controller) => {
  const { actions, model } = controller;

  return (
    <div className='container mx-auto pt-4 pb-4'>
      <button
        className="btn mb-4"
        onClick={actions.openCreateAssignmentModal}>
        Create Assignment
      </button>

      <div className="grid grid-cols-4 gap-10">
        {model.assignments?.map(assignment => <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          controller={controller}
        />)}
      </div>

      {model.showCreateAssignmentModal && <CreateAssignmentModal
        controller={controller}
      />}
    </div>
  );
};