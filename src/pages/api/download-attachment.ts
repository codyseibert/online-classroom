import { NextApiRequest, NextApiResponse } from 'next';
import {
  BUCKET_NAME,
  getObjectKey,
} from '../../server/router/assignmentRouter';
import { prisma } from '../../server/db/client';
import { AWS } from '../../libs/aws';
const s3 = new AWS.S3();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const attachmentId = req.query.attachmentId as string;

  const attachment = await prisma.attachment.findUnique({
    where: {
      id: attachmentId,
    },
  });

  const downloadUrl = await s3.getSignedUrlPromise('getObject', {
    Bucket: BUCKET_NAME,
    Key: getObjectKey({
      assignmentId: attachment?.assignmentId,
      attachmentId: attachment?.id,
    }),
    ResponseContentDisposition: `attachment; filename="${attachment?.filename}"`,
  });

  res.redirect(downloadUrl);
};

export default handler;
