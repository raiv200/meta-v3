import { getAllUserAccount, insertUserAccount } from "../../../db/postgres";

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    // console.log("New Request Body ---> ", JSON.stringify(requestBody));

    const usersAccount = await getAllUserAccount();
    // console.log("All user Account  from Database ---> ", usersAccount);

    let isUserExist = false;

    if (usersAccount.length > 0) {
      usersAccount.map((user) => {
        if (user?.email === requestBody.email) {
          isUserExist = true;
          return;
        }
      });
    }

    if (isUserExist) {
      // console.log("Yes User Exist !!!");
      return Response.json(
        { message: "User Already Exist !!", data: usersAccount },
        { status: 409 }
      );
    }

    const result = await insertUserAccount(requestBody);
    // console.log("Result After Insert", result);

    return Response.json({
      message: "Form Data Recieved!!",
      data: requestBody,
    });
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
