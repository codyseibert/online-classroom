import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { AssignmentScreen } from '../../../../../components/screens/assignments/AssignmentScreen';

const ClassroomPage: NextPage = (props) => {
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

      <AssignmentScreen
        classroomId={classroomId}
        assignmentId={assignmentId}
      />
    </>
  );
};

export default ClassroomPage;
