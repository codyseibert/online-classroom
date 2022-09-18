import Link from 'next/link';

type Link = {
  href: string;
  title: string;
};

export const LoggedInLinks = ({ role }: { role: string }) => {
  const linksByRole: Record<string, Link[]> = {
    student: [
      {
        title: 'Find a Classroom',
        href: '/browse',
      },
    ],
    teacher: [
      {
        title: 'Classrooms',
        href: '/classrooms',
      },
    ],
    unauthenticated: [
      {
        href: '/welcome',
        title: 'Finish Setup',
      },
    ],
  };

  const links = linksByRole[role];

  if (!links) return null;

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current="page"
        >
          <a className="link-secondary px-3 py-2 rounded-md text-sm font-medium">
            {link.title}
          </a>
        </Link>
      ))}
    </>
  );
};
