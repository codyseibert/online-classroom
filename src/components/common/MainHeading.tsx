import { ReactNode } from 'react';

export const MainHeading = ({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle?: string;
  children?: ReactNode;
}) => {
  return (
    <>
      <section className="flex gap-8 items-end mb-8 justify-between">
        <div className="flex-col">
          <h1 className="text-4xl mt-8">{title}</h1>
          {subTitle && <h2 className="text-2xl mt-4">{subTitle}</h2>}
        </div>

        {children}
      </section>

      <hr className="mb-8" />
    </>
  );
};
