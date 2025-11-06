import React, { useEffect, useState } from "react";
import Button from "@/components/button";
import Modal from "@/components/modals/centered-modal";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "@/components/avatar";
import Image from "next/image";
import router from "next/router";
import { useChat } from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";
import { usePayment } from "@/hooks/usePayment";

const isOdd = (num: number) => num % 2 !== 0;

type BotResponseProps = {
  details: any;
  description?: string;
  gdpr?: boolean;
  fundwallet?: boolean;
  delay?: number;
  onClick?: (value: any) => void;
  scroll?: () => void;
  isFinal: boolean;
  intent?: string;
};

const BotResponse = ({
  details,
  description = "",
  gdpr = false,
  fundwallet = false,
  delay = 8,
  onClick = () => {},
  scroll = () => {},
  intent,
  isFinal,
}: BotResponseProps) => {
  const { user, loading, socketToken } = useAuth();
  const { goToPayment } = usePayment();
  const {
    action_type,
    multiselect,
    message,
    buttons,
    cards,
    // intent,
    info,
    extra_info1,
    extra_info2,
    extra_info2_buttons,
    url,
  } = details || {};

  const { id: chatGroupId } = router.query;

  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isAccepted, setIsAccepted] = useState("");
  const [acceptedItems, setAcceptedItems] = useState([]);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Custom components for rendering specific elements
  const components = {
    // Render paragraphs with some padding and margin
    p: ({ node, ...props }: any) => <p className="my-2" {...props} />,
    // Render strong (bold) text with blue color
    strong: ({ node, ...props }: any) => (
      <strong className=" font-bold" {...props} />
    ),
  };

  useEffect(() => {
    if (acceptedItems.length > 0) {
      scroll();
    }
  }, [acceptedItems]);

  return (
    <div className="mb-10">
      <div className="flex items-start gap-1 md:gap-2 font-inter">
        <div className="min-w-[30px] w-7 h-7 relative">
          <Image
            src="/images/pngs/paul_logo.png"
            fill={true}
            objectFit="contain"
            alt="Paul logo"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-[20px] leading-[24px] md:text-[22px] md:leading-[27px]">
            Paul
          </p>

          {intent === "" && (
            <p className="text-[1rem] leading-[24px] md:text-[18px] md:leading-[24px] mb-6">
              <ReactMarkdown components={components}>
                {description}
              </ReactMarkdown>
              {!isFinal && <span className="blinking-cursor">|</span>}
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default BotResponse;

export function extractLinkAndWord(text: string) {
  const regex = /(\w+)\s*\[(https?:\/\/[^\]]+)\]/;
  const match = text.match(regex);
  return match ? { word: match[1], link: match[2] } : { word: "", link: "" };
}

export function removeLink(text: string) {
  return text.replace(/\[https?:\/\/[^\]]+\]/g, "");
}

export const splitString = (text: string) =>
  text?.split("\n").filter((step) => step.trim() !== "");

export const containsLink = (text: string) => {
  const regex = /\[(https?:\/\/[^\]]+)\]/;
  const match = text.match(regex);
  console.log("match", match);
  return match ? true : false;
};

type TicketPurchaseInstructionsProps = {
  textWithLink: string;
  extra_info1: any;
  extra_info2: any;
  extra_info2_buttons: any;
  url: string;
  onClick: (value: any) => void;
};

export const TicketPurchaseInstructions = ({
  textWithLink,
  extra_info1,
  extra_info2,
  extra_info2_buttons,
  url,
  onClick,
}: TicketPurchaseInstructionsProps) => {
  const sentences = splitString(textWithLink);
  const extraInfo = splitString(extra_info1);
  const updatedSentences = sentences.map(removeLink);
  const sliceFromFirstIndex = updatedSentences.slice(2);
  const { word, link } = extractLinkAndWord(updatedSentences[1]);

  return (
    <div>
      <ul className="mb-4">
        {updatedSentences.map((step, index) => (
          <li
            className="font-semibold text-[1rem] leading-[24px] md:text-[20px] md:leading-[24px] mb-6"
            dangerouslySetInnerHTML={{ __html: step }}
          >
            {/* {step} */}
          </li>
        ))}
      </ul>
      <p className="text-grey_100 font-semibold text-[1rem] leading-[19px] md:text-[20px] md:leading-[24px] mb-4">
        Begin the purchase
      </p>
      <a
        href={url || link}
        target="_blank"
        className="bg-orange p-3 rounded-[10px] !flex items-center justify-center gap-2 w-full md:w-[358px] text-[14px] md:text-[18px] mb-10"
      >
        <span> {`Begin purchase ${word ? `on ${word}` : ""}`}</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M15.8933 0.826666C15.758 0.500867 15.499 0.241966 15.1733 0.106667C15.013 0.0383453 14.8408 0.00210665 14.6666 0H1.33325C0.97963 0 0.640492 0.140476 0.390443 0.390525C0.140395 0.640573 -8.13808e-05 0.979711 -8.13808e-05 1.33333C-8.13808e-05 1.68696 0.140395 2.02609 0.390443 2.27614C0.640492 2.52619 0.97963 2.66667 1.33325 2.66667H11.4533L0.386585 13.72C0.261614 13.844 0.162422 13.9914 0.0947304 14.1539C0.0270388 14.3164 -0.0078125 14.4907 -0.0078125 14.6667C-0.0078125 14.8427 0.0270388 15.017 0.0947304 15.1794C0.162422 15.3419 0.261614 15.4894 0.386585 15.6133C0.510536 15.7383 0.658004 15.8375 0.820483 15.9052C0.982962 15.9729 1.15724 16.0077 1.33325 16.0077C1.50927 16.0077 1.68354 15.9729 1.84602 15.9052C2.0085 15.8375 2.15597 15.7383 2.27992 15.6133L13.3333 4.54667V14.6667C13.3333 15.0203 13.4737 15.3594 13.7238 15.6095C13.9738 15.8595 14.313 16 14.6666 16C15.0202 16 15.3593 15.8595 15.6094 15.6095C15.8594 15.3594 15.9999 15.0203 15.9999 14.6667V1.33333C15.9978 1.1591 15.9616 0.986963 15.8933 0.826666Z"
              fill="white"
            />
          </svg>
        </span>
      </a>
      <div className="flex items-start gap-1 md:gap-2 font-inter mb-10">
        {/* <img
          src="/images/pngs/paul_logo.png"
          alt="paul_logo"
          className="md:w-8 md:h-8 w-[30px] h-[30px]"
        /> */}
        <div className="min-w-[30px] w-7 h-7 relative">
          <Image
            src="/images/pngs/paul_logo.png"
            fill={true}
            objectFit="contain"
            alt="Paul logo"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-[20px] leading-[24px] md:text-[24px] md:leading-[29px]">
            Paul
          </p>

          <ul className="mb-4">
            {extraInfo?.map((info, index) => (
              <li className="font-semibold text-[1rem] leading-[24px] md:text-[20px] md:leading-[24px] mb-6">
                {info}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {extra_info2 && (
        <div className="flex items-start gap-1 md:gap-2 font-inter mb-10">
          <div className="min-w-[30px] w-7 h-7 relative">
            <Image
              src="/images/pngs/paul_logo.png"
              fill={true}
              objectFit="contain"
              alt="Paul logo"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[20px] leading-[24px] md:text-[24px] md:leading-[29px]">
              Paul
            </p>

            <p className="font-semibold text-[1rem] leading-[24px] md:text-[20px] md:leading-[24px] mb-4">
              {" "}
              {extra_info2}
            </p>
            <div className="flex gap gap-4 flex-wrap">
              {extra_info2_buttons.map((info: any, index: number) => {
                const { value, label } = info;
                return (
                  <Button
                    key={value}
                    // className={`md:w-[200px] w-full border border-black_100 md:px-4 md:py-2 flex items-center justify-center gap-2 text-[0.98rem] font-medium rounded-[10px] ${
                    //   index == 0 ? "bg-orange" : ""
                    // }`}
                    className={`w-45 border border-black_100 md:px-4 md:pr-6 md:py-2 flex items-center justify-center gap-2 text-[1.2rem] font-medium rounded-full ${
                      index == 0 ? "bg-white text-black_300 font-medium" : ""
                    }`}
                    onClick={() => {
                      onClick(value);
                    }}
                  >
                    {index === 0 ? (
                      <img src="/images/pngs/okay.png" alt="okay" />
                    ) : (
                      <img src="/images/pngs/naah.png" alt="no" />
                    )}
                    <span>{label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// const TicketPurchaseInstructions = ({ textWithLink }) => {
//   const message = textWithLink;
//   const regex = /\[\[?(https?:\/\/[^\]]+)\]\]?/;
//   const match = message.match(regex);
//   const linkUrl = match ? match[1] : "";

//   function removeHere(text) {
//     return text.replace(/\bhere\b/gi, "");
//   }

//   // Split the message into an array of steps
//   const stepsArray = message.split("\n").filter((step) => step.trim() !== "");
//   const steps = stepsArray[0].split(/\[\[?/);
//   // console.log(steps);
//   // console.log(linkUrl);
//   const sliceFromFirstIndex = stepsArray.slice(2);
//   // console.log(sliceFromFirstIndex);

//   return (
//     <div>
//       <p className="font-semibold text-[1rem] leading-[24px] md:text-[20px] md:leading-[24px] mb-6">
//         {stepsArray[0]}
//       </p>
//       <ul>
//         <li className="font-semibold text-[1rem] leading-[24px] md:text-[20px] md:leading-[24px] mb-6">
//           {linkUrl && (
//             <>
//               {" "}
//               1. Create an account
//               <a
//                 // key={index}
//                 href={linkUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-orange hover:underline"
//               >
//                 {` here `}
//               </a>
//             </>
//           )}
//         </li>
//         {sliceFromFirstIndex.map((step, index) => (
//           <li className="font-semibold text-[1rem] leading-[24px] md:text-[20px] md:leading-[24px] mb-6">
//             {step}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// NEEDED COMPONENTS FOR CHAT

{
  /* {fundwallet ? (
          <div className="md:max-w-[500px] ">
    <p className=" text-grey_100 font-semibold text-[1rem] leading-[19px] md:text-[20px] md:leading-[24px] mb-2">
              Add payment details
            </p>

            <Button
              type="button"
              className="bg-orange border border-black_100 px-4 pr-6 py-2 flex items-center justify-center gap-2 text-[16px] font-medium rounded-[10px] disabled:opacity-50 disabled:pointer-events-none"
              data-hs-overlay="#hs-vertically-centered-modal"
            >
              <img
                src="/images/pngs/gdpr_wallet.png"
                alt="wallet"
                className="md:size-8 size-6"
              />
              <span className=" text-[0.94rem]">Fund wallet</span>
            </Button>

            <Modal id="hs-vertically-centered-modal">
              <div>
                <img
                  src="/images/pngs/u_shield-check.png"
                  alt="shield"
                  className=" size-[80px] mb-8"
                />
                <p className="text-[20px] leading-[24px] font-semibold py-2 border-b  border-grey_100 mb-8">
                  Load account to make payment
                </p>
                <div className="w-full">
                  <form className="w-full flex flex-col gap-6 mb-6">
                    <div>
                      <label htmlFor="card" className="">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        id="card"
                        className="border border-grey_100 w-full p-3 bg-transparent rounded-sm mt-4  focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">
                        <label htmlFor="expiration" className="">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          id="expiration"
                          className="border border-grey_100 w-full p-3 bg-transparent rounded-sm mt-4  focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="cvv" className="">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          id="cvv"
                          className="border border-grey_100 w-full p-3 bg-transparent rounded-sm mt-4  focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <input
                        type="checkbox"
                        id="save"
                        className=""
                      />
                        <label htmlFor="save" className=" text-[#ACACAC]">
                        Save card details
                      </label>
                    </div>

                    <Button
                      type="button"
                      className="bg-orange border border-black_100 px-4 pr-6 py-2 flex items-center justify-center gap-2 text-[16px] font-medium rounded-[10px] disabled:opacity-50 disabled:pointer-events-none"
                      data-hs-overlay={`#hs-vertically-centered-modal`}
                    >
                      <span>Pay USD 800.00</span>
                    </Button>
                  </form>
                  <p className="text-[11px] text-[#ACACAC] font-light">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                </div>
              </div>
            </Modal>
          </div>
        ) : null} */
}

//     {hasAddOn ? (
//       <div className="md:max-w-[500px] ">
//         <p className=" text-grey_100 font-semibold text-[20px] leading-[24px] mb-2">
//           {subtitle}
//         </p>

// <img src="/images/pngs/ticket.png" alt="ticket" />

//       </div>
//     ) : null}

{
  /* {gdpr ? (
          <div className="md:max-w-[500px] ">
            <div className=" bg-black_200 p-4 md:p-8  flex flex-col gap-2 mb-7">
              <div className="flex gap-4 items-start md:items-center">
                <img
                  src="/images/pngs/gdpr_mail.png"
                  alt="bot_response"
                  className="w-15 h-15"
                />
                <p className=" text-[0.88rem] md:text-[15px] leading-[21px]">
                  PaulPlays AI is GDPR compliant, ensuring your data privacy and
                  security.
                </p>
              </div>
              <div className="flex gap-4 items-start md:items-center">
                <img
                  src="/images/pngs/gdpr_info.png"
                  alt="bot_response"
                  className="w-15 h-14"
                />
                <p className=" text-[0.88rem] md:text-[15px] leading-[21px]">
                Please note that this model is not perfect and can make mistakes.
                </p>
              </div>
              <div className="flex gap-4 items-start md:items-center">
                <img
                  src="/images/pngs/gdpr_shield.png"
                  alt="bot_response"
                  className="w-15 h-15"
                />
                <p className=" text-[0.88rem] md:text-[15px] leading-[21px]">
                  PaulPlays will occasionally send you updates about your
                  favourite sports.
                </p>
              </div>
            </div>
            <Button className=" bg-orange border border-black_100 px-4  pr-6  py-2 flex items-center justify-center gap-2 text-[0.98rem] font-medium rounded-[10px]">
              <img
                src="/images/pngs/gdpr_wallet.png"
                alt="wallet"
                className="w-8 h-8"
              />
              <span className=" text-[0.94rem]">Sounds Good, Let’s begin</span>
            </Button>
          </div>
        ) : null} */
}

//   { hasTickets &&  <div className="flex items-start mb-10 gap-2 font-inter">
//   <img
//     src="/images/pngs/paul_logo.png"
//     alt="paul_logo"
//     className="w-8 h-8"
//   />
//   <div className="flex flex-col gap-2">
//     <p className=" font-semibold text-[24px] leading-[29px]">Paul</p>
//     <p className=" font-semibold text-[20px] leading-[24px] mb-6">
//       {description}
//     </p>

//   </div>
// </div>}

{
  /* {showFundMeWallet && (
                            <Modal 
                            // toggleModal = {toggleFundMeModal}
                            id="hs-vertically-centered-modal">
                              <div>
                                <img
                                  src="/images/pngs/u_shield-check.png"
                                  alt="shield"
                                  className=" size-[80px] mb-8"
                                />
                                <p className="text-[20px] leading-[24px] font-semibold py-2 border-b  border-grey_100 mb-8">
                                  Load account to make payment
                                </p>
                                <div className="w-full">
                                  <form className="w-full flex flex-col gap-6 mb-6">
                                    <div>
                                      <label htmlFor="card" className="">
                                        Card Number
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        id="card"
                                        className="border border-grey_100 w-full p-3 bg-transparent rounded-sm mt-4  focus:outline-none"
                                      />
                                    </div>
                                    <div className="flex gap-4 items-center">
                                      <div className="flex-1">
                                        <label
                                          htmlFor="expiration"
                                          className=""
                                        >
                                          Expiration Date
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="MM/YY"
                                          id="expiration"
                                          className="border border-grey_100 w-full p-3 bg-transparent rounded-sm mt-4  focus:outline-none"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label htmlFor="cvv" className="">
                                          CVV
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="123"
                                          id="cvv"
                                          className="border border-grey_100 w-full p-3 bg-transparent rounded-sm mt-4  focus:outline-none"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                      <input
                                        type="checkbox"
                                        id="save"
                                        className=""
                                      />
                                      <label
                                        htmlFor="save"
                                        className=" text-[#ACACAC]"
                                      >
                                        Save card details
                                      </label>
                                    </div>

                                    <Button
                                      type="button"
                                      className="bg-orange border border-black_100 px-4 pr-6 py-2 flex items-center justify-center gap-2 text-[16px] font-medium rounded-[10px] disabled:opacity-50 disabled:pointer-events-none"
                                      data-hs-overlay={`#hs-vertically-centered-modal`}
                                    >
                                      <span>Pay USD 800.00</span>
                                    </Button>
                                  </form>
                                  <p className="text-[11px] text-[#ACACAC] font-light">
                                    Your personal data will be used to process
                                    your order, support your experience
                                    throughout this website, and for other
                                    purposes described in our privacy policy.
                                  </p>
                                </div>
                              </div>
                            </Modal>)} */
}
