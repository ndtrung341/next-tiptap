import React, { memo, useCallback } from "react";
import { Toolbar } from "../ui/toolbar";
import { Icon } from "../ui/icon";
import { Editor } from "@tiptap/core";
import { useActive } from "../hooks/use-active";

interface MenuButtonItalicProps {
  editor: Editor;
}

const MenuButtonItalic = ({ editor }: MenuButtonItalicProps) => {
  const isItalicActive = useActive(editor, "italic");
  const onItalic = useCallback(() => editor.chain().focus().toggleItalic().run(), [editor]);

  return (
    <Toolbar.Button
      tooltip="Bulleted List"
      tooltipShortcut={["Mod", "Shift", "8"]}
      active={isItalicActive}
      onClick={onItalic}
    >
      <Icon name="Italic" />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonItalic, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
