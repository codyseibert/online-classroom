import { Header } from 'components/common/Header/Header';
import { HomeContent } from 'components/pages/home/HomeContent';
import Head from 'next/head';

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
      <Header />
      <HomeContent />
    </>
  );
}
