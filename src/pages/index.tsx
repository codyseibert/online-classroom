import Head from 'next/head';
import { HomeContent } from '../components/pages/home/HomeContent';
import { HeaderLayout } from '../layouts/HeaderLayout';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>mvc</title>
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
