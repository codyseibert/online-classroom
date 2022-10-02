/* eslint-disable react-hooks/rules-of-hooks */
import { useSession as useNextAuthSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getMockUser } from './mockUser';

export const useSession = () => {
  if (process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH) {
    const [mockRole, setMockRole] = useState(null);

    useEffect(() => {
      fetch('/api/mock-role')
        .then((response) => response.json())
        .then(({ role }) => {
          setMockRole(role);
        });
    }, []);

    return {
      data: getMockUser(mockRole)
        ? {
            user: getMockUser(mockRole),
          }
        : null,
      status: getMockUser(mockRole) ? 'authenticated' : 'unauthenticated',
    };
  } else {
    return useNextAuthSession();
  }
};
