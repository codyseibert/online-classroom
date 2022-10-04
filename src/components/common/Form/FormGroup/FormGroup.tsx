import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

export const FormGroup = ({
  children,
  label,
  name,
  error,
}: {
  children: JSX.Element;
  label: string;
  name: string;
  error?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current
      ?.getElementsByTagName('input')[0]
      ?.classList[error ? 'add' : 'remove']('border-red-500');
  }, [error]);

  return (
    <div
      className="flex flex-col gap-1"
      ref={ref}
    >
      <label htmlFor={name}>{label}</label>
      <React.Fragment>{children}</React.Fragment>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
