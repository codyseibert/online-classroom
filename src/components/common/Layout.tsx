import Head from 'next/head';

import { Header } from './Header/Header';
import { PageFooter } from './PageFooter';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Workroom Class App' }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Header />
      {children}
      <PageFooter />
    </div>
  );
};

export default Layout;
