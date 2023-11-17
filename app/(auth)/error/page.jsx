"use client";

import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex  w-full min-h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center max-w-2xl  mx-auto">
      <div className="flex flex-col space-y-4 items-center">
        <h2 className="text-3xl text-center  sm:text-6xl font-semibold text-rose-600">
          Wrong Email & Password Provided !!
        </h2>
        <p className="text-lg text-center font-medium text-rose-400">
          Please provide a Valid Email Id and Password.
        </p>
      </div>

      <div className="flex space-x-10 mt-4">
        <Link
          href="/signup"
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        >
          Sign Up
        </Link>
        <Link href="/" className="bg-gray-700 text-white px-4 py-2 rounded-md">
          Go Back to Homepage
        </Link>
      </div>
      </div>
    </div>
  );
}
