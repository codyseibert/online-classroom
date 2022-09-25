import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { ClassroomScreen } from '../../../components/screens/classroom/ClassroomScreen';

const ClassroomPage: NextPage = (props) => {
  const router = useRouter();
  const classroomId = router.query.classroomId;

  return (
    <>
      <Head>
        <title>Classrooms</title>
        <meta
          name="description"
          content="all of the classrooms you've created as a teacher"
        />
      </Head>

        <ClassroomScreen classroomId={classroomId} />
    </>
  );
};

export default ClassroomPage;
