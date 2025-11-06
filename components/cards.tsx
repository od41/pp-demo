import React, { useState, useMemo, useEffect } from "react";

interface CardsProps {
  description: string;
  image: string;
}

const Cards: React.FC<CardsProps> = ({ description, image }) => {
  return (
    <div className="h-full flex flex-col hover:shadow-2xl hover:shadow-grey_200/20 rounded-xl">
      <div className=" flex-[40%] bg-black_200 border border-black_200 rounded-t-xl px-4 py-[10px] ">
        <img
          src={image}
          alt="icons"
          className=" w-[48px] md:w-[70px] h-[48px] md:h-[70px]"
        />
      </div>
      <div className=" flex-[60%] bg-black_300 px-4 py-[18px] rounded-b-xl border border-black_100">
        <p className=" text-grey_100 text-left front-medium text-[1rem] leading-[19px] md:text-[20px] md:leading-[24px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Cards;
