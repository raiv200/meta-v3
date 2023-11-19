import { v4 as uuidv4 } from "uuid";
import { getUserData } from "../../../utlis/data";

const authToken = process.env.META_AUTH_TOKEN;
// const accountId = process.env.META_ACCOUNT_ID;
const baseUrl = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";
const API_URL = `${baseUrl}/users/current/accounts`;
const transactionId = uuidv4().slice(0, 32);

export const dynamic = "force-dynamic"

const headers = {
  "Content-Type": "application/json",
  'Accept': "application/json",
  "auth-token": authToken,
  "transaction-id": transactionId,
};

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    // console.log("New Request Body ---> ", JSON.stringify(requestBody));
    // console.log(transactionId, transactionId.length)

    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    // console.log("Response after Creating account 1 --->", response);
    if (response.status === 400) {
      // console.log("Create Account Request Failed !!!", response);
      return Response.json(
        {
          message: "Something went wrong!! Please Chekc Provided Credentials.",
        },
        { status: 400 }
      );
    }

    const accountResponse = await response.json();
    const { id, state } = accountResponse;


    const newUserAccountDB = {
      accountId: id,
      state: state,
    };

    console.log("New User Account for DB --->", newUserAccountDB);

    return Response.json(newUserAccountDB, { status: 200 });
  } catch (error) {
    console.error("Fetch error From Inside Create-Account Post:", error);
  }

  return Response.json(
    { message: "Some Error Occured From POST Create Account !!" },
    { status: 404 }
  );
}
