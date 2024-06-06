import { Editor } from "@tiptap/core";
import React, { memo, useCallback } from "react";
import { Toolbar } from "../ui/toolbar";
import { useActive } from "../hooks/use-active";
import { Icon } from "../ui/icon";

interface MenuButtonBulletListProps {
  editor: Editor;
}

const MenuButtonBulletedList = ({ editor }: MenuButtonBulletListProps) => {
  const isBulletList = useActive(editor, "bulletList");
  const onBulletList = useCallback(() => editor.chain().focus().toggleBulletList().run(), [editor]);

  return (
    <Toolbar.Button
      active={isBulletList}
      disabled={!editor.can().toggleBulletList()}
      onClick={onBulletList}
    >
      <Icon name="List" />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonBulletedList, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
