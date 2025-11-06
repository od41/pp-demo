import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GoogleIcon from "../icons/google-icon";
import { usePayment } from "@/hooks/usePayment";

type PaymentFormProps = {
  toggleForm?: (e: any) => void;
  standalone?: boolean;
};

export const PaymentForm = ({}: PaymentFormProps) => {
  const [cardNumber, setCardNumber] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const {
    showPaymentModal,
    setShowPaymentModal,
    paymentLoading,
    setPaymentLoading,
    goToPayment,
  } = usePayment();

  const handlePayment = async (amount: number) => {
    setPaymentLoading(true);
    try {
      const BASE_URL = process.env.BASE_URL;

      await goToPayment(`${BASE_URL}/purchases`);
      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
    }
  };

  const FormContent = (
    <div className="flex flex-col space-y-5">
      <div className="">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="Card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full bg-transparent border border-grey_100 rounded-md font-inter focus:outline-none h-12 px-4 text-white text-base placeholder-[#ACACAC] mt-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            id="expirationDate"
            type="text"
            placeholder="MM/YY"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full bg-transparent border border-grey_100 rounded-md font-inter focus:outline-none h-12 px-4 text-white text-base placeholder-[#ACACAC] mt-2"
          />
        </div>
        <div className="">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="password"
            placeholder="123"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full bg-transparent border border-grey_100 rounded-md font-inter focus:outline-none h-12 px-4 text-white text-base placeholder-[#ACACAC] mt-2"
          />
        </div>
      </div>

      <Button
        variant="default"
        className="w-full font-medium rounded-md flex items-center justify-center h-12"
        onClick={(e) => {
          e.preventDefault();
          handlePayment(200);
        }}
      >
        {paymentLoading ? (
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <span className=" text-white font-bold text-[16px] leading-[12px]">
            Pay
          </span>
        )}
      </Button>
    </div>
  );

  const Content = (
    <>
      <h2 className="text-2xl text-left leading-[24px] mb-4">
        Load account to make payment
      </h2>
      <div className="h-[1px] w-full bg-[#3A3A3A] mb-6" />
      {FormContent}
      <p className="text-[#ACACAC] mt-6 text-sm">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </p>
    </>
  );

  return Content;

  return (
    <>
      {/* <Button
        variant="outline"
        className="border-none hover:text-white/90 hover:bg-transparent"
        onClick={() => setShowPaymentModal(true)}
      >
        Fund wallet
      </Button> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Fund wallet</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-md bg-[#1A1A1A] p-8">
          <DialogHeader className="space-y-0">{Content}</DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
