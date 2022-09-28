import Image from 'next/image';
import React, { ReactHTML, ReactNode } from 'react';
import student from '../../assets/student.jpeg';
import { usePress } from 'react-aria';

export const Card = ({
  children,
  title,
  body,
  titleAs,
}: {
  children: ReactNode;
  title: string;
  body: string;
  titleAs?: keyof ReactHTML;
}) => {
  const TitleAs = titleAs ? titleAs : 'div';

  return (
    <li className="max-w-sm rounded overflow-hidden shadow-lg cursor-default flex flex-col gap-4">
      <Image
        height={140}
        width={400}
        objectFit="cover"
        src={student}
        alt="a student"
      />
      <section className="px-4">
        <TitleAs className="font-bold text-xl mb-2">{title}</TitleAs>
        <p className="text-gray-700 text-base">{body}</p>
      </section>
      <footer className="px-4 pt-4 pb-4">{children}</footer>
    </li>
  );
};
