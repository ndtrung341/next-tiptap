'use client';

import { extensions } from '@/components/editor/extensions';
import { EditorContent, useEditor } from '@tiptap/react';
import React from 'react';
import { Post } from '../page';

interface ReaderProps {
  post: Post;
}

const Reader = ({ post }: ReaderProps) => {
  const editor = useEditor({
    content: post.content,
    extensions: [...extensions],
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert'
      }
    }
  });

  return (
    <div className='space-y-4'>
      <div className='p-6 flex gap-6 bg-background'>
        <div className='flex-1'>
          <h1 className='text-3xl mb-8 font-bold'>{post.title}</h1>
          <EditorContent editor={editor} />
        </div>
        <div className='w-[30%] flex-shrink-0'>
          <div className='text-xl font-semibold'>Table of content</div>
          <div className='p-4 flex items-center justify-center shadow-sm border-2 min-h-40 rounded-lg mt-4'>
            Coming soon <span className='text-2xl ml-2'>😎</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
