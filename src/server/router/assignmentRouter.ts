import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { AWS } from '../../libs/aws';
import z from 'zod';
import { assertIsAssignmentAdmin } from '../utils/assertIsAssignmentAdmin';

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
      assertIsAssignmentAdmin(ctx, input.assignmentId);

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
  .mutation('updateTitle', {
    input: z.object({
      title: z.string(),
      assignmentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      assertIsAssignmentAdmin(ctx, input.assignmentId);

      await ctx.prisma.assignment.update({
        where: {
          id: input.assignmentId,
        },
        data: {
          name: input.title,
        },
      });
    },
  })

  .mutation('updateDueDate', {
    input: z.object({
      dueDate: z.string(),
      assignmentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      assertIsAssignmentAdmin(ctx, input.assignmentId);

      await ctx.prisma.assignment.update({
        where: {
          id: input.assignmentId,
        },
        data: {
          dueDate: input.dueDate,
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
      // TODO: add auth
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
      // TODO: add auth
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
      assertIsAssignmentAdmin(ctx, input.assignmentId);

      const attachment = await ctx.prisma.attachment.create({
        data: {
          filename: input.filename,
          assignmentId: input.assignmentId,
        },
      });

      const presignedPost = await new Promise((resolve, reject) => {
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

      return presignedPost as {
        url: string;
        fields: object;
      };
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
