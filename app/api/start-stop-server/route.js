import { getServerSession } from "next-auth";
import {
  getUserAccount,
  getUserSubAccounts,
  updateAllSubAccountsConnection,
} from "../../../db/postgres";
import { authOptions } from "../auth/[...nextauth]/route";

// API Route to Stop the account Server (Undeploy Account)

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
    // console.log("New Request Body ---> ", requestBody);

    if (requestBody.action === "UNDEPLOY") {
      try {
        await Promise.all(
          requestBody.accountsData?.map(async (data) => {
            const API_URL_STOP = `${baseUrl}/users/current/accounts/${data.accountId}/undeploy`;

            const responseStop = await fetch(API_URL_STOP, {
              method: "POST",
              headers: headers,
            });

            if (responseStop.status === 204) {
              // console.log("Account Undeployed !!!--->", responseStop.status);
            } else {
              // console.log("Failed to undeploy account:", responseStop.status);
              // Handle the failure, e.g., throw an error or log an error message.
            }
          })
        );

        const result = await updateAllSubAccountsConnection(
          requestBody.userId,
          "Undeployed",
          "Disconnected"
        );

        return Response.json(
          { message: "All accounts undeployed successfully." },
          { status: 200 }
        );
      } catch (error) {
        // Handle any errors that might occur during the undeploy process.
        return Response.json(
          { message: "An error occurred during undeploy." },
          { status: 500 }
        );
      }
    } else if (requestBody.action === "DEPLOY") {
      try {
        await Promise.all(
          requestBody.accountsData?.map(async (data) => {
            const API_URL_START = `${baseUrl}/users/current/accounts/${data.accountId}/redeploy`;

            const responseStart = await fetch(API_URL_START, {
              method: "POST",
              headers: headers,
            });

            if (responseStart.status === 204) {
              // console.log("Account Redeployed !!!--->", responseStart.status);
            } else {
              // console.log("Failed to redeploy account:", responseStart.status);
            }
          })
        );

        const result = await updateAllSubAccountsConnection(
          requestBody.userId,
          "Deployed",
          "Connecting"
        );

        let isAllConnected = false;

        // console.log("At First Is Connected is False!!");

        try {
          await Promise.all(
            requestBody.accountsData?.map(async (data) => {
              const API_URL_ONE = `${baseUrl}/users/current/accounts`;
              // console.log("API Url Called");

              const responseForAccounts = await fetch(API_URL_ONE, {
                method: "GET",
                headers: headers,
              });

              const newData = await responseForAccounts.json();

              if (newData.length > 0) {
                const isConnected = newData.every(
                  (item) => item.connectionStatus.toLowerCase() === "connected"
                );
                isAllConnected = isConnected;
                
              }
            })
          );

          if (isAllConnected) {
            // console.log(
            //   "Is All Account Deployed From inside API ...",
            //   isAllConnected
            // );
            const result = await updateAllSubAccountsConnection(
              requestBody.userId,
              "Deployed",
              "Connected"
            );
            // console.log(
            //   "Result After updated User Sub Account Redeployed",
            //   result
            // );
            
            return Response.json(
              { message: "All accounts redeployed successfully. !!." ,status:200},
              { status: 200 }
            );
          }else{
            // console.log(
            //   "Is All Account Deployed is False ...",
            //   isAllConnected
            // );
            return Response.json(
              { message: "Server Not Connected Successfully !!." ,status:404},
              { status: 404 }
            );
          }

          
        } catch (error) {
          // Handle any errors that might occur during the undeploy process.
          return Response.json(
            { message: "An error occurred during deploy.", status:500 },
            { status: 500 }
          );
        }

        

        // return Response.json(
        //   {
        //     message: "Server Deployed Successfully",
        //   },
        //   { status: 200 }
        // );

        // return Response.json(
        //   {
        //     message: "Server Connection Taking Too Long.., Please Deploy again",
        //   },
        //   { status: 204 }
        // );
      } catch (error) {
        // Handle any errors that might occur during the redeploy process.
        return Response.json(
          { message: "An error occurred during redeploy." },
          { status: 500 }
        );
      }
    }

    return Response.json(
      {
        message: "Server Stop Failed !!!",
        status:400
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

// const responseStop = await fetch(API_URL_STOP, {
//   method: "POST",
//   headers: headers,
// });

// if (responseStop?.status === 204) {
//   console.log("Account Undeployed !!!--->", responseStop);
//   return Response.json(
//     { message: "Account Undeployed SuccessFull!!" },
//     { status: 200 }
//   );
// }

// const responseStart = await fetch(API_URL, {
//   method: "POST",
//   headers: headers,
// });

// if (responseStart?.status === 204) {
//   console.log("Account Redeployed !!!--->", responseStart);
//   return Response.json(
//     { message: "Account Redeployed SuccessFull!!" },
//     { status: 200 }
//   );
// }
