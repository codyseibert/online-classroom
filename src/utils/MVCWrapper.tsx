/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
// eslint-disable-next-line @next/next/no-document-import-in-page
import { FC, useMemo, useRef, useState } from 'react';

export interface Controller<T> {
  (render: () => void): T,
}

type TWrapper = {
  view: FC<any>,
  controller: Controller,
  getContext?: () => object,
}

export function MVCWrapper({
  view,
  controller,
  getContext,
}: TWrapper) {
  const View = view;

  return () => {
    const [, setCount] = useState(0);
    const context = getContext?.();
    const ref = useRef(context);
    ref.current = context;

    const control = useMemo(() => controller(() => {
      setCount((currentCount) =>
        (currentCount + 1) % Number.MAX_SAFE_INTEGER
      );
    }, () => ref.current
    ), []);

    return (
      <View
        {...control}
      />
    );
  };
}
