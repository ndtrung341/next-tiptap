import React, { CSSProperties, memo, useEffect, useMemo } from "react";
import clsx from "clsx";

import Tooltip from "./ui/Tooltip";
import Icon, { type IconProps } from "./ui/Icon";
import Button, { type ButtonProps } from "./ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "./ui/DropdownMenu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

import { getShortcutKey } from "../utils/shortcut";
import { useTiptapContext } from "./Provider";

interface MenuButtonProps extends Omit<ButtonProps, "variant" | "ref" | "type"> {
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

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
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
    ref
  ) => {
    const { editor, contentElement } = useTiptapContext();

    const hasArrowIcon = type === "dropdown" || (type === "popover" && !hideArrow);
    const hasIconOnly = hideText && !hasArrowIcon;

    const tooltipContent = useMemo(() => {
      if (tooltip === false) return null;
      const content = {
        title: typeof tooltip === "string" ? tooltip : text,
        shortcuts: shortcuts ? `(${shortcuts.map(getShortcutKey).join(" + ")})` : "",
      };

      return `${content.title} ${content.shortcuts}`;
    }, [tooltip, text, shortcuts]);

    const renderIcon = useMemo(
      () => (icon ? <Icon name={icon} className="rte-button-icon" /> : null),
      [icon]
    );

    const renderButton = (
      <Button
        ref={ref}
        type={buttonType}
        variant="ghost"
        className={clsx("rte-menu__button", buttonClass)}
        style={buttonStyle}
        iconOnly={hasIconOnly}
        slotBefore={!hasIconOnly && renderIcon}
        slotAfter={
          hasArrowIcon && (
            <span className="rte-icon-arrow">
              <Icon name="ChevronDown" size={16} />
            </span>
          )
        }
        onFocusCapture={(e) => e.stopPropagation()}
        data-active={(editor.isEditable && active) || undefined}
        aria-label={typeof tooltip === "string" ? tooltip : text}
        disabled={!editor.isEditable || disabled}
        {...props}
      >
        {hasIconOnly ? renderIcon : !hideText && text}
      </Button>
    );

    const renderContent = tooltipContent ? (
      <Tooltip
        content={tooltipContent}
        options={{ collisionBoundary: contentElement.current?.parentElement }}
      >
        {renderButton}
      </Tooltip>
    ) : (
      renderButton
    );

    if (type === "dropdown") {
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{renderContent}</DropdownMenuTrigger>
          <DropdownMenuContent
            className={dropdownClass}
            style={dropdownStyle}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (type === "popover") {
      return (
        <Popover modal={false}>
          <PopoverTrigger asChild>{renderContent}</PopoverTrigger>
          <PopoverContent
            className={dropdownClass}
            style={dropdownStyle}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {children}
          </PopoverContent>
        </Popover>
      );
    }

    return renderContent;
  }
);

MenuButton.displayName = "MenuButton";

export default memo(MenuButton);
