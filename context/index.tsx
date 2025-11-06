import React from "react";
import { ChatProvider } from "./chat-context";
import { AuthProvider } from "./auth-context";
import { PaymentProvider } from "./payment";

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthProvider>
      <PaymentProvider>
        <ChatProvider>{children}</ChatProvider>
      </PaymentProvider>
    </AuthProvider>
  );
};
