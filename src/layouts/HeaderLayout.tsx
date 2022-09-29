import React from 'react';
import { Footer } from '../components/common/Footer/Footer';
import { Header } from '../components/common/Header/Header';

export const HeaderLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col pb-16 h-full">
        {children}
      </main>

      <Footer />
    </>
  );
};
