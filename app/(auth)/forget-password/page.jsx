'use client';
import { useState } from 'react';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import {  LockKeyholeIcon } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          /> */}
          <div className="flex flex-col space-y-2.5 items-center justify-center mt-4">
              <h2 className=" text-center text-xl md:text-3xl font-bold  tracking-tight text-gray-900">
               Forget Password ?
              </h2>
              <p className=" text-center text-xs font-medium  tracking-tight text-gray-400">
              Enter your email to create new password 
              </p>
            </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="flex relative pr-3 mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='email@example.com'
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-0 block w-full rounded-md  text-md font-semibold px-3  py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                />
                <LockKeyholeIcon className="absolute right-6 top-4 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div>
              <button
                onClick={() => resetEmail()}
                disabled={!email}
                className="flex w-full disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-2.5 text-md font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              >
                Send Forgot Password Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}