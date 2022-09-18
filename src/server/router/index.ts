import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { classroomRouter } from './classroomRouter';
import { userRouter } from './userRouter';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('classroom.', classroomRouter)
  .merge('user.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
