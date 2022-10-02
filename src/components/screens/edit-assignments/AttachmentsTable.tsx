import { Attachment } from '@prisma/client';
import { Button } from '../../common/Button/Button';
import { Table } from '../../common/Table/Table';

export const AttachmentsTable = ({
  attachments,
}: {
  attachments: Attachment[];
}) => {
  return (
    <Table
      headers={['Filename', 'Actions']}
      rows={attachments.map((attachment) => [
        attachment.filename,
        <Button>Download</Button>,
      ])}
    ></Table>
  );
};
