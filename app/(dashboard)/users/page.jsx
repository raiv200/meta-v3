import React from "react";

import CreateAccountForm from "./create-account-form";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getUserAccount, getUserSubAccounts } from "../../../db/postgres";
import UserTable from "./users-table";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  const userAccountData = await getUserAccount(email);
  const userId = userAccountData[0]?.id ? userAccountData[0]?.id : "";

  // console.log("User ID---", userId);

  const userSubAccounts = await getUserSubAccounts(userId);
  // console.log("User Sub Accounts---", userSubAccounts);



  return (
    <div className="flex flex-col relative border-2 border-red-500 w-full max-h-screen">
      <div className="flex md:absolute md:top-2 md:right-4">
        <CreateAccountForm userId={userId} userSubAccounts={userSubAccounts} />
      </div>

      <div className="flex flex-col flex-1 ">
        {userSubAccounts.length === 0 && <div>No Sub Accounts Found!!</div>}
        {userSubAccounts.length > 0 && (
          <UserTable userId={userId} userSubAccounts={userSubAccounts} />
        )}
      </div>
    </div>
  );
}
