/* eslint-disable @typescript-eslint/no-empty-function */
import { Session } from 'next-auth';
import { RefObject } from 'react';
import { HeaderControllerGetContext, HeaderModel } from './Header';
import { headerController } from './headerController';

describe('headerController', () => {
  let mockModel: HeaderModel;

  beforeEach(() => {
    mockModel = {
      isAccountMenuOpen: false,
      isMobileMenuOpen: false,
    };
  });

  const getContextMock: HeaderControllerGetContext = () => {
    return {
      theme: 'light',
      setTheme: () => undefined,
      session: {
        data: {
          user: {
            id: '123',
          },
          expires: '',
        } as Session,
        status: 'authenticated',
      },
      signIn: async () => undefined,
      signOut: async () => undefined,
      openAccountMenuButtonRef: {} as RefObject<HTMLButtonElement>,
      openNavigationMenuButtonRef: {} as RefObject<HTMLButtonElement>,
    };
  };

  describe('actions.toggleMobileMenu', () => {
    it('should set the isMobileMenuOpen state to true', () => {
      const controller = headerController(mockModel, getContextMock);
      controller.actions.toggleMobileMenu();
      expect(controller.model.isMobileMenuOpen).toBeTruthy();
      controller.actions.toggleMobileMenu();
      expect(controller.model.isMobileMenuOpen).toBeFalsy();
    });
  });

  describe('actions.toggleAccountMenu', () => {
    it('should set the isAccountMenuOpen state to true', () => {
      const controller = headerController(mockModel, getContextMock);
      controller.actions.toggleAccountMenu();
      expect(controller.model.isAccountMenuOpen).toBeTruthy();
      controller.actions.toggleAccountMenu();
      expect(controller.model.isAccountMenuOpen).toBeFalsy();
    });
  });

  describe('onClickOutside', () => {
    it('should close all menus when clicking outside the menus', () => {
      const controller = headerController(mockModel, getContextMock);
      controller.actions.toggleAccountMenu();
      controller.actions.toggleMobileMenu();
      expect(controller.model.isAccountMenuOpen).toBeTruthy();
      expect(controller.model.isMobileMenuOpen).toBeTruthy();
      controller.actions.closeAllMenus();
      expect(controller.model.isAccountMenuOpen).toBeFalsy();
      expect(controller.model.isMobileMenuOpen).toBeFalsy();
    });
  });
});
