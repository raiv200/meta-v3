"use client";

import React from "react";
import FormatDateTime from "../../../../utlis/formattedDate";

export default function ForexTradeHistoryDataTable({
  forexTradesHistoryData,
}) {

  // console.log("From Inside Trade History Table",forexTradesHistoryData)
  return (
    <>
      {forexTradesHistoryData?.length === 0 ? (
        <div className="  w-full sm:max-h-[670px]">
          No Trade History Found!!
        </div>
      ) : (
        <div className="relative  w-full sm:max-h-[670px] custom-scroll   overflow-auto shadow-md ">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
              <tr>
              <th scope="col" className="px-2 py-3">
                  Account Name
                </th>
                <th scope="col" className="px-2 py-3">
                  Symbol
                </th>
                <th scope="col" className="px-2 py-3">
                  Deal Id
                </th>
                <th scope="col" className="px-2 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-2 py-3">
                  Time
                </th>
                <th scope="col" className="px-2 py-3">
                  Type
                </th>
                <th scope="col" className="px-2 py-3">
                  Entry Type
                </th>
                <th scope="col" className="px-2 py-3">
                  Volume
                </th>

                <th scope="col" className="px-2 py-3">
                  Price
                </th>
                <th scope="col" className="px-2 py-3">
                  Commision
                </th>
                <th scope="col" className="px-2 py-3">
                  Swap
                </th>
                <th scope="col" className="px-2 py-3">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody>
              {forexTradesHistoryData?.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white border-b font-medium text-gray-900  hover:bg-gray-50"
                >
                  <td className="px-2 py-4   min-w-[150px]">{data.account_name}</td>
                  <td className="px-2 py-4   min-w-[150px]">{data.symbol}</td>
                  <td className="px-2 py-4 min-w-[150px]">{data.deal_id}</td>
                  <td className="px-2 py-4 min-w-[150px]">{data.order_id}</td>
                  <td className="px-2 py-4 min-w-[150px]">{FormatDateTime(data.time)}</td>
                  <td className={`px-2 py-4 min-w-[150px] `}>
                    <span
                      className={`py-1 px-2 text-xs rounded-full ${
                        data.type.includes("BUY")
                          ? "bg-green-500 text-gray-100 rounded-full"
                          : data.type.includes("SELL")
                          ? "bg-red-500 text-gray-100 rounded-full"
                          : ""
                      }`}
                    >
                      {data.type}
                    </span>
                  </td>
                  <td className="px-2 py-4 min-w-[150px]">{data.entry_type}</td>
                  <td className="px-2 py-4 min-w-[150px]">{data.volume}</td>
                  <td className="px-2 py-4 min-w-[150px]">{data.price}</td>
                  <td className="px-2 py-4 min-w-[150px]">{data.commission}</td>
                  <td className="px-2 py-4 min-w-[150px]">{data.swap}</td>
                  <td className="px-2 py-4 min-w-[150px]">{data.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

{
  /* <div className="w-full p-4 space-y-8">
<div className="flex flex-col   w-[190px] ">
  <button
   onClick={() => {
    fetchTradeHistory()
    toast.promise(
      fetchTradeHistory(),
      {
        loading: "Fetching Trade History ...",
        success:() =>  `Trade History Fecthed !! `,
        error: () => `Fetching Trade History Failed !!`,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
      }
    );
    router.refresh()
  }}
    className={`flex w-full  cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
  >
    Fetch Trade History
  </button>
</div>

{userTradeHistory.length > 0 ? (
  <TradeHistoryDataTable userTradeHistory={userTradeHistory} />
) : (
  <div>No Trade History Found!!</div>
)}
</div> */
}
