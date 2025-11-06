import React from "react";

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  toggleModal: () => void;
  standalone?: boolean;

  modalClassName?: string;
  titleClassName?: string;
  modalBodyClassName?: string;
  modalSubClassName?: string;
  hrClassName?: string;
  visible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  modalClassName = "top-25 left-[35%] mt-6",
  titleClassName = "",
  modalBodyClassName = "ti-modal-body px-4",
  modalSubClassName = "",
  hrClassName = "mb-7 mt-5",
}) => {
  return visible ? (
    <div
      id="todo-compose"
      className="hs-overlay ti-modal w-full h-full overflow-y-hidden"
    >
      <div
        className={`w-2/6 hs-overlay-open:mt-7 mx-auto absolute z-10 bg-white rounded-sm ${modalClassName}`}
      >
        <div className={`ti-modal-content p-4 pt-8 pb-12 ${modalSubClassName}`}>
          <div className="box ti-modal-header !shadow-none mb-0 !py-0">
            <div className="box-header !w-full pt-0 !border-0 flex">
              <div className={`box-title flex-1 text-center ${titleClassName}`}>
                {title}
              </div>
              <button type="button" onClick={onClose}>
                <span className="sr-only">Close</span>
                <i className="ri-close-line text-body_lg2_medium text-neutral-600"></i>
              </button>
            </div>
          </div>
          <hr className={`border-neutral-50 ${hrClassName}`} />
          <div className={` ${modalBodyClassName}`}>{children}</div>
        </div>
      </div>
      <div className="w-full h-full absolute my-overlay"></div>
    </div>
  ) : null;
};

export default Modal;
