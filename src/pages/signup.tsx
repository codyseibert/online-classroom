import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from "../utils/trpc";
import feynman from '../common/assets/richard-feynman.jpg';
import student from '../common/assets/student.jpg';
const SignUp: NextPage = () => {
    return (
        <>
            <Head>
                <title>sign up</title>
                <meta name="description" content="sign up now for a teacher or a student account in order to access the website" />
            </Head>
            <main className="bg-slate-800 h-screen container">
                <div className="relative h-32">
                    <div className="text-white absolute top-0 right-0 h-16 w-16 my-5">Dark</div>
                </div>
                <div className='mx-auto flex flex-col items-center justify-center p-4'>
                    <p className='text-white'>Welcome to classroom!</p>
                    <p className='text-white'>Before we start, click what type of user you want to be:</p>
                    <div className='flex flex-row -mx-2 my-10'>
                        <div className='w-1/2 px-2 h-fit rounded overflow-hidden flex flex-col items-center justify-center'>
                            <img className='object-cover' src={feynman.src} alt='A picture of Richard Feynman(well known physics professor) teaching' />
                            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mx-auto my-4'>I'm a teacher</button>
                        </div>
                        <div className='w-1/2 h-fit px-2 rounded overflow-hidden flex flex-col items-center justify-center'>
                            <img className='object-cover' src={student.src} alt="A person studying" />
                            <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mx-auto my-4'>I'm a student</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignUp;