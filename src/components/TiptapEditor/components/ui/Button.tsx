import React from "react";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
  iconOnly?: boolean;
  slotBefore?: React.ReactNode;
  slotAfter?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      type = "button",
      variant = "primary",
      iconOnly,
      slotBefore,
      slotAfter,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      "rte-button",
      `rte-button--${variant}`,
      iconOnly && "rte-button--icon-only",
      className
    );

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {!iconOnly && slotBefore}
        {children &&
          (iconOnly || (!slotAfter && !slotBefore) ? (
            children
          ) : (
            <span className="rte-button__text">{children}</span>
          ))}
        {!iconOnly && slotAfter}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
