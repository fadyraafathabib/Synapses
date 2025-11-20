import * as React from "react";

import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    const [currentType, setCurrentType] = useState(props.type);
    return (
      <>
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
          type={currentType}
        />

        {props.type === "password" && (
          <button
            type="button"
            onClick={() =>
              setCurrentType(currentType === "password" ? "text" : "password")
            }
            className="absolute right-3 top-3 text-gray-500"
          >
            {currentType === "password" ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
      </>
    );
  }
);
Input.displayName = "Input";
