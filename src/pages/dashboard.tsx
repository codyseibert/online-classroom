import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/common/Header/Header';
import { unstable_getServerSession } from '../libs/unstable_getServerSession';
import { authOptions } from './api/auth/[...nextauth]';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>sign up</title>
        <meta
          name="description"
          content="sign up now for a teacher or a student account in order to access the website"
        />
      </Head>

      <Header />

      <main className="container m-auto">Dashboard</main>
    </>
  );
};

export default Dashboard;

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
