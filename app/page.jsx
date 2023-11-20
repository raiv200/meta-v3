"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { SiteHeader } from "../components/navbar";
import Link from "next/link";


export default function Home() {
  const router = useRouter();

  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     console.log("Not Authenticated !!")
  //     redirect('/signin')
  //   },
  // });

  // if (!session) {
    
  //   router.push("/signin");
  //   return;
  // }

  return (
    <main className=" relative flex min-h-screen flex-col overflow-hidden ">
      {/* Navbar  */}
      <SiteHeader />
      {/* HeroSection  */}
      <section className=" flex-1 space-y-6 pb-8 pt-24 md:pb-12 md:pt-10 lg:py-32 animate-slideBottom ">
        <div className="container flex  flex-col items-center gap-4 text-center mx-auto">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-gray-900">
            Meta Api Cloud
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Revolutionize Forex Trading: Seamlessly Connect with Our API for
            Effortless Trading Success
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-900 text-gray-100 px-6 py-2 font-semibold text-md rounded-md hover:bg-gray-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      {/* Footer  */}
    </main>
  );
}
