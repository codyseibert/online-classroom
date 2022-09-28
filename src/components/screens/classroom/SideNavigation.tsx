import classNames from 'classnames';
import React from 'react';

export const SideNavigation = ({ tab, setTab }) => {
  const links = [
    {
      name: 'Dashboard',
      tab: 'dashboard',
    },
    {
      name: 'Assignments',
      tab: 'assignments',
    },
    {
      name: 'Students',
      tab: 'students',
    },
  ];
  return (
    <aside
      className="w-64"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          {links.map((link) => (
            <li
              key={link.name}
              onClick={() => setTab(link.tab)}
            >
              <a
                href="#"
                className={classNames(
                  'flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                  link.tab === tab ? 'text-blue-700' : 'text-gray-900'
                )}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
