import { DashboardNav } from "../../components/dashboard-nav";
import Logo from "../../components/logo";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import {auth} from "../firebase"

export default async function Dashboardayout({ children }) {
  const session = await getServerSession(authOptions);

  // if(session){
  //   console.log("session exist");
  // }else{
  //   redirect('/login');
  // }

  // console.log("server sesion from Dashboard!!", session);

  return (
    <div className="relative flex flex-col md:grid md:grid-cols-12 min-h-screen w-full ">
      {/* Dashboard Side Bar  */}
      <div className="sticky top-0 hidden md:flex col-span-2 h-screen bg-gray-900 ">
        <aside className=" max-h-screen  w-[260px] flex-col md:flex space-y-4 py-2  bg-slate-900  ">
          <div className=" px-4 w-full">
            <Logo />
          </div>
          <DashboardNav />
        </aside>
      </div>
      <div className="sticky top-0 z-50 md:hidden flex h-[60px] bg-gray-900 "></div>

      {/* Main Dashboard  */}
      <main className=" md:col-span-10 flex flex-1 md:flex min-h-full ">
        {children}
      </main>
    </div>
  );
}
