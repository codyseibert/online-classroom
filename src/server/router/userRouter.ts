import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

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
  .mutation('updateDisplayName', {
    input: z.object({
      displayName: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user?.id;
      const user = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          displayName: input.displayName,
        },
      });
      return user;
    },
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
