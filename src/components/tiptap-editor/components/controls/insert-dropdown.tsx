import React from "react";

import { useEditorState, useTiptap } from "@tiptap/react";

import { MenuButton } from "../menu-button";
import { DropdownMenuItem } from "../ui/dropdown";

const InsertDropdown = () => {
  const { editor } = useTiptap();

  const canInsert = useEditorState({
    editor,
    selector: ({ editor }) => editor.isEditable,
  });

  const toggleCodeBlock = () =>
    editor.chain().focus().clearNodes().toggleCodeBlock().run();

  const toggleBlockquote = () =>
    editor.chain().focus().clearNodes().toggleBlockquote().run();

  const insertYoutube = () => {
    const src = prompt(
      "Embed Youtube Video",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    );
    if (src) {
      editor.chain().focus().setYoutubeVideo({ src }).run();
    }
  };

  return (
    <MenuButton
      type="dropdown"
      tooltip="Insert"
      disabled={!canInsert}
      icon="Plus"
      dropdownStyle={{ minWidth: "8rem" }}
    >
      <DropdownMenuItem asChild>
        <MenuButton
          text="Blockquote"
          hideText={false}
          tooltip={false}
          icon="Quote"
          onClick={toggleBlockquote}
        />
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <MenuButton
          text="Code block"
          hideText={false}
          tooltip={false}
          icon="CodeBlock"
          onClick={toggleCodeBlock}
        />
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <MenuButton
          text="Youtube"
          hideText={false}
          tooltip={false}
          icon="Youtube"
          onClick={insertYoutube}
        />
      </DropdownMenuItem>
    </MenuButton>
  );
};

export default InsertDropdown;
