import { signIn, signOut, useSession } from 'next-auth/react';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const session = useSession();

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const user = session.data?.user;
  const isLoggedIn = user,
    hasRole = !!user?.role,
    name = user?.name,
    image = user?.image,
    role = user?.role;

  const openNavigateMenuRef = useRef<HTMLButtonElement | null>(null);
  const openProfileMenuRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const hideMenusCb = (ev: MouseEventInit | MouseEvent) => {
      const e = ev as MouseEvent;
      const target = e.target as Node;

      if (
        openNavigateMenuRef.current?.contains(target) ||
        openProfileMenuRef.current?.contains(target)
      ) {
        return;
      }

      setShowAccountMenu(false);
      setShowMobileMenu(false);
    };

    document.addEventListener('click', hideMenusCb);
    return () => document.removeEventListener('click', hideMenusCb);
  }, []);

  return (
    <nav className="bg-primary text-bgPrimary">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              ref={openNavigateMenuRef}
              onClick={() => setShowMobileMenu((m) => !m)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {isLoggedIn && (
                  <>
                    {hasRole && (
                      <>
                        <Link
                          href="#"
                          className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
                          aria-current="page"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="#"
                          className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Assignments
                        </Link>
                        <Link
                          href="#"
                          className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Students
                        </Link>
                      </>
                    )}
                    {!hasRole && (
                      <>
                        <Link
                          href="/welcome"
                          className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
                          aria-current="page"
                        >
                          Finish Setup
                        </Link>
                      </>
                    )}
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <Link
                      href="#"
                      className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Pricing
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn && (
              <>
                <div className="mr-3 text-white">
                  {name} {role}
                </div>

                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
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

                <div className="ml-3 relative">
                  <div>
                    <button
                      ref={openProfileMenuRef}
                      onClick={() => setShowAccountMenu((m) => !m)}
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-full"
                        src={image}
                        alt=""
                      />
                    </button>
                  </div>

                  {showAccountMenu && (
                    <div
                      className="flex flex-col z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-bgSecondary ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm link-primary"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm link-primary"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-1"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className="block px-4 py-2 text-sm link-primary"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            {!isLoggedIn && (
              <div className="ml-3 relative">
                <button
                  onClick={() => signIn()}
                  className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                >
                  Register / Sign in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div
          className="sm:hidden"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn && (
              <>
                {hasRole && (
                  <>
                    <Link
                      href="#"
                      className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                      aria-current="page"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="#"
                      className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Assignments
                    </Link>
                    <Link
                      href="#"
                      className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Students
                    </Link>
                  </>
                )}
                {!hasRole && (
                  <>
                    <Link
                      href="/welcome"
                      className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                      aria-current="page"
                    >
                      Finish Setup
                    </Link>
                  </>
                )}
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link
                  href="#"
                  className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                >
                  Pricing
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
