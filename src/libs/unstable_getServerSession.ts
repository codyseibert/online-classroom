import { unstable_getServerSession as getServerSession } from 'next-auth';
import { getMockRole } from '../pages/api/mock-role';
import { getMockUser } from './mockUser';

export const unstable_getServerSession = async (req, res, authOptions) => {
  if (process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH) {
    return {
      user: getMockUser(await getMockRole()),
    };
  } else {
    return getServerSession(req, res, authOptions);
  }
};
