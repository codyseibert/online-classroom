import React, { useRef, useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';
import { EmptyStateWrapper } from '../../common/EmptyStateWrapper';
import { MainHeading } from '../../common/MainHeading';
import { AttachmentsTable } from './AttachmentsTable';
import { EmptyStateAttachments } from './EmptyStateAttachments';
import { DateTime } from 'luxon';
import { Badge, BadgeVariant } from '../../common/Badge';
import { useForm } from 'react-hook-form';
import { PencilSquare } from '../../common/Icons/PencilSquare';
import { LinkButton } from '../../common/Button/LinkButton';
import { useToggle } from 'react-use';
import { UploadIcon } from '../../common/Icons/UploadIcon';
import ReactMarkdown from 'react-markdown';

type UpdateDescriptionForm = {
  description: string;
};

export const EditAssignmentScreen = ({ assignmentId }) => {
  const [file, setFile] = useState<File>();
  const [isEditingDescription, toggleIsEditingDescription] = useToggle(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue } = useForm<UpdateDescriptionForm>();

  const { mutateAsync: createPresignedUrl } = trpc.useMutation(
    'assignment.createPresignedUrl'
  );

  const { mutateAsync: updateDescription } = trpc.useMutation(
    'assignment.updateDescription'
  );

  const attachments = trpc.useQuery([
    'assignment.getAttachments',
    {
      assignmentId,
    },
  ]);

  const assignment = trpc.useQuery(
    [
      'classroom.getAssignment',
      {
        assignmentId,
      },
    ],
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setValue('description', data?.description ?? '');
      },
    }
  );

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
  };

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    console.log('file.name', file.name);
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
    setFile(undefined);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
    attachments.refetch();
  };

  const handleSaveEditDescription = async (formData: UpdateDescriptionForm) => {
    await updateDescription({
      description: formData.description,
      assignmentId,
    });
    assignment.refetch();
    toggleIsEditingDescription();
  };

  const formattedDueDate = assignment.data?.dueDate
    ? DateTime.fromISO(assignment.data?.dueDate).toLocaleString(
        DateTime.DATE_MED
      )
    : 'N/A';

  return (
    <>
      <MainHeading title={`Edit Assignment: ${assignment.data?.name}`}>
        <Badge variant={BadgeVariant.Error}>Due on {formattedDueDate}</Badge>
      </MainHeading>

      <section>
        <h2 className="text-3xl mb-4 flex">
          Assignment Overview
          <LinkButton onClick={() => toggleIsEditingDescription()}>
            <PencilSquare className="w-4 h-4" /> Edit
          </LinkButton>
        </h2>

        {isEditingDescription ? (
          <form
            className="w-2/3 flex flex-col mb-12"
            onSubmit={handleSubmit(handleSaveEditDescription)}
          >
            <textarea
              className="mb-4 h-56"
              {...register('description')}
            ></textarea>

            <div className="flex justify-end">
              <Button className="w-fit">
                <UploadIcon size="md" /> Save
              </Button>
            </div>
          </form>
        ) : (
          <div className="markdown mb-12">
            <ReactMarkdown>{assignment.data?.description ?? ''}</ReactMarkdown>
          </div>
        )}

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
            <label htmlFor="file-upload">Upload Attachment</label>
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
