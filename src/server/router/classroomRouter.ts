import z from 'zod';
import { assertIsStudent } from '../utils/assertIsStudent';
import { assertIsClassroomAdmin } from '../utils/assertIsClassroomAdmin';
import { assertIsAssignmentAdmin } from '../utils/assertIsAssignmentAdmin';
import { assertIsTeacher } from '../utils/assertIsTeacher';
import { procedure, router } from './context';
import { isAuthorized } from './assignmentRouter';

export const classroomRouter = router({
  getStudents: procedure
    .use(isAuthorized)
    .input(
      z.object({
        classroomId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const classroom = await ctx.prisma.classroom.findUnique({
        where: {
          id: input.classroomId,
        },
        include: {
          students: true,
        },
      });
      return classroom?.students.map((student) => ({
        ...student,
        email: '',
      }));
    }),
  getClassroomsForTeacher: procedure
    .use(isAuthorized)
    .query(async ({ ctx }) => {
      const classrooms = await ctx.prisma.classroom.findMany({
        where: {
          userId: ctx.session.user?.id,
        },
      });
      return classrooms;
    }),
  getAssignments: procedure
    .use(isAuthorized)
    .input(
      z.object({
        classroomId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const assignments = await ctx.prisma.assignment.findMany({
        where: {
          classroomId: input.classroomId,
        },
      });
      return assignments;
    }),
  getAssignment: procedure
    .use(isAuthorized)
    .input(
      z.object({
        assignmentId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const assignment = await ctx.prisma.assignment.findUnique({
        where: {
          id: input.assignmentId,
        },
      });
      return assignment;
    }),
  getClassroom: procedure
    .use(isAuthorized)
    .input(
      z.object({
        classroomId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const classroom = await ctx.prisma.classroom.findUnique({
        where: {
          id: input.classroomId,
        },
      });
      return classroom;
    }),
  findClassroom: procedure
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish()
    )
    .query(async ({ input, ctx }) => {
      type TWhere = {
        name?: string;
      };
      const where: TWhere = {};
      if (input?.name) {
        where.name = input.name;
      }
      const classrooms = await ctx.prisma.classroom.findMany({
        where,
        include: {
          teacher: true,
        },
      });
      return classrooms;
    }),
  createClassroom: procedure
    .use(isAuthorized)
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      assertIsTeacher(ctx);

      const classroom = await ctx.prisma.classroom.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });

      return classroom;
    }),
  deleteAssignment: procedure
    .use(isAuthorized)
    .input(
      z.object({
        assignmentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      assertIsAssignmentAdmin(ctx, input.assignmentId);

      await ctx.prisma.assignment.delete({
        where: {
          id: input.assignmentId,
        },
      });
    }),
  createAssignment: procedure
    .use(isAuthorized)
    .input(
      z.object({
        name: z.string(),
        dueDate: z.string(),
        classroomId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      assertIsClassroomAdmin(ctx, input.classroomId);

      const assignment = await ctx.prisma.assignment.create({
        data: {
          name: input.name,
          dueDate: input.dueDate,
          description: 'This is a default assignment template',
          classroomId: input.classroomId,
        },
      });
      return assignment;
    }),
  editClassroom: procedure
    .use(isAuthorized)
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        classroomId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      assertIsClassroomAdmin(ctx, input.classroomId);

      const updatedClassroom = await ctx.prisma.classroom.update({
        where: {
          id: input.classroomId,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      });

      return updatedClassroom;
    }),
  enrollInClassroom: procedure
    .use(isAuthorized)
    .input(
      z.object({
        classroomId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user?.id;

      assertIsStudent(ctx);

      const classroom = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          enrolledIn: {
            connect: {
              id: input.classroomId,
            },
          },
        },
      });
      return classroom;
    }),
  unenroll: procedure
    .use(isAuthorized)
    .input(
      z.object({
        classroomId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user?.id;

      assertIsStudent(ctx);

      const classroom = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          enrolledIn: {
            disconnect: {
              id: input.classroomId,
            },
          },
        },
      });
      return classroom;
    }),
});
