import { updateUserTradeStrategy } from "../../../db/postgres";

const authToken = process.env.META_AUTH_TOKEN;
const baseUrl = "https://copyfactory-api-v1.new-york.agiliumtrade.ai";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "auth-token": authToken,
};

export const dynamic = "force-dynamic"

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    // console.log("Request Body  ---> ", requestBody);

    const API_URL = `${baseUrl}/users/current/configuration/strategies/${requestBody.strategyId}`;

    // console.log("API_URL ---> ", API_URL);

    const newRequestBody = {
      name: requestBody.strategyName,
      description: requestBody.strategyDescription,
      accountId: requestBody.accountId,
    };

    const response = await fetch(API_URL, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(newRequestBody),
    });

    if (response.status === 204) {
      const result = await updateUserTradeStrategy(
        requestBody.strategyId,
        requestBody.strategyName,
        requestBody.strategyDescription
      );
      // console.log("Result After updated User Sub Account", result);

      return Response.json(
        { message: "Strategy Updated SuccessFully !!!" },
        { status: 200 }
      );
    }

    return Response.json(
      { message: "Strategy Updated Failed!!!" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Fetch error From Inside Create-Strategy Post:", error);
  }

  return Response.json(
    { message: "Some Error Occured From POST Create Strategy !!" },
    { status: 404 }
  );
}
