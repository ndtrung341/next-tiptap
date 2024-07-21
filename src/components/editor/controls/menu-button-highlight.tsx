import { Editor } from '@tiptap/core';
import React, { useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Toolbar } from '../ui/toolbar';
import { Icon } from '../ui/icon';
import { ColorPicker } from '../components/color-picker';
import { useAttributes } from '../hooks/use-attributes';

type MenuButtonHighlightProps = {
  editor: Editor;
};

const MenuButtonHighlight = ({ editor }: MenuButtonHighlightProps) => {
  const highlightColor = useAttributes(
    editor,
    'highlight',
    { color: undefined },
    (attr) => attr.color
  );

  const onResetHighlight = useCallback(
    () => editor.chain().focus().unsetHighlight().run(),
    [editor]
  );

  const onHighlightChange = useCallback(
    (color: string) => editor.chain().setHighlight({ color }).run(),
    [editor]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toolbar.Button tooltip={'Text Color'} active={Boolean(highlightColor)}>
          <Icon
            name='Highlighter'
            className={
              '[&>path:not(:first-child)]:text-black [&>path:not(:first-child)]:dark:text-slate-400 [&>path:not(:first-child)]:fill-transparent'
            }
            style={{ color: highlightColor, fill: highlightColor }}
          />
        </Toolbar.Button>
      </PopoverTrigger>

      <PopoverContent align='start' side='top' className='w-auto'>
        <ColorPicker
          color={highlightColor}
          onChange={onHighlightChange}
          onClear={onResetHighlight}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MenuButtonHighlight;
