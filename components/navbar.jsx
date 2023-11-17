"use client";

import { MainNav } from "./main-nav";
// import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };
  const open = () => {
    setShow(true);
  };

  return (
    <header className="bg-gray-900 h-[60px] sticky top-0 z-40 w-full border-b border-gray-200 px-4 sm:px-10">
      <div className="container min-w-full flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center space-x-4">
            <Link
              href="/signup"
              className="text-white bg-transparent px-2 py-1 sm:px-6 sm:py-2 font-semibold text-sm sm:text-md rounded-[4px]"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="bg-gray-100 text-gray-900 px-2 py-1  sm:px-6 sm:py-2 font-semibold text-sm sm:text-md rounded-[4px] hover:bg-gray-200"
            >
              Log In
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
