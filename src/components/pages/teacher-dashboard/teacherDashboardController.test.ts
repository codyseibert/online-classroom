import { Assignment } from '@prisma/client';
import {
  TeacherControllerGetContext,
  teacherDashboardController,
  TeacherDashboardModel,
} from './TeacherDashboard';

describe('teacherDashboardController', () => {
  let mockAssignments: Assignment[];
  let mockCreatedAssignment: Assignment;
  let mockContext: ReturnType<TeacherControllerGetContext>;
  let getContext: TeacherControllerGetContext;

  beforeEach(() => {
    mockAssignments = [
      {
        id: 'abc',
        name: 'basic math sheet',
        description: 'do stuff',
        classroomId: '10',
      },
    ];

    mockCreatedAssignment = {
      id: 'gg',
      name: 'hello',
      description: 'math',
      classroomId: '20',
    };

    mockContext = {
      createAssignment: jest.fn().mockResolvedValue(mockCreatedAssignment),
      getAssignments: jest.fn().mockImplementation(async () => mockAssignments),
      deleteAssignmentProxy: jest.fn(),
    };

    getContext = () => mockContext;
  });

  describe('initialize', () => {
    it('should fetch assignments and store them in model', async () => {
      const controller = teacherDashboardController(
        {} as TeacherDashboardModel,
        getContext
      );
      await new Promise((resolve) => setTimeout(resolve));
      expect(controller.model.assignments).toEqual(mockAssignments);
    });
  });

  describe('actions.openCreateAssignmentModal', () => {
    it('should display a create assignment modal', async () => {
      const controller = teacherDashboardController(
        {} as TeacherDashboardModel,
        getContext
      );
      controller.actions.openCreateAssignmentModal();
      expect(controller.model.showCreateAssignmentModal).toBeTruthy();
    });

    it('should reset the form and error state when opening the modal', async () => {
      const controller = teacherDashboardController(
        {
          form: {
            name: 'bob',
            description: '',
          },
          createAssignmentErrors: {
            name: '',
            description: 'description is required',
          },
        } as TeacherDashboardModel,
        getContext
      );
      controller.actions.openCreateAssignmentModal();
      expect(controller.model.form.name).toEqual('');
      expect(controller.model.form.description).toEqual('');
      expect(controller.model.createAssignmentErrors.name).toEqual('');
      expect(controller.model.createAssignmentErrors.description).toEqual('');
    });

    it('should set the submitAttempted to false when opening the modal', async () => {
      const controller = teacherDashboardController(
        {
          submitAttempted: true,
          form: {
            name: 'bob',
            description: '',
          },
          createAssignmentErrors: {
            name: '',
            description: 'description is required',
          },
        } as TeacherDashboardModel,
        getContext
      );
      controller.actions.openCreateAssignmentModal();
      expect(controller.model.submitAttempted).toBeFalsy();
    });
  });

  describe('actions.closeCreateAssignmentModal', () => {
    it('should set the showCreateAssignmentModal when invoked', async () => {
      const controller = teacherDashboardController(
        {} as TeacherDashboardModel,
        getContext
      );
      controller.actions.closeCreateAssignmentModal();
      expect(controller.model.showCreateAssignmentModal).toBeFalsy();
    });
  });

  describe('actions.deleteAssignment', () => {
    it('should invoke the deleteAssignment from context', async () => {
      const controller = teacherDashboardController(
        { form: {} } as TeacherDashboardModel,
        getContext
      );
      await controller.actions.deleteAssignment('abc');
      expect(mockContext.deleteAssignmentProxy).toHaveBeenCalledWith('abc');
      expect(controller.model.assignments).not.toContain(mockAssignments[0]);
    });
  });

  describe('actions.setFormValue', () => {
    it('should update the form with the proper key values', () => {
      const controller = teacherDashboardController(
        { form: {} } as TeacherDashboardModel,
        getContext
      );
      controller.actions.setCreateAssignmentFormValue({
        key: 'name',
        value: 'english assignment',
      });
      controller.actions.setCreateAssignmentFormValue({
        key: 'description',
        value: 'do some more english plz',
      });
      expect(controller.model.form).toMatchObject({
        name: 'english assignment',
        description: 'do some more english plz',
      });
    });

    it('should not show validation until the form was submitted for the first time', async () => {
      const controller = teacherDashboardController(
        {
          submitAttempted: false,
          form: {
            name: '',
            description: '',
          },
          createAssignmentErrors: {
            name: '',
            description: '',
          },
        } as TeacherDashboardModel,
        getContext
      );
      controller.actions.setCreateAssignmentFormValue({
        key: 'name',
        value: 'hello world',
      });
      expect(controller.model.createAssignmentErrors.description).toBeFalsy();
    });

    it('should validate the form when input changes', async () => {
      const controller = teacherDashboardController(
        {
          submitAttempted: true,
          form: {
            name: '',
            description: 'what is up',
          },
          createAssignmentErrors: {
            name: 'name is required',
            description: '',
          },
        } as TeacherDashboardModel,
        getContext
      );
      controller.actions.setCreateAssignmentFormValue({
        key: 'name',
        value: 'english assignment',
      });
      expect(controller.model.createAssignmentErrors.name).toBeFalsy();
    });
  });

  describe('actions.createAssignment', () => {
    it('should mark the form as submitAttempted true', async () => {
      const controller = teacherDashboardController(
        {
          form: {},
          createAssignmentErrors: {},
          submitAttempted: false,
        } as TeacherDashboardModel,
        getContext
      );
      await controller.actions.createAssignment();
      expect(controller.model.submitAttempted).toBeTruthy();
    });

    it('should set a validation error on the model if description is undefined', async () => {
      const controller = teacherDashboardController(
        { form: {}, createAssignmentErrors: {} } as TeacherDashboardModel,
        getContext
      );
      await controller.actions.createAssignment();
      expect(controller.model.createAssignmentErrors).toEqual({
        name: 'name is required',
        description: 'description is required',
      });
    });

    it('should not try to create the assignment if there are form errors', async () => {
      const controller = teacherDashboardController(
        { form: {}, createAssignmentErrors: {} } as TeacherDashboardModel,
        getContext
      );
      await controller.actions.createAssignment();
      expect(mockContext.createAssignment).not.toHaveBeenCalled();
    });

    it('should clear the modal inputs after creating the assignment', async () => {
      const controller = teacherDashboardController(
        {
          form: {
            name: 'math',
            description: 'multiplication',
          },
        } as TeacherDashboardModel,
        getContext
      );
      await controller.actions.createAssignment();
      expect(controller.model.form).toMatchObject({
        name: '',
        description: '',
      });
    });

    it('should persist the assignment info typed into the modal to the api and append it to the assignments', async () => {
      const controller = teacherDashboardController(
        {
          assignments: [] as Assignment[],
          form: {
            name: 'math',
            description: 'fun',
          },
        } as TeacherDashboardModel,
        getContext
      );
      await controller.actions.createAssignment();
      expect(mockContext.createAssignment).toHaveBeenCalledWith({
        name: 'math',
        description: 'fun',
      });
      expect(controller.model.assignments.length).toBe(2);
      expect(controller.model.assignments).toContain(mockCreatedAssignment);
    });

    it('should close the modal', async () => {
      const controller = teacherDashboardController(
        {
          assignments: [] as Assignment[],
          showCreateAssignmentModal: true,
          form: {
            name: 'math',
            description: 'fun',
          },
        } as TeacherDashboardModel,
        getContext
      );
      await controller.actions.createAssignment();
      expect(controller.model.showCreateAssignmentModal).toBeFalsy();
    });
  });
});
