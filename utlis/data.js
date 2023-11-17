const PROD_URL = "https://meta-v3.vercel.app";

const WEB_URL =
  process.env.NODE_ENV === "production" ? PROD_URL : "http://localhost:3000";

export async function getUserData(accountId) {
  const res = await fetch(
    `${WEB_URL}/api/get-user-account/?accountId=${accountId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
}
export async function getUserOrderHistory() {
  const res = await fetch(`${WEB_URL}/api/get-order-history`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

export async function getUserPositionsData() {
  const res = await fetch(`${WEB_URL}/api/get-user-positions`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

// export async function generateStrategy() {

//   const res = await fetch(`http://localhost:3000/api/create-strategy`, {
//     method: "GET",
//     cache: "no-store",
//   });

//   const data = await res.json();
//   return data;

// }

export async function getUserPositionsDataById() {
  const res = await fetch(`${WEB_URL}/api/get-user-position-id`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

export async function addUserToDb(userAccount) {
  const res = await fetch(`${WEB_URL}/api/add-user`, {
    method: "POST",
    body: JSON.stringify(userAccount),
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

export async function addUserPositionsToDb(userPositions) {
  const res = await fetch(`${WEB_URL}/api/add-user-positions`, {
    method: "POST",
    body: JSON.stringify(userPositions),
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}
