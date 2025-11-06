import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { sanitizePrompt, formatString, cleanString } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { getItemFromLocalStorage } from "@/utils";

const API_URL = process.env.API_URL;
const WSS_API_URL = process.env.WSS_API_URL;

type ChatMessage = {
  message?: string;
  sender: "user" | "bot";
  isFinal?: boolean;
  intent?: string;
};

type ChatContextProps = {
  sendPrompt: (prompt: any) => Promise<void>;
  startChat: (userInput: string) => Promise<boolean>;
  chatSessionId: string | undefined;
  chatResponseHistory: ChatMessage[];
  setChatResponseHistory: (arg: ChatMessage[]) => void;
  botLoading: boolean;
  setBotLoading: (arg: boolean) => void;

  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (arg: boolean) => void;
  socketConnLoading: boolean;
  setSocketConnLoading: (arg: boolean) => void;
  socketConnection: WebSocket | undefined;
  setSocketConnection: (arg: WebSocket) => void;
  getNewChatId: () => Promise<string>;
  wsConnect: (chatSessionid: string) => void;
};

const defaultProps: ChatContextProps = {
  sendPrompt: async () => {},
  startChat: async (arg = "") => {
    return false;
  },
  getNewChatId: async () => "",
  wsConnect: async (chatSessionid = "") => {},
  chatSessionId: undefined,
  chatResponseHistory: [],
  setChatResponseHistory: (arg: ChatMessage[]) => {},
  botLoading: false,
  setBotLoading: (arg: boolean) => {},
  isSidebarExpanded: false,
  setIsSidebarExpanded: (arg: boolean) => {},
  socketConnLoading: false,
  setSocketConnLoading: (arg: boolean) => {},
  socketConnection: undefined,
  setSocketConnection: (arg: WebSocket) => {},
};

export const ChatContext = createContext(defaultProps);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  let initialUserPrompt;
  // TODO save the firstuserprompt to local storage when a user clicks the prompts buttons or types a query on the landing or home pages
  const _firstUserPrompt = getItemFromLocalStorage("firstUserPrompt");
  if (_firstUserPrompt) {
    initialUserPrompt = _firstUserPrompt;
  }
  const [firstUserPrompt, setFirstUserPrompt] = useState<string | undefined>(
    initialUserPrompt
  );

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [chatSessionId, setChatSessionId] = useState<string>();
  const [chatResponseHistory, setChatResponseHistory] = useState<ChatMessage[]>(
    []
  );

  const [botLoading, setBotLoading] = useState(false);
  const [socketConnLoading, setSocketConnLoading] = useState(false);
  const [socketConnection, setSocketConnection] = useState<WebSocket>();

  const { user } = useAuth();

  /**
   * Send a user prompt for inference
   * @param prompt
   * @returns
   */
  const sendPrompt = async (prompt: any) => {
    const { input, userText } = sanitizePrompt(prompt);
    setBotLoading(true);

    const displayedMessage = formatString(userText);
    // message from the user
    setChatResponseHistory((prev) => [
      ...prev,
      { message: displayedMessage, sender: "user" },
    ]);
    // empty response for the bot
    setChatResponseHistory((prev) => [
      ...prev,
      { isFinal: false, sender: "bot" },
    ]);

    const params = {
      // TODO refactor this
      message: input,
    };

    // believe there's a valid socket connection
    socketConnection!.send(JSON.stringify(params));
  };

  const startChat = async (userInput = "Hello Paul") => {
    if (chatResponseHistory) {
      //   reset
      setChatResponseHistory([]);
      setChatSessionId(undefined);
      console.log("reset");
    }
    try {
      const _chatId = await getNewChatId();
      setChatSessionId(_chatId);
      if (_chatId) {
        await sendPrompt(userInput); // TODO sanitize input before sending to backend
        return true;
      }
    } catch (error) {
      console.log("new chat", error);
    }
    return false;

    // TODO; refactor new chat
    // call API_URL/v1/chat with the user token
    // then use the session_id returned to initiate a new WSS connection WSS_API_URL/ws/${session_id}
  };

  const getNewChatId = async () => {
    if (!user) return;
    const connectionUrl = `${API_URL}/chats`;
    const { token } = user;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
    };

    try {
      const res = await fetch(connectionUrl, requestOptions);
      if (res.ok) {
        const data: any = await res.json();
        return data.session_id;
      }
    } catch (error) {}
  };

  const handleIncomingMessage = useCallback(
    (response: { is_final: boolean; message: string }) => {
      setChatResponseHistory((prev) => {
        // Ensure prev is always an array
        const currentHistory = Array.isArray(prev) ? prev : [];

        const cleanedString = cleanString(response.message) || "";
        const botMessageIndex = currentHistory.findIndex(
          (msg) => msg.sender === "bot" && !msg.isFinal
        );

        let updatedHistory: ChatMessage[];

        if (botMessageIndex !== -1) {
          // Update existing non-final message
          updatedHistory = [...currentHistory];
          updatedHistory[botMessageIndex] = {
            ...updatedHistory[botMessageIndex],
            isFinal: response.is_final,
            intent: "",
            message:
              (updatedHistory[botMessageIndex].message || "") +
              " " +
              cleanedString,
          };
        } else {
          updatedHistory = [...currentHistory];
        }

        return updatedHistory;
      });

      if (response.is_final) {
        console.log("SOCKET RESPONSE isFinal", response);
        setBotLoading(false);
      }
    },
    []
  );

  const wsConnect = (_chatSessionid: string) => {
    if (_chatSessionid == "") return;
    if (socketConnection && socketConnection.readyState === WebSocket.OPEN)
      return;
    setSocketConnLoading(true);

    const socketUrl = `${WSS_API_URL}/ws/${_chatSessionid}`;
    const _socket = new WebSocket(socketUrl);

    _socket.onopen = () => {
      console.log("WebSocket connection established");
      setSocketConnLoading(false);
    };

    _socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        console.log("onmessage", response);
        handleIncomingMessage(response);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    _socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setBotLoading(false);
      setSocketConnLoading(false);
    };

    _socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setBotLoading(false); // Stop loading in case of error
      setSocketConnLoading(false);
    };

    setSocketConnection(_socket);
  };

  //   const handleFetchChatHistory = async (cid: string) => {
  //     setFetchingHistory(true);
  //     try {
  //       const response = await fetchChatHistory(cid);
  //       console.log("history response", response);
  //       const { links = {}, results = [] } = response || {};
  //       // setChatResponseHistory(results);
  //       setFetchingHistory(false);
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setFetchingHistory(false);
  //     }
  //   };

  return (
    <ChatContext.Provider
      value={{
        botLoading,
        setBotLoading,
        socketConnLoading,
        setSocketConnLoading,
        chatSessionId,
        chatResponseHistory,
        sendPrompt,
        startChat,
        getNewChatId,
        socketConnection,
        setSocketConnection,
        wsConnect,
        setChatResponseHistory,
        isSidebarExpanded,
        setIsSidebarExpanded,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
