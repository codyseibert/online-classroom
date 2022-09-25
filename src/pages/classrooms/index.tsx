import type { NextPage, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import { ClassroomsScreen } from '../../components/screens/classrooms/ClassroomsScreen';
import { unstable_getServerSession } from '../../libs/unstable_getServerSession';

const Classrooms: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <Head>
        <title>Classrooms</title>
        <meta
          name="description"
          content="all of the classrooms you've created as a teacher"
        />
      </Head>

      <ClassroomsScreen />
    </>
  );
};

export default Classrooms;

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else if (!session.user?.role) {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
}
