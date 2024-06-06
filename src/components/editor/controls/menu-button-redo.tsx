import React, { memo, useCallback } from "react";
import { Editor } from "@tiptap/core";
import { Toolbar } from "../ui/toolbar";
import { Icon } from "../ui/icon";

interface MenuButtonRedoProps {
  editor: Editor;
}

const MenuButtonRedo = ({ editor }: MenuButtonRedoProps) => {
  const onUndo = useCallback(() => editor.chain().focus().redo().run(), [editor]);

  return (
    <Toolbar.Button
      tooltip="Redo"
      tooltipShortcut={["Mod", "Y"]}
      disabled={!editor.can().redo()}
      onClick={onUndo}
    >
      <Icon name="Redo" />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonRedo, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
