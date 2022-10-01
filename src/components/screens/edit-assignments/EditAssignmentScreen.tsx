import React, { useRef, useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { Button, Variant } from '../../common/Button/Button';

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
    console.log('url', url);
    console.log(formData);
    await fetch(url, {
      method: 'POST',
      body: formData,
    });
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <div>
      EditAssignmentScreen {classroomId} {assignmentId}
      {attachments.data?.map((attachment) => (
        <div key={attachment.id}>{attachment.filename}</div>
      ))}
      <form
        className="text-white"
        onSubmit={uploadImage}
      >
        Upload File
        <input
          ref={fileRef}
          className="ml-4 text-white"
          onChange={onFileChange}
          type="file"
        ></input>
        {file && (
          <Button
            type="submit"
            variant={Variant.Primary}
          >
            Upload
          </Button>
        )}
      </form>
    </div>
  );
};
