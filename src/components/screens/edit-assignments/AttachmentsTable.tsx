import { Attachment } from '@prisma/client';
import { trpc } from '../../../utils/trpc';
import { LinkButton, LinkButtonVariant } from '../../common/Button/LinkButton';
import { DownloadIcon } from '../../common/Icons/DownloadIcon';
import { TrashIcon } from '../../common/Icons/TrashIcon';
import { Table } from '../../common/Table/Table';

export const AttachmentsTable = ({
  attachments,
  onAttachmentDeleted,
}: {
  attachments: Attachment[];
  onAttachmentDeleted: () => void;
}) => {
  const deleteAttachment = trpc.useMutation('assignment.deleteAttachment');

  const handleDeleteAttachment = async (attachmentId: string) => {
    if (!confirm('are you sure?')) return;
    await deleteAttachment.mutateAsync({
      attachmentId,
    });
    onAttachmentDeleted();
  };

  return (
    <Table
      headers={['Filename', 'Actions']}
      rows={attachments.map((attachment) => [
        attachment.filename,
        <span
          key={attachment.id}
          className="flex gap-4 items-center"
        >
          <a
            className="link flex gap-2"
            target="_blank"
            href={`/api/download-attachment?attachmentId=${attachment.id}`}
            download={attachment.filename}
            rel="noreferrer"
          >
            <DownloadIcon />
            Download
          </a>
          <LinkButton
            variant={LinkButtonVariant.Danger}
            onClick={() => handleDeleteAttachment(attachment.id)}
          >
            <TrashIcon />
            Delete
          </LinkButton>
        </span>,
      ])}
    ></Table>
  );
};
