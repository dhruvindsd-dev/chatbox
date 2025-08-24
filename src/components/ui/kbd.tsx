import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  size?: number;
}

export const Kbd = ({ children, className }: Props) => {
  return (
    <span
      className={cn(
        "border rounded-sm flex items-center justify-center text-[10px] size-[18px] font-bold font-mono capitalize",
        className,
      )}
    >
      <kbd>{children}</kbd>
    </span>
  );
};
