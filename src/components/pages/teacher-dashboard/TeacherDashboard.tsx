/* eslint-disable react-hooks/rules-of-hooks */
import { MVCWrapper } from 'utils/MVCWrapper';
import { teacherDashboardController, teacherDashboardModel } from './teacherDashboardController';
import { TeacherDashboardView } from './TeacherDasboardView';
import { trpc } from 'utils/trpc';
import { useRouter } from 'next/router';

const getContext = () => {
  const router = useRouter();
  const classroomId: string = router.query.classroomId as string;
  const trpcContext = trpc.useContext();

  return {
    getAssignments: async () => {
      return trpcContext.client.query('classroom.getAssignments', {
        classroomId,
      });
    },
    deleteAssignmentProxy: async (assignmentId: string) => {
      return trpcContext.client.mutation('classroom.deleteAssignment', {
        assignmentId
      });
    },
    createAssignment: async (assignmentInfo: {
      name: string,
      description: string,
    }) => {
      return trpcContext.client.mutation('classroom.createAssignment', {
        ...assignmentInfo,
        classroomId,
      });
    }
  };
};

export const TeacherDashboard = MVCWrapper({
  view: TeacherDashboardView,
  controller: teacherDashboardController,
  model: teacherDashboardModel,
  getContext,
});
export type TeacherControllerGetContext = typeof getContext
