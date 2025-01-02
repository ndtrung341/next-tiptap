import React, { HTMLProps, forwardRef } from "react";
import clsx from "clsx";

export type ToolbarProps = {
  dense?: boolean;
  vertical?: boolean;
} & HTMLProps<HTMLDivElement>;

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ children, dense, vertical = false, className, ...rest }, ref) => {
    const toolbarClassName = clsx(
      "rte-toolbar",
      dense && "rte-toolbar--dense",
      vertical && "rte-toolbar--vertical",
      className
    );

    return (
      <div className={toolbarClassName} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

Toolbar.displayName = "Toolbar";

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ horizontal, className, ...rest }, ref) => {
    const dividerClassName = clsx(
      "bg-neutral-200 dark:bg-neutral-800 rte-toolbar__divider",
      horizontal && "rte-toolbar__divider--horizontal",
      className
    );

    return <div className={dividerClassName} ref={ref} {...rest} />;
  }
);

ToolbarDivider.displayName = "Toolbar.Divider";

export { Toolbar, ToolbarDivider };
