import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import feynman from '../assets/richard-feynman.jpeg';
import student from '../assets/student.jpeg';

const Welcome: NextPage = () => {
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
              <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mx-auto my-4'>Im a teacher</button>
            </div>
            <div className='relative rounded flex flex-col items-center justify-center'>
              <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mx-auto my-4'>Im a student</button>
            </div>
          </div>


          <div className='sm:hidden flex flex-col mt-8'>
            <Image
              height={150}
              width={300}
              className='object-cover object-top'
              src={feynman}
              alt='A picture of Richard Feynman(well known physics professor) teaching' />
            <button className='mb-12 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mx-auto my-4'>Im a teacher</button>

            <Image
              height={150}
              width={300}
              className='object-cover'
              src={student}
              alt="A person studying" />
            <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mx-auto my-4'>Im a student</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Welcome;