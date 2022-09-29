import { signOut } from 'next-auth/react';
import React from 'react';

const AccountMenu = () => {
  return (
    <div
      className="bg-white text-black z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-bgSecondary ring-1 ring-black dark:bg-gray-600 ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabIndex={-1}
    >
      <a
        href="#"
        className="block px-4 py-2 text-sm link-primary"
        role="menuitem"
        tabIndex={-1}
        id="user-menu-item-0"
      >
        Your Profile
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm link-primary"
        role="menuitem"
        tabIndex={-1}
        id="user-menu-item-1"
      >
        Settings
      </a>
      <a
        onClick={() => signOut()}
        href="#"
        className="block px-4 py-2 text-sm link-primary"
        role="menuitem"
        tabIndex={-1}
        id="user-menu-item-2"
      >
        Sign out
      </a>
    </div>
  );
};

export default AccountMenu;
