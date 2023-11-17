import React from "react";
import ShowForexOrdersData from "./show-forex-orders-data";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUserAccount, getUserLivePositionByAccountId, getUserOpenOrdersByAccountId, getUserSubAccounts } from "../../../../db/postgres";

export default async function LiveForexPage() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  const userAccountData = await getUserAccount(email);
  const userId = userAccountData[0]?.id ? userAccountData[0]?.id : "";

  // console.log("User ID---", userId);

  const userSubAccounts = await getUserSubAccounts(userId);


  const accountId = userSubAccounts?.find(
    (user) => user.copy_factory_roles[0] === "PROVIDER"
  )?.account_id;

  // const userLivePositions = await getUserLivePositionByAccountId(
  //   userSubAccounts[0]?.account_id
  // );
  // console.log("User Libe Positons  ---", userLivePositions);

  // const userOpenOrders = await getUserOpenOrdersByAccountId(
  //   userSubAccounts[0]?.account_id
  // );
  // console.log("User Open Orders ---", userOpenOrders);

  return (
    <div className="flex flex-col relative border-2 border-red-500 w-full max-h-screen px-4 py-2">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center  w-full bg-gray-200 rounded-md h-[100px]">
          <h3 className="text-xl font-semibold text-gray-900">Live PNL</h3>
          <p className="text-3xl font-bold text-green-500">+20K</p>
        </div>
        <div className="flex flex-col items-center justify-center  w-full bg-gray-200 rounded-md h-[100px]">
          <h3 className="text-xl font-semibold text-gray-900">
            Position Count
          </h3>
          <p className="text-3xl font-bold text-gray-900">40</p>
        </div>
        <div className="flex flex-col items-center justify-center  w-full bg-gray-200 rounded-md h-[100px]">
          <h3 className="text-xl font-semibold text-gray-900">Orders Count</h3>
          <p className="text-3xl font-bold text-gray-900">20</p>
        </div>
        {/* <div className="flex flex-col items-center justify-center  w-full bg-gray-200 rounded-md h-[100px]">
          <h3 className="text-xl font-semibold text-gray-900">Portfolio Value</h3>
          <p className="text-3xl font-bold text-gray-900">2000</p>
        </div>
        <div className="flex flex-col items-center justify-center  w-full bg-gray-200 rounded-md h-[100px]">
          <h3 className="text-xl font-semibold text-gray-900">Win/Loss Ratio</h3>
          <p className="text-3xl font-bold text-gray-900">0.5</p>
        </div>
        <div className="flex flex-col items-center justify-center  w-full bg-gray-200 rounded-md h-[100px]">
          <h3 className="text-xl font-semibold text-gray-900">Accuracy</h3>
          <p className="text-3xl font-bold text-gray-900">0.9</p>
        </div> */}
      </div>

      <div className="flex flex-col flex-1 ">
        <ShowForexOrdersData
          userId={userId}
          accountId={accountId}
        
        />
      </div>
    </div>
  );
}
