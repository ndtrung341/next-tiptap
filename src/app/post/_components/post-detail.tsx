'use client';

import { Editor, EditorRef } from '@/components/editor';
import TableOfContent from '@/components/editor/components/table-of-content';
import { TocItem } from '@/components/editor/lib/table-of-contents';
import { usePost } from '@/hooks/usePost';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface PostDetailProps {
  thumb: string;
}

const PostDetail = ({ thumb }: PostDetailProps) => {
  const editorRef = useRef<EditorRef>(null);
  const { post, isFetching } = usePost();
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [tocItemActive, setTocItemActive] = useState<string | null>(null);

  const handleItemClick = (e: any, id: string) => {
    e.preventDefault();
    const editor = editorRef.current.getEditor();
    const element = editor.view.dom.querySelector(`[id="${id}"]`);

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerHeight * 0.05;

    window.scrollTo({
      top: elementTop - offset,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (tocItems.length === 0) return;
    const tocElements = tocItems.map((item) => item.node);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const currentIndex = tocElements.findIndex(
            (item) => item.id === entry.target.id
          );

          if (entry.isIntersecting) {
            setTocItemActive(entry.target.id);
          } else if (
            entry.boundingClientRect.top > 0 &&
            !entry.isIntersecting &&
            !!tocItemActive
          ) {
            const item = tocElements[currentIndex - 1]?.getAttribute('id');
            setTocItemActive(item);
          }
        }),
      { threshold: 1, rootMargin: '0% 0px -70% 0px' }
    );

    tocElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      tocElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [tocItems]);

  if (isFetching) return;

  return (
    <>
      <h1 className='text-4xl leading-relaxed my-10 font-bold'>{post.title}</h1>

      <div className='mx-auto mt-12 max-w-[50rem] xl:grid xl:max-w-none xl:grid-cols-[50rem_1fr] xl:items-start xl:gap-x-20'>
        <div className='flex flex-col'>
          <div className='aspect-video relative mb-10 rounded-lg overflow-hidden'>
            <Image src={thumb} fill alt={post.title} />
          </div>
          <article>
            <Editor
              ref={editorRef}
              editable={false}
              content={post.content}
              onUpdateToC={(items) => setTocItems(items)}
              editorProps={{
                attributes: {
                  class: 'prose lg:prose-lg prose-blue dark:prose-invert'
                }
              }}
            />
          </article>
        </div>
        <aside className='sticky top-12 order-last hidden xl:block'>
          <TableOfContent
            items={tocItems}
            onItemClick={handleItemClick}
            activeItemId={tocItemActive}
          />
        </aside>
      </div>
    </>
  );
};

export default PostDetail;
