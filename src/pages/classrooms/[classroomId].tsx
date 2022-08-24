import { NextPage } from 'next';
import React from 'react';
import { Header } from '../../components/common/Header/Header';
import { TeacherDashboard } from '../../components/pages/teacher-dashboard/TeacherDashboard';

const ClassroomPage: NextPage = () => {
  return (
    <div>
      <Header />
      <TeacherDashboard />
    </div>
  );
};

export default ClassroomPage;
