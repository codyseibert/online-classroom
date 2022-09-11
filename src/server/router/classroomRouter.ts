import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import z from 'zod';

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
  // TODO: this should only be allowed user teacher roles
  .mutation('createClassroom', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input, ctx }) {
      const user = ctx.session.user;
      if (!user || !user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      const classroom = await ctx.prisma.classroom.create({
        data: {
          name: input.name,
          userId: user.id,
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
      description: z.string(),
      classroomId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const assignment = await ctx.prisma.assignment.create({
        data: {
          name: input.name,
          description: input.description,
          classroomId: input.classroomId,
        },
      });
      return assignment;
    },
  });
