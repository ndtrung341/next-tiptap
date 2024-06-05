import { Editor } from "@tiptap/core";
import React, { memo, useCallback } from "react";
import { Toolbar } from "../ui/toolbar";
import { useActive } from "../hooks/use-active";
import { Icon } from "../ui/icon";

interface MenuButtonOrderedListProps {
  editor: Editor;
}

const MenuButtonOrderedList = ({ editor }: MenuButtonOrderedListProps) => {
  const isOrderedList = useActive(editor, "orderedList");
  const onOrderedList = useCallback(
    () => editor.chain().focus().toggleOrderedList().run(),
    [editor]
  );

  return (
    <Toolbar.Button active={isOrderedList} onClick={onOrderedList}>
      <Icon name="ListOrdered" />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonOrderedList, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
