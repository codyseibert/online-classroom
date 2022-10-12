import { TRPCError } from '@trpc/server';
import { Context } from '../router/context';

export const assertIsAssignmentAdmin = async (
  ctx: Context,
  assignmentId: string
) => {
  const assignment = await ctx.prisma.assignment.findUnique({
    where: {
      id: assignmentId,
    },
    include: {
      classroom: true,
    },
  });

  if (!assignment || ctx.session?.user.id !== assignment.classroom.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
};
