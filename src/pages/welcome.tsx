import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import feynman from '../assets/richard-feynman.jpeg';
import student from '../assets/student.jpeg';
import Button from '../components/Button';
import { trpc } from '../utils/trpc';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

const Welcome: NextPage = () => {
  const router = useRouter();
  const { mutateAsync: setRoleAsTeacher } = trpc.useMutation('auth.setRoleAsTeacher');

  const setTeacherRole = async () => {
    await setRoleAsTeacher();
    router.push('/teacher-wizard');
  };

  return (
    <>
      <Head>
        <title>sign up</title>
        <meta name="description" content="sign up now for a teacher or a student account in order to access the website" />
      </Head>

      <Header />

      <main className="container m-auto">
        <div className='mx-auto flex flex-col items-center justify-center p-4 h-full'>
          <p className='text-gray-900'>Welcome to classroom!</p>
          <p className='text-gray-900'>Before we start, click what type of user you want to be:</p>

          <div className='hidden sm:grid sm:grid-cols-2 gap-8 mt-10'>
            <Image
              height="300"
              className='object-cover'
              src={feynman}
              alt='A picture of Richard Feynman(well known physics professor) teaching' />
            <Image
              height="300"
              className='object-cover'
              src={student}
              alt="A person studying" />
          </div>

          <div className='hidden sm:grid grid-cols-2 gap-8 w-full'>
            <div className='relative rounded flex flex-col items-center justify-center'>
              <Button
                onClick={setTeacherRole}

              >
                I&apos;m a teacher
              </Button>
            </div>
            <div className='relative rounded flex flex-col items-center justify-center'>
              <Button>
                I&apos;m a student
              </Button>
            </div>
          </div>


          <div className='sm:hidden flex flex-col mt-8'>
            <Image
              height={150}
              width={300}
              className='object-cover object-top'
              src={feynman}
              alt='A picture of Richard Feynman(well known physics professor) teaching' />
            <Button
              onClick={setTeacherRole}
            >
              I&apos;m a teacher
            </Button>

            <Image
              height={150}
              width={300}
              className='object-cover'
              src={student}
              alt="A person studying" />

            <Button>
              I&apos;m a student
            </Button>

          </div>
        </div>
      </main>
    </>
  );
};

export default Welcome;

export async function getServerSideProps(context: any) {
  const session = await getSession();

  if (!session?.user?.role) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  } else {
    return { props: {} };
  }
}