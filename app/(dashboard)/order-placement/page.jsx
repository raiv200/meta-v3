import React from "react";
import OrderPlacementForm from "./order-placement-form";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function OrderPlacementPage() {

  const session = await getServerSession(authOptions);
  

  return (
    <div className="flex flex-col relative border-2 border-red-500 w-full max-h-screen">
      <OrderPlacementForm />
    </div>
  );
}
