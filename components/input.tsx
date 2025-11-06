import { useEffect, useRef, useState, forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperStyles?: string;
  className?: string;
  inputClassName?: string;
  slotLeft?: React.ReactNode;
  slotRight?: React.ReactNode;
  slotRightClassName?: string;
  slotLeftClassName?: string;
  label?: string | null;
  labelStyles?: string;
  placeholderStyles?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      wrapperStyles = "",
      className = "",
      inputClassName = "",
      slotLeft = null,
      slotRight = null,
      slotRightClassName = "",
      slotLeftClassName = "",
      placeholder = null,
      label = null,
      labelStyles = "text-neutral-900",
      placeholderStyles = "",
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const [inputBoundingClientRect, setInputBoundingClientRect] =
      useState<any>(null);

    useEffect(() => {
      if (inputRef.current) {
        setInputBoundingClientRect(inputRef.current.getBoundingClientRect());
      }
    }, [inputRef.current]);

    return (
      <div className={` w-full h-full ${className}`}>
        {label ? (
          <label className={`text-body_sm2_normal  block mb-2 ${labelStyles}`}>
            {label}
          </label>
        ) : null}
        <div
          className={`bg-white text-[14px] flex items-center h-10 rounded-[4px] border border-neutral-100 overflow-hidden px-4 ${wrapperStyles} w-full`}
        >
          {slotLeft || placeholder ? (
            <div
              className={`relative flex items-center h-full ${slotLeftClassName} `}
            >
              {slotLeft}
              {placeholder ? (
                <span
                  className={`text-[14px] absolute top-0 left-[100%] flex items-center h-full text-neutral-400 ${placeholderStyles}`}
                  style={{
                    width: inputBoundingClientRect?.width + "px",
                  }}
                >
                  {placeholder}
                </span>
              ) : null}
            </div>
          ) : null}

          <input
            {...rest}
            ref={ref ? ref : inputRef}
            placeholder=""
            className={`w-full h-full flex-1 bg-transparent autofill:bg-none [&:not(:placeholder-shown)]:bg-white text-neutral-900 text-[14px] relative border-none outline-none z-[2] ${inputClassName}`}
          />
          {slotRight ? (
            <div
              className={`relative flex items-center h-full px-0 ${slotRightClassName}`}
            >
              {slotRight}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

export default Input;
