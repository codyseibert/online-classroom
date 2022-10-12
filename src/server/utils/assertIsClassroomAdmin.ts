import { TRPCError } from '@trpc/server';
import { Context } from '../router/context';

export const assertIsClassroomAdmin = async (
  ctx: Context,
  classroomId: string
) => {
  const classroom = await ctx.prisma.classroom.findUnique({
    where: {
      id: classroomId,
    },
  });

  if (!classroom || ctx.session?.user.id !== classroom.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
};
