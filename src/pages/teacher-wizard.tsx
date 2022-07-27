import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

const TeacherWizard: NextPage = () => {
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

      <main className="container m-auto">Teacher Wizard</main>
    </>
  );
};

export default TeacherWizard;
