import { Assignment } from '@prisma/client';
import { TeacherControllerGetContext } from './TeacherDashboard';

export enum Themes {
  Dark = 'dark',
  Light = 'light'
}

export const teacherDashboardModel = {
  assignments: [] as Assignment[],
  showCreateAssignmentModal: false,
  form: {
    name: '',
    description: '',
  }
};

type CreateAssignmentFormKey = 'name' | 'description';

export type TeacherDashboardModel = typeof teacherDashboardModel

export const teacherDashboardController = (
  model: TeacherDashboardModel,
  getContext: TeacherControllerGetContext
) => {

  getContext().getAssignments().then(assignments => {
    model.assignments = assignments;
  });

  return {
    model,
    actions: {
      openCreateAssignmentModal: () => {
        model.showCreateAssignmentModal = true;
      },
      closeCreateAssignmentModal: () => {
        model.showCreateAssignmentModal = false;
      },
      createAssignment: async () => {
        const createdAssignment = await getContext().createAssignment(model.form);
        model.form = {
          name: '',
          description: ''
        };
        model.assignments.push(createdAssignment);
        model.showCreateAssignmentModal = false;
      },
      deleteAssignment: async (assignmentId: string) => {
        await getContext().deleteAssignmentProxy(assignmentId);
        model.assignments = model.assignments
          .filter(assignment => assignment.id !== assignmentId);
      },
      setFormValue: ({ key, value }:
        { key: CreateAssignmentFormKey, value: string }) => {
        model.form[key] = value;
      }
    },
  };
};

export type TeacherDashboardControllerProps = ReturnType<typeof teacherDashboardController>