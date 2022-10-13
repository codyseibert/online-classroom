import { NextApiRequest, NextApiResponse } from 'next';
import { BUCKET_NAME } from '../../server/router/assignmentRouter';
import { prisma } from '../../server/db/client';
import { AWS } from '../../libs/aws';
import { getObjectKey } from '../../server/router/submissionRouter';
const s3 = new AWS.S3();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const submissionId = req.query.submissionId as string;

  const submission = await prisma.submission.findUnique({
    where: {
      id: submissionId,
    },
  });

  const downloadUrl = await s3.getSignedUrlPromise('getObject', {
    Bucket: BUCKET_NAME,
    Key: getObjectKey({
      studentId: submission?.studentId,
      submissionId,
    }),
    ResponseContentDisposition: `attachment; filename="${submission?.filename}"`,
  });

  res.redirect(downloadUrl);
};

export default handler;
