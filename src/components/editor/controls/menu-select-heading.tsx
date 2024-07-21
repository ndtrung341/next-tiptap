import React, { memo, useCallback, useMemo } from 'react';
import { Toolbar } from '../ui/toolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { cn } from '../lib/utils';
import { Editor } from '@tiptap/core';
import { useActive } from '../hooks/use-active';

type MenuSelectHeading = {
  editor: Editor;
};

const options = [
  {
    value: 'paragraph',
    label: 'Paragraph',
    className: 'text-base'
  },
  {
    value: 1,
    label: 'Heading 1',
    className: 'font-bold text-3xl'
  },
  {
    value: 2,
    label: 'Heading 2',
    className: 'font-bold text-2xl'
  },
  {
    value: 3,
    label: 'Heading 3',
    className: 'font-bold text-xl'
  },
  {
    value: 4,
    label: 'Heading 4',
    className: 'font-bold text-lg'
  },
  {
    value: 5,
    label: 'Heading 5',
    className: 'font-bold text-base'
  },
  {
    value: 6,
    label: 'Heading 6',
    className: 'font-bold text-sm'
  }
] as const;

type OptionValue = (typeof options)[number]['value'];

const MenuSelectHeading = ({ editor }: MenuSelectHeading) => {
  const isH1 = useActive(editor, 'heading', { level: 1 });
  const isH2 = useActive(editor, 'heading', { level: 2 });
  const isH3 = useActive(editor, 'heading', { level: 3 });
  const isH4 = useActive(editor, 'heading', { level: 4 });
  const isH5 = useActive(editor, 'heading', { level: 5 });
  const isH6 = useActive(editor, 'heading', { level: 6 });

  const current = useMemo(() => {
    let key: string | number = 'paragraph';
    if (isH1) key = 1;
    if (isH2) key = 2;
    if (isH3) key = 3;
    if (isH4) key = 4;
    if (isH5) key = 5;
    if (isH6) key = 6;

    return options.find((item) => item.value === key)!;
  }, [isH1, isH2, isH3, isH4, isH5, isH6]);

  const onHeadingSelect = useCallback(
    (level: OptionValue) => {
      if (typeof level === 'number') {
        editor.chain().focus().toggleHeading({ level }).run();
      } else {
        editor.chain().focus().setParagraph().run();
      }
    },
    [editor]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toolbar.Button isDropdown={true} className='min-w-[130px] px-2'>
          <span className='flex flex-1'>{current.label}</span>
        </Toolbar.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(option.className, 'px-4')}
            onSelect={() => onHeadingSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(MenuSelectHeading, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
