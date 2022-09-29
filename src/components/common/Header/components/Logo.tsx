import Link from 'next/link';
import React from 'react';
import { useSession } from '../../../../libs/useSession';

const Logo = () => {
  const session = useSession();

  return (
    <Link
      href={
        session.data?.user.role === 'teacher' ? '/classrooms' : '/dashboard'
      }
    >
      WDJ Classroom
    </Link>
  );
};

export default Logo;
