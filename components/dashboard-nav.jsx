"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import { LogOutIcon, PlusCircleIcon, UsersIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import {useSession} from "next-auth/react"

import {
  CandlestickChartIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SheetIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const Icons = {
  dashboard: <LayoutDashboardIcon className="mr-2 h-4 w-4" />,
  add: <PlusCircleIcon className="mr-2 h-4 w-4" />,
  settings: <SettingsIcon className="mr-2 h-4 w-4" />,
  orders: <SheetIcon className="mr-2 h-4 w-4" />,
  trade: <CandlestickChartIcon className="mr-2 h-4 w-4" />,
  users:<UsersIcon className="mr-2 h-4 w-4" />
};

const sideBarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "Add Strategy",
    href: "/add-strategy",
    icon: "add",
  },
  {
    title: "Users",
    href: "/users",
    icon: "users",
  },
  {
    title: "Order Placement",
    href: "/order-placement",
    icon: "trade",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings",
  },
];

export function DashboardNav() {
  const path = usePathname();
  const session = useSession();
  const router = useRouter();
  const image = session?.data?.user?.image;
  const email = session?.data?.user?.email;


  const userName = session?.data?.user?.name ;

  if (!sideBarNavItems?.length) {
    return null;
  }

  return (
    <nav className="pt-6  grid items-start gap-3  px-2">
      {sideBarNavItems.map((item, index) => {
        const Icon = Icons[item.icon];
        return (
          item.href && (
            <div key={index}>
              <Link key={index} href={item.disabled ? "/" : item.href}>
                <div
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm  text-gray-100 font-medium  hover:bg-gray-700 hover:text-gray-300",
                    path === item.href && item.title !== "Dashboard" ? "bg-gray-700" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {Icon}
                  <span>{item.title}</span>
                </div>
              </Link>
              {item.title === "Dashboard" && (
                <div className="ml-4 mt-2 flex flex-col space-y-2">
                  <Link href="/dashboard/live">
                    <span
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm text-gray-100 font-medium hover:bg-gray-700 hover:text-gray-300",
                        path.includes("live")
                          ? "bg-gray-700"
                          : "transparent"
                      )}
                    >
                      <span>Live</span>
                    </span>
                  </Link>
                  <Link href="/dashboard/history">
                    <span
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm text-gray-100 font-medium hover:bg-gray-700 hover:text-gray-300",
                        path.includes("history")
                          ? "bg-gray-700"
                          : "transparent"
                      )}
                    >
                      <span>History</span>
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )
        );
      })}

      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:px-2 md:pr-4 absolute bottom-4 md:w-full">
        <div className="flex flex-col space-y-1 items-center   md:space-y-0 md:flex-row md:space-x-2">
          <img
            src={
              image
                ? image
                : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            }
            alt="user image"
            className="h-8 w-8 rounded-md cursor-pointer  hover:opacity-50 hover:scale-[0.98]  transition duration-200 ease-in-out"
          />
          <div className="flex">
            <p className="text-xs md:text-sm  text-white font-bold font-inter">
              {userName || userName?.length > 0 ? userName : email?.split('@')[0]}
            </p>
          </div>
        </div>
        <button
          role="button"
          onClick={() => {
            
            signOut({redirect:false}).then(() => router.push('/'));
            toast.success("Logout Successful !!", {
              duration:5000
            })
        
          } 
       
          }
          className="border-[1px]  border-gray-600  p-2 rounded-md  "
        >
          <LogOutIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    </nav>
  );
}
