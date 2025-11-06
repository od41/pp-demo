import React, { useState, useEffect, useRef, useCallback } from "react";
import Seo from "@/shared/seo/seo";
import RichTextEditor from "@/components/rich-text-editor";
import { useAuth } from "@/hooks/useAuth";
import BotResponse from "@/components/features/chats/bot-response";
import UserResponse from "@/components/features/chats/user-response";
import TimeLoader from "@/components/loaders/time-loader";
import { cardData } from "@/data/icons";
import Cards from "@/components/cards";
import { useRouter } from "next/router";
import LoaderIcon from "@/components/icons/loader-icon";
import { useToast } from "@/components/ui/use-toast";
import { useChat } from "@/hooks/useChat";
import { getItemFromLocalStorage, removeItemFromLocalStorage } from "@/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WrappedRichTextEditor } from "@/components/wrapped-rich-text-editor";

const Chats = () => {
  const firstUserPrompt = getItemFromLocalStorage("firstUserPrompt");

  const router = useRouter();
  const { id } = router.query;
  const chatSessionId = id as string;
  //   console.log("cid", router.query);
  const { prompt } = router.query;
  const myRef = useRef<null | HTMLDivElement>(null);
  const { toast } = useToast();
  const [userInput, setUserInput] = useState<string>();

  const {
    sendPrompt,
    botLoading,
    socketConnLoading,
    chatResponseHistory,
    socketConnection,
    wsConnect,
  } = useChat();
  const { user } = useAuth();

  const scrollToBottom = () => {
    if (myRef.current && !chatResponseHistory) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUserInput = (value: string) => {
    setUserInput(value);
  };

  const handleSubmit = async (userInput: any) => {
    try {
      await sendPrompt(userInput);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [botLoading, chatResponseHistory]);

  useEffect(() => {
    // check for chatsessionid
    if (!chatSessionId) {
      // show toast
      return;
    }

    // if chatSessionId is valid, initiate a new WS connection
    if (!socketConnection || socketConnection.readyState !== WebSocket.OPEN) {
      wsConnect(chatSessionId);
    }
  }, [chatSessionId]);

  useEffect(() => {
    if (socketConnection && socketConnection.readyState === WebSocket.OPEN) {
      const sendFirstPrompt = async () => {
        console.log("inside async function");
        await handleSubmit(firstUserPrompt);
      };
      if (firstUserPrompt) {
        sendFirstPrompt();
        removeItemFromLocalStorage("firstUserPrompt"); // ensures that this runs only once
      }
    }
  }, [firstUserPrompt, socketConnection, socketConnection?.readyState]);

  // add end point to load up a past conversation if it's not available

  if (!user) {
    router.push("/");
    return null;
  }

  // console.log("chatSessionId", chatSessionId); // TODO its undefined outside the auth-context file
  // if (!isChatLoaded) {
  //   return (
  //     <div className="container w-full h-[100vh] flex items-center justify-center">
  //       <div className=" flex flex-col h-full w-full md:max-w-[831px]">
  //         <Seo title="Chats" />
  //         <center className="mt-60">
  //           <div className="text-lg">404</div>
  //           <div className="text-grey_100">No chat history found</div>
  //         </center>
  //       </div>
  //     </div>
  //   );
  // }

  const showChatView = chatResponseHistory && chatResponseHistory.length >= 1;

  const isLoading = socketConnLoading;

  return (
    <div className="container w-full h-full flex items-center justify-center">
      <div className="flex flex-col h-full w-full md:max-w-[831px] relative px-[1px]">
        <Seo title="Chat with Paul" />
        {isLoading ? (
          <center className="mt-60">
            <LoaderIcon />
          </center>
        ) : (
          <div>
            <ScrollArea className="h-[calc(100vh-140px)] md:h-[100vh] py-8 pt-[89px] flex justify-center">
              <div
                className={`flex flex-col mt-8 md:mt-0 pb-[120px] md:pb-[70px]`}
              >
                {showChatView && (
                  <>
                    {chatResponseHistory.map(
                      (messageDetails, index: number) => {
                        if (messageDetails.sender === "user") {
                          return (
                            <UserResponse
                              key={index}
                              description={messageDetails.message}
                            />
                          );
                        } else if (messageDetails.sender === "bot") {
                          const { message, isFinal, intent } = messageDetails;
                          return (
                            <BotResponse
                              key={index}
                              isFinal={isFinal!}
                              details={{}}
                              description={message}
                              intent={intent}
                              scroll={scrollToBottom}
                              onClick={(value) => {
                                console.log(value);
                                handleSubmit(value);
                              }}
                            />
                          );
                        }
                        return null;
                      }
                    )}
                    <div className="" ref={myRef}></div>
                    {botLoading && (
                      <div className="ml-[34px] md:ml-[38px] -mt-4">
                        <LoaderIcon />
                      </div>
                    )}
                  </>
                )}
              </div>
            </ScrollArea>

            <WrappedRichTextEditor
              handleSubmit={handleSubmit}
              handleUserInput={handleUserInput}
              scrollRef={myRef}
              scrollToBottom={scrollToBottom}
              userInput={userInput!}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Chats.layout = "AuthenticatedLayout";

export default Chats;
