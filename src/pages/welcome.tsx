import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import feynman from '../assets/richard-feynman.jpeg';
import student from '../assets/student.jpeg';
import Button from '../components/Button';
import { trpc } from '../utils/trpc';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { reloadSession } from '../utils/reloadSession';

type PageProps = Record<string, unknown>;

const Welcome: NextPage = () => {
  const router = useRouter();
  const { mutateAsync: setRoleAsTeacher } = trpc.useMutation('auth.setRoleAsTeacher');
  const { mutateAsync: setRoleAsStudent } = trpc.useMutation('auth.setRoleAsStudent');

  const handleSetRoleAsTeacher = async () => {
    await setRoleAsTeacher();
    reloadSession();
    router.push('/teacher-wizard');
  };

  const handleSetRoleAsStudent = async () => {
    await setRoleAsStudent();
    reloadSession();
    router.push('/student-wizard');
  };

  return (
    <>
      <Head>
        <title>Welcome | Online Classroom</title>
        <meta
          name="description"
          content="sign up now for a teacher or a student account in order to access the website"
        />
      </Head>

      <Header />

      <main className="container m-auto">
        <div className="mx-auto flex flex-col items-center justify-center p-4 h-full">
          <p className="text-gray-900">Welcome to classroom!</p>
          <p className="text-gray-900">Before we start, click what type of user you want to be:</p>

          <div className="hidden sm:grid sm:grid-cols-2 gap-8 mt-10">
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
              <Button onClick={handleSetRoleAsTeacher}>I&apos;m a teacher</Button>
            </div>
            <div className="relative rounded flex flex-col items-center justify-center">
              <Button onClick={handleSetRoleAsStudent}>I&apos;m a student</Button>
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
            <Button onClick={setRoleAsTeacher}>I&apos;m a teacher</Button>

            <Image
              height={150}
              width={300}
              className="object-cover"
              src={student}
              alt="A person studying"
            />

            <Button>I&apos;m a student</Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Welcome;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PageProps>> {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session?.user?.role) {
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
