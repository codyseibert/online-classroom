import type { NextPage } from 'next';
import Head from 'next/head';
import { DashboardScreen } from '../components/screens/dashboard/DashboardScreen';
import { HeaderLayout } from '../layouts/HeaderLayout';
import { unstable_getServerSession } from '../libs/unstable_getServerSession';
import { authOptions } from './api/auth/[...nextauth]';

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>sign up</title>
        <meta
          name="description"
          content="sign up now for a teacher or a student account in order to access the website"
        />
      </Head>

      <HeaderLayout>
        <DashboardScreen />
      </HeaderLayout>
    </>
  );
};

export default DashboardPage;

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  console.log('session', session);

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
