export async function authHandler(action, user) {
  const response = await fetch(
    `https://academyofdigitalindustriesbackend.onrender.com/api/v1/auth/${action}`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" },
    }
  );
  const result = await response.json();
  if (response.ok) {
    return result;
  }
  throw new Error(result.msg);
}

//  "https://academyofdigitalindustriesbackend.onrender.com/api/v1/auth/login";
