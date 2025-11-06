import React, { useState, useEffect, useRef } from "react";
import Seo from "@/shared/seo/seo";
import { fetchChatHistoryTitlesAndIds } from "@/api/chat";
import RichTextEditor from "@/components/rich-text-editor";
import { useAuth } from "@/hooks/useAuth";
import BotResponseTwo from "@/components/features/chats/bot-response";
import UserResponse from "@/components/features/chats/user-response";
import TimeLoader from "@/components/loaders/time-loader";
import { cardData } from "@/data/icons";
import Cards from "@/components/cards";
import { useRouter } from "next/router";
import LoaderIcon from "@/components/icons/loader-icon";
import { PaymentForm } from "@/components/forms/payment";
import Button from "@/components/button";
import { createCheckoutSession } from "@/api/payment";
import Portal from "@/components/portal";
import Modal from "@/components/modals/auth-modal";
import { usePayment } from "@/hooks/usePayment";
import { ScrollArea } from "@/components/ui/scroll-area";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PurchasesPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { showPaymentModal, setShowPaymentModal } = usePayment();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
  }, [user]);

  const handleCheck = () => {
    console.log("check");
  };

  const handleFundWallet = async (e: any) => {
    e.preventDefault();
    const url = `${BASE_URL}/purchases`;
    try {
      const response = await createCheckoutSession(1000, url);
      console.log("fund wallet response", response);
      const { url: appUrl } = response;
      window.location.href = appUrl;
    } catch (error) {
      console.error("Fund wallet error:", error);
    }
  };

  if (!user) {
    router.push("/");
    return;
  }

  return (
    <div className="container w-full h-full overflow-y-scroll flex items-center justify-center scrollbar-hide pt-5 md:pt-0">
      <div className=" flex flex-col h-full w-full md:max-w-[905px] py-8 pt-[80px]">
        <Seo title="Purchases" />
        <div className={`flex flex-col mb-4`}>
          <div className="flex items-center justify-between">
            <p className="text-[24px] md:text-[32px] font-bold">Purchases</p>
            <Button
              onClick={() => setShowPaymentModal(true)}
              className="rounded-full p-5 hover:bg-black_100"
            >
              Fund wallet
            </Button>

            {showPaymentModal && (
              <Portal portalId={"dialog-portal"}>
                <div>
                  <Modal
                    id="hs-vertically-centered-modal"
                    title="Fund your wallet"
                    toggleModal={() => setShowPaymentModal(!showPaymentModal)}
                  >
                    <PaymentForm />
                  </Modal>
                </div>
              </Portal>
            )}
          </div>
        </div>
        <hr className={`border-b border-black_100 mb-10`} />
        <ScrollArea className="h-[calc(100vh-80px-43px-64px-32px)] flex justify-center">
          <div className="p-4 bg-black_100 rounded-sm mb-8">
            <div className="flex items-center justify-between w-full">
              <span>Your balance: </span>
              <span>$0</span>
              {/* // TODO add actual balance */}
            </div>
          </div>
          <center className=" py-10 w-full bg-black_200 rounded-sm">
            <h5 className="text-xl ">No purchases yet</h5>
          </center>
        </ScrollArea>
      </div>
    </div>
  );
};

PurchasesPage.layout = "AuthenticatedLayout";

export default PurchasesPage;
