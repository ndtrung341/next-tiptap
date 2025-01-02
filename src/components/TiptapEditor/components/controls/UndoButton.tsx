import React, { memo, useEffect } from "react";
import { useEditorState } from "@tiptap/react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";

const UndoButton = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      disabled: !ctx.editor.can().undo(),
    }),
  });

  return (
    <MenuButton
      icon="Undo"
      tooltip="Undo"
      shortcuts={["Mod", "Z"]}
      onClick={() => editor.chain().focus().undo().run()}
      {...state}
    />
  );
};

export default UndoButton;
