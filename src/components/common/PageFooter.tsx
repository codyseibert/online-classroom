import Link from 'next/link';
import React from 'react';
import { Footer } from 'react-daisyui';

export const PageFooter = () => {
  return (
    <Footer className="inset-x-0 bottom-0 p-10 bg-neutral text-neutral-content">
      <div>
        <Footer.Title>Teacher Services</Footer.Title>
        <Link href="/classrooms">
          <a className="link link-hover">Your Classrooms</a>
        </Link>
        <Link href="dashboard">
          <a className="link link-hover">Dashboard</a>
        </Link>
        <Link href="/browse-classrooms">
          <a className="link link-hover">Browse Classrooms</a>
        </Link>
        <Link href="/welcome">
          <a className="link link-hover">Welcome Page</a>
        </Link>
      </div>
      <div>
        <Footer.Title>Company</Footer.Title>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <Footer.Title>Legal</Footer.Title>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </Footer>
  );
};
