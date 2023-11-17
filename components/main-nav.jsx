"use client";

import * as React from "react";
import Link from "next/link";
import { CandlestickChartIcon } from "lucide-react";
import Logo from "./logo";

const mainNavItems = [
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
];

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Logo />
      {mainNavItems?.length ? (
        <nav className="hidden gap-6 md:flex">
          {mainNavItems?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={
                "flex items-center text-md font-medium text-gray-100 hover:text-gray-200 "
              }
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
