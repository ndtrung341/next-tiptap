import React from "react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";
import { useEditorState } from "@tiptap/react";

const LinkButton = () => {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      active: ctx.editor.isActive("link"),
      disabled: !ctx.editor.can().setLink({ href: "" }),
    }),
  });

  return (
    <MenuButton
      icon="Link"
      tooltip="Link"
      shortcuts={["Mod", "K"]}
      onClick={() => editor.commands.startEditLink()}
      {...state}
    />
  );
};

export default LinkButton;
