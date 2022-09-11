import React from 'react';
import { Header } from '../components/common/Header/Header';

export const HeaderLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
