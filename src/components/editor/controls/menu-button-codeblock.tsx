import { Editor } from '@tiptap/core';

import React, { memo } from 'react';
import { Toolbar } from '../ui/toolbar';
import { Icon } from '../ui/icon';
import { useActive } from '../hooks/use-active';

interface MenuButtonCodeBlockProps {
  editor: Editor;
}

const MenuButtonCodeBlock = ({ editor }: MenuButtonCodeBlockProps) => {
  const isCodeBlockActive = useActive(editor, 'codeBlock');
  const onCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();

  return (
    <Toolbar.Button
      tooltip='Code'
      tooltipShortcut={['Mod', 'E']}
      active={isCodeBlockActive}
      onClick={onCodeBlock}
    >
      <Icon name='Code' />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonCodeBlock, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
