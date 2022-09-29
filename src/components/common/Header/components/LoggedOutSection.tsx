import React from 'react';

const LoggedOutSection = ({ signIn }) => {
  return (
    <div className="ml-3 relative">
      <a
        onClick={() => signIn()}
        href="#"
        className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
        role="menuitem"
        tabIndex={-1}
        id="user-menu-item-2"
      >
        Register / Sign in
      </a>
    </div>
  );
};

export default LoggedOutSection;
