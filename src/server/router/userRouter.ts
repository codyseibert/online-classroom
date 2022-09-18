import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import z from 'zod';

export const userRouter = createRouter()
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
  .query('getUser', {
    async resolve({ ctx }) {
      const userId = ctx.session.user?.id;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          enrolledIn: true,
        },
      });
      return user;
    },
  });
