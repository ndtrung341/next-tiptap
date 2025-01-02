import React from "react";
import { useEditorState } from "@tiptap/react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";

const AlignCenterButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      active: ctx.editor.isActive({ textAlign: "center" }),
      disabled: !ctx.editor.can().setTextAlign("center"),
    }),
  });

  return (
    <MenuButton
      icon="AlignCenter"
      tooltip="Center"
      shortcuts={["Mod", "Shift", "E"]}
      onClick={() => editor.chain().focus().setTextAlign("center").run()}
      {...state}
    />
  );
};

export default AlignCenterButton;
