import React from "react";
import MenuButton from "../MenuButton";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";

const BulletListButton = () => {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("bulletList"),
        disabled: !ctx.editor.isEditable,
      };
    },
  });

  return (
    <MenuButton
      icon="BulletList"
      tooltip="Bullet List"
      shortcuts={["Mod", "Shift", "8"]}
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      {...state}
    />
  );
};

export default BulletListButton;
