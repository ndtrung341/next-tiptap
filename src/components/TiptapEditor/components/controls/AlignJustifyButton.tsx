import React from "react";
import { useEditorState } from "@tiptap/react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";

const AlignJustifyButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      active: ctx.editor.isActive({ textAlign: "justify" }),
      disabled: !ctx.editor.can().setTextAlign("justify"),
    }),
  });

  return (
    <MenuButton
      icon="AlignJustify"
      tooltip="Justify"
      shortcuts={["Mod", "Shift", "F"]}
      onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      {...state}
    />
  );
};

export default AlignJustifyButton;
