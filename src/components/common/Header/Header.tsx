/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { headerController } from './headerController';
import { HeaderView } from './HeaderView';
import { signIn, signOut } from 'next-auth/react';
import { useRef } from 'react';
import { MVCWrapper } from '../../../utils/MVCWrapper';

export type HeaderModel = {
  isMobileMenuOpen: boolean;
  isAccountMenuOpen: boolean;
};

const getContext = () => {
  const { theme, setTheme } = useTheme();
  const session = useSession();
  const openAccountMenuButtonRef = useRef<HTMLButtonElement>(null);
  const openNavigationMenuButtonRef = useRef<HTMLButtonElement>(null);

  return {
    theme,
    setTheme,
    session,
    signIn: () => {
      signIn();
    },
    signOut: () => {
      signOut();
    },
    openAccountMenuButtonRef,
    openNavigationMenuButtonRef,
  };
};

export type HeaderControllerGetContext = typeof getContext;

export const Header = MVCWrapper({
  view: HeaderView,
  controller: headerController,
  model: {
    isMobileMenuOpen: false,
    isAccountMenuOpen: false,
  },
  getContext,
});
