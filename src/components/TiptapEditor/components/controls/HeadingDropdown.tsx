import React, { useCallback, useMemo } from "react";
import { useEditorState } from "@tiptap/react";
import MenuButton from "../MenuButton";
import { DropdownMenuItem } from "../ui/DropdownMenu";
import { useTiptapContext } from "../Provider";

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

type Heading = "p" | `h${(typeof HEADING_LEVELS)[number]}`;

const HeadingDropdown = () => {
  const { editor } = useTiptapContext();

  const current = useEditorState({
    editor,
    selector: (ctx) => {
      const { editor } = ctx;
      if (editor.isActive("paragraph")) return "p" as Heading;

      const headingLevel = HEADING_LEVELS.find((level) => editor.isActive("heading", { level }));
      if (headingLevel) return `h${headingLevel}` as Heading;

      return null;
    },
  });

  const options = useMemo(
    () => [
      {
        value: "p",
        label: "Paragraph",
      },
      {
        value: "h1",
        label: "Heading 1",
      },
      {
        value: "h2",
        label: "Heading 2",
      },
      {
        value: "h3",
        label: "Heading 3",
      },
      {
        value: "h4",
        label: "Heading 4",
      },
    ],
    []
  );

  const onSelect = useCallback(
    (value: Heading) => {
      if (value.startsWith("h")) {
        editor
          .chain()
          .focus()
          .setHeading({ level: +value[1] as any })
          .run();
      } else {
        editor.chain().focus().setParagraph().run();
      }
    },
    [editor]
  );

  const currentLabel = options.find((item) => item.value === current)?.label || "Headings";

  return (
    <MenuButton
      type="dropdown"
      text={currentLabel}
      tooltip="Headings"
      hideText={false}
      disabled={!editor.isEditable || !current}
      buttonStyle={{ minWidth: "6.5rem" }}
      dropdownClass="rte-heading-dropdown"
    >
      {options.map((item) => (
        <DropdownMenuItem
          key={item.value}
          data-active={item.value === current || undefined}
          data-heading={item.value}
          onSelect={() => onSelect(item.value as Heading)}
        >
          {item.label}
        </DropdownMenuItem>
      ))}
    </MenuButton>
  );
};

export default HeadingDropdown;
