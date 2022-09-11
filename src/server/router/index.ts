import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { classroomRouter } from './classroomRouter';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('classroom.', classroomRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
