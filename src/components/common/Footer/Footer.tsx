import { Button } from '../Button/Button';

const becomeRole = (role: string) => {
  fetch('/api/mock-role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role,
    }),
  }).then(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    location.reload();
  });
};

export const Footer = () => {
  return (
    <>
      <footer className="p-4 bg-gray-50 shadow  dark:bg-gray-900">
        <div className="container mx-auto md:flex md:items-center md:justify-between md:p-6">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-50">
            © 2022 <a className="hover:underline">WDJ</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-50 sm:mt-0">
            <li>
              <a
                href="#"
                className="mr-4 hover:underline md:mr-6 "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="mr-4 hover:underline md:mr-6"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="mr-4 hover:underline md:mr-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH && (
        <div className="bg-red-200">
          <div className="container mx-auto flex gap-2 text-black items-center">
            DEVELOPMENT ROLE SWITCHER:
            <Button
              onClick={() => {
                becomeRole('student');
              }}
            >
              student
            </Button>
            <Button
              onClick={() => {
                becomeRole('teacher');
              }}
            >
              teacher
            </Button>
            <Button
              onClick={() => {
                becomeRole('unauthenticated');
              }}
            >
              unauthenticated
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
