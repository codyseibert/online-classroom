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
    <nav className="bg-primary text-bgPrimary">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <Logo />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {isLoggedIn ? (
                  <LoggedInLinks hasRole={userMetadata?.role} />
                ) : (
                  <LoggedOutLinks />
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemeButton />

            {isLoggedIn ? (
              <LoggedInSection
                name={userMetadata?.name}
                image={userMetadata?.image}
              />
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
    </nav>
  );
};
