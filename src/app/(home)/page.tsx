'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor, EditorRef } from '@/components/editor';
import { Controller, useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import { sample } from '@/sample-data';
import { usePost } from '@/hooks/usePost';

export default function Home() {
  const router = useRouter();
  const editorRef = useRef<EditorRef>();

  const [isSaved, setIsSaved] = useState(true);
  //   const [isFetching, setIsFetching] = useState(true);
  const { post, isFetching } = usePost();

  const { control, reset, watch, setValue } = useForm<Post>({
    defaultValues: {
      content: '',
      title: ''
    }
  });

  const titleWatch = watch('title');
  const contentWatch = watch('content');

  //   useEffect(() => {
  //     setIsFetching(true);

  //     (async () => {
  //       const data = await fetchData();
  //       setIsFetching(false);
  //       reset({ ...data });
  //     })();
  //   }, []);

  useEffect(() => {
    if (isFetching) return;
    reset({ ...post });
  }, [isFetching]);

  useEffect(() => {
    setIsSaved(false);
    persistDebounce({ title: titleWatch, content: contentWatch });
  }, [titleWatch, contentWatch]);

  // Simulate fetch data
  // get data from localstorage
  const fetchData = (): Promise<Post> => {
    return new Promise<Post>((resolve) => {
      setTimeout(() => {
        const post: Post | null = JSON.parse(
          window.localStorage.getItem('post') ?? null
        );
        const title = post ? post?.title : sample.title;
        const content = post?.content || sample.content;
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

  const onPreview = () => {
    router.push('/post');
  };

  //  useEffect(() => {
  //    if (isFetching) return;

  //   queueMicrotask(() => {
  //     const editor = editorRef.current.getEditor();
  //     const currentSelection = editor.state.selection;
  //     editor
  //       .chain()
  //       .setContent(blog.content)
  //       .setTextSelection(currentSelection)
  //       .run();
  //   });
  // }, [isFetching]);

  return (
    <React.Fragment>
      <div className='h-screen flex p-4'>
        <div className='max-w-screen-lg w-full mx-auto relative'>
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
              //   <Controller
              //     control={control}
              //     name='content'
              //     render={({ field }) => {
              //       return (
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
                    content={post.content}
                    editorProps={{
                      attributes: {
                        class:
                          'pt-6 pb-6 px-6 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert'
                      }
                    }}
                    onUpdate={({ editor }) => {
                      const html = !editor.isEmpty ? editor.getHTML() : '';
                      setValue('content', html);
                      //  field.onChange(html);
                    }}
                  />
                </div>
              </div>
              //       );
              //     }}
              //   />
            )}

            <button
              className='bg-indigo-700 text-white h-10 text-sm rounded-md'
              disabled={!isSaved}
              //   onClick={() => setIsPreview(true)}
              onClick={onPreview}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
