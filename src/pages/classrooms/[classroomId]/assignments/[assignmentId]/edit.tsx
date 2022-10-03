import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { EditAssignmentScreen } from '../../../../../components/screens/edit-assignments/EditAssignmentScreen';
import { HeaderLayout } from '../../../../../layouts/HeaderLayout';

const ClassroomPage: NextPage = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  const assignmentId = router.query.assignmentId as string;

  return (
    <>
      <Head>
        <title>Classrooms</title>
        <meta
          name="description"
          content="all of the classrooms you've created as a teacher"
        />
      </Head>

      <HeaderLayout>
        <EditAssignmentScreen
          classroomId={classroomId}
          assignmentId={assignmentId}
        />
      </HeaderLayout>
    </>
  );
};

export default ClassroomPage;
