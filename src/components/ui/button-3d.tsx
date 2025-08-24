"use client";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export interface BtnProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "default" | "small";
}

const Button3d = ({
  children,
  onClick,
  disabled,
  ...rest
}: BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { isActive, handlePress } = usePress();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    handlePress();
    if (onClick) onClick(e);
  }

  return (
    <button
      disabled={disabled}
      className={cn(
        "group relative cursor-pointer",
        "disabled:pointer-events-none",
      )}
      onClick={handleClick}
      {...rest}
    >
      <span
        className={cn(
          "h-[32px] rounded-[12px]",
          "bg-[#3F2ABD] absolute inset-0 translate-y-[3px]",
        )}
      ></span>
      <span
        className={cn(
          "h-[32px] rounded-[10px] px-3 py-1.5 text-xs bg-[#5942E6] text-white font-medium",
          "relative flex items-center justify-center will-change-transform select-none gap-3",
          "group-hover:translate-y-[-2px] group-hover:[transition-duration:250ms]",
          "[transition:translate_600ms_ease-out]",
          isActive && "translate-y-[3px]! [transition-duration:34ms]!",
        )}
      >
        {children}
      </span>
    </button>
  );
};
export default Button3d;

const usePress = (duration = 34, debounceTime = 34) => {
  const [isActive, setIsActive] = useState(false);
  const lastPressTime = useRef(0); // Store last press time
  const timeoutRef = useRef<NodeJS.Timeout>(null); // Store timeout ID to prevent memory leaks

  const handlePress = useCallback(() => {
    const now = Date.now();
    if (now - lastPressTime.current < debounceTime) return; // Debounce logic

    lastPressTime.current = now;
    setIsActive(true);

    // Clear any existing timeout before setting a new one
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, duration);
  }, [duration, debounceTime]);

  // Cleanup timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    isActive,
    handlePress,
  };
};
