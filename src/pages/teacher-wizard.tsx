/* eslint-disable linebreak-style */
/* eslint-disable semi */
import React, { useState } from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';
import FormInput from '../components/FormInput';
import Header from '../components/Header';

const TeacherWizard: NextPage = () => {

  const [form, setForm] = useState({
    courseName: '',
    enrollmentStart: null,
    enrollmentEnd: null,
    courseStart: null,
    courseEnd: null,
    courseDescription: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Head>
        <title>Create Your Online Course | Online Classroom</title>
        <meta
          name="description"
          content="sign up now for a teacher or a student account in order to access the website"
        />
      </Head>

      <Header />

      <main className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className='mt-12'>
          <h1 className="text-4xl">Create Your Online Course</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-8 max-w-2xl"
          >
            <fieldset>
              <div className="flex flex-col">
                <FormInput
                  name="courseName"
                  type="text"
                  label="Course Name"
                  placeholder="Placeholder"
                  handleChange={handleChange}
                />
              </div>
              <div className="grid w-3/4 grid-rows-2 my-4 grid-cols-2 gap-5">
                <FormInput
                  name="enrollmentStart"
                  type="date"
                  label="Enrollment Start Date"
                  handleChange={handleChange}
                />
                <FormInput
                  name="enrollmentEnd"
                  type="date"
                  label="Enrollment End Date"
                  handleChange={handleChange}
                />
                <FormInput
                  name="courseStart"
                  type="date"
                  label="Course Start Date"
                  handleChange={handleChange}
                />
                <FormInput
                  name="courseEnd"
                  type="date"
                  label="Course End Date"
                  handleChange={handleChange}
                />
              </div>
              <FormInput
                name="courseDescription"
                type="text"
                label="Description"
                placeholder="Type here"
                handleChange={handleChange}
              />
            </fieldset>
            <input
              className='flex p-2 mt-4 bg-bgPrimaryDark text-primary w-1/4 justify-center items-center text-lg rounded border border-white'
              type="submit"
              value="Create"
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default TeacherWizard;
