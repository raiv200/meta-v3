"use client";

import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
  }

  router.push("/dashboard/live");

  return (
    <div className="border-2 w-full ">
      This is Dashboard Page
      <p></p>
    </div>
  );
}
