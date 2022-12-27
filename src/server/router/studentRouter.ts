import { isAuthorized } from './assignmentRouter';
import { procedure, router } from './context';

export const studentRouter = router({
  getClassrooms: procedure.use(isAuthorized).query(async ({ ctx }) => {
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
  }),
});
