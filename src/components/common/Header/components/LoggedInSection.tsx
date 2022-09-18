import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { RefObject, useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import AccountMenu from './AccountMenu';

export const LoggedInSection = ({
  image,
  name,
}: {
  image: string | undefined | null;
  name: string | undefined | null;
}) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const openAccountMenuButtonRef = useRef<HTMLButtonElement>(null);

  function toggleAccountMenu() {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  }

  function closeAccountMenu() {
    setIsAccountMenuOpen(false);
  }

  useClickOutside({
    ref: openAccountMenuButtonRef,
    onClose: closeAccountMenu,
  });

  return (
    <>
      <div className="mr-3 text-white"></div>

      <button
        type="button"
        className="p-1 text-gray-400 bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">View notifications</span>
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      <div className="relative ml-3">
        <div className="flex items-center justify-between">
          <div
            className="pr-4 cursor-pointer"
            onClick={() => signOut()}
          >
            {name}
          </div>

          <button
            ref={openAccountMenuButtonRef}
            onClick={toggleAccountMenu}
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            {image && (
              <Image
                width="50"
                height="50"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full"
                src={image}
                alt=""
              />
            )}
          </button>
        </div>
        {isAccountMenuOpen && <AccountMenu />}
      </div>
    </>
  );
};
