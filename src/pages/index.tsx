import Head from 'next/head';
import { HomeContent } from '../components/screens/home/HomeContent';

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Welcome to the Online Classroom</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <HomeContent />
    </>
  );
}
