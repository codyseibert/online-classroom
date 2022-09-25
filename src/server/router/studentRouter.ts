import { TRPCError } from '@trpc/server';
import { createRouter } from './context';

export const studentRouter = createRouter()
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
  .query('getClassrooms', {
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
      return user?.enrolledIn;
    },
  });
