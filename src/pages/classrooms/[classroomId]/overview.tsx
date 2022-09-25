import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ClassroomOverviewScreen } from '../../../components/screens/classroom-overview/ClassroomOverviewScreen';

const ClassroomOverviewPage: NextPage = (props) => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;

  return (
    <>
      <Head>
        <title>Classroom Overview</title>
        <meta
          name="description"
          content="all of the classrooms you've created as a teacher"
        />
      </Head>

      <ClassroomOverviewScreen classroomId={classroomId} />
    </>
  );
};

export default ClassroomOverviewPage;
