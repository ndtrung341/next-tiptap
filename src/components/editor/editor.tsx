"use client";

import React, { forwardRef, useEffect } from "react";
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import { extensions as builtInExtensions } from "./extensions";
import FixedMenu from "./components/fixed-menu";

import "./styles/index.scss";
import LinkBubble from "./components/link-bubble-menu";

export interface EditorProps extends Partial<EditorOptions> {
  className?: string;
}

export const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ className = "min-h-80", extensions, editable = true, content, editorProps, ...rest }, ref) => {
    const editor = useEditor({
      extensions: [...builtInExtensions, ...(extensions ? extensions : [])],
      content,
      editorProps: {
        attributes: {
          class:
            "pt-8 pb-6 px-8 prose prose-base prose-headings: prose-blue xl:prose-md prose-headings:scroll-mt-[80px] focus:outline-none",
        },
        ...editorProps,
      },
      ...rest,
    });

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

    //  useEffect(() => {
    //    if (!editor || editor.isDestroyed || !initialContent) {
    //      return;
    //    }

    //    queueMicrotask(() => editor.commands.setContent(initialContent, true));
    //  }, [editor, initialContent]);

    if (!editor) return;

    return (
      <div ref={ref} className={className}>
        {editable && <FixedMenu editor={editor} />}
        <EditorContent editor={editor}></EditorContent>
        <LinkBubble editor={editor} />
      </div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
