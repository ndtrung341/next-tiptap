import React from "react";
import MenuButton from "../MenuButton";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";

const YoutubeButton = () => {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("youtube"),
        disabled: !ctx.editor.isEditable,
      };
    },
  });

  const handleClick = () => {
    const src = prompt("Embed Youtube Video", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    if (src) {
      editor.chain().focus().embedYoutube({ src }).run();
    }
  };

  return <MenuButton icon="Youtube" tooltip="Youtube" onClick={handleClick} {...state} />;
};

export default YoutubeButton;
