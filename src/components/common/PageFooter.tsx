import React from 'react';
import { Footer } from 'react-daisyui';

export const PageFooter = () => {
  return (
    <Footer className="inset-x-0 bottom-0 p-10 mt-12 bg-neutral text-neutral-content">
      <div>
        <Footer.Title>Services</Footer.Title>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
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
