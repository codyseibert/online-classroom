import { z } from 'zod';
import { isAuthorized } from './assignmentRouter';
import { router, procedure } from './context';

export const userRouter = router({
  updateDisplayName: procedure
    .use(isAuthorized)
    .input(
      z.object({
        displayName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
    }),
  getUser: procedure.use(isAuthorized).query(async ({ ctx }) => {
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
  }),
});
