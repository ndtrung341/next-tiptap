import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { useCallback } from "react";

export interface TooltipProps {
  children?: string | React.ReactNode;
  title?: React.ReactNode;
  enabled?: boolean;
  shortcut?: string[];
}

const isMac =
  typeof window !== "undefined" ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false;

const getShortcutKey = (key: string) => {
  typeof window !== "undefined" ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false;
  if (key === "Mod") {
    return isMac ? "⌘" : "Ctrl";
  }

  if (key === "Shift") {
    return "⇧";
  }

  if (key === "Alt") {
    return isMac ? "⌥" : "Alt";
  }

  return key;
};

export const Tooltip = ({ children, title, enabled = true, shortcut }: TooltipProps) => {
  const renderTooltip = useCallback(
    () => (
      <span className="flex items-center gap-1" tabIndex={-1}>
        {title && <span className="font-semibold">{title}</span>}
        {shortcut && (
          <span className="text-sm">{`(${shortcut.map(getShortcutKey).join(" + ")})`}</span>
        )}
      </span>
    ),
    [shortcut, title]
  );

  if (!enabled) return <>{children}</>;

  return (
    <TooltipPrimitive.Tooltip>
      <TooltipPrimitive.TooltipTrigger asChild>{children}</TooltipPrimitive.TooltipTrigger>

      <TooltipPrimitive.TooltipPortal>
        <TooltipPrimitive.TooltipContent
          className="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md border bg-black text-white px-2 py-1.5 text-sm shadow-md"
          sideOffset={4}
        >
          {renderTooltip()}
        </TooltipPrimitive.TooltipContent>
      </TooltipPrimitive.TooltipPortal>
    </TooltipPrimitive.Tooltip>
  );
};
