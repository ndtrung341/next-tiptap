import React from "react";
import { useEditorState } from "@tiptap/react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";

const AlignRightButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      active: ctx.editor.isActive({ textAlign: "right" }),
      disabled: !ctx.editor.can().setTextAlign("right"),
    }),
  });

  return (
    <MenuButton
      icon="AlignRight"
      tooltip="Right"
      shortcuts={["Mod", "Shift", "R"]}
      onClick={() => editor.chain().focus().setTextAlign("right").run()}
      {...state}
    />
  );
};

export default AlignRightButton;
