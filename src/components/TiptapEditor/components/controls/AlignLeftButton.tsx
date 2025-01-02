import React from "react";
import { useEditorState } from "@tiptap/react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";

const AlignLeftButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      active: ctx.editor.isActive({ textAlign: "left" }),
      disabled: !ctx.editor.can().setTextAlign("left"),
    }),
  });

  return (
    <MenuButton
      icon="AlignLeft"
      tooltip="Left"
      shortcuts={["Mod", "Shift", "L"]}
      onClick={() => editor.chain().focus().setTextAlign("left").run()}
      {...state}
    />
  );
};

export default AlignLeftButton;
