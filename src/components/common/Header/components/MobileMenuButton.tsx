import React, { useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

const MobileMenuButton = ({ setIsMobileMenuOpen }) => {
  const openNavigationMenuButtonRef = useRef<HTMLButtonElement>(null);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  useClickOutside({
    ref: openNavigationMenuButtonRef,
    onClose: closeMobileMenu,
  });

  return (
    <button
      ref={openNavigationMenuButtonRef}
      onClick={toggleMobileMenu}
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
  );
};

export default MobileMenuButton;
