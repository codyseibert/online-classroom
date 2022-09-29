import { Dialog } from '@headlessui/react';
import React, { ReactNode } from 'react';

export const Modal = ({
  children,
  isOpen,
  title,
  description,
  handleCancel,
}: {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  description: string;
  handleCancel: () => void;
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md bg-white dark:bg-gray-700 p-8 rounded-xl flex flex-col gap-4">
          <Dialog.Title className="font-bold text-2xl">{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>

          <div className="flex flex-col gap-4">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export const ModalActions = ({ children }) => {
  return <div className="flex gap-4 justify-end">{children}</div>;
};

export const ModalForm = ({ children, ...rest }) => {
  return (
    <form
      {...rest}
      className="flex flex-col gap-4"
    >
      {children}
    </form>
  );
};
