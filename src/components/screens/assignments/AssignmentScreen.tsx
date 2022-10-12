import { DateTime } from 'luxon';
import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { trpc } from '../../../utils/trpc';
import { Badge, BadgeVariant } from '../../common/Badge';
import { Button, Variant } from '../../common/Button/Button';
import { MainHeading } from '../../common/MainHeading';

export const AssignmentScreen = ({ classroomId, assignmentId }) => {
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);

  const assignmentQuery = trpc.useQuery([
    'classroom.getAssignment',
    { assignmentId },
  ]);

  const submissionQuery = trpc.useQuery([
    'submission.getSubmission',
    { assignmentId },
  ]);

  const { mutateAsync: createPresignedUrl } = trpc.useMutation(
    'submission.createPresignedUrl'
  );

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
  };

  const uploadAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
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
    setFile(undefined);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
    submissionQuery.refetch();
  };

  const formattedDueDate = assignmentQuery.data?.dueDate
    ? DateTime.fromISO(assignmentQuery.data?.dueDate).toLocaleString(
        DateTime.DATE_MED
      )
    : 'N/A';

  const isSubmissionSubmitted = !!submissionQuery.data;

  return (
    <section>
      <MainHeading
        title={`Assignment #${assignmentQuery.data?.number}`}
        subTitle={assignmentQuery.data?.name}
      >
        <>
          {isSubmissionSubmitted ? (
            <Badge variant={BadgeVariant.Success}>Submitted</Badge>
          ) : (
            <Badge variant={BadgeVariant.Error}>
              Due on {formattedDueDate}
            </Badge>
          )}

          <div className="flex justify-end place-self-end">
            <form
              className="text-white"
              onSubmit={uploadAssignment}
            >
              <label htmlFor="file-upload">Upload Assignment</label>
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
        </>
      </MainHeading>

      <div className="markdown mb-12">
        <ReactMarkdown>{assignmentQuery.data?.description ?? ''}</ReactMarkdown>
      </div>
    </section>
  );
};
