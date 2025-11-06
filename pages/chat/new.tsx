import React, { useState, useEffect, useRef } from "react";
import Seo from "@/shared/seo/seo";
import RichTextEditor from "@/components/rich-text-editor";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { cardData } from "@/data/icons";
import Cards from "@/components/cards";
import { useRouter } from "next/router";
import { storeItemInLocalStorage } from "@/utils";
import useAnalytics from "@/hooks/useAnalytics";
import { ScrollArea } from "@/components/ui/scroll-area";
import Portal from "@/components/portal";
import WrappedRichTextEditor from "@/components/wrapped-rich-text-editor";

const Chats = () => {
  const [userInput, setUserInput] = useState<string>();

  const router = useRouter();
  const myRef = useRef<HTMLDivElement | null>(null);

  const { user, setShowAuthModal } = useAuth();
  const { trackEvent, trackAIConversation } = useAnalytics();

  const {
    botLoading,
    getNewChatId,
    chatResponseHistory,
    setChatResponseHistory,
  } = useChat();

  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [botLoading]);

  if (!user) {
    // redirect to the landing page if user is NOT signed in
    router.push("/");
    return;
  }

  const handleUserInput = (value: any) => {
    setUserInput(value);
  };

  const handleSubmit = async (userInput: any) => {
    storeItemInLocalStorage("firstUserPrompt", userInput); // save first prompt from user to localstorage
    trackAIConversation(userInput); // start new conversation w/ bot
    // reset
    if (chatResponseHistory) {
      //   reset
      setChatResponseHistory([]);
      console.log("reset");
    }

    try {
      const newChatId = await getNewChatId();
      if (newChatId) {
        router.replace(`/chat/${newChatId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container w-full h-full flex items-center justify-center">
      <div className=" flex flex-col w-full h-full md:max-w-[831px] relative px-[1px]">
        <Seo title="Chats" />
        <ScrollArea className="h-[calc(100vh-140px)] md:h-[100vh] py-8 pt-[89px] pb-0 flex justify-center">
          <div className={`flex flex-col mt-8 md:mt-0`}>
            <div className="px-0 md:px-0">
              <div className="flex items-center max-w-[668px] text-[22px] leading-[28px] md:text-[30px] md:leading-[38.73px] mb-8 md:mb-14 md:text-left text-center">
                Hey &#128075;, I&apos;m Paul! Your co-pilot for delightful
                sporting and gaming experiences.
              </div>
              <div>
                <p className="md:text-[24px] md:leading-[29px] text-grey_200 font-medium mb-4 md:mb-8">
                  How can I help you today? &#128071;
                </p>
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-[22px] h-full pb-[110px] md:pb-[110px]">
                  {cardData.map((item, index) => {
                    const { description, image } = item;
                    const renderImage = `${image}${index + 1}.png`;
                    return (
                      <button
                        className=" h-[140px] md:h-[213px] cursor-pointer"
                        onClick={() => handleSubmit(description)}
                        key={index}
                      >
                        <Cards description={description} image={renderImage} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
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
    </div>
  );
};

Chats.layout = "AuthenticatedLayout";

export default Chats;
