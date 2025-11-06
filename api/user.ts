import { User } from "@/context/auth-context";
import { storeItemInLocalStorage } from "../utils";

const API_URL = process.env.API_URL;

async function callCreateUser(email: string, password: string) {
  const url = `${API_URL}/sessions/register`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
    password: password,
    first_name: "",
    last_name: "",
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(((await response.json()) as any).message);
  }
}

export async function createUser(email: string, password: string) {
  try {
    const response = await callCreateUser(email, password);
    return { success: true, data: response };
  } catch (error: any) {
    console.error("Error in API call:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
}

async function callSignIn(email: string, password: string) {
  const url = `${API_URL}/sessions/login`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  if (response.ok) {
    return await response.json();
  } else {
    const err = (await response.json()) as any;
    throw new Error(err.error);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const response = await callSignIn(email, password);
    return { success: true, data: response };
  } catch (error: any) {
    console.error("Error in API call:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
}

export async function googleLogin(token: string) {
  const url = `${API_URL}/sessions/login?google_auth=true&access_token=${token}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response: any = await fetch(url, requestOptions);
    console.log("google backend response", response);
    // const responseOrError = await response.json();
    // console.log("responseOrError", responseOrError);
    if (response.status === 200 || response.status === 201) {
      const { user, token } = response;
      storeItemInLocalStorage("token", token);
      storeItemInLocalStorage("user", user);
      return response;
    } else {
      const { errors, non_field_errors, email, password } = response || {};
      if (non_field_errors) {
        const [firstError] = non_field_errors || {};
        throw Error(firstError);
      }
      if (errors) {
        const [firstError] = errors || {};
        throw Error(firstError);
      }
      if (email) {
        const [firstError] = email || {};
        throw Error(firstError);
      }
      if (password) {
        const [firstError] = password || {};
        throw Error(firstError);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function googleSignUp(token: string) {
  const url = `${API_URL}/sessions/register/google_auth=true&access_token=${token}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: "google",
    first_name: "true",
    last_name: "",
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(url, requestOptions);
    const responseOrError = await response.json();
    if (response.status === 200 || response.status === 201) {
      const { user, token } = responseOrError;
      storeItemInLocalStorage("token", token);
      storeItemInLocalStorage("user", user);
      return responseOrError;
    } else {
      const { errors, non_field_errors, email, password } =
        responseOrError || {};
      if (non_field_errors) {
        const [firstError] = non_field_errors || {};
        throw Error(firstError);
      }
      if (errors) {
        const [firstError] = errors || {};
        throw Error(firstError);
      }
      if (email) {
        const [firstError] = email || {};
        throw Error(firstError);
      }
      if (password) {
        const [firstError] = password || {};
        throw Error(firstError);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function callVerifyNewUser(token: string) {
  const url = `${API_URL}/sessions/verify?token=${token}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(((await response.json()) as any).message);
  }
}

export async function verifyNewUser(token: string) {
  try {
    const response = await callVerifyNewUser(token);
    return { success: true, data: response };
  } catch (error: any) {
    console.error("Error in API call:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
}
