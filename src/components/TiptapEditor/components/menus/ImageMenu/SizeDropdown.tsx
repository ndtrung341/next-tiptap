import React from "react";
import MenuButton from "../../MenuButton";
import { DropdownMenuItem } from "../../ui/DropdownMenu";

interface SizeDropdownProps {
  value: number;
  onChange: (value: number | null) => void;
}

const SizeDropdown = ({ value, onChange }: SizeDropdownProps) => {
  const options = [null, 25, 50, 75, 100];
  return (
    <MenuButton
      type="dropdown"
      buttonStyle={{ width: "6.5rem" }}
      dropdownStyle={{ width: "7rem" }}
      icon="Ruler"
      text={value ? `${value}%` : "Default"}
      hideText={false}
      tooltip={false}
    >
      {options.map((option, index) => (
        <DropdownMenuItem
          key={index}
          data-active={option == value || undefined}
          onSelect={() => onChange(option)}
        >
          {option ? `${option}% width` : "Default"}
        </DropdownMenuItem>
      ))}
    </MenuButton>
  );
};

export default SizeDropdown;
