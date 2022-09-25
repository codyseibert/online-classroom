import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { classroomRouter } from './classroomRouter';
import { userRouter } from './userRouter';
import { studentRouter } from './studentRouter';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('classroom.', classroomRouter)
  .merge('user.', userRouter)
  .merge('student.', studentRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
