import { Session } from 'next-auth';
import { HeaderControllerGetContext } from './Header';
import { headerController } from './headerController';

describe('headerController', () => {
  const noop = () => { };

  const getContextMock: HeaderControllerGetContext = () => {
    return {
      theme: 'light',
      setTheme: () => { },
      session: {
        data: {
          user: {
            id: '123'
          },
          expires: '',
        } as Session,
        status: 'authenticated'
      },
      signIn: async () => { },
      signOut: async () => { },
      openAccountMenuButtonRef: {},
      openNavigationMenuButtonRef: {},
    };
  };

  describe('actions.toggleMobileMenu', () => {
    it('should set the isMobileMenuOpen state to true', () => {
      const controller = headerController(noop, getContextMock);
      controller.actions.toggleMobileMenu();
      expect(controller.state.isMobileMenuOpen).toBeTruthy();
      controller.actions.toggleMobileMenu();
      expect(controller.state.isMobileMenuOpen).toBeFalsy();
    });
  });

  describe('actions.toggleAccountMenu', () => {
    it('should set the isAccountMenuOpen state to true', () => {
      const controller = headerController(noop, () => ({}));
      controller.actions.toggleAccountMenu();
      expect(controller.state.isAccountMenuOpen).toBeTruthy();
      controller.actions.toggleAccountMenu();
      expect(controller.state.isAccountMenuOpen).toBeFalsy();
    });
  });

  describe('onClickOutside', () => {
    it('should close all menus when clicking outside the menus', () => {
      const controller = headerController(noop, () => ({}));
      controller.actions.toggleAccountMenu();
      controller.actions.toggleMobileMenu();
      expect(controller.state.isAccountMenuOpen).toBeTruthy();
      expect(controller.state.isMobileMenuOpen).toBeTruthy();
      controller.actions.closeAllMenus();
      expect(controller.state.isAccountMenuOpen).toBeFalsy();
      expect(controller.state.isMobileMenuOpen).toBeFalsy();
    });
  });
});