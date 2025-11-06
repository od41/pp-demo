import React from "react";
import Link from "next/link";

interface PaginationProps {
  recordsPerPage: number;
  records: any[]; // Replace 'any' with the actual type of your records
  totalRecords: number;
  paginate: (page: number) => void;
  currentPage: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
  maxPageNumberLimit: number;
  minPageNumberLimit: number;
  displaySummary?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  recordsPerPage,
  records,
  totalRecords,
  paginate,
  currentPage,
  onPreviousClick,
  onNextClick,
  maxPageNumberLimit,
  minPageNumberLimit,
  displaySummary = false,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / (recordsPerPage || 1)); i++) {
    pageNumbers.push(i);
  }

  console.log("Records", records, "Total", totalRecords, "Page", currentPage);
  // if(records === 0) return null

  if (parseInt(String(totalRecords)) === 0) return null;

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 overflow-x-auto hide-scrollbar h-full">
        <div className="flex items-center gap-2 h-full">
          <button
            className={` ${
              currentPage === pageNumbers[0]
                ? "cursor-not-allowed "
                : "cursor-pointer"
            }`}
            disabled={currentPage === pageNumbers[0]}
            onClick={() => onPreviousClick && onPreviousClick()}
          >
            <i className="ri-arrow-left-s-line text-body_lg1_normal text-neutral-400"></i>
          </button>
          <ul className="flex items-center w-fit m-auto md:m-0 border border-[#e5e5e5] rounded-sm h-full">
            {pageNumbers.map((number, index) => {
              if (
                number < maxPageNumberLimit + 1 &&
                number > minPageNumberLimit
              ) {
                return (
                  <li
                    key={number}
                    className={`w-full flex items-center h-full border-l border-[#e5e5e5] px-4 cursor-pointer text-body_sm2_normal text-neutral-400 ${
                      currentPage === number ? "bg-primary rounded-l-sm" : ""
                    }`}
                    onClick={() => {
                      console.log("paginate", number);
                      paginate && paginate(number);
                    }}
                  >
                    <Link
                      className={`${
                        currentPage === number ? "text-[white]" : ""
                      }`}
                      href="#!"
                    >
                      {number}
                    </Link>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
          <button
            className={` ${
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => onNextClick && onNextClick()}
            disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          >
            <i className="ri-arrow-right-s-line text-body_lg1_normal text-neutral-400"></i>
          </button>
        </div>
        {displaySummary && (
          <div className="text-center lg:text-left mb-1 lg:mb-0 flex gap-2 items-center">
            {`Showing ${records} out of ${totalRecords} records`}
          </div>
        )}
      </div>
    </>
  );
};

export default Pagination;
