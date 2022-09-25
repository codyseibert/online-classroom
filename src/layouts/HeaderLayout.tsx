import React from 'react';
import { Header } from '../components/common/Header/Header';

export const HeaderLayout = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="container m-auto flex flex-col gap-8 mt-8">
        {children}
      </div>
    </div>
  );
};
