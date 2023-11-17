import React from "react";
import {
  getUserAccount,
  getUserSubAccounts,
  getAllUserTradeHistory,
  getAllUserOrdersHistory,
} from "../../../../db/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import ShowForexHistoryData from "./show-forex-history-data";



export default async function ForexTradeHistoryPage() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  const userAccountData = await getUserAccount(email);
  // console.log("User Accounts---", userAccountData);
  const userId = userAccountData[0]?.id ? userAccountData[0]?.id : "";

  // console.log("User ID---", userId);

  const userSubAccounts = await getUserSubAccounts(userId);
  // console.log("User Sub Accounts---", userSubAccounts);

  const accountId = userSubAccounts?.find(
    (user) => user.copy_factory_roles[0] === "PROVIDER"
  )?.account_id;
  // console.log("ACC ID---", accountId);

  let userTradeHistory=[];
  let userOrdersHistory=[];

  if(accountId){
     userTradeHistory = await getAllUserTradeHistory(
      userId
    );
    // console.log("User Trade Historyyyyyyy ---", userTradeHistory);
  
     userOrdersHistory = await getAllUserOrdersHistory(
      userId
    );
    // console.log("User Order Historyyyyyyy ---", userOrdersHistory);
  }
  

  return (
    <div className="flex flex-col relative px-4 py-2 border-2 border-red-500 w-full max-h-screen">
      <div className="text-xl font-semibold text-gray-900">
        Historical Data (Forex){" "}
      </div>
      {!accountId || accountId.length < 0 ? (
        <div>No Account Created Yet! Order History Not Found!!</div>
      ) : (
        <div className="flex flex-col flex-1 mt-2 ">
          <ShowForexHistoryData
            userId={userId}
            accountId={accountId}
            forexTradesHistoryData={
              userTradeHistory.length > 0 ? userTradeHistory : []
            }
            forexOrdersHistoryData={
              userOrdersHistory.length > 0 ? userOrdersHistory : []
            }
          />
        </div>
      )}
    </div>
  );
}
