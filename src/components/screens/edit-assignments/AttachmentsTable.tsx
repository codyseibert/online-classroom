import { Attachment } from '@prisma/client';
import { trpc } from '../../../utils/trpc';
import { Button } from '../../common/Button/Button';
import { Table } from '../../common/Table/Table';

export const AttachmentsTable = ({
  attachments,
}: {
  attachments: Attachment[];
}) => {
  const getDownloadUrl = trpc.useMutation('assignment.getDownloadUrl');

  const handleDownloadClicked = async (attachmentId: string) => {
    const url = await getDownloadUrl.mutateAsync({
      attachmentId,
    });
    window.open(url, '_blank');
  };

  return (
    <Table
      headers={['Filename', 'Actions']}
      rows={attachments.map((attachment) => [
        attachment.filename,
        <Button
          key={attachment.id}
          onClick={() => handleDownloadClicked(attachment.id)}
        >
          Download
        </Button>,
      ])}
    ></Table>
  );
};
