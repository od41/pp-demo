import React from "react";

interface StepperWithCheckMarkProps {
  transactions: Array<{ status: string; title: string; timestamp: string }>;
}

const StepperWithCheckMark: React.FC<StepperWithCheckMarkProps> = ({
  transactions,
}) => {
  return (
    <div className="flex items-center flex-nowrap overflow-x-auto min-w-[1100px]">
      {transactions.map((transaction, index) => {
        const isLastItem = index === transactions.length - 1;
        const transactionStatus =
          transaction.status === "initial"
            ? "bg-neutral-600"
            : transaction.status === "pending"
            ? "bg-primary"
            : "bg-success";
        return (
          <div key={index} className="w-full">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-5 h-5 ${transactionStatus} rounded-full`}
                >
                  <i className="ri-check-line text-white text-text_xs_bold"></i>
                </div>
                {!isLastItem && (
                  <div className="h-[1px] bg-neutral-100 flex-1"></div>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="leading-tight text-body_sm2_normal text-neutral-900">
                  {transaction.title}
                </h3>
                <p className=" text-text_xs_normal text-neutral-400">
                  {transaction.timestamp}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepperWithCheckMark;
