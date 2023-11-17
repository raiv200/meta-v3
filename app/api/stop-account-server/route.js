import { updateUserSubAccountConnection } from "../../../db/postgres";

// API Route to Stop the account Server (Undeploy Account)

const authToken = process.env.META_AUTH_TOKEN;
const baseUrl = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";

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

    const API_URL = `${baseUrl}/users/current/accounts/${requestBody.accountId}/undeploy`;

    // console.log("API URL is", API_URL);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
    });

    if (response?.status === 204) {
      // console.log("Account Undeployed !!!--->", response);

      const result = await updateUserSubAccountConnection(
        requestBody.accountId,
        requestBody.newState,
        requestBody.connection
      );
      // console.log("Result After updated User Sub Account", result);

      return Response.json(
        { message: "Account Undeployed SuccessFull!!" },
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
  }

  return Response.json(
    {
      message: "Some Error Occured From POST Dashboard for saving user data !!",
    },
    { status: 404 }
  );
}
