"use client";
import {
    AnimatePresence,
    motion,
    MotionConfig,
    MotionProps,
} from "motion/react";
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
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Kbd } from "../kbd";
import { MultiSelectProps } from "./types";

const ANI: MotionProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export const MultiSelectDropdown = ({
  data,
  placeholder,
  tooltipText,
  kbdKey,
  value,
  onChange,
  label,
  icon,
}: MultiSelectProps) => {
  const [openPopover, setOpenPopover] = React.useState(false);
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const [selected, setSelected] = React.useState<string[]>([]);
  const [searchValue, setSearchValue] = React.useState("");

  useEffect(() => {
    if (!openPopover) return;
    setSearchValue("");
  }, [openPopover]);

  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  useHotkeys(
    kbdKey,
    () => {
      setOpenTooltip(false);
      setOpenPopover(true);
    },
    { preventDefault: true },
  );

  function handleSelect(item: MultiSelectProps["data"][0] | null) {
    if (!item?.value) return;

    setSelected((prev) => {
      const isSelected = prev.includes(item.value);
      const newSelected = isSelected
        ? prev.filter((val) => val !== item.value)
        : [...prev, item.value];

      onChange?.(newSelected);
      return newSelected;
    });

    setOpenTooltip(false);
  }

  function renderIcons() {
    // limit to max 3 icons
    if (selectedItems.length === 0) return icon;
    return selectedItems.slice(0, 3).map(
      (i, idx) =>
        i.icon && (
          <div
            style={{ zIndex: idx, marginLeft: idx === 0 ? 0 : -8 }}
            key={i.label}
            className="size-4 flex justify-center items-center"
          >
            <motion.div layoutDependency={selectedItems.length} layout {...ANI}>
              {i.icon}
            </motion.div>
          </div>
        ),
    );
  }

  const selectedItems = data.filter((i) => selected.includes(i.value));
  return (
    <MotionConfig transition={{ duration: 0.15, ease: "easeInOut" }}>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <Tooltip
          delayDuration={500}
          open={openTooltip}
          onOpenChange={setOpenTooltip}
        >
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <motion.div
                className={cn(
                  "py-1.5 px-3 inline-flex items-center gap-2 border border-gray-200 rounded-lg cursor-pointer",
                  "text-gray-600",
                  selectedItems.length === 0 && "text-gray-400",
                )}
              >
                <div className="flex">
                  <AnimatePresence initial={false} mode="popLayout">
                    {renderIcons()}
                  </AnimatePresence>
                </div>
                <span className={cn("text-xs font-medium")}>
                  {selectedItems.length === 0
                    ? label
                    : selectedItems.length === 1
                      ? selectedItems[0]?.label
                      : `${selectedItems.length} selected`}
                </span>
              </motion.div>
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
              onValueChange={(searchValue) => setSearchValue(searchValue)}
              className="text-sm"
              placeholder={placeholder}
            ></CommandInput>
            <CommandList>
              <CommandEmpty>No options found</CommandEmpty>
              <CommandGroup>
                {data.map((i) => (
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
                      {selected.includes(i.value) && (
                        <CheckIcon className="mr-3 size-4 " />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </MotionConfig>
  );
};
