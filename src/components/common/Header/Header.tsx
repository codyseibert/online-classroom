/* eslint-disable react-hooks/rules-of-hooks */
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import React from 'react';
import { MobileMenu } from './components/MobileMenu';
import { LoggedInLinks } from './components/LoggedInLinks';
import MobileMenuButton from './components/MobileMenuButton';
import Logo from './components/Logo';
import LoggedOutLinks from './components/LoggedOutLinks';
import LoggedOutSection from './components/LoggedOutSection';
import ThemeButton from './components/ThemeButton';
import { LoggedInSection } from './components/LoggedInSection';
import { useSession } from '../../../libs/useSession';

export const Header = () => {
  const session = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = !!session.data;
  const userMetadata = session.data?.user;

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <nav className="flex space-x-4">
                {isLoggedIn ? (
                  <LoggedInLinks role={userMetadata?.role} />
                ) : (
                  <LoggedOutLinks />
                )}
              </nav>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemeButton />

            {isLoggedIn ? (
              <LoggedInSection image={userMetadata?.image} />
            ) : (
              <LoggedOutSection signIn={signIn} />
            )}
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          hasRole={false}
        />
      )}
    </header>
  );
};
