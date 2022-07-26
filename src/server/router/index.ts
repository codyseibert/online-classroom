import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { classroomRouter } from './classroomRouter';
import { userRouter } from './userRouter';
import { studentRouter } from './studentRouter';
import { assignmentRouter } from './assignmentRouter';
import { submissionRouter } from './submissionRouter';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('classroom.', classroomRouter)
  .merge('user.', userRouter)
  .merge('student.', studentRouter)
  .merge('assignment.', assignmentRouter)
  .merge('submission.', submissionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
