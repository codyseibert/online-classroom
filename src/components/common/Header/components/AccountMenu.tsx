import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AccountMenu = () => {
  return (
    <div className="bg-white text-black z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-bgSecondary ring-1 ring-black dark:bg-gray-50 ring-opacity-5 focus:outline-none">
      <Link
        href="/profile"
        className="block px-4 py-2 text-sm link-primary hover:underline"
      >
        Profile
      </Link>
      <a
        onClick={() => signOut()}
        href="#"
        className="block px-4 py-2 text-sm link-primary hover:underline"
      >
        Sign out
      </a>
    </div>
  );
};

export default AccountMenu;
