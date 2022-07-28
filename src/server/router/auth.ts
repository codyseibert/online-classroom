import { TRPCError } from '@trpc/server';
import { Context, createRouter } from './context';
import z from 'zod';

enum Roles {
  Teacher = 'teacher',
  Student = 'student',
}

const setUserRole = async (ctx: Context, role: Roles) => {
  if (ctx.session?.user?.role) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'you can not change your role once it has been set',
    });
  }

  await ctx.prisma.user.update({
    where: {
      id: ctx.session?.user?.id,
    },
    data: {
      role,
    },
  });

  return 'role updated';
};

export const authRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('setRoleAsTeacher', {
    input: z.object({}).nullish(),
    async resolve({ ctx }) {
      return setUserRole(ctx, Roles.Teacher);
    },
  })
  .mutation('setRoleAsStudent', {
    input: z.object({}).nullish(),
    async resolve({ ctx }) {
      return setUserRole(ctx, Roles.Student);
    },
  });
