import { PaymentContext } from "@/context/payment";
import { useContext } from "react";

// Custom hook to use the AuthContext
export const usePayment = () => useContext(PaymentContext);
