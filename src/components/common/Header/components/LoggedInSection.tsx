import Image from 'next/image';
import { useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import AccountMenu from './AccountMenu';
import profileImage from '../../../../assets/profile.jpeg';
import { trpc } from '../../../../utils/trpc';

export const LoggedInSection = ({
  image,
}: {
  image: string | undefined | null;
}) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const openAccountMenuButtonRef = useRef<HTMLButtonElement>(null);

  const userQuery = trpc.user.getUser.useQuery();

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

  const user = userQuery.data;
  let displayName = '';
  if (user) {
    displayName = user.displayName ?? user.name ?? '';
  }

  return (
    <>
      <div className="mr-3 text-white"></div>

      {/* <button
        type="button"
        className="p-1 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon />
      </button> */}

      <div className="ml-3 relative">
        <div className="flex items-center justify-between">
          <div className="pr-4">{displayName}</div>

          <button
            ref={openAccountMenuButtonRef}
            onClick={toggleAccountMenu}
            type="button"
            className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>

            <Image
              width="50"
              height="50"
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full"
              src={image ?? profileImage}
              alt=""
            />
          </button>
        </div>
        {isAccountMenuOpen && <AccountMenu />}
      </div>
    </>
  );
};
