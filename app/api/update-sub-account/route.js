import { updateUserSubAccountInfo } from "../../../db/postgres";
import { getUserData } from "../../../utlis/data";

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

    console.log("Request Body---->",requestBody);

    const accountData = await getUserData(requestBody.accountId);
    console.log("Account Data",accountData);
    
    const currentBalance = accountData?.data?.balance;
    const equity = accountData?.data?.equity;
    const freeMargin = accountData?.data?.freeMargin;

    console.log("Balance , Equity, freeMargin",currentBalance,equity,freeMargin);

    const API_URL = `${baseUrl}/users/current/accounts/${requestBody.accountId}`;

    const newRequestBody = {
      password: requestBody.password,
      name: requestBody.name,
      server: requestBody.server,
      copyFactoryRoles:requestBody.copyFactoryRoles
    };

    const response = await fetch(API_URL, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(newRequestBody),
    });

    // console.log("Response after Updating Account --->", response);
    

    if (response.status === 204) {
      

      const result = await updateUserSubAccountInfo(
        requestBody.accountId,
        requestBody.name,
        requestBody.server,
        requestBody.region,
        requestBody.platform,
        requestBody.type,
        requestBody.magic,
        requestBody.copyFactoryRoles,
        currentBalance ? currentBalance :  requestBody.balance,
        equity ? equity :  requestBody.equity,
        freeMargin ? freeMargin :  requestBody.freeMargin
      );
  
      console.log("Result After updated User Sub Account", result);
  
      // console.log("New User Account for DB --->", requestBody);
      // console.log("New Request Body --->", newRequestBody);

      return Response.json(
        { message: "Account Updated Sucessfully!!" },
        { status: 200 }
      );
    }
    if (response.status === 400) {
      // console.log("Create Account Request Failed !!!", response);
      return Response.json(
        {
          message: "Something went wrong!! Please Check Provided Credentials.",
        },
        { status: 400 }
      );
    }

   

   

    return Response.json({message : "Account Update Failed !!!!"}, { status: 400 });
  } catch (error) {
    console.error("Fetch error From Inside Create-Account Post:", error);
  }

  return Response.json(
    { message: "Some Error Occured From POST Create Account !!" },
    { status: 404 }
  );
}
