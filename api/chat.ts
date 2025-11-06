import { getItemFromLocalStorage } from "../utils";

export async function fetchDataWithToken(token: string) {
  const url = "https://cs-prod-webservice-4du6.onrender.com/api/chat/token/";
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
export async function fetchChatHistory(chatGroupID: string) {
  const url = `https://cs-prod-webservice-4du6.onrender.com/api/chat/history/?chat_group_id=${chatGroupID}`;
  const myHeaders = new Headers();
  const token = getItemFromLocalStorage("token");
  myHeaders.append("Authorization", `Token ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
export async function fetchChatHistoryTitlesAndIds() {
  const token = getItemFromLocalStorage("token");
  const url = `https://cs-prod-webservice-4du6.onrender.com/api/chat/history-titles`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);
  console.log("token", token);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    // console.log("result", result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
