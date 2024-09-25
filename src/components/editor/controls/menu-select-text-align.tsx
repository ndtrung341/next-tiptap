import React, { memo, useMemo } from 'react';
import { Toolbar } from '../ui/toolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Editor } from '@tiptap/core';
import { Icon } from '../ui/icon';
import { useActive } from '../hooks/use-active';

type MenuSelectTextAlign = {
  editor: Editor;
};

const options = [
  {
    value: 'left',
    label: <Icon name='AlignLeft' />
  },
  {
    value: 'center',
    label: <Icon name='AlignCenter' />
  },
  {
    value: 'right',
    label: <Icon name='AlignRight' />
  },
  {
    value: 'justify',
    label: <Icon name='AlignJustify' />
  }
] as const;

const MenuSelectTextAlign = ({ editor }: MenuSelectTextAlign) => {
  const isAlignCenter = useActive(editor, { textAlign: 'center' });
  const isAlignRight = useActive(editor, { textAlign: 'right' });
  const isAlignJustify = useActive(editor, { textAlign: 'justify' });

  const current = useMemo(() => {
    let key = 'left';
    if (isAlignCenter) {
      key = 'center';
    }
    if (isAlignRight) {
      key = 'right';
    }
    if (isAlignJustify) {
      key = 'justify';
    }
    return options.find((item) => item.value === key)!;
  }, [isAlignCenter, isAlignRight, isAlignJustify]);

  const onAlignSelect = (align: string) => {
    return () => editor.chain().focus().setTextAlign(align).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toolbar.Button
          isDropdown={true}
          className='px-2'
          tooltip={'Text Align'}
        >
          {current.label}
        </Toolbar.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        className='min-w-fit'
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={onAlignSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(MenuSelectTextAlign, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
