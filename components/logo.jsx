"use client"

import { CandlestickChartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="items-center space-x-1.5 flex">
      <CandlestickChartIcon className="h-5 w-5 text-emerald-500" />
      <span className="flex font-bold text-lg  text-white">Meta Api</span>
    </Link>
  );
}
