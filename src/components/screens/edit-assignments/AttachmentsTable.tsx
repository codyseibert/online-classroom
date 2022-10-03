import { Attachment } from '@prisma/client';
import { trpc } from '../../../utils/trpc';
import { LinkButton, LinkButtonVariant } from '../../common/Button/LinkButton';
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
          className="flex gap-4"
        >
          {/* TODO: add download icon */}
          <a
            className="link"
            target="_blank"
            href={`/api/download-attachment?attachmentId=${attachment.id}`}
            download={attachment.filename}
            rel="noreferrer"
          >
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
