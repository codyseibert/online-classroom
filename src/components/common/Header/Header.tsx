/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { MVCWrapper } from 'utils/MVCWrapper';
import { headerController } from './headerController';
import { HeaderView } from './HeaderView';
import { signIn, signOut } from 'next-auth/react';
import { useRef } from 'react';

const getContext = () => {
  const { theme, setTheme } = useTheme();
  const session = useSession();
  const openAccountMenuButtonRef = useRef<HTMLButtonElement>(null);
  const openNavigationMenuButtonRef = useRef<HTMLButtonElement>(null);

  return {
    theme,
    setTheme,
    session,
    signIn,
    signOut,
    openAccountMenuButtonRef,
    openNavigationMenuButtonRef,
  };
};

export type HeaderControllerGetContext = typeof getContext

export const Header = MVCWrapper({
  view: HeaderView,
  controller: headerController,
  getContext,
});
