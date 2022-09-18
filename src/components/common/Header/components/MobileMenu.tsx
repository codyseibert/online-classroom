import Link from 'next/link';

export const MobileMenu = ({ isLoggedIn, hasRole }) => {
  return (
    <div
      className="sm:hidden"
      id="mobile-menu"
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {isLoggedIn && (
          <>
            {hasRole && (
              <>
                <a
                  href="#"
                  className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                >
                  Assignments
                </a>
                <a
                  href="#"
                  className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                >
                  Students
                </a>
              </>
            )}
            {!hasRole && (
              <Link href="/welcome">
                <a
                  className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
                  aria-current="page"
                >
                  Finish Setup
                </a>
              </Link>
            )}
          </>
        )}
        {!isLoggedIn && (
          <a
            href="#"
            className="link-secondary block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </a>
        )}
      </div>
    </div>
  );
};
