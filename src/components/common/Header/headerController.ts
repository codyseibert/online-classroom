import { HeaderControllerGetContext, HeaderModel } from './Header';

export enum Themes {
  Dark = 'dark',
  Light = 'light'
}

export const headerController = (
  model: HeaderModel,
  getContext: HeaderControllerGetContext
) => {

  function toggleMobileMenu() {
    model.isMobileMenuOpen = !model.isMobileMenuOpen;
  }

  function toggleAccountMenu() {
    model.isAccountMenuOpen = !model.isAccountMenuOpen;
  }

  function closeAllMenus() {
    model.isAccountMenuOpen = false;
    model.isMobileMenuOpen = false;
  }

  function toggleTheme() {
    getContext().setTheme(isDarkMode() ? Themes.Light : Themes.Dark);
  }

  function isDarkMode() { return getContext().theme === Themes.Dark; }

  return {
    model,
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