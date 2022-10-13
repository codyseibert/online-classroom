import { TRPCError } from '@trpc/server';
import { Roles } from './constants';

export const assertIsTeacher = (ctx) => {
  if (ctx.session.user.role !== Roles.Teacher) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
};
