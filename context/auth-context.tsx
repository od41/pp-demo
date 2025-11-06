import React, { createContext, useState, useEffect, useCallback } from "react";
import { createUser, signIn, googleLogin, googleSignUp } from "@/api/user";
import { fetchDataWithToken, fetchChatHistory } from "@/api/chat";
import { createCheckoutSession } from "@/api/payment";
import {
  extractCurrencyAmount,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  storeItemInLocalStorage,
} from "@/utils";
import { useRouter } from "next/router";
import useAnalytics, { ANALYTICS_EVENTS } from "@/hooks/useAnalytics";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

interface AuthContextProps {
  refreshAuth: () => Promise<void>;
  hasSentFirstMessage: boolean;
  setHasSentFirstMessage: (arg: boolean) => void;
  showAuthModal: boolean;
  setShowAuthModal: (arg: boolean) => void;
  toggleAuthModal: () => void;

  loading: boolean;
  setLoading: (arg: boolean) => void;

  // email: string | undefined;
  // setEmail: (arg: string) => void;
  // password: string | undefined;
  // setPassword: (arg: string) => void;
  handleCreateUser: (email: string, password: string) => Promise<void>;
  authenticatingUser: boolean;
  setAuthenticatingUser: (arg: boolean) => void;
  errorAuth: string | undefined;
  successAuth: string | undefined;
  handleLoginInUser: (email: string, password: string) => Promise<void>;
  showSignUpOrLogin: "signup" | "login";
  setShowSignUpOrLogin: (arg: "signup" | "login") => void;
  displaySignUpOrLogin: (e: any) => void;
  socketToken?: string;
  handleGoogleLogin: (auth_token: string) => Promise<void>;
  handleGoogleSignUp: (auth_token: string) => Promise<void>;
  displayedMessage?: string;
  setDisplayedMessage: (arg: string) => void;
  handleToggle: (e: any) => void;
  toggle: boolean;
  user: User | undefined; // TODO define the type for a user
  logout: (originalUrl: string) => void;
  resetAuth: () => void;
}

const defaultProps: AuthContextProps = {
  refreshAuth: async () => {},
  hasSentFirstMessage: false,
  setHasSentFirstMessage: () => {},
  showAuthModal: false,
  setShowAuthModal: () => {},
  toggleAuthModal: () => {},

  loading: false,
  setLoading: () => {},

  // email: undefined,
  // setEmail: () => {},
  // password: undefined,
  // setPassword: () => {},
  handleCreateUser: async () => {},
  authenticatingUser: false,
  setAuthenticatingUser: () => {},
  resetAuth: () => {},
  errorAuth: undefined,
  successAuth: undefined,
  handleLoginInUser: async () => {},
  showSignUpOrLogin: "signup",
  setShowSignUpOrLogin: () => {},
  displaySignUpOrLogin: (e: any) => {},
  socketToken: undefined,
  handleGoogleLogin: async () => {},
  handleGoogleSignUp: async () => {},
  displayedMessage: undefined,
  setDisplayedMessage: () => {},
  handleToggle: (e: any) => {},
  toggle: false,
  user: undefined,
  logout: (originalUrl: string) => {},
};

export const AuthContext = createContext(defaultProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  let initialUserState = null;
  const userInfo = getItemFromLocalStorage("user");
  if (userInfo) {
    initialUserState = userInfo;
  }
  const [user, setUser] = useState<User | undefined>(initialUserState);

  const [toggle, setToggle] = useState(false);

  const handleToggle = (e: any) => {
    setToggle(!toggle);
  };

  const [socketToken, setSocketToken] = useState<string>();
  const [fetchingHistory, setFetchingHistory] = useState(false);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authenticatingUser, setAuthenticatingUser] = useState(false);
  const [errorAuth, setErrorAuth] = useState("");
  const [successAuth, setSuccessAuth] = useState("");
  const [showSignUpOrLogin, setShowSignUpOrLogin] = useState<
    "signup" | "login"
  >("signup");

  const [loading, setLoading] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");

  const { trackEvent } = useAnalytics();

  const refreshAuth = async () => {
    // try {
    //   const token = getItemFromLocalStorage("token");
    //   const extraInfo = await fetchDataWithToken(token);
    //   if(!extraInfo) {
    //     return false;
    //   }
    //   const { token: socketToken, expiry, user: userNumber } = extraInfo;
    //   setSocketToken(socketToken);
    //   return true;
    // } catch (e) {
    // 	return false;
    // }
  };

  // const updateUser = async (userData) => {
  // 	const stringifiedUserData = JSON.stringify(userData);
  // 	setClientCookie(USER_COOKIE_NAME, stringifiedUserData);
  // 	setUser(userData);
  // };

  /**
   * Register a new user with their email and password
   * @param email string
   * @param password string
   * @returns void
   */
  const handleCreateUser = async (email: string, password: string) => {
    setErrorAuth("");
    setSuccessAuth("");
    setAuthenticatingUser(true);
    trackEvent(ANALYTICS_EVENTS.SignUp, {email: email}); // track new signup
    const response = await createUser(email, password);
    if (response.success) {
      const { data } = response;
      console.log("data", data);
      setSuccessAuth("You have created an account successfully");
      setTimeout(() => {
        setShowAuthModal(false);
        resetAuth();
      }, 3000);

      setAuthenticatingUser(false);
    } else {
      setAuthenticatingUser(false);
      setErrorAuth(response.error);
    }
  };

  const handleLoginInUser = async (email: string, password: string) => {
    setErrorAuth("");
    setSuccessAuth("");
    setAuthenticatingUser(true);

    trackEvent(ANALYTICS_EVENTS.Login, {email: email}); // track new login

    const response = await signIn(email, password);
    if (response.success) {
      const { first_name, last_name, token } = response.data;
      const user: User = {
        firstName: first_name,
        lastName: last_name,
        email,
        token,
      };
      setUser(user);

      console.log("sucessful login", user, token);
      storeItemInLocalStorage("token", token);
      storeItemInLocalStorage("user", user);

      setAuthenticatingUser(false);
      setSuccessAuth("You have logged in successfully");
      setTimeout(() => {
        setShowAuthModal(false);
        resetAuth();
      }, 3000);
    } else {
      setAuthenticatingUser(false);
      setErrorAuth(response.error);
    }
  };

  /**
   * Reset the auth state data
   */
  const resetAuth = () => {
    setAuthenticatingUser(false);
    setErrorAuth("");
    setSuccessAuth("");
  };

  /**
   * Authenticate with Google
   * @param auth_token
   */
  const handleGoogleLogin = async (auth_token: string) => {
    setErrorAuth("");
    setSuccessAuth("");

    trackEvent(ANALYTICS_EVENTS.Login); // track new login

    try {
      const response = await googleLogin(auth_token);
      const { user, token } = response;
      setUser(user);
      const extraInfo = await fetchDataWithToken(token);
      const { token: socketToken, expiry, user: userNumber } = extraInfo || {};
      setSocketToken(socketToken);
      setSuccessAuth("You have logged in successfully");
      setTimeout(() => {
        setShowAuthModal(false);
      }, 2000);
    } catch (error: any) {
      console.error("Error:", error);
      setErrorAuth(error.message || "Something went wrong");
    }
  };


  const handleGoogleSignUp = async (auth_token: string) => {
    setErrorAuth("");
    setSuccessAuth("");

    trackEvent(ANALYTICS_EVENTS.SignUp); // track new signup

    try {
      const response = await googleSignUp(auth_token);
      const { user, token } = response;
      setUser(user);
      const extraInfo = await fetchDataWithToken(token);
      const { token: socketToken, expiry, user: userNumber } = extraInfo || {};
      setSocketToken(socketToken);
      setSuccessAuth("You have logged in successfully");
      setTimeout(() => {
        setShowAuthModal(false);
      }, 2000);
    } catch (error: any) {
      console.error("Error:", error);
      setErrorAuth(error.message || "Something went wrong");
    }
  };

  /**
   * User's session is reset
   * @param originalUrl string
   */
  const logout = (originalUrl = "/") => {
    removeItemFromLocalStorage("token");
    removeItemFromLocalStorage("user");
    trackEvent(ANALYTICS_EVENTS.Logout); // track new logout
    setSocketToken(undefined);
    setAuthenticatingUser(false);
    setUser(undefined);
    router.push(originalUrl);
  };

  const toggleAuthModal = () => {
    if (authenticatingUser) return;
    resetAuth();
    setShowAuthModal(!showAuthModal);
  };

  const displaySignUpOrLogin = (e: any) => {
    if (authenticatingUser) return;
    setAuthenticatingUser(false);
    resetAuth();
    e.preventDefault();
    if (showSignUpOrLogin === "login") {
      setShowSignUpOrLogin("signup");
    } else {
      setShowSignUpOrLogin("login");
    }
  };

  const dataToReturn = {
    refreshAuth,
    hasSentFirstMessage,
    setHasSentFirstMessage,
    showAuthModal,
    setShowAuthModal,
    toggleAuthModal,

    loading,
    setLoading,

    handleCreateUser,
    authenticatingUser,
    setAuthenticatingUser,
    errorAuth,
    successAuth,
    handleLoginInUser,
    showSignUpOrLogin,
    setShowSignUpOrLogin,
    displaySignUpOrLogin,
    socketToken,
    handleGoogleLogin,
    handleGoogleSignUp,
    displayedMessage,
    setDisplayedMessage,
    handleToggle,
    toggle,
    user,
    resetAuth,
    logout,
  };

  return (
    <AuthContext.Provider value={dataToReturn}>{children}</AuthContext.Provider>
  );
};
