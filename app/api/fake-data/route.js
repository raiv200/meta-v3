const PROD_URL = "https://meta-v3.vercel.app";

const WEB_URL =
  process.env.NODE_ENV === "production" ? PROD_URL : "http://localhost:3000";


export async function POST(request) {
  if (!request.body) {
    return Response.json({ message: "No Request Body Provided!!" });
  }

  const bodyText = await request.text(); // Read the body as text
  const requestBody = JSON.parse(bodyText);

  console.log("Production Url", WEB_URL);

  const post = [
    {
      id: "a11",
      title: "First Title",
      slug: "first-title",
    },
    {
      id: "a1",
      title: "Second Title",
      slug: "second-title",
    },
  ];

  const allData = {
    userId: requestBody.userId,
    accountId: requestBody.accountId,
    data: post,
  };
  return Response.json(
    { message: "Data Found!!", data: allData },
    { status: 200 }
  );
}
