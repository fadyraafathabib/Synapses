import * as React from "react"

import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

 export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-12 w-full rounded-2xl border bg-white px-3 py-2transition-colors",
          "placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-100 ",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500" : "border-gray-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
