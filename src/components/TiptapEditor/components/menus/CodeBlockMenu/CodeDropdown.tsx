import React, { useMemo, useState } from "react";
import MenuButton from "../../MenuButton";
import { CODE_BLOCK_LANGUAGUES } from "@/components/TiptapEditor/constants/code-languages";
import { useTiptapContext } from "../../Provider";
import Icon from "../../ui/Icon";
import Input from "../../ui/Input";
import { PopoverClose } from "../../ui/Popover";

interface CodeDropdownProps {
  value: string;
  onSelect: (value: string) => void;
}

const CodeDropdown = ({ value, onSelect }: CodeDropdownProps) => {
  const { contentElement } = useTiptapContext();
  const [search, setSearch] = useState("");

  const options = CODE_BLOCK_LANGUAGUES.map((item) => ({ label: item.label, value: item.syntax }));
  const filterOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((item) => item.label.includes(search));
  }, [options, search]);

  return (
    <MenuButton
      type="popover"
      text={options.find((item) => item.value === value)?.label}
      hideText={false}
      tooltip={false}
      buttonStyle={{ minWidth: "6rem" }}
      dropdownClass="rte-code-dropdown"
      dropdownStyle={{
        minWidth: "10rem",
      }}
    >
      <Input
        className="code-search"
        placeholder="Seach language..."
        style={{ width: "10rem" }}
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
      />
      <div
        className="code-list"
        style={{
          maxHeight: `${((contentElement.current as HTMLElement)?.clientHeight || 0) * 0.375}px`,
        }}
      >
        {filterOptions.map((item) => (
          <PopoverClose asChild key={item.value}>
            <div
              className="code-item"
              onClick={() => {
                onSelect(item.value);
                setSearch("");
              }}
            >
              {item.label}
              {item.value === value && (
                <Icon name="Check" className="code-item__indicator" size={14} strokeWidth={2.5} />
              )}
            </div>
          </PopoverClose>
        ))}
      </div>
    </MenuButton>
  );
};

export default CodeDropdown;
