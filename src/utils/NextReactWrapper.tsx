/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
// eslint-disable-next-line @next/next/no-document-import-in-page
import Head from 'next/head';
import { FC, useMemo, useState } from 'react';

type TWrapper = {
  View: FC<object>,
  controller: (render: () => void) => object,
  title: string,
}

export function NextReactWrapper({
  View,
  controller,
  title,
}: TWrapper) {
  return () => {
    const [, setCount] = useState(0);

    const control = useMemo(() => controller(() =>
      setCount((currentCount) =>
        (currentCount + 1) % Number.MAX_SAFE_INTEGER
      )
    ), [setCount]);

    return (
      <>
        <Head>
          <title>{title}</title>
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>

        <View
          {...control}
        />
      </>
    );
  };
}
