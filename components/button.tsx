import Link from "next/link";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: string;
  className?: string;
  href?: string;
}
const Button = ({
  children,
  loading,
  disabled,
  variant = "primary",
  className = "",
  href = "",
  ...rest
}: ButtonProps) => {
  const Component = href
    ? Link
    : ({ children, ...props }: Omit<ButtonProps, "href">) => (
        <button {...props}>{children}</button>
      );

  return (
    // @ts-expect-error
    <Component
      href={href}
      disabled={disabled}
      className={`text-[14px] font-inter flex justify-center items-center px-3 py-[10px] shadow-none ${className}`}
      {...rest}
    >
      {loading ? (
        <i className="ri-loader-line inline-block animate-spin font-[700] text-[14px] mr-1"></i>
      ) : null}
      {children}
    </Component>
  );
};

export default Button;
