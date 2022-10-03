import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { AWS } from '../../libs/aws';
import z from 'zod';

export const BUCKET_NAME = 'online-classroom-uploads';

export const getObjectKey = ({ assignmentId, attachmentId }) => {
  return `assignments/${assignmentId}/${attachmentId}`;
};

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
  .mutation('updateDescription', {
    input: z.object({
      description: z.string(),
      assignmentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.assignment.update({
        where: {
          id: input.assignmentId,
        },
        data: {
          description: input.description,
        },
      });
    },
  })
  .mutation('getDownloadUrl', {
    input: z.object({
      attachmentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const attachment = await ctx.prisma.attachment.findUnique({
        where: {
          id: input.attachmentId,
        },
      });

      const downloadUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: BUCKET_NAME,
        Key: getObjectKey({
          assignmentId: attachment?.assignmentId,
          attachmentId: attachment?.id,
        }),
      });

      return downloadUrl;
    },
  })
  .mutation('deleteAssignment', {
    input: z.object({
      assignmentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.assignment.delete({
        where: {
          id: input.assignmentId,
        },
      });
    },
  })
  .mutation('deleteAttachment', {
    input: z.object({
      attachmentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.attachment.delete({
        where: {
          id: input.attachmentId,
        },
      });
    },
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
              key: getObjectKey({
                assignmentId: input.assignmentId,
                attachmentId: attachment.id,
              }),
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
