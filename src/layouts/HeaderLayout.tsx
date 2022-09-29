import classNames from 'classnames';
import React from 'react';
import { Footer } from '../components/common/Footer/Footer';
import { Header } from '../components/common/Header/Header';

export const HeaderLayout = ({ children, useContainer = true }) => {
  return (
    <>
      <Header />

      <main
        className={classNames(
          useContainer && 'container',
          'mx-auto flex flex-col h-screen'
        )}
      >
        {children}
      </main>

      <Footer />
    </>
  );
};
