import { TRPCError } from '@trpc/server';
import { procedure, router } from './context';
import z from 'zod';
import { Roles } from '../utils/constants';
import { isAuthorized } from './assignmentRouter';

export const authRouter = router({
  setRoleAsTeacher: procedure
    .use(isAuthorized)
    .input(z.object({}).nullish())
    .mutation(async ({ ctx }) => {
      if (ctx.session.user.role) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'you can not change your role once it has been set',
        });
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          role: Roles.Teacher,
        },
      });
      return 'role updated';
    }),
  setRoleAsStudent: procedure
    .use(isAuthorized)
    .input(z.object({}).nullish())
    .mutation(async ({ ctx }) => {
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
          role: Roles.Student,
        },
      });
      return 'role updated';
    }),
});
