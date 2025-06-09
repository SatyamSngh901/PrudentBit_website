"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils"; // use your utility class if available

const ToggleGroup = ToggleGroupPrimitive.Root;
const ToggleGroupItem = ({
  className,
  ...props
}: ToggleGroupPrimitive.ToggleGroupItemProps) => (
  <ToggleGroupPrimitive.Item
    className={cn(
      "px-4 py-2 text-sm border border-gray-300 rounded-md data-[state=on]:bg-blue-500 data-[state=on]:text-white",
      className
    )}
    {...props}
  />
);

export { ToggleGroup, ToggleGroupItem };
