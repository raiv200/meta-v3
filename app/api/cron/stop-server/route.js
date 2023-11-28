import {
  getUserAccount,
  getUserSubAccounts,
  updateUserSubAccountConnection,
} from "../../../../db/postgres";

// API Route to Stop the account Server (Undeploy Account)
export const dynamic = "force-dynamic";

const authTokenNew = process.env.META_AUTH_TOKEN;
const authTokenOld = process.env.META_AUTH_TOKEN_OLD;
const baseUrl = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";

async function stopAccountServer(accountId, email) {
  const API_URL = `${baseUrl}/users/current/accounts/${accountId}/undeploy`;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "auth-token":
      email.toLowerCase() === "test@gmail.com"
        ? authTokenOld
        : email.toLowerCase() === "test3@gmail.com"
        ? authTokenNew
        : authTokenNew,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: headers,
  });

  if (response?.status === 204) {
    // console.log("Account Undeployed !!!--->", response);

    const result = await updateUserSubAccountConnection(
      accountId,
      "Undeployed",
      "Disconnected"
    );

    return response?.status;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const userAccount = await getUserAccount(email);

    const userId = userAccount[0]?.id;

    const userSubAccounts = await getUserSubAccounts(userId);

    let isAllServerStopped = false;

    for (const user of userSubAccounts) {
      const serverStatus = await stopAccountServer(user.account_id, email);

      if (serverStatus === 204) {
        isAllServerStopped = true;
      }
    }
    if (isAllServerStopped) {
      console.log("All Server Stopped Successfully !!!");
      return Response.json(
        {
          message: "All Server Stopped Successfully !!!",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        message: "Server Stop Failed !!!",
      },
      { status: 400 }
    );
  } catch (err) {
    console.error("Fetch error From Inside User Account:", err);
    return Response.json(
      {
        message:
          "Some Error Occured From POST Dashboard for saving user data !!",
      },
      { status: 404 }
    );
  }
}
