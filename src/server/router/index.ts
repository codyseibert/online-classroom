import { authRouter } from './auth';
import { classroomRouter } from './classroomRouter';
import { userRouter } from './userRouter';
import { studentRouter } from './studentRouter';
import { assignmentRouter } from './assignmentRouter';
import { submissionRouter } from './submissionRouter';
import { router } from './context';

export const appRouter = router({
  auth: authRouter,
  classroom: classroomRouter,
  user: userRouter,
  student: studentRouter,
  assignment: assignmentRouter,
  submission: submissionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
