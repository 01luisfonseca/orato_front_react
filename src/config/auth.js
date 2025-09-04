import { getIdToken } from "firebase/auth";

export const getValidToken = async (user, token) => {
  if (!user || !token) throw new Error("No user or token provided");
  // Check if token is expired
  const jwtParts = token.split(".");
  const tokenTime = jwtParts[1] ? JSON.parse(atob(jwtParts[1])).exp : null;
  const currentTime = Math.floor(Date.now() / 1000);
  let newToken = token;
  // Obtain a new token if the current one is expired
  if (tokenTime && tokenTime < currentTime) {
    newToken = await getIdToken(user, true);
  }
  return newToken;
};
