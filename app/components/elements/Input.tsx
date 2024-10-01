import React, { forwardRef } from "react";
import cn from "classnames";

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  variant?: "default" | "primary" | "warning";
}

const Input = forwardRef<HTMLInputElement, InputType>(
  ({ label, id, type, variant = "default", placeholder, ...rest }, ref) => {
    const borderVariants = {
      default: "",
      primary: "",
      warning: "border-red-300",
    };

    return (
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          data-cy={id}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            borderVariants[variant],
            "h-10 pl-3 border rounded-md outline-none min-w-64 focus-visible:outline-none placeholder:text-sm "
          )}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
