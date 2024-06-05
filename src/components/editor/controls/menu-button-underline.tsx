import React, { memo, useCallback } from "react";
import { Toolbar } from "../ui/toolbar";
import { Icon } from "../ui/icon";
import { Editor } from "@tiptap/core";
import { useActive } from "../hooks/use-active";

interface MenuButtonUnderlineProps {
  editor: Editor;
}

const MenuButtonUnderline = ({ editor }: MenuButtonUnderlineProps) => {
  const isUnderlineActive = useActive(editor, "underline");
  const onUnderline = useCallback(() => editor.chain().focus().toggleUnderline().run(), [editor]);

  return (
    <Toolbar.Button
      tooltip="Underline"
      tooltipShortcut={["Mod", "U"]}
      active={isUnderlineActive}
      onClick={onUnderline}
    >
      <Icon name="Underline" />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonUnderline, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
