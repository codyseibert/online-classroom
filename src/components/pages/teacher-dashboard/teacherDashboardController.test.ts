import { Assignment } from '@prisma/client';
import { TeacherControllerGetContext } from './TeacherDashboard';
import { teacherDashboardController, TeacherDashboardModel } from './teacherDashboardController';

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
        classroomId: '10'
      }
    ];

    mockCreatedAssignment = {
      id: 'gg',
      name: 'hello',
      description: 'math',
      classroomId: '20',
    };

    mockContext = {
      getAssignments: jest.fn()
        .mockImplementation(async () => mockAssignments),
      createAssignment: jest.fn().mockResolvedValue(mockCreatedAssignment),
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
      await new Promise(resolve => setTimeout(resolve));
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
      expect(controller.model.assignments).not
        .toContain(mockAssignments[0]);
    });
  });

  describe('actions.setFormValue', () => {
    it('should update the form with the proper key values', () => {
      const controller = teacherDashboardController(
        { form: {} } as TeacherDashboardModel,
        getContext
      );
      controller.actions.setFormValue({
        key: 'name',
        value: 'english assignment'
      });
      controller.actions.setFormValue({
        key: 'description',
        value: 'do some more english plz'
      });
      expect(controller.model.form).toMatchObject({
        name: 'english assignment',
        description: 'do some more english plz',
      });
    });
  });

  describe('actions.createAssignment', () => {
    it('should clear our the modal inputs', async () => {
      const controller = teacherDashboardController(
        { form: {} } as TeacherDashboardModel,
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
            description: 'fun'
          }
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
            description: 'fun'
          }
        } as TeacherDashboardModel,
        getContext
      );
      await controller.actions.createAssignment();
      expect(controller.model.showCreateAssignmentModal).toBeFalsy();
    });
  });

});