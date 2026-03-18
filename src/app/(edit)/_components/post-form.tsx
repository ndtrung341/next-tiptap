"use client";

import { useCallback, useEffect, useRef } from "react";

import { useForm, Controller } from "react-hook-form";

import TiptapEditor, { type TiptapEditorRef } from "@/components/tiptap-editor";
import { Post } from "@/services/post";

type PostForm = Pick<Post, "title" | "html" | "readingTime">;

interface PostFormProps {
  post: Post | null;
  editable: boolean;
  onSave: (values: Partial<Post>) => void;
}

export default function PostForm({ post, editable, onSave }: PostFormProps) {
  const editorRef = useRef<TiptapEditorRef>(null);
  const form = useForm<PostForm>({
    defaultValues: {
      title: "",
      html: "",
      readingTime: undefined,
    },
  });

  const calculateReadingTime = useCallback(() => {
    const editor = editorRef.current;
    const wordCount = editor?.storage.characterCount.words() ?? 0;
    return Math.max(1, Math.ceil(wordCount / 150));
  }, []);

  useEffect(() => {
    form.reset({ ...post });
  }, []);

  useEffect(() => {
    const subscription = form.watch((values, { type }) => {
      if (type === "change") {
        const editor = editorRef.current;

        const wordCount = editor?.storage.characterCount.words() ?? 0;
        const readingTime = Math.max(1, Math.ceil(wordCount / 150));

        const json = editor?.getJSON();

        onSave({ ...values, json, readingTime });
      }
    });
    return () => subscription.unsubscribe();
  }, [onSave]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <div className="w-1 h-5 bg-indigo-500 rounded-full" />
          Title
        </label>
        <Controller
          control={form.control}
          name="title"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full px-4 py-2.5 shadow border border-[#d1d9e0] rounded-md bg-white dark:bg-[#0d1017] dark:text-white dark:border-[#3d444d] outline-none"
              placeholder="Enter post title..."
            />
          )}
        />
      </div>

      <div>
        <label className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <div className="w-1 h-5 bg-indigo-500 rounded-full" />
          Content
        </label>
        <Controller
          control={form.control}
          name="html"
          render={({ field }) => (
            <TiptapEditor
              ref={editorRef}
              editable={editable}
              output="html"
              content={post?.html}
              minHeight={320}
              maxHeight={640}
              maxWidth={700}
              onChange={field.onChange}
              placeholder={{
                paragraph: "Type your content here...",
                imageCaption: "Type caption for image (optional)",
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
