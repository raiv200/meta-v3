import { updateUserSubAccountConnection } from "../../../db/postgres";

// API Route to Restart the Account Server (Redeploy Account)

const authToken = process.env.META_AUTH_TOKEN;
const baseUrl = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";

export const dynamic = "force-dynamic"

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "auth-token": authToken,
};

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    // console.log("New Request Body ---> ", JSON.stringify(requestBody));

    const API_URL = `${baseUrl}/users/current/accounts/${requestBody.accountId}/deploy`;

    // console.log("API URL is", API_URL);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
    });

    if (response?.status === 204) {
      // console.log("Account Redeployed !!!--->", response.status);
      const result = await updateUserSubAccountConnection(
        requestBody.accountId,
        "Deployed",
        "Connecting"
      );
      // console.log("Result After updated User Sub Account", result);
    } else {
      // console.log("Failed to redeploy account:", response.status);
    }
    let isAllConnected = false;

    // console.log("At First Is Connected is False!!");

    try {
     
        const API_URL_ONE = `${baseUrl}/users/current/accounts/${requestBody.accountId}`;
        // console.log("API Url Called");

        const responseForAccounts = await fetch(API_URL_ONE, {
          method: "GET",
          headers: headers,
        });

        const newData = await responseForAccounts.json();

        // console.log("Response Account Id",newData)

        if (newData?._id) {
          const isConnected = newData?.connectionStatus.toLowerCase() === "connected" ? true : false;
          isAllConnected = isConnected;
        }


      if (isAllConnected) {
        // console.log(
        //   "Is All Account Deployed From inside API ...",
        //   isAllConnected
        // );
        const result = await updateUserSubAccountConnection(
          requestBody.accountId,
          "Deployed",
          "Connected"
        );
        // console.log("Result After updated User Sub Account Redeployed", result);

        return Response.json(
          { message: "All accounts redeployed successfully. !!.", status: 200 },
          { status: 200 }
        );
      } else {
        // console.log("Is All Account Deployed is False ...", isAllConnected);
        return Response.json(
          { message: "Server Not Connected Successfully !!.", status: 404 },
          { status: 404 }
        );
      }
    } catch (err) {
      return Response.json(
        { message: "An error occurred during deploy.", status: 500 },
        { status: 500 }
      );
    }

  } catch (err) {
    console.error("Fetch error From Inside User Account:", err);
  }

  return Response.json(
    {
      message: "Some Error Occured From POST Dashboard for saving user data !!",
    },
    { status: 404 }
  );
}
