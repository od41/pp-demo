import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import Button from "@/components/button";
import { useAuth } from "@/hooks/useAuth";
import LoaderIcon from "./icons/loader-icon";
import { useChat } from "@/hooks/useChat";
import SendIcon from "./icons/send-icon";

type RichTextEditorProps = {
  containClassName?: string;
  onChange?: (value: any) => void;
  onSubmit?: (value: any) => void;
  isHome?: boolean;
  prompt?: string | string[];
};

const RichTextEditor = ({
  containClassName,
  onChange = () => {},
  onSubmit = () => {},
  isHome = false,
  prompt = "",
}: RichTextEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const modules = {
    toolbar: false,
  };

  const [text, setText] = useState(prompt);
  const {} = useAuth();
  const { botLoading, socketConnection } = useChat();

  const handleChange = (value: any) => {
    setText(value);
    onChange(removeTags(value));
  };

  const handleSubmit = (text: any) => {
    onSubmit(text);
    setText("");
  };

  const placeholderMessage = isHome
    ? "What game are you interested in?"
    : botLoading
    ? "Paul is thinking..."
    : socketConnection && socketConnection.readyState === WebSocket.OPEN
    ? "Reply to Paul"
    : "What game are you interested in?";

  // Add a key to force re-render when placeholderMessage changes
  const quillKey = useMemo(() => placeholderMessage, [placeholderMessage]);
  //default empty value for the editor
  const textFieldHasValue = text !== "<p><br></p>" && text?.length > 0;

  useEffect(() => {
    setText(prompt);
  }, [prompt]);

  return (
    <div
      className={`min-h-[56px] text-white/90 mt-10 px-3 py-[10px] md:p-4 rounded-corner_medium shadow-sm ${containClassName} flex items-end bg-black_200 border-[0.5px] border-[#706B57] border-opacity-50 rounded-[30px]`}
    >
      <div className="flex-1 max-h-40 w-full overflow-y-hidden break-words">
        <ReactQuill
          key={quillKey} // Force re-render when the placeholder changes
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!botLoading) {
                handleSubmit(text);
              }
            }
          }}
          theme="snow"
          className="border border-black-100 rounded-lg px-4 my-2"
          modules={modules}
          placeholder={placeholderMessage}
        />
      </div>
      <>
        {botLoading && !isHome ? (
          <div className="hover:cursor-wait">
            <LoaderIcon />
          </div>
        ) : (
          <>
            {textFieldHasValue ? (
              <button
                onClick={() => {
                  handleSubmit(text);
                }}
                disabled={botLoading}
              >
                {/* <img
                  src="/images/pngs/send_text.png"
                  alt="send"
                  className="size-[40px] md:size-[40px] "
                /> */}
                <SendIcon />
              </button>
            ) : (
              <SendIcon isActive={false} />
              // <img
              //   src="/images/pngs/send_button.png"
              //   alt="send"
              //   className="size-[40px] md:size-[40px] hover:cursor-not-allowed "
              // />
            )}
          </>
        )}
      </>
    </div>
  );
};

export default RichTextEditor;

export function removeTags(str: string) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export const Skeleton = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="size-2  bg-orange rounded-full animate-bounce"></div>
      <div className="size-2  bg-orange rounded-full animate-bounce animation-delay-200"></div>
      <div className="size-2  bg-orange rounded-full animate-bounce animation-delay-400"></div>
    </div>
  );
};
