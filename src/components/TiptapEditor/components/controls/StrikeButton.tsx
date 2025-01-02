import React from "react";
import MenuButton from "../MenuButton";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";

const StrikeButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("strike"),
        disabled: !ctx.editor.can().toggleStrike(),
      };
    },
  });

  return (
    <MenuButton
      icon="Strike"
      tooltip="Strikethrough"
      shortcuts={["Mod", "Shift", "S"]}
      onClick={() => editor.chain().focus().toggleStrike().run()}
      {...state}
    />
  );
};

export default StrikeButton;
