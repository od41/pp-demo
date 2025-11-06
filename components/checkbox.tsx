import { useEffect } from "react";
import { useState } from "react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  wrapperStyles?: string;
  className?: string;
  label?: React.ReactNode;
  checked: boolean;
  onChecked?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  wrapperStyles = "",
  className = "",
  label = null,
  checked: checkedProp,
  onChecked,
  ...rest
}) => {
  const [checked, setChecked] = useState(checkedProp);

  useEffect(() => {
    if (onChecked) {
      onChecked(checked);
    }
  }, [checked]);

  useEffect(() => {
    if (typeof checkedProp !== undefined) {
      setChecked(checkedProp);
    }
  }, [checkedProp]);

  return (
    <label
      className={`${className} ${
        checked ? "bg-primary-600" : "bg-neutral-200"
      } relative rounded-full flex items-center w-10 h-6 cursor-pointer transition-all p-1 leading-0`}
    >
      <input
        {...rest}
        type="checkbox"
        className="absolute opacity-0 z-[1]"
        onChange={(e) => setChecked(e.target.checked)}
        checked={checked}
      />
      <span
        className={`bg-white block w-[16px] h-[16px] m-0 relative z-[2] ${
          checked ? "left-[calc(100%-16px)]" : "left-0"
        } rounded-full transition-all`}
      ></span>
    </label>
  );
};

export default Checkbox;
