import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props) {
  return (
    <Html>
      <Head />
      <body className="bg-gray-100 dark:bg-primary dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
