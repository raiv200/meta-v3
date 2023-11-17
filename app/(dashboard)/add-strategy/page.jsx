import React from "react";
import StrategyCard from "./strategy-card";
import CreateNewStrategy from "./new-strategy";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import {
  getUserAccount,
  getUserSubAccounts,
  getUserTradeStrategy,
} from "../../../db/postgres";
import StrategyList from "./strategy-list";

export default async function AddNewStrategy() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  const userAccountData = await getUserAccount(email);
  const userId = userAccountData[0]?.id ? userAccountData[0]?.id : "";
  // console.log("User ID---", userId);

  const userSubAccounts = await getUserSubAccounts(userId);
  // console.log("User Sub Accounts---", userSubAccounts);

  const providerAccount = userSubAccounts.filter(
    (acc) => acc.copy_factory_roles[0] === "PROVIDER"
  );
  const providerAccountId = providerAccount[0]?.account_id;

  // console.log("Provider ID---", providerAccountId);

  const tradeStrategyDataList = await getUserTradeStrategy(userId);
  // console.log("Trade Strategy List -->", tradeStrategyDataList);

  return (
    <div className="flex flex-col relative   w-full">
      <div className="flex md:absolute md:top-2 md:right-4">
        <CreateNewStrategy
          userId={userId}
          providerAccountId={providerAccountId}
        />
      </div>

      {tradeStrategyDataList. length === 0 && <div>No Strategies Found!!</div>}
      
      {tradeStrategyDataList.length > 0 && (
        <StrategyList providerAccountId={providerAccountId} tradeStrategyDataList={tradeStrategyDataList} />
      )}

    </div>
  );
}
