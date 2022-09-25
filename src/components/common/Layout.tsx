import Head from 'next/head';
import { PageFooter } from './PageFooter';
import { Header } from './Header/Header';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Workroom Class App' }: Props) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
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
