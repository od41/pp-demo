import { getItemFromLocalStorage } from "../utils";


const API_URL = process.env.API_URL; 

export async function createCheckoutSession(
  amount = 10,
  currentUrl = "http://localhost:3000/consolidated/"
) {
  const url =
    `${API_URL}/api/user/checkout-session/`;
  const token = getItemFromLocalStorage("token");
  const authorizationToken = `Bearer ${token}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authorizationToken);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    amount: amount,
    current_url: currentUrl,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.status !== 200) {
      const error = await response.json();
      console.log("error", error);
      const { errors, non_field_errors } = error || {};
      const [firstError] = non_field_errors;
      throw Error("Sorry an error occured please try again later");
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
