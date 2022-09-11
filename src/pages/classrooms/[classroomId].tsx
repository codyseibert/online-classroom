import { NextPage } from 'next';
import React from 'react';
import { TeacherDashboard } from '../../components/pages/teacher-dashboard/TeacherDashboard';
import { HeaderLayout } from '../../layouts/HeaderLayout';

const ClassroomPage: NextPage = () => {
  return (
    <HeaderLayout>
      <TeacherDashboard />
    </HeaderLayout>
  );
};

export default ClassroomPage;
