import React, { ReactNode } from 'react';

export const Table = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-400">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-500">
        {rows.map((row, rowIndex) => {
          return (
            <tr
              key={rowIndex}
              className="hover:bg-blue-50 dark:hover:bg-gray-700"
            >
              {row.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {column}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
