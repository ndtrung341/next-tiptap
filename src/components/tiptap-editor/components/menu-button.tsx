import React, { CSSProperties, useMemo } from "react";

import Button, { type ButtonProps } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown";
import Icon, { type IconProps } from "./ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Tooltip from "./ui/tooltip";
import { cn, getShortcutKey } from "../helpers/utils";

interface MenuButtonProps
  extends Omit<ButtonProps, "ref" | "type" | "iconOnly"> {
  icon?: IconProps["name"];
  type?: "button" | "dropdown" | "popover";
  buttonType?: ButtonProps["type"];
  text?: string;
  active?: boolean;
  shortcuts?: string[];
  hideText?: boolean;
  hideArrow?: boolean;
  tooltip?: string | boolean;
  buttonClass?: string;
  buttonStyle?: CSSProperties;
  dropdownClass?: string;
  dropdownStyle?: CSSProperties;
}

export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    {
      active,
      icon,
      text,
      shortcuts,
      className,
      children,
      type,
      buttonType,
      hideText = true,
      hideArrow = false,
      tooltip = true,
      buttonClass,
      buttonStyle,
      dropdownClass,
      dropdownStyle,
      disabled,
      ...props
    },
    ref,
  ) => {
    const hasArrowIcon =
      !hideArrow && (type === "dropdown" || type === "popover");
    const hasIconOnly = hideText && !hasArrowIcon;

    const tooltipContent = useMemo(() => {
      if (!tooltip) return null;

      const title = typeof tooltip === "string" ? tooltip : text;
      const shortcut = shortcuts
        ? `${shortcuts.map(getShortcutKey).join(" + ")})`
        : "";

      return title ? `${title} ${shortcut}` : null;
    }, [tooltip, text, shortcuts]);

    const renderIcon = useMemo(
      () => (icon ? <Icon name={icon} className="rte-button-icon" /> : null),
      [icon],
    );

    const renderButton = (
      <Button
        ref={ref}
        type={buttonType}
        variant={"ghost"}
        className={cn("rte-menu__button", buttonClass)}
        style={buttonStyle}
        iconOnly={hasIconOnly}
        slotBefore={!hasIconOnly && renderIcon}
        slotAfter={
          hasArrowIcon && (
            <span className="rte-icon-arrow">
              <Icon name="ChevronDown" size={14} />
            </span>
          )
        }
        onFocusCapture={(e) => e.stopPropagation()}
        data-active={active || undefined}
        aria-label={typeof tooltip === "string" ? tooltip : text}
        disabled={disabled}
        {...props}
      >
        {hasIconOnly ? renderIcon : !hideText && text}
      </Button>
    );

    const renderContent = tooltipContent ? (
      <Tooltip
        content={tooltipContent}
        // options={{ collisionBoundary: editor?.view.dom.parentElement }}
      >
        {renderButton}
      </Tooltip>
    ) : (
      renderButton
    );

    if (type === "dropdown") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{renderContent}</DropdownMenuTrigger>
          <DropdownMenuContent
            className={dropdownClass}
            style={dropdownStyle}
            avoidCollisions={false}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (type === "popover") {
      return (
        <Popover>
          <PopoverTrigger asChild>{renderContent}</PopoverTrigger>
          <PopoverContent
            className={dropdownClass}
            style={dropdownStyle}
            avoidCollisions={false}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {children}
          </PopoverContent>
        </Popover>
      );
    }

    return renderContent;
  },
);

MenuButton.displayName = "MenuButton";

export default MenuButton;
