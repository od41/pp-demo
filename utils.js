const isClient = typeof window !== "undefined";

// TODO; remove all of these to the other lib folder

// Function to create a cookie
export const setClientCookie = (name, value, days) => {
  if (isClient) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
};

// Function to retrieve a cookie by name
export const getClientCookie = (name) => {
  if (isClient) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
  }
  return null;
};

// Function to delete a cookie by name
export const deleteClientCookie = (name) => {
  if (isClient) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

export const getUserFullname = (user) =>
  user ? `${user.first_name} ${user.last_name}` : "";

export const getUserInitials = (user) =>
  user
    ? `${user.first_name} ${user.last_name}`
        .split(" ")
        .map((name) => name.substring(0, 1))
        .join("")
        .toUpperCase()
    : "";

export const IS_CLIENT = typeof window != "undefined";

export const splitStringIntoStringAndNumber = (inputString) => {
  const stringPart = (inputString && inputString?.match(/[a-zA-Z]+/)[0]) || "";
  const numberPart = (inputString && inputString?.match(/\d+/)[0]) || "";
  return [stringPart, numberPart];
};

export const parseCurrencyAndNumber = (currency_and_number) => {
  // const [currency, value] = splitStringIntoStringAndNumber(currency_and_number);

  // return `${currency} ${parseFloat(value)?.toLocaleString("en-US")}`;

  //new logic for John to fix

  let stringArray = currency_and_number && currency_and_number?.split(" ");
  let amountToReturn = stringArray.length === 2 ? currency_and_number : "GHS 0";
  const numericalPart = parseFloat(amountToReturn.replace("GHS ", ""));
  const formattedAmount = "GHS " + numericalPart.toLocaleString("en-US");
  // console.log("amountToReturn", amountToReturn)
  return formattedAmount;
};
export function formatCurrency(str) {
  // Check if the string starts with "GHS" followed by digits
  if (str.startsWith("GHS")) {
    // Extract the numeric part and add a space after "GHS"
    const numericPart = str.slice(3); // Slice from index 3 to the end
    return "GHS " + numericPart;
  }
  return str; // Return the original string if it doesn't start with "GHS"
}
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // return `${year}-${month}-${day}+${hours}:${minutes}:${seconds}`;
  return `${year}-${month}-${day}`;
}

export const getPaymentTransactionStatus = (transaction_status) => {
  if (transaction_status === "FAILEDON") {
    return "FAILED";
  } else if (transaction_status === "WILLPROCESSON") {
    return "PENDING";
  } else if (transaction_status === "PROCESSEDON") {
    return "SUCCESSFUL";
  } else {
    return transaction_status;
  }
};

export const copyToClipboard = async (text) => {
  if (typeof navigator !== "undefined") {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      // TODO: provide fallback
      return null;
    }
  }
};

export const formatDateObject = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function displayDate(dateString) {
  const currentDate = new Date(dateString);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
  };
  return currentDate.toLocaleString("en-US", options).replace(/,/g, "");
}

export function storeItemInLocalStorage(key, value) {
  if (typeof key !== "string") {
    throw new Error("The key must be a string");
  }

  // Convert the value to a JSON string before storing
  const stringValue = JSON?.stringify(value);

  // Store the stringified value in local storage
  localStorage?.setItem(key, stringValue);
}

export function getItemFromLocalStorage(key) {
  if (typeof key !== "string") {
    throw new Error("The key must be a string");
  }

  // Ensure localStorage is available
  if (typeof window === "undefined" || !window.localStorage) {
    console.error("localStorage is not available");
    return null;
  }

  // Get the stringified value from local storage
  const stringValue = localStorage.getItem(key);
  // console.log("stringValue:", stringValue);

  // Parse and return the value, or null if the key doesn't exist
  if (stringValue) {
    try {
      return JSON?.parse(stringValue);
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return null;
    }
  }

  return null;
}

export function removeItemFromLocalStorage(key) {
  if (typeof key !== "string") {
    throw new Error("The key must be a string");
  }
  localStorage?.removeItem(key);
}

export function extractCurrencyAmount(str) {
  const regex = /(\d+)\s*[€£$]?/;
  const match = str.match(regex);
  return match ? match[1] : null;
}

export const getEntityInitials = (fullname, limit = 2) =>
  fullname
    ? fullname
        .split(" ")
        .slice(0, limit)
        .map((name) => name.substring(0, 1))
        .join("")
        .toUpperCase()
    : "";
