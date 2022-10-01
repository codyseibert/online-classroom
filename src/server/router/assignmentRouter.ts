import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { AWS } from '../../libs/aws';
import z from 'zod';

const s3 = new AWS.S3();
export const assignmentRouter = createRouter()
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
      const attachment = await ctx.prisma.attachment.create({
        data: {
          filename: input.filename,
          assignmentId: input.assignmentId,
        },
      });

      return new Promise((resolve, reject) => {
        s3.createPresignedPost(
          {
            Fields: {
              key: `assignments/${input.assignmentId}/${attachment.id}`,
            },
            Conditions: [
              ['starts-with', '$Content-Type', ''],
              ['content-length-range', 0, 1000000],
            ],
            Expires: 30,
            Bucket: 'online-classroom-uploads',
          },
          (err, signed) => {
            if (err) return reject(err);
            resolve(signed);
          }
        );
      });
    },
  })
  .query('getAttachments', {
    input: z.object({
      assignmentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const assignment = await ctx.prisma.assignment.findUnique({
        where: {
          id: input.assignmentId,
        },
        include: {
          attachments: true,
        },
      });

      return assignment?.attachments;
    },
  });
