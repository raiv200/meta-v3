import React from "react";
import FormatDateTime from "../../../../utlis/formattedDate";

export default function ForexOrdersHistoryDataTable({
  forexOrdersHistoryData,
}) {

  // console.log("From Insie Order Table",forexOrdersHistoryData)
  return (
    <>
      {forexOrdersHistoryData?.length === 0 ? (
        <div className="  w-full sm:max-h-[670px]">
          No Order History Found!!
        </div>
      ) : (
        <div className="  w-full sm:max-h-[670px] custom-scroll overflow-x-auto shadow-md ">
          <table className="text-sm  text-gray-500 ">
            <thead className=" text-xs text-left text-gray-700  uppercase bg-gray-50 ">
              <tr className="bg-gray-300">
                <th className="px-2 py-4 min-w-[150px]">Account Name</th>
                <th className="px-2 py-4 min-w-[150px]">Order Id</th>
                <th className="px-2 py-4 min-w-[150px]">Platform</th>
                <th className="px-2 py-4 min-w-[150px]">Type</th>
                <th className="px-2 py-4 min-w-[150px]">State</th>
                <th className="px-2 py-4 min-w-[150px]">Symbol</th>
                <th className="px-2 py-4 min-w-[150px]">Magic</th>
                <th className="px-2 py-4 min-w-[150px]">Time</th>
                <th className="px-2 py-4 min-w-[150px]">Broker Time </th>
                <th className="px-2 py-4 min-w-[150px]">Open Price </th>
                <th className="px-2 py-4 min-w-[150px]">Volume </th>
                <th className="px-2 py-4 min-w-[150px]">Current Volume </th>
                <th className="px-2 py-4 min-w-[150px]">Position Id </th>
                <th className="px-2 py-4 min-w-[150px]">Done Time </th>
                <th className="px-2 py-4 min-w-[150px]">Done Broker Time</th>
                <th className="px-2 py-4 min-w-[150px]">Reason</th>
                <th className="px-2 py-4 min-w-[150px]">Filling Mode</th>
                <th className="px-2 py-4 min-w-[150px]">Expiration Type</th>
                {/* <th className="px-2 py-4 min-w-[150px]">
                  Account Currency Exchange Rate
                </th> */}
              </tr>
            </thead>
            <tbody>
              {forexOrdersHistoryData?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white z-0 border-b font-medium text-gray-900 hover:bg-gray-50"
                >
                  <td className="px-2 py-4">{item.account_name}</td>
                  <td className="px-2 py-4">{item.order_id}</td>
                  <td className="px-2 py-4">{item.platform}</td>
                  <td className="px-2 py-4">
                    <span
                      className={`py-1 px-2 text-xs rounded-full ${
                        item.type.includes("BUY")
                          ? "bg-green-500 text-gray-100 rounded-full"
                          : item.type.includes("SELL")
                          ? "bg-red-500 text-gray-100 rounded-full"
                          : ""
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-2 py-4">{item.state}</td>
                  <td className="px-2 py-4">{item.symbol}</td>
                  <td className="px-2 py-4">{item.magic}</td>
                  <td className="px-2 py-4 min-w-[180px]">{FormatDateTime(item.time)}</td>
                  
                  <td className="px-2 py-4 min-w-[180px]">{FormatDateTime(item.broker_time)}</td>
                  <td className="px-2 py-4">{item.open_price}</td>
                  <td className="px-2 py-4">{item.volume}</td>
                  <td className="px-2 py-4">{item.current_volume}</td>
                  <td className="px-2 py-4">{item.position_id}</td>
                  <td className="px-2 py-4 min-w-[180px]">{FormatDateTime(item.done_time)}</td>
                  <td className="px-2 py-4 min-w-[180px]">{FormatDateTime(item.done_broker_time)}</td>
                  <td className="px-2 py-4">{item.reason}</td>
                  <td className="px-2 py-4">{item.filling_mode}</td>
                  <td className="px-2 py-4">{item.expiration_type}</td>

                  {/* <td className="px-2 py-4">
                    {item.account_currency_exchange_rate}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
