import React from 'react';
import { Header } from '../components/common/Header/Header';

export const HeaderLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main className="container m-auto flex flex-col gap-8">{children}</main>
    </>
  );
};
