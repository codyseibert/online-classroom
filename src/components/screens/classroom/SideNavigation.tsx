import classNames from 'classnames';
import React from 'react';
import { PaperCheckIcon } from '../../common/Icons/PaperCheckIcon';
import { PeopleIcon } from '../../common/Icons/PeopleIcon';
import { atom, useAtom } from 'jotai';

export enum TabName {
  Assignment,
  Students,
}

export const tabAtom = atom<TabName>(TabName.Assignment);

const links = [
  {
    name: 'Assignments',
    tab: TabName.Assignment,
    icon: <PaperCheckIcon />,
  },
  {
    name: 'Students',
    tab: TabName.Students,
    icon: <PeopleIcon />,
  },
];

export const SideNavigation = () => {
  const [selectedTab, setSelectedTab] = useAtom(tabAtom);

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
              onClick={() => setSelectedTab(link.tab)}
            >
              <a
                href="#"
                className={classNames(
                  'flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                  link.tab === selectedTab ? 'text-blue-700' : 'text-gray-900'
                )}
              >
                {link.icon}
                <span className="ml-3">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
