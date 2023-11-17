import { insertUserMetaAccount } from "../../../db/postgres";

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    //  console.log("New Request Body ---> ", JSON.stringify(requestBody));

     const result = await insertUserMetaAccount(requestBody);
    //  console.log("Result After Insert", result);

    return Response.json({ message: "Form Data Recieved!!", data: requestBody });
  } catch (err) {
    console.error("Fetch error From Inside Login Post:", err);
  }

  
  return Response.json(
    { message: "Some Error Occured From POST SignUp !!" },
    { status: 404 }
  );
}
