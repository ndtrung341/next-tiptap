import React, { memo, useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ColorButton } from "./color-button";
import { debounce } from "lodash";
import { DEFAULT_COLORS } from "../lib/constant";
import { Icon } from "../ui/icon";

type ColorPickerProps = {
  color?: string;
  onChange: (color: string) => void;
  onClear: () => void;
};

export const ColorPicker = memo(({ color, onChange, onClear }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState<string>(color || "");

  const handleColorInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(e.target.value);
  }, []);

  const handleColorInputBlur = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);
    if (!isCorrectColor) return;
    onChange?.(colorInputValue);
  }, [colorInputValue, onChange]);

  useEffect(() => {
    setColorInputValue(color || "");
  }, [color]);

  return (
    <div className="flex flex-col gap-4">
      <HexColorPicker className="!w-full" color={color || ""} onChange={debounce(onChange, 200)} />

      <input
        type="text"
        className="outline-none px-3 py-1.5 border border-neutral-200 focus:border-neutral-400 rounded-md"
        placeholder="#000000"
        value={colorInputValue}
        onChange={handleColorInputChange}
        onBlur={handleColorInputBlur}
      />

      <div className={"flex gap-2 items-center"}>
        {DEFAULT_COLORS.map(({ name, value, isBrightColor }) => (
          <ColorButton
            key={value}
            active={value.toLowerCase() === color?.toLocaleLowerCase()}
            color={value}
            name={name}
            isBrightColor={isBrightColor}
            onColorChange={onChange}
          />
        ))}
        <button
          onClick={onClear}
          className="min-w-8 w-auto h-8 bg-transparent hover:bg-zinc-100 rounded flex items-center justify-center"
        >
          <Icon name="Undo" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
});

ColorPicker.displayName = "ColorPicker";
