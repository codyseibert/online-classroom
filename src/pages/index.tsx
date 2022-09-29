import Head from 'next/head';
import { HomeScreen } from '../components/screens/home/HomeScreen';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Welcome to the Online Classroom</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <HomeScreen />
    </>
  );
}
