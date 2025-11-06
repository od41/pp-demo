import React from "react";

interface UserResponseProps {
  description?: string;
}

const UserResponse: React.FC<UserResponseProps> = ({ description = "" }) => {
  return (
    <div className="flex items-start mb-10 gap-2 font-inter">
      <div className="min-w-8">
        <img
          src="/images/pngs/user_chat_icon.png"
          alt="user_chat_icon"
          className="w-8 h-8"
        />
      </div>
      <div className="flex flex-col gap-1 md:gap-2">
        <p className="font-semibold text-[20px] leading-[24px] md:text-[22px] md:leading-[27px]">
          You
        </p>
        <p className="text-[1rem] break-all break-words leading-[24px] md:text-[18px] md:leading-[24px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default UserResponse;
