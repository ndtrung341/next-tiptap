import React from "react";
import { Editor, useEditorState } from "@tiptap/react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";

const SubscriptButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("subscript"),
        disabled: !ctx.editor.can().toggleSubscript(),
      };
    },
  });

  return (
    <MenuButton
      icon="Subscript"
      tooltip="Subscript"
      shortcuts={["Mod", ","]}
      onClick={() => editor.chain().focus().toggleSubscript().run()}
      {...state}
    />
  );
};

export default SubscriptButton;
