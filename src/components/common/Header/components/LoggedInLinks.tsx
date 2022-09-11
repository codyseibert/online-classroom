import Link from 'next/link';

export const LoggedInLinks = ({ hasRole }) => {
  return (
    <>
      {hasRole && (
        <>
          <Link
            href="classrooms"
            aria-current="page"
          >
            <a className="link-secondary px-3 py-2 rounded-md text-sm font-medium">
              Classrooms
            </a>
          </Link>
          <a
            href="#"
            className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
          >
            Assignments
          </a>
          <a
            href="#"
            className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
          >
            Students
          </a>
        </>
      )}
      {!hasRole && (
        <>
          <a
            href="/welcome"
            className="link-secondary px-3 py-2 rounded-md text-sm font-medium"
            aria-current="page"
          >
            Finish Setup
          </a>
        </>
      )}
    </>
  );
};
