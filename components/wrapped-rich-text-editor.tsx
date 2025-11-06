import React from "react";
import RichTextEditor from "./rich-text-editor";
import Portal from "./portal";

type WrappedRichTextEditorProps = {
  handleUserInput: (input: string) => void;
  scrollToBottom: () => void;
  userInput: string;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  handleSubmit: (input: string) => void;
};
export const WrappedRichTextEditor = ({
  handleUserInput,
  scrollToBottom,
  userInput,
  scrollRef,
  handleSubmit,
}: WrappedRichTextEditorProps) => {
  return (
    <>
      {/* display on tablet & desktop */}
      <div className="absolute hidden md:block bg-black_300 border-black_300 bottom-0 pb-4 pt-2 w-full">
        <div className="flex-grow" ref={scrollRef}></div>
        <div className="bg-black_300">
          <RichTextEditor
            containClassName="!mt-0"
            onChange={handleUserInput}
            onSubmit={() => {
              scrollToBottom();
              handleSubmit(userInput);
            }}
            prompt={""} // leave empty for now
          />
          <div className="w-[292px] mx-auto md:w-full text-center pt-2 text-[12px] text-grey_200">
            By messaging PaulPlays, you agree to our 
            <a href="/terms" className="underline hover:text-dark_orange">
              Terms 
            </a>{" "}
            and have read our 
            <a href="/privacy" className="underline hover:text-dark_orange">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* display on mobile */}
      <Portal portalId={"dialog-portal"}>
        <div className="fixed block md:hidden bg-black_300 border-black_300 bottom-0 p-4 pt-2 w-full">
          <div className="flex-grow" ref={scrollRef}></div>
          <div className="bg-black_300">
            <RichTextEditor
              containClassName="!mt-3 text-grey_100"
              onChange={handleUserInput}
              onSubmit={() => {
                scrollToBottom();
                handleSubmit(userInput);
              }}
              prompt={""} // leave empty for now
            />
            <div className="w-[292px] mx-auto md:w-full text-center pt-2 text-[12px] text-grey_200">
              By messaging PaulPlays, you agree to our 
              <a href="/terms" className="underline hover:text-dark_orange">
                Terms 
              </a>{" "}
              and have read our 
              <a href="/privacy" className="underline hover:text-dark_orange">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default WrappedRichTextEditor;
