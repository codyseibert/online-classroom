import { TRPCError } from '@trpc/server';
import { Roles } from './constants';

export const assertIsStudent = (ctx) => {
  if (ctx.session.user.role !== Roles.Student) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
};
