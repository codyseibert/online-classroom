import Head from 'next/head';
import { HomeContent } from '../components/screens/home/HomeContent';
import { HeaderLayout } from '../layouts/HeaderLayout';

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

      <HeaderLayout>
        <HomeContent />
      </HeaderLayout>
    </>
  );
}
