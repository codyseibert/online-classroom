/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { Assignment } from '@prisma/client';
import { CreateAssignmentModal } from './components/CreateAssignmentModal';
import { AssignmentCard } from './components/AssignmentCard';
import { trpc } from '../../../utils/trpc';
import { MVCWrapper } from '../../../utils/MVCWrapper';

const model = {
  assignments: [] as Assignment[],
  showCreateAssignmentModal: false,
  submitAttempted: false,
  form: {
    name: '',
    description: '',
  },
  createAssignmentErrors: {
    name: '',
    description: '',
  },
};

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
        assignmentId,
      });
    },
    createAssignment: async (assignmentInfo: {
      name: string;
      description: string;
    }) => {
      return trpcContext.client.mutation('classroom.createAssignment', {
        ...assignmentInfo,
        classroomId,
      });
    },
  };
};

const controller = (
  model: TeacherDashboardModel,
  getContext: TeacherControllerGetContext
) => {
  getContext()
    .getAssignments()
    .then((assignments) => {
      model.assignments = assignments;
    });

  const validateForm = () => {
    let isValid = true;
    model.createAssignmentErrors = {
      name: '',
      description: '',
    };
    if (!model.form.name) {
      model.createAssignmentErrors.name = 'name is required';
      isValid = false;
    }
    if (!model.form.description) {
      model.createAssignmentErrors.description = 'description is required';
      isValid = false;
    }
    return isValid;
  };

  return {
    model,
    actions: {
      openCreateAssignmentModal: () => {
        model.submitAttempted = false;
        model.showCreateAssignmentModal = true;
        model.form = {
          name: '',
          description: '',
        };
        model.createAssignmentErrors = {
          name: '',
          description: '',
        };
      },
      closeCreateAssignmentModal: () => {
        model.showCreateAssignmentModal = false;
      },
      createAssignment: async () => {
        model.submitAttempted = true;
        if (!validateForm()) return;
        const createdAssignment = await getContext().createAssignment(
          model.form
        );
        model.form = {
          name: '',
          description: '',
        };
        model.assignments.push(createdAssignment);
        model.showCreateAssignmentModal = false;
      },
      deleteAssignment: async (assignmentId: string) => {
        await getContext().deleteAssignmentProxy(assignmentId);
        model.assignments = model.assignments.filter(
          (assignment) => assignment.id !== assignmentId
        );
      },
      setCreateAssignmentFormValue: ({
        key,
        value,
      }: {
        key: 'name' | 'description';
        value: string;
      }) => {
        model.form = {
          ...model.form,
          [key]: value,
        };
        if (model.submitAttempted) {
          validateForm();
        }
      },
    },
  };
};

const view = (controller: TeacherDashboardControllerProps) => {
  const { actions, model } = controller;

  return (
    <div className="container mx-auto pt-4 pb-4">
      <button
        className="btn mb-4"
        onClick={actions.openCreateAssignmentModal}
      >
        Create Assignment
      </button>

      <div className="grid grid-cols-4 gap-10">
        {model.assignments?.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            controller={controller}
          />
        ))}
      </div>

      {model.showCreateAssignmentModal && (
        <CreateAssignmentModal
          closeCreateAssignmentModal={actions.closeCreateAssignmentModal}
          createAssignment={actions.createAssignment}
          setFormValue={actions.setCreateAssignmentFormValue}
          errors={model.createAssignmentErrors}
          form={model.form}
        />
      )}
    </div>
  );
};

export const TeacherDashboard = MVCWrapper({
  view,
  controller,
  model,
  getContext,
});
export type TeacherControllerGetContext = typeof getContext;
export type TeacherDashboardModel = typeof model;
export type TeacherDashboardControllerProps = ReturnType<typeof controller>;
export { controller as teacherDashboardController };
