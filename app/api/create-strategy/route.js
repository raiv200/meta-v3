import { insertUserTradeStrategy } from "../../../db/postgres";

const authToken = process.env.META_AUTH_TOKEN;
// const accountId = process.env.META_ACCOUNT_ID;
const baseUrl = "https://copyfactory-api-v1.new-york.agiliumtrade.ai";
const API_URL_ONE = `${baseUrl}/users/current/configuration/unused-strategy-id`;

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

    // console.log("Before Json",requestBody);
    // console.log("After Stringify Json",JSON.stringify(requestBody));

    const newRequestBody = {
      name: requestBody.strategyName,
      description: requestBody.strategyDescription,
      accountId: requestBody.accountId,
    };

    // console.log("New request body,", newRequestBody);

    const response = await fetch(API_URL_ONE, {
      method: "GET",
      headers: {
        "auth-token": authToken,
      },
    });

    const strategyIdResponse = await response.json();

    // console.log("New Strategy Id --->", strategyIdResponse);

    const API_URL_TWO = `${baseUrl}/users/current/configuration/strategies/${strategyIdResponse?.id}`;

    const responseTwo = await fetch(API_URL_TWO, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(newRequestBody),
    });

    if (responseTwo.status === 204) {
      const newUserTradeStrategyData = {
        user_id: requestBody.userId,
        account_id: requestBody.accountId,
        strategy_id: strategyIdResponse?.id,
        strategy_name: requestBody.strategyName,
        strategy_description: requestBody.strategyDescription,
        created_at:requestBody.createdAt
      };

      const result = await insertUserTradeStrategy(newUserTradeStrategyData);
      // console.log("Result After Insert SuccessFull", result);

      return Response.json(
        {
          message: "Strategy Created SuccessFully !!!",
          data: newRequestBody,
          newUserTradeStrategyData: newUserTradeStrategyData,
        },
        { status: 200 }
      );
    }

    

    return Response.json(
      { message: "Strategy Creation Failed!!!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error From Inside Create-Strategy Post:", error);
  }

  return Response.json(
    { message: "Some Error Occured From POST Create Strategy !!" },
    { status: 404 }
  );
}
