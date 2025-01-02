import React from "react";
import MenuButton from "../MenuButton";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";

const ItalicButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("italic"),
        disabled: !ctx.editor.can().toggleItalic(),
      };
    },
  });

  return (
    <MenuButton
      icon="Italic"
      tooltip="Italic"
      shortcuts={["Mod", "I"]}
      onClick={() => editor.chain().focus().toggleItalic().run()}
      {...state}
    />
  );
};

export default ItalicButton;
