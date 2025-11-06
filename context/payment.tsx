import React, { createContext, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import useAnalytics, { ANALYTICS_EVENTS } from "@/hooks/useAnalytics";

const API_URL = process.env.API_URL;

type PaymentContextProps = {
  showPaymentModal: boolean;
  setShowPaymentModal: (arg: boolean) => void;
  paymentLoading: boolean;
  setPaymentLoading: (arg: boolean) => void;
  goToPayment: (url: string) => Promise<void>;
};

const defaultProps: PaymentContextProps = {
  showPaymentModal: false,
  setShowPaymentModal: (arg: boolean) => {},
  paymentLoading: false,
  setPaymentLoading: (arg: boolean) => {},
  goToPayment: async (url: string) => {},
};

export const PaymentContext = createContext(defaultProps);

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { user } = useAuth();
  const { trackEvent } = useAnalytics();

  const goToPayment = async (url: string) => {
    trackEvent(ANALYTICS_EVENTS.PurchaseStarted); // track a new purchase
    // setLoading(true);
    // // const url = "http://localhost:3000/consolidated/";
    // console.log("gtpayment", url);
    // try {
    //   const response = await createCheckoutSession(Number(amount), url); // TODO fix this
    //   console.log("fund wallet response", response);
    //   const { url: appUrl } = response;
    //   window.location.href = appUrl;
    // } catch (error) {
    //   console.error("Fund wallet error:", error);
    //   setLoading(false);
    // }
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentLoading,
        setPaymentLoading,
        showPaymentModal,
        setShowPaymentModal,
        goToPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
