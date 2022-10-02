import React, { useRef, useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { MainHeading } from '../../common/MainHeading';
import { AttachmentsTable } from './AttachmentsTable';
import { EmptyStateAttachments } from './EmptyStateAttachments';
import { DateTime } from 'luxon';
import { Badge, BadgeVariant } from '../../common/Badge';

export const EditAssignmentScreen = ({ classroomId, assignmentId }) => {
  const [file, setFile] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createPresignedUrl } = trpc.useMutation(
    'assignment.createPresignedUrl'
  );

  const attachments = trpc.useQuery([
    'assignment.getAttachments',
    {
      assignmentId,
    },
  ]);

  const assignment = trpc.useQuery([
    'classroom.getAssignment',
    {
      assignmentId,
    },
  ]);

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
  };

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const { url, fields }: { url: string; fields: any } =
      (await createPresignedUrl({
        filename: file.name,
        assignmentId,
      })) as any;
    const data = {
      ...fields,
      'Content-Type': file.type,
      file,
    };
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    await fetch(url, {
      method: 'POST',
      body: formData,
    });
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
    attachments.refetch();
  };

  const formattedDueDate = DateTime.fromISO(
    assignment.data?.dueDate
  ).toLocaleString(DateTime.DATE_MED);

  return (
    <>
      <MainHeading title={`Edit Assignment: ${assignment.data?.name}`}>
        <Badge variant={BadgeVariant.Error}>Due on {formattedDueDate}</Badge>
      </MainHeading>

      <section>
        <h2 className="text-3xl mb-4">Assignment Overview</h2>

        <p className="mb-12">{assignment.data?.description}</p>

        <h2 className="text-3xl mb-4">Attachments</h2>

        <div className="mb-8">
          <EmptyStateWrapper
            EmptyComponent={<EmptyStateAttachments />}
            NonEmptyComponent={
              <AttachmentsTable attachments={attachments.data ?? []} />
            }
            isLoading={attachments.isLoading}
            data={attachments.data}
          />
        </div>

        <div className="flex justify-end">
          <form
            className="text-white"
            onSubmit={uploadImage}
          >
            <label htmlFor="file-upload">Upload File</label>
            <input
              ref={fileRef}
              id="file-upload"
              className="ml-4 text-white"
              onChange={onFileChange}
              type="file"
            ></input>
            {file && (
              <Button
                className="ml-4"
                type="submit"
                variant={Variant.Primary}
              >
                Upload
              </Button>
            )}
          </form>
        </div>
      </section>
    </>
  );
};
