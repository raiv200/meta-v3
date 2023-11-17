"use client";

import React, { useEffect, useState } from "react";
import ForexTradeHistoryDataTable from "./forex-trade-history";
import ForexOrdersHistoryDataTable from "./forex-orders-history";
import { useRouter } from "next/navigation";


export default function ShowForexHistoryData({
  userId,
  accountId,
  forexTradesHistoryData,
  forexOrdersHistoryData,
}) {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState("trades-history");

  const handleChangeTabs = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div className="z-0 relative w-full h-full mt-2 overflow-hidden  border-2 border-blue-500">
      <div className="flex space-x-6 mb-4">
        <div
          onClick={() => handleChangeTabs("trades-history")}
          className={` ${
            currentTab === "trades-history" &&
            "text-gray-900 border-b-[3px] border-gray-700"
          } text-[16px] font-semibold text-gray-500  cursor-pointer transition  duration-300 ease-in `}
        >
          Trades History
        </div>
        <div
          onClick={() => handleChangeTabs("orders-history")}
          className={` ${
            currentTab === "orders-history" &&
            "text-gray-900 border-b-[3px] border-gray-700"
          } text-[16px] font-semibold text-gray-500  cursor-pointer transition  duration-300 ease-in `}
        >
          Orders History
        </div>
      </div>

      {currentTab === "trades-history" && (
        <ForexTradeHistoryDataTable
          forexTradesHistoryData={forexTradesHistoryData}
        />
      )}
      {currentTab === "orders-history" && (
        <ForexOrdersHistoryDataTable
          forexOrdersHistoryData={forexOrdersHistoryData}
        />
      )}
    </div>
  );
}
