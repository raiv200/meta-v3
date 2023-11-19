import {deleteUserTradeStrategy} from "../../../db/postgres"

const authToken = process.env.META_AUTH_TOKEN;
// const accountId = process.env.META_ACCOUNT_ID;
const baseUrl = "https://copyfactory-api-v1.new-york.agiliumtrade.ai";

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

    const { searchParams } = new URL(request.url);
    const strategyId = searchParams.get("strategyId");

    // console.log("strategy Id ", strategyId);

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    const API_URL = `${baseUrl}/users/current/configuration/strategies/${requestBody.strategyId}`;

    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "auth-token": authToken,
      },
    });

    if (response.status === 204) {
      const data = await deleteUserTradeStrategy(requestBody.strategyId);
      // console.log("Result After Strategy delete From Database !!", data);

      return Response.json(
        { message: "Strategy Deleted SuceessFully !!!", status:200 },
        { status: 200 }
      );
    }

    return Response.json(
      { message: "Strategy Deletion Failed!!!" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Fetch error From Inside Delete-Strategy Post:", error);
  }

  return Response.json(
    { message: "Some Error Occured From POST Create Strategy !!" },
    { status: 404 }
  );
}
