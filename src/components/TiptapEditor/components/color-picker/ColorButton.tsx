import React from "react";
import Tooltip from "../ui/Tooltip";

interface ColorButtonProps {
  color: string;
  active?: boolean;
  tooltip?: boolean;
  onClick?: (color: string) => void;
}

const ColorButton = ({ color, tooltip = true, active, onClick }: ColorButtonProps) => {
  const content = (
    <button
      type="button"
      tabIndex={-1}
      data-active={active ? "true" : undefined}
      className="rte-color__btn"
      style={{ background: color }}
      onClick={() => onClick?.(color)}
    />
  );
  return tooltip ? <Tooltip content={color}>{content}</Tooltip> : content;
};

export default ColorButton;
