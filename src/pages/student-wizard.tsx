import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

const StudentWizard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up | Online Classroom</title>
        <meta
          name="description"
          content="sign up now for a teacher or a student account in order to access the website"
        />
      </Head>

      <Header />

      <main className="container m-auto">Student Wizard</main>
    </>
  );
};

export default StudentWizard;
