import React from "react";
import MenuButton from "../MenuButton";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";

const BoldButton = () => {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("bold"),
        disabled: !ctx.editor.can().toggleBold(),
      };
    },
  });

  return (
    <MenuButton
      icon="Bold"
      tooltip="Bold"
      shortcuts={["Mod", "B"]}
      onClick={() => editor.chain().focus().toggleBold().run()}
      {...state}
    />
  );
};

export default BoldButton;
