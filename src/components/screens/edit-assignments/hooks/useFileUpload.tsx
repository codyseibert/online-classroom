import { useRef, useState } from 'react';

export const useFileUpload = ({
  onFileUploaded,
  getUploadUrl,
}: {
  onFileUploaded: () => void;
  getUploadUrl: (file: File) => Promise<{ url: string; fields: object }>;
}) => {
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
  };

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const { url, fields } = await getUploadUrl(file);
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
    onFileUploaded();
  };

  return { fileRef, file, handleFileChange, uploadFile };
};
