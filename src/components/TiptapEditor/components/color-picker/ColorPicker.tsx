import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Label from "../ui/Label";
import Input from "../ui/Input";
import ColorButton from "./ColorButton";
import { MORE_COLORS, COLORS } from "../../constants/color";
import { PopoverClose } from "@radix-ui/react-popover";

interface ColorPickerProps {
  color: string;
  onChange?: (value: string) => void;
  onReset?: () => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  const [activeTab, setActiveTab] = useState<"swatches" | "custom">("swatches");
  const [color, setColor] = useState(props.color);

  const normalizeColor = (color: string): string => {
    const normalized = color.startsWith("#") ? color : `#${color}`;
    return normalized.length === 4 ? `${normalized}${normalized.slice(1)}` : normalized;
  };

  const isColorEqual = (a: string, b: string): boolean =>
    normalizeColor(a).toUpperCase() === normalizeColor(b).toUpperCase();

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const handleApply = () => {
    const regex = /^#?[0-9A-F]{3,6}$/i;
    if (color && regex.test(color)) {
      props.onChange?.(normalizeColor(color));
    }
  };

  const renderColorList = (colors: string[], label: string) => (
    <div>
      <Label as="span">{label}</Label>
      <div className="rte-color__list">
        {colors.map((item) => (
          <ColorButton
            key={item}
            active={isColorEqual(item, color)}
            color={item}
            onClick={() => handleColorChange(item)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="rte-cp">
      <div className="rte-cp__tabs">
        {["swatches", "custom"].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            data-active={activeTab === tab || undefined}
            onClick={() => setActiveTab(tab as "swatches" | "custom")}
            className={`rte-cp__tab`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      <div className="rte-cp__main">
        {activeTab === "swatches" && (
          <div className="rte-cp-swatches">
            {renderColorList(COLORS, "Default Colors")}
            {renderColorList(MORE_COLORS, "More Colors")}
          </div>
        )}

        {activeTab === "custom" && (
          <div className="rte-cp-custom">
            <HexColorPicker
              className="rte-cp-custom__picker"
              style={{ width: "100%" }}
              color={color}
              onChange={handleColorChange}
            />
            <div className="rte-cp-custom__preview">
              <ColorButton color={color} tooltip={false} />
              <Input
                value={color!}
                style={{ textTransform: "uppercase" }}
                onChange={(e) => handleColorChange(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      <PopoverClose asChild>
        <div className="rte-cp__actions">
          <Button variant="secondary" iconOnly onClick={props.onReset}>
            <Icon name="PaletteOff" />
          </Button>
          <Button style={{ width: "100%" }} onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverClose>
    </div>
  );
};

export default ColorPicker;
