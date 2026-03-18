import React, { useMemo, useState, useCallback, memo } from "react";

import { useTiptap } from "@tiptap/react";

import { MenuButton } from "../../menu-button";
import Icon from "../../ui/icon";
import { PopoverClose } from "../../ui/popover";
import SearchInput from "../../ui/search-input";

interface LanguageOption {
  label: string;
  value: string;
  alias: string;
}

interface LanguageDropdownProps {
  value: string | null;
  onSelect: (value: string) => void;
}

export const LanguageDropdown = ({
  value,
  onSelect,
}: LanguageDropdownProps) => {
  const { editor } = useTiptap();
  const [search, setSearch] = useState("");

  const options: LanguageOption[] = useMemo(() => {
    const extension = editor.extensionManager.extensions.find(
      (ext) => ext.name === "codeBlock",
    );
    return extension?.options?.supportedLanguages ?? [];
  }, [editor]);

  const filteredOptions = useMemo(() => {
    if (!search) return options;

    const q = search.trim().toLowerCase();

    return options.filter((item) => {
      const label = item.label.toLowerCase();
      const value = item.value.toLowerCase();
      const alias = item.alias.toLowerCase();

      return label.includes(q) || value.includes(q) || alias.includes(q);
    });
  }, [options, search]);

  const currentLanguage = useMemo(
    () => options.find((item) => item.value === value)?.label || "Auto",
    [options, value],
  );

  const maxHeight = useMemo(
    () =>
      Math.min(
        (editor.options.element as HTMLElement)?.clientHeight * 0.7,
        400,
      ),
    [editor.options.element],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  const handleSelect = useCallback(
    (selectedValue: string) => {
      onSelect(selectedValue);
      setSearch("");
    },
    [onSelect],
  );

  return (
    <MenuButton
      type="popover"
      text={currentLanguage}
      hideText={false}
      buttonStyle={{ minWidth: "8.5rem" }}
      dropdownClass="rte-code-dropdown"
      dropdownStyle={{
        minWidth: "12rem",
        maxHeight: `${maxHeight}px`,
      }}
    >
      <SearchInput
        className="code-search"
        placeholder="Search languages..."
        value={search}
        onChange={handleSearchChange}
        showSearchIcon={false}
      />
      {/* <Input
        className="code-search"
        placeholder="Search languages..."
        value={search}
        onChange={handleSearchChange}
      /> */}
      <div className="code-list" style={{ overflowY: "auto" }}>
        {filteredOptions.length === 0 ? (
          <div>No languages found</div>
        ) : (
          filteredOptions.map((item) => (
            <PopoverClose asChild key={item.value}>
              <div
                role="button"
                tabIndex={0}
                className="code-item"
                onClick={() => handleSelect(item.value)}
              >
                <span>{item.label}</span>

                {item.value === value && (
                  <Icon
                    name="Check"
                    className="code-item__indicator"
                    size={14}
                    strokeWidth={2.5}
                  />
                )}
              </div>
            </PopoverClose>
          ))
        )}
      </div>
    </MenuButton>
  );
};

export default memo(LanguageDropdown);
