'use client';

import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { EditorContent, EditorOptions, useEditor } from '@tiptap/react';
import { extensions as builtInExtensions } from './extensions';
import FixedMenu from './components/fixed-menu';
import LinkBubbleMenu from './components/link-bubble-menu';
import { EditorInstance } from '.';
import { getToCItems, TocItem } from './lib/table-of-contents';

import './styles/index.scss';
export interface EditorProps extends Partial<EditorOptions> {
  fixedMenuClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  displayWordsCount?: boolean;
  onUpdateToC?: (items: TocItem[]) => void;
}

export type EditorRef = {
  getEditor: () => EditorInstance;
};

export const Editor = forwardRef<EditorRef, EditorProps>(
  (
    {
      wrapperClassName,
      fixedMenuClassName,
      contentClassName,
      extensions = [],
      editable = true,
      editorProps,
      content,
      displayWordsCount = true,
      onUpdateToC,
      ...rest
    },
    ref
  ) => {
    const editor = useEditor(
      {
        extensions: [...builtInExtensions, ...extensions],
        immediatelyRender: false,
        content,
        editorProps: {
          attributes: {
            class:
              'py-6 px-8 prose prose-base prose-blue prose-headings:scroll-mt-[80px]'
          },
          ...editorProps
        },
        ...rest
      },
      []
    );

    useImperativeHandle(ref, () => ({
      getEditor: () => editor
    }));

    // Update editable state if/when it changes
    useEffect(() => {
      if (!editor || editor.isDestroyed || editor.isEditable === editable) {
        return;
      }
      // We use queueMicrotask to avoid any flushSync console errors as
      // mentioned here (though setEditable shouldn't trigger them in practice)
      // https://github.com/ueberdosis/tiptap/issues/3764#issuecomment-1546854730
      queueMicrotask(() => editor.setEditable(editable));
    }, [editable, editor]);

    useEffect(() => {
      if (!editor || editor.isDestroyed) return;
      const items = getToCItems(editor);
      onUpdateToC?.(items);
    }, [editor]);

    useEffect(() => {
      return () => {
        editor?.destroy();
      };
    }, []);

    if (!editor) return null;

    return (
      <div className={wrapperClassName}>
        {editable && (
          <>
            <FixedMenu editor={editor} className={fixedMenuClassName} />
            <LinkBubbleMenu editor={editor} />
          </>
        )}
        <EditorContent editor={editor} className={contentClassName} />

        {displayWordsCount && (
          <div className='sticky bottom-0 bg-background text-zinc-800 dark:text-slate-200 text-sm font-bold border-t border-t-border px-4 py-3 text-right'>
            {editor.storage.characterCount.words()} words
          </div>
        )}
      </div>
    );
  }
);

Editor.displayName = 'Editor';

export default Editor;
