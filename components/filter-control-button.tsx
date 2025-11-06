interface FilterControlButtonProps {
  icon?: React.ReactNode;
  onClick: () => void;
  displayValue: React.ReactNode;
  onClickClose: () => void;
}

const FilterControlButton: React.FC<FilterControlButtonProps> = ({
  icon,
  onClick,
  displayValue,
  onClickClose,
}) => {
  return (
    <button
      className="h-10 border border-[#e5e5e5] rounded-sm flex cursor-pointer items-center"
      onClick={onClick}
    >
      {icon && (
        <div className="h-full bg-gray-200 px-3 flex justify-center items-center">
          {icon}
        </div>
      )}
      <div className="px-3 h-full ml-2 flex-1 flex justify-start items-center text-body_sm2_normal text-neutral-900">
        {displayValue}
      </div>
      <button
        className="h-full pr-3"
        onClick={(e) => {
          e.stopPropagation();
          onClickClose();
        }}
      >
        <i className="ri-close-circle-fill text-danger text-body_lg2_bold"></i>
      </button>
    </button>
  );
};

export default FilterControlButton;
