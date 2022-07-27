import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: SessionUser & DefaultUser;
  }

  interface SessionUser {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
  }
}
