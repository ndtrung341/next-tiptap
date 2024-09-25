'use client';

import { Editor, EditorRef } from '@/components/editor';
import TableOfContent from '@/components/editor/components/table-of-content';
import { TocItem } from '@/components/editor/lib/table-of-contents';
import { usePost } from '@/hooks/usePost';
import { CalendarDays, Clock } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface PostDetailProps {
  thumb: string;
}

const PostDetail = ({ thumb }: PostDetailProps) => {
  const { post, isFetching } = usePost();
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [tocItemActive, setTocItemActive] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const editorRef = useRef<EditorRef>(null);
  const contentRef = useRef<HTMLElement>(null);

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

  const calculateReadingTime = () => {
    const wpm = 225;
    const words = editorRef.current
      ?.getEditor()
      ?.storage.characterCount.words();
    const time = Math.ceil(words / wpm);
    return time;
  };

  const calculateReadingProgress = () => {
    const element = contentRef.current;
    const elementRect = element.getBoundingClientRect();
    const progress = Math.min(
      (Math.abs(elementRect.top) /
        (element.offsetHeight - window.innerHeight)) *
        100,
      100
    );
    setProgress(progress);
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
            !entry.isIntersecting &&
            entry.intersectionRatio < 1 &&
            entry.intersectionRatio > 0 &&
            entry.boundingClientRect.top > 0
          ) {
            const item = tocElements[currentIndex - 1]?.getAttribute('id');
            setTocItemActive(item);
          }
        }),
      { threshold: 1, rootMargin: '0px 0px -75% 0px' }
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

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowProgress(true);
          } else {
            setShowProgress(false);
          }
        });
      },
      {
        rootMargin: '0px 0px -90% 0px',
        threshold: 0
      }
    );

    observer.observe(contentRef.current);

    return () => {
      contentRef?.current && observer.unobserve(contentRef.current);
    };
  }, [contentRef.current]);

  useEffect(() => {
    if (!showProgress || !contentRef.current) return;

    const handleScroll = () => {
      window.requestAnimationFrame
        ? window.requestAnimationFrame(calculateReadingProgress)
        : setTimeout(calculateReadingProgress, 250);
    };

    const handleResize = () => {
      window.requestAnimationFrame
        ? window.requestAnimationFrame(calculateReadingProgress)
        : setTimeout(calculateReadingProgress, 250);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [showProgress]);

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  if (isFetching) return;

  return (
    <>
      {showProgress && (
        <div
          className='fixed inset-x-0 h-[5px] top-0 bg-blue-600 dark:bg-blue-500 z-50'
          style={{ width: `${progress}%` }}
        ></div>
      )}

      <h1 className='text-3xl md:text-4xl leading-relaxed mt-10 font-bold'>
        {post.title}
      </h1>

      <div className='flex items-center mt-6 gap-4'>
        <Image
          src={'/avatar.jpg'}
          width={44}
          height={44}
          alt=''
          className='rounded-full'
        />
        <div className=''>
          <div className='font-semibold mb-2'>
            By <u>ChatGPT</u>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center gap-2 text-sm'>
              <CalendarDays size={18} />
              <span>Sep, 24 2024</span>
            </div>
            <div className='h-1.5 w-1.5 mx-3 rounded-full bg-gray-500 dark:bg-gray-300'></div>
            <div className='flex items-center gap-2 text-sm'>
              <Clock size={18} />
              <span>{calculateReadingTime()} min read</span>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto mt-12 max-w-[50rem] xl:grid xl:max-w-none xl:grid-cols-[50rem_1fr] xl:items-start xl:gap-x-20'>
        <div className='flex flex-col'>
          <div className='aspect-video relative mb-10 rounded-lg overflow-hidden'>
            <Image src={thumb} fill alt={post.title} />
          </div>
          <article ref={contentRef}>
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
