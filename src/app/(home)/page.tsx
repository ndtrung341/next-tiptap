'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor, EditorRef } from '@/components/editor';
import { sampleContent } from '@/sample-content';
import { Controller, useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import Modal from './_components/modal';
import Reader from './_components/reader';

export type Post = {
  title: string;
  content: string;
};

export default function Home() {
  const editorRef = useRef<EditorRef>();

  const [isSaved, setIsSaved] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const { control, reset, watch } = useForm<Post>({
    defaultValues: {
      content: '',
      title: ''
    }
  });

  const titleWatch = watch('title');
  const contentWatch = watch('content');

  useEffect(() => {
    setIsFetching(true);

    (async () => {
      const data = await fetchData();
      reset({ ...data });
      setIsFetching(false);
    })();
  }, []);

  React.useEffect(() => {
    setIsSaved(false);
    persistDebounce({ title: titleWatch, content: contentWatch });
  }, [titleWatch, contentWatch]);

  // Simulate fetch data
  // get data from localstorage
  const fetchData = (): Promise<Post> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post: Post | null = JSON.parse(
          window.localStorage.getItem('post') ?? null
        );
        const title = post ? post?.title : 'Next.js + Tiptap Editor';
        const content = post?.content || sampleContent;
        resolve({ content, title });
      }, 200);
    });
  };

  // store data in localstorage
  const persistDebounce = useCallback(
    debounce((values: Post) => {
      setIsSaved(true);
      window.localStorage.setItem('post', JSON.stringify(values));
    }, 1000),
    []
  );

  //   useEffect(() => {
  //     if (isFetching) return;
  //
  //    queueMicrotask(() => {
  //      const editor = editorRef.current.getEditor();
  //      const currentSelection = editor.state.selection;
  //      editor
  //        .chain()
  //        .setContent(blog.content)
  //        .setTextSelection(currentSelection)
  //        .run();
  //    });
  //  }, [isFetching]);

  return (
    <React.Fragment>
      <Modal open={isPreview} setOpen={setIsPreview}>
        <Reader post={{ title: titleWatch, content: contentWatch }} />
      </Modal>

      <div className='h-screen flex p-4'>
        <div className='max-w-screen-md w-full mx-auto relative'>
          {!isFetching && (
            <div className='absolute left-full ml-6 top-0 h-10 w-24 rounded-md overflow-hidden cursor-pointer pointer-events-none flex items-center justify-center transition-all duration-200 bg-zinc-200 dark:bg-transparent border-2 border-zinc-300 80 text-foreground'>
              {isSaved ? 'Saved' : 'Unsaved'}
            </div>
          )}

          <div className='flex flex-col h-full space-y-4'>
            <Controller
              control={control}
              name='title'
              render={({ field }) => (
                <div className='flex items-center space-x-3'>
                  <label className='text-base font-bold text-muted-foreground'>
                    Title
                  </label>
                  <input
                    {...field}
                    className='h-10 w-full px-3 py-1.5 text-base border-2 placeholder:text-sm placeholder:text-muted-foreground outline-none rounded bg-background'
                  />
                </div>
              )}
            />

            {!isFetching && (
              <Controller
                control={control}
                name='content'
                render={({ field }) => {
                  return (
                    <div className='flex flex-col flex-1 space-y-2 h-full overflow-hidden'>
                      <label className='text-base font-bold text-muted-foreground'>
                        Content
                      </label>
                      <div className='border bg-background shadow-md rounded-lg flex flex-1 h-full overflow-auto '>
                        <Editor
                          ref={editorRef}
                          wrapperClassName='flex flex-col h-full overflow-hidden'
                          contentClassName='h-full overflow-auto'
                          fixedMenuClassName='relative z-0 inset-x-0 w-full bg-background text-background'
                          content={field.value}
                          editorProps={{
                            attributes: {
                              class:
                                'pt-6 pb-6 px-6 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert'
                            }
                          }}
                          onUpdate={({ editor }) => {
                            const html = !editor.isEmpty
                              ? editor.getHTML()
                              : '';
                            field.onChange(html);
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              />
            )}

            <button
              className='bg-indigo-700 text-white h-10 text-sm rounded-md'
              disabled={!isSaved}
              onClick={() => setIsPreview(true)}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
