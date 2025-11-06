const url =
  "wss://cs-production-webservice.onrender.com/llm-websocket/WrfCfyX8kJpIIc_TEIWeV1";

const makeWebSocketRequest = ({
  userInput = "",
  responseID = 0,
  chatGroupID = "",
}) => {
  const queryParams = new URLSearchParams({
    query: userInput,
    response_id: responseID,
    chat_group_id: chatGroupID,
  } as any);

  // const socketUrl = `ws://your-websocket-url?${queryParams.toString()}`;
  const socketUrl = `${url}?${queryParams.toString()}`;
  const socket = new WebSocket(socketUrl);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    // handleIncomingMessage(message);
  };

  socket.onopen = () => {
    console.log("WebSocket connection established");
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};
