// Modal.js
import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  toggleModal: () => void;
  standalone?: boolean;
}

const Modal: React.FC<ModalProps> = ({ id, title, children, toggleModal }) => {
  return (
    <div
      id={id}
      className="hs-overlay fixed top-0 start-0 z-[380] w-full h-full flex items-center justify-center bg-black bg-opacity-80 text-white"
      onClick={toggleModal}
    >
      <div
        className="w-[90%] md:w-[480px] bg-black_200 z-[400]  rounded-[10px] pointer-events-auto px-[14px] py-[30px] md:p-10 md:py-[35px] pb-14 border border-black_100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="mb-5 w-full text-white flex justify-end items-center size-4 font-semibold   disabled:opacity-50 disabled:pointer-events-none hover:text-gray-200"
          onClick={toggleModal} // Close the modal on button click
        >
          <X className="h-7 w-7" />
          <span className="sr-only">Close</span>
          {/* <i className="ri-close-line text-[32px] text-current"></i> */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
