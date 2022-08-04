import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import PageHeaderLayout from '../components/layouts/PageHeaderLayout';
import PageSectionLayout from '../components/layouts/PageSectionLayout';
import HeroBanner from '../assets/student.jpeg' // TODO: replace that with new image as hero banner for the website
import Image from 'next/image';
import Button from '../components/Button';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Online Classroom</title>
        <meta
          name="description"
          content="online classroom"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Header />
      <PageHeaderLayout>
        <div className='w-full h-full flex flex-col-reverse md:flex-row items-center space-x-5'>
          <div className='flex flex-col justify-center md:items-center md:w-1/2 h-1/2 md:shadow-lg'>
            <Image src={HeroBanner} alt='hero-banner' className='rounded-md' />
          </div>
          <div className='flex flex-col py-3 justify-between space-y-3 items-center md:w-1/2 max-h-1/2'>
            <h3 className='text-3xl md:text-5xl font-bold'>Online Classroom</h3>
            <span className='text-lg'>
              The goal of this project is to build an online classroom for teachers to upload assignments with deadlines that students can read and upload homework entries. We plan to support a chat feature, maybe a discussion board on assignments or in the classroom, ability for a teacher to upload class material, etc.
            </span>
            <span>
              random message
            </span>
            <div className='flex flex-row gap-5'>
              <Button>
                Teachers
              </Button>
              <Button>
                Students
              </Button>
              <Button>
                About
              </Button>
            </div>
          </div>
        </div>
      </PageHeaderLayout>
      <PageSectionLayout>
        <div className='flex justify-center items-center'>
          Test
        </div>
      </PageSectionLayout>
      <PageSectionLayout>
        <div className='flex justify-center items-center'>
          Test
        </div>
      </PageSectionLayout>
    </>
  );
};

export default Home;
