import { deleteUserSubAccountInfo } from "../../../db/postgres";

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

    const API_URL = `${baseUrl}/users/current/accounts/${requestBody.accountId}`;

    // console.log("API URL is", API_URL);

    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: headers,
    });

    if (response?.status === 204) {
      // console.log("Account Deleted Response !!!--->", response);

      const result = await deleteUserSubAccountInfo(requestBody.accountId);
      // console.log("Result After Delete User Sub Account", result);

      return Response.json(
        { message: "Account Deleted SuccessFull!!" },
        { status: 200 }
      );
    }

    return Response.json(
      {
        message: "Account Deletion Failed !!!",
      },
      { status: 400 }
    );
  } catch (err) {
    console.error("Fetch error From Inside Delete User Sub Account:", err);
  }

  return Response.json(
    {
      message: "Some Error Occured From POST DEL user Sub Account !!",
    },
    { status: 404 }
  );
}
