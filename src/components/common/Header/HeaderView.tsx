import React, { FC, useEffect } from 'react';
import { MobileMenu } from './components/MobileMenu';
import { LoggedInLinks } from './components/LoggedInLinks';
import MobileMenuButton from './components/MobileMenuButton';
import Logo from './components/Logo';
import LoggedOutLinks from './components/LoggedOutLinks';
import LoggedOutSection from './components/LoggedOutSection';
import { HeaderControllerProps } from './headerController';
import ThemeButton from './components/ThemeButton';
import { LoggedInSection } from './components/LoggedInSection';

export const HeaderView: FC<HeaderControllerProps> = ({
  model,
  actions,
  computeds,
  refs,
}) => {
  const isLoggedIn = computeds.isLoggedIn();
  const userMetadata = computeds.getUserMetadata();

  useEffect(() => {
    const hideMenusCb = (e: MouseEvent) => {
      if (refs.openAccountMenuButtonRef.current?.contains(e.target as Node))
        return;
      if (refs.openNavigationMenuButtonRef.current?.contains(e.target as Node))
        return;
      actions.closeAllMenus();
    };

    document.addEventListener('click', hideMenusCb);

    return () => {
      document.removeEventListener('click', hideMenusCb);
    };
  }, []);

  return (
    <nav className="bg-primary text-bgPrimary">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton
              openNavigateMenuRef={refs.openNavigationMenuButtonRef}
              showMobileMenu={model.isMobileMenuOpen}
              setShowMobileMenu={actions.toggleMobileMenu}
            />
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {computeds.isLoggedIn() ? (
                  <LoggedInLinks hasRole={computeds.getUserMetadata()?.role} />
                ) : (
                  <LoggedOutLinks />
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemeButton
              isDarkMode={computeds.isDarkMode()}
              toggleTheme={actions.toggleTheme}
            />

            {isLoggedIn ? (
              <LoggedInSection
                name={userMetadata?.name}
                image={userMetadata?.image}
                isAccountMenuOpen={model.isAccountMenuOpen}
                openAccountMenu={actions.toggleAccountMenu}
                openAccountMenuButtonRef={refs.openAccountMenuButtonRef}
                signOut={actions.signOut}
              />
            ) : (
              <LoggedOutSection signIn={actions.signIn} />
            )}
          </div>
        </div>
      </div>
      {model.isMobileMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          hasRole={false}
        />
      )}
    </nav>
  );
};
