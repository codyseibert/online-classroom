import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import z from 'zod';
import { assertIsStudent } from '../utils/assertIsStudent';
import { assertIsClassroomAdmin } from '../utils/assertIsClassroomAdmin';
import { assertIsAssignmentAdmin } from '../utils/assertIsAssignmentAdmin';
import { assertIsTeacher } from '../utils/assertIsTeacher';

export const classroomRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    });
  })
  .query('getStudents', {
    input: z.object({
      classroomId: z.string(),
    }),
    async resolve({ input, ctx }) {
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
    },
  })
  .query('getClassroomsForTeacher', {
    async resolve({ ctx }) {
      const classrooms = await ctx.prisma.classroom.findMany({
        where: {
          userId: ctx.session.user?.id,
        },
      });
      return classrooms;
    },
  })
  .query('getAssignments', {
    input: z.object({
      classroomId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const assignments = await ctx.prisma.assignment.findMany({
        where: {
          classroomId: input.classroomId,
        },
      });
      return assignments;
    },
  })
  .query('getAssignment', {
    input: z.object({
      assignmentId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const assignment = await ctx.prisma.assignment.findUnique({
        where: {
          id: input.assignmentId,
        },
      });
      return assignment;
    },
  })
  .query('getClassroom', {
    input: z.object({
      classroomId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const classroom = await ctx.prisma.classroom.findUnique({
        where: {
          id: input.classroomId,
        },
      });
      return classroom;
    },
  })
  .query('findClassroom', {
    input: z
      .object({
        name: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
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
    },
  })
  .mutation('createClassroom', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input, ctx }) {
      assertIsTeacher(ctx);

      const classroom = await ctx.prisma.classroom.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });

      return classroom;
    },
  })
  .mutation('deleteAssignment', {
    input: z.object({
      assignmentId: z.string(),
    }),
    async resolve({ input, ctx }) {
      assertIsAssignmentAdmin(ctx, input.assignmentId);

      await ctx.prisma.assignment.delete({
        where: {
          id: input.assignmentId,
        },
      });
    },
  })
  .mutation('createAssignment', {
    input: z.object({
      name: z.string(),
      dueDate: z.string(),
      classroomId: z.string(),
    }),
    async resolve({ input, ctx }) {
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
    },
  })
  .mutation('editClassroom', {
    input: z.object({
      name: z.string(),
      description: z.string(),
      classroomId: z.string(),
    }),
    async resolve({ input, ctx }) {
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
    },
  })
  .mutation('enrollInClassroom', {
    input: z.object({
      classroomId: z.string(),
    }),
    async resolve({ input, ctx }) {
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
    },
  })
  .mutation('unenroll', {
    input: z.object({
      classroomId: z.string(),
    }),
    async resolve({ input, ctx }) {
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
    },
  });
