import { TRPCError } from '@trpc/server';
import { procedure, router } from './context';
import { AWS } from '../../libs/aws';
import z from 'zod';
import { assertIsClassroomAdmin } from '../utils/assertIsClassroomAdmin';
import { isAuthorized } from './assignmentRouter';

export const BUCKET_NAME = 'online-classroom-uploads';

export const getObjectKey = ({ studentId, submissionId }) => {
  return `submissions/${studentId}/${submissionId}`;
};

const s3 = new AWS.S3();

export const submissionRouter = router({
  createPresignedUrl: procedure
    .use(isAuthorized)
    .input(
      z.object({
        assignmentId: z.string(),
        filename: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const studentId = ctx.session.user.id;

      const submission = await ctx.prisma.submission.create({
        data: {
          filename: input.filename,
          studentId,
          assignmentId: input.assignmentId,
        },
      });

      return new Promise((resolve, reject) => {
        s3.createPresignedPost(
          {
            Fields: {
              key: getObjectKey({
                studentId,
                submissionId: submission.id,
              }),
            },
            Conditions: [
              ['starts-with', '$Content-Type', ''],
              ['content-length-range', 0, 1000000],
            ],
            Expires: 30,
            Bucket: BUCKET_NAME,
          },
          (err, signed) => {
            if (err) return reject(err);
            resolve(signed);
          }
        );
      });
    }),
  getSubmission: procedure
    .use(isAuthorized)
    .input(
      z.object({
        assignmentId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const studentId = ctx.session.user.id;

      const submission = await ctx.prisma.submission.findFirst({
        where: {
          assignmentId: input.assignmentId,
          studentId,
        },
      });

      return submission;
    }),
  getSubmissionForClassroom: procedure
    .use(isAuthorized)
    .input(
      z.object({
        classroomId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const classroom = await ctx.prisma.classroom.findUnique({
        where: {
          id: input.classroomId,
        },
        include: {
          assignments: {
            include: {
              submissions: {
                include: {
                  student: true,
                },
              },
            },
          },
        },
      });

      if (!classroom) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      const assignments = classroom.assignments;

      const submissions = assignments.flatMap((assignment) =>
        assignment.submissions.map((submission) => ({
          id: submission.id,
          fileName: submission.filename,
          assignmentName: assignment.name,
          assignmentId: assignment.id,
          assignmentNumber: assignment.number,
          studentId: submission.studentId,
          studentName: submission.student.displayName,
          grade: submission.grade,
        }))
      );

      return submissions;
    }),
  getSubmissionForStudent: procedure
    .use(isAuthorized)
    .input(
      z.object({
        classroomId: z.string(),
        studentId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const submissions = await ctx.prisma.submission.findMany({
        where: {
          studentId: input.studentId,
          assignment: {
            classroomId: input.classroomId,
          },
        },
      });

      return submissions;
    }),
  updateGrade: procedure
    .use(isAuthorized)
    .input(
      z.object({
        submissionId: z.string(),
        grade: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const submission = await ctx.prisma.submission.findUnique({
        where: {
          id: input.submissionId,
        },
        include: {
          assignment: true,
        },
      });

      if (!submission) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      assertIsClassroomAdmin(ctx, submission?.assignment.classroomId);

      console.log(input.grade);

      await ctx.prisma.submission.update({
        where: {
          id: input.submissionId,
        },
        data: {
          grade: input.grade,
        },
      });
    }),
});
