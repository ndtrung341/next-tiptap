import React from "react";
import MenuButton from "../MenuButton";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";

const UnderlineButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("underline"),
        disabled: !ctx.editor.can().toggleUnderline(),
      };
    },
  });

  return (
    <MenuButton
      icon="Underline"
      tooltip="Underline"
      shortcuts={["Mod", "U"]}
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      {...state}
    />
  );
};

export default UnderlineButton;
