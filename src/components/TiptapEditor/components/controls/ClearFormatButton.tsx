import React from "react";
import MenuButton from "../MenuButton";
import { Editor, useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";

const ClearFormatButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        disabled: !ctx.editor.isEditable,
      };
    },
  });

  return (
    <MenuButton
      icon="Eraser"
      tooltip="Clear Format"
      onClick={() => editor.chain().focus().unsetAllMarks().run()}
      {...state}
    />
  );
};

export default ClearFormatButton;
