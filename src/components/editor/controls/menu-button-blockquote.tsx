import React, { memo, useCallback } from 'react';
import { Toolbar } from '../ui/toolbar';
import { Icon } from '../ui/icon';
import { useActive } from '../hooks/use-active';
import { Editor } from '@tiptap/core';

interface MenuButtonQuoteProps {
  editor: Editor;
}

const MenuButtonBlockquote = ({ editor }: MenuButtonQuoteProps) => {
  const isBlockquoteActive = useActive(editor, 'blockquote');
  const onBlockquote = useCallback(
    () => editor.chain().focus().toggleBlockquote().run(),
    [editor]
  );

  return (
    <Toolbar.Button
      tooltip='Blockquote'
      tooltipShortcut={['Mod', 'Shift', 'B']}
      active={isBlockquoteActive}
      onClick={onBlockquote}
    >
      <Icon name='Quote' />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonBlockquote, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
