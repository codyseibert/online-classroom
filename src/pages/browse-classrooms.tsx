import type { NextPage } from 'next';
import Head from 'next/head';
import { BrowseClassroomsScreen } from '../components/screens/browse-classrooms/BrowseClassroomsScreen';

const BrowseClassroomsPage: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Find a Classroom</title>
        <meta
          name="description"
          content="sign up now for a teacher or a student account in order to access the website"
        />
      </Head>

      <main className="container m-auto">
        <BrowseClassroomsScreen />
      </main>
    </>
  );
};

export default BrowseClassroomsPage;
