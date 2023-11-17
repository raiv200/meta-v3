import React from "react";
import OrderPlacementForm from "./order-placement-form";

export default function OrderPlacementPage() {
  return (
    <div className="flex flex-col relative border-2 border-red-500 w-full max-h-screen">
      <OrderPlacementForm />
    </div>
  );
}
