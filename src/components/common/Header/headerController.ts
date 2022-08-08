import { HeaderControllerGetContext } from './Header';

export enum Themes {
  Dark = 'dark',
  Light = 'light'
}

export const headerController = (render: () => void, getContext: HeaderControllerGetContext) => {
  const state = {
    isMobileMenuOpen: false,
    isAccountMenuOpen: false
  };

  function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    render();
  }

  function toggleAccountMenu() {
    state.isAccountMenuOpen = !state.isAccountMenuOpen;
    render();
  }

  function closeAllMenus() {
    state.isAccountMenuOpen = false;
    state.isMobileMenuOpen = false;
    render();
  }

  function toggleTheme() {
    getContext().setTheme(isDarkMode() ? Themes.Light : Themes.Dark);
    render();
  }

  function isDarkMode() { return getContext().theme === Themes.Dark; }

  return {
    state,
    actions: {
      toggleMobileMenu,
      toggleAccountMenu,
      closeAllMenus,
      toggleTheme,
      signIn: getContext().signIn,
      signOut: getContext().signOut,
    },
    refs: {
      openAccountMenuButtonRef: getContext().openAccountMenuButtonRef,
      openNavigationMenuButtonRef: getContext().openNavigationMenuButtonRef,
    },
    computeds: {
      isDarkMode,
      isLoggedIn: () => !!getContext().session.data,
      getUserMetadata: () =>
        getContext().session.data?.user
    }
  };
};

export type HeaderControllerProps = ReturnType<typeof headerController>