import { ButtonHTMLAttributes, HTMLProps, forwardRef } from "react";
import { Icon } from "./icon";
import { cn } from "../lib/utils";
import { Button, ButtonProps } from "./button";
import { Tooltip } from "./tooltip";

type ToolbarWrapperProps = HTMLProps<HTMLDivElement>;

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className="flex select-none items-center gap-1 px-2 py-1 supports-backdrop-blur:bg-white/60 sticky top-0 left-0 z-50 w-full justify-between overflow-x-auto rounded-t-lg border-b border-b-border bg-white backdrop-blur drop-shadow-sm"
      >
        <div className="w-full overflow-hidden flex flex-wrap items-center">{children}</div>
      </div>
    );
  }
);

ToolbarWrapper.displayName = "Toolbar";

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ horizontal, className, ...rest }, ref) => {
    const dividerClassName = cn(
      "bg-zinc-200",
      horizontal ? "w-full min-w-[1.5rem] h-px my-1" : "h-full min-h-[1.5rem] w-px mx-1",
      className
    );

    return <div className={dividerClassName} ref={ref} {...rest} />;
  }
);

ToolbarDivider.displayName = "ToolbarDivider";

export type ToolbarGroupProps = {} & HTMLProps<HTMLDivElement>;

const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ className, ...rest }, ref) => {
    const groupClassName = cn("flex items-center gap-1 first:ml-0 last:mr-0", className);

    return <div className={groupClassName} ref={ref} {...rest} />;
  }
);

ToolbarGroup.displayName = "ToolbarGroup";

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  activeClassname?: string;
  tooltip?: string;
  tooltipShortcut?: string[];
  buttonSize?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  isDropdown?: boolean;
};

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    {
      children,
      buttonSize = "icon",
      variant = "ghost",
      className,
      tooltip,
      tooltipShortcut,
      activeClassname = "bg-blue-500/10 text-blue-700 hover:text-blue-700 hover:bg-blue-500/20",
      active,
      isDropdown,
      ...rest
    },
    ref
  ) => {
    const buttonClass = cn(
      "min-w-8 w-auto h-8 bg-transparent rounded aria-expanded:bg-blue-500/10 aria-expanded:text-blue-700 focus-visible:ring-0",
      className,
      {
        [`${activeClassname}`]: active,
        "hover:bg-zinc-100 text-black/70": !active,
        "my-1": isDropdown,
      }
    );

    const component = (
      <Button className={buttonClass} variant={variant} size={buttonSize} ref={ref} {...rest}>
        {children}
        {isDropdown && <Icon name="ChevronDown" className="size-4 ml-0.5" />}
      </Button>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} shortcut={tooltipShortcut}>
          {component}
        </Tooltip>
      );
    }

    return component;
  }
);

ToolbarButton.displayName = "ToolbarButton";

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Button: ToolbarButton,
  Divider: ToolbarDivider,
  Group: ToolbarGroup,
};
