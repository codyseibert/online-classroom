import { ReactHTML, ReactNode } from 'react';

export const MainHeading = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <>
      <section className="flex gap-8 items-end mb-8">
        <h1 className="text-4xl mt-8 px-4">{title}</h1>

        {children}
      </section>

      <hr className="mb-8" />
    </>
  );
};
