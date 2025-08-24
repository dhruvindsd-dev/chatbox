import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

const IconBtn = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, active, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "size-6 flex items-center justify-center rounded-sm cursor-pointer",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-gray-100 active:scale-95 transition",
          active && "bg-gray-100",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconBtn.displayName = "IconBtn";
export default IconBtn;
