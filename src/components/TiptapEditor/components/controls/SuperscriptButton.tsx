import React from "react";
import { useEditorState } from "@tiptap/react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";

const SuperscriptButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("superscript"),
        disabled: !ctx.editor.can().toggleSuperscript(),
      };
    },
  });

  return (
    <MenuButton
      icon="Superscript"
      tooltip="Superscript"
      shortcuts={["Mod", "."]}
      onClick={() => editor.chain().focus().toggleSuperscript().run()}
      {...state}
    />
  );
};

export default SuperscriptButton;
