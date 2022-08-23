/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
// eslint-disable-next-line @next/next/no-document-import-in-page
import { useRouter } from 'next/router';
import { FC, useMemo, useRef, useState } from 'react';


const withRouter = (WrappedComponent) => {
  return () => {
    const router = useRouter();

    return <>
      {router.isReady && <WrappedComponent />}
    </>;
  };
};

export function MVCWrapper({
  view,
  controller,
  model,
  getContext,
}: {
  view: FC<any>,
  controller: any,
  model: object,
  getContext?: () => object,
}) {
  const View = view;

  return withRouter(() => {
    const [, setState] = useState(model);

    const context = getContext?.();
    const ref = useRef(context);
    ref.current = context;

    const proxyModel = useMemo(() => {
      return new Proxy(model || {}, {
        set(target, key, value) {
          Object.assign(target, { [key]: value });
          setState({ ...target });
          return true;
        }
      });
    }, []);

    const control = useMemo(
      () =>
        controller(
          proxyModel,
          () => ref.current
        )
      , []
    );

    return (
      <View
        {...control}
      />
    );
  });
}
