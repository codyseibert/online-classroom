import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { AWS } from '../../libs/aws';
import z from 'zod';

export const BUCKET_NAME = 'online-classroom-uploads';

export const getObjectKey = ({ studentId, submissionId }) => {
  return `submissions/${studentId}/${submissionId}`;
};

const s3 = new AWS.S3();

export const submissionRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    });
  })
  .mutation('createPresignedUrl', {
    input: z.object({
      assignmentId: z.string(),
      filename: z.string(),
    }),
    async resolve({ ctx, input }) {
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
    },
  })
  .query('getSubmission', {
    input: z.object({
      assignmentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const studentId = ctx.session.user.id;

      const submission = await ctx.prisma.submission.findFirst({
        where: {
          assignmentId: input.assignmentId,
          studentId,
        },
      });

      return submission;
    },
  });
