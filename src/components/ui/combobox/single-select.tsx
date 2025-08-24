"use client";
import { useEffect } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Kbd } from "../kbd";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SingleSelectProps } from "./types";

export const SelectDropdown = ({
  data,
  placeholder,
  tooltipText,
  kbdKey,
  value,
  onChange,
  label,
  icon,
}: SingleSelectProps) => {
  const [openPopover, setOpenPopover] = React.useState(false);
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const [selected, setSelected] = React.useState<string | null>(null);
  const [searchValue, setSearchValue] = React.useState("");

  useEffect(() => {
    if (!openPopover) return;
    setSearchValue("");
  }, [openPopover]);

  useEffect(() => {
    setSelected(value || null);
  }, [value]);

  useHotkeys(
    kbdKey,
    () => {
      setOpenTooltip(false);
      setOpenPopover(true);
    },
    { preventDefault: true },
  );

  function handleSelect(item: SingleSelectProps["data"][0] | null) {
    setSelected(item?.value || null);
    setOpenTooltip(false);
    setOpenPopover(false);
    onChange?.(item?.value || null);
  }

  const item = data.find((i) => i.value === selected);

  const isSearching = searchValue.length > 0;
  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <Tooltip
        delayDuration={500}
        open={openTooltip}
        onOpenChange={setOpenTooltip}
      >
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <div
              className={cn(
                "py-1.5 px-3 inline-flex items-center gap-2 border border-gray-200 rounded-lg cursor-pointer",
                "text-gray-600",
                !item?.value && "text-gray-400",
              )}
            >
              {item?.icon || icon}
              <span className="text-xs font-medium">
                {item?.label || label}
              </span>
            </div>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent
          hideWhenDetached
          side="bottom"
          sideOffset={6}
          className="flex items-center gap-2 bg-background border text-xs px-2 py-1"
        >
          <span className="text-gray-500">{tooltipText}</span>
          <Kbd>{kbdKey}</Kbd>
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-[220px] p-0 rounded-lg"
        align="start"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={4}
      >
        <Command className="rounded-lg">
          <CommandInput
            value={searchValue}
            onValueChange={(searchValue) => {
              const num = Number.parseInt(searchValue);
              if (!num || num > data.length) return setSearchValue(searchValue);

              handleSelect(data[num - 1] || null);
            }}
            className="text-sm"
            placeholder={placeholder}
          ></CommandInput>
          <CommandList>
            <CommandEmpty>No options found</CommandEmpty>
            <CommandGroup>
              {data.map((i, idx) => (
                <CommandItem
                  key={i.value}
                  value={i.value}
                  onSelect={(value) =>
                    handleSelect(data.find((p) => p.value === value) || null)
                  }
                  className="group rounded-md flex justify-between items-center w-full text-sm leading-normal"
                >
                  <div className="flex items-center gap-1.5">
                    {i.icon}
                    <span>{i.label}</span>
                  </div>
                  <div className="flex items-center">
                    {selected === i.value && (
                      <CheckIcon className="mr-3 size-4 " />
                    )}
                    {!isSearching && (
                      <span className="text-xs opacity-60 font-medium">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
