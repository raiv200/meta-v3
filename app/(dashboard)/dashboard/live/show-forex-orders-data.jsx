"use client";

import React, { useState, useEffect } from "react";

import LivePositionsTable from "./live-position-table";
import OpenOrdersTable from "./open-orders-table";
import { useRouter } from "next/navigation";



export default function ShowForexOrdersData({ userId, accountId }) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("open-orders");

  const [livePositionsData,setLivePositionsData] =useState([]);
  const [openOrdersData,setOpenOrdersData] =useState([]);


  const handleChangeTabs = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div className="z-0 relative w-full h-full mt-2  overflow-hidden  border-2 border-blue-500">
      
      <div className="flex space-x-6 mb-2">
        
        <div
          onClick={() => handleChangeTabs("open-orders")}
          className={` ${
            currentTab === "open-orders" &&
            "text-gray-900 border-b-[3px] border-gray-700"
          } text-[16px] font-semibold text-gray-500  cursor-pointer transition  duration-300 ease-in `}
        >
          Open Orders
        </div>
        <div
          onClick={() => handleChangeTabs("positions")}
          className={` ${
            currentTab === "positions" &&
            "text-gray-900 border-b-[3px] border-gray-700"
          } text-[16px] font-semibold text-gray-500  cursor-pointer transition  duration-300 ease-in `}
        >
          Positions
        </div>
      </div>
      
      {/* {livePositionsData ? (
        <pre>{JSON.stringify(livePositionData, null, 2)}</pre>
      ) : (
        <p>Waiting for data...</p>
      )}
      {openOrdersData ? (
        <pre>{JSON.stringify(openOrdersData, null, 2)}</pre>
      ) : (
        <p>Waiting for data...</p>
      )} */}

      {currentTab === "positions" && (
        <LivePositionsTable livePositionsData={livePositionsData} />
      )}
      {currentTab === "open-orders" && (
        <OpenOrdersTable openOrdersData={openOrdersData} />
      )}
    </div>
  );
}
