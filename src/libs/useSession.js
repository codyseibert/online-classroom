import { useSession as useNextAuthSession } from 'next-auth/react';
import { MOCK_USER } from './mockUser';

export const useSession = () => {
  if (process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH) {
    return {
      data: {
        user: MOCK_USER,
      },
      status: 'authenticated',
    };
  } else {
    return useNextAuthSession();
  }
};
