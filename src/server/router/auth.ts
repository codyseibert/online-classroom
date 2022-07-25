import { TRPCError } from '@trpc/server';
import { createRouter } from './context';

enum Roles {
  Teacher = 'teacher',
  Student = 'student'
}

export const authRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('setRoleAsTeacher', {
    async resolve({ ctx }) {
      if (ctx.session?.user?.role) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'you can not change your role once it has been set' });
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user?.id
        },
        data: {
          role: Roles.Teacher
        }
      });
      return 'role updated';
    },
  });
