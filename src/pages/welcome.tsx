import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import feynman from '../assets/richard-feynman.jpeg';
import student from '../assets/student.jpeg';
import { trpc } from '../utils/trpc';
import { useRouter } from 'next/router';
import { authOptions } from './api/auth/[...nextauth]';
import { reloadSession } from '../utils/reloadSession';
import { unstable_getServerSession } from '../libs/unstable_getServerSession';
import { Button, Variant } from '../components/common/Button/Button';
import { HeaderLayout } from '../layouts/HeaderLayout';

const Welcome: NextPage = () => {
  const router = useRouter();
  const { mutateAsync: setRoleAsTeacher } = trpc.useMutation(
    'auth.setRoleAsTeacher'
  );
  const { mutateAsync: setRoleAsStudent } = trpc.useMutation(
    'auth.setRoleAsStudent'
  );

  const setTeacherRole = async () => {
    await setRoleAsTeacher();
    reloadSession();
    router.push('/classrooms');
  };

  const setStudentRole = async () => {
    await setRoleAsStudent();
    reloadSession();
    router.push('/dashboard');
  };

  return (
    <>
      <Head>
        <title>sign up</title>
        <meta
          name="description"
          content="sign up now for a teacher or a student account in order to access the website"
        />
      </Head>

      <HeaderLayout>
        <main className="container m-auto">
          <div className="mx-auto flex flex-col items-center justify-center p-4 h-full">
            <h1 className="text-gray-900 dark:text-white text-4xl">
              Welcome to classroom!
            </h1>
            <p className="text-gray-900 dark:text-white">
              Before we start, click what type of user you want to be:
            </p>

            <div className="hidden sm:grid sm:grid-cols-2 gap-8 mt-10 mb-4">
              <Image
                height="300"
                className="object-cover"
                src={feynman}
                alt="A picture of Richard Feynman(well known physics professor) teaching"
              />
              <Image
                height="300"
                className="object-cover"
                src={student}
                alt="A person studying"
              />
            </div>

            <div className="hidden sm:grid grid-cols-2 gap-8 w-full">
              <div className="relative rounded flex flex-col items-center justify-center">
                <Button
                  variant={Variant.Primary}
                  onClick={setTeacherRole}
                >
                  I&apos;m a teacher
                </Button>
              </div>
              <div className="relative rounded flex flex-col items-center justify-center">
                <Button
                  onClick={setStudentRole}
                  variant={Variant.Primary}
                >
                  I&apos;m a student
                </Button>
              </div>
            </div>

            <div className="sm:hidden flex flex-col mt-8">
              <Image
                height={150}
                width={300}
                className="object-cover object-top"
                src={feynman}
                alt="A picture of Richard Feynman(well known physics professor) teaching"
              />
              <Button
                variant={Variant.Primary}
                onClick={setTeacherRole}
              >
                I&apos;m a teacher
              </Button>

              <Image
                height={150}
                width={300}
                className="object-cover"
                src={student}
                alt="A person studying"
              />

              <Button variant={Variant.Primary}>I&apos;m a student</Button>
            </div>
          </div>
        </main>
      </HeaderLayout>
    </>
  );
};

export default Welcome;

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  console.log(session);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else if (session?.user?.role) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
}
