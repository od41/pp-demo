import React from "react";

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  toggleModal: () => void;
  standalone?: boolean;
}

const Modal: React.FC<ModalProps> = ({ id, title, children, toggleModal }) => {
  return (
    // <div
    //   id={id}
    //   className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
    // >
    //   <div className="hs-overlay-open:mt-1 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
    //     <div className="md:w-[596px] flex flex-col bg-black_200 shadow-sm rounded-[10px] pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
    //     <div className="p-15 py-[35px]">
    //     <div className="overflow-y-auto">
    //         {children}
    //       </div>
    //     </div>
    //     </div>
    //   </div>
    // </div>

    <div
      id={id}
      className="hs-overlay fixed top-0 start-0 z-[80] w-full h-full flex items-center justify-center bg-black bg-opacity-80 text-white"
      onClick={toggleModal}
    >
      <div
        className="md:w-[540px] w-[90%] bg-black_200  rounded-[10px] pointer-events-auto p-15 py-[35px] pb-14 border border-black_100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
        type="button"
        className="mb-5 w-full text-white flex justify-end items-center size-4 font-semibold   disabled:opacity-50 disabled:pointer-events-none hover:text-gray-200"
        onClick={toggleModal} // Close the modal on button click
      >
        <i className="ri-close-line text-[32px] text-current"></i>
      </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
