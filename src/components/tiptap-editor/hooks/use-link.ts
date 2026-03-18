import { useCallback } from "react";

import {
  getMarkRange,
  useEditorState,
  useTiptap,
  type Editor,
} from "@tiptap/react";

// Type
export interface LinkData {
  href: string;
  text: string;
}

export interface LinkState {
  link: LinkData | null;
  isActive: boolean;
  canSet: boolean;
  shouldShow: boolean;
}

// Utility functions
export function canSetLink(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.can().setMark("link");
}

export function isLinkActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.storage.link.menuState !== "hidden";
  // return editor.isActive("link");
}

export function getCurrentLink(editor: Editor | null): LinkData | null {
  if (!editor || !isLinkActive(editor)) return null;

  const { href = "" } = editor.getAttributes("link");
  const { selection, schema, doc } = editor.state;

  const range = getMarkRange(selection.$anchor, schema.marks.link);

  const from = range ? range.from : selection.from;
  const to = range ? range.to : selection.to;

  const text = doc.textBetween(from, to);

  return { href, text };
}

// Hook
export function useLink() {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector: ({ editor }): LinkState => {
      return {
        link: getCurrentLink(editor),
        isActive: isLinkActive(editor),
        canSet: canSetLink(editor),
        shouldShow: editor.storage.link.menuState !== "hidden",
      };
    },
  });

  const setLink = useCallback(
    (href: string, text?: string) => {
      const chain = editor.chain().focus();
      const isSelectionEmpty = editor.state.selection.empty;

      if (isSelectionEmpty || text) {
        const linkText = text || href;
        return chain
          .insertContent({
            type: "text",
            text: linkText,
            marks: [{ type: "link", attrs: { href } }],
          })
          .run();
      }

      return chain.extendMarkRange("link").setLink({ href }).run();
    },
    [editor],
  );

  const unsetLink = useCallback(() => {
    return editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [editor]);

  const openMenu = useCallback(() => {
    editor.commands.openLinkMenu();
  }, [editor]);

  const closeMenu = useCallback(() => {
    editor.commands.closeLinkMenu();
  }, [editor]);

  return {
    ...editorState,
    setLink,
    unsetLink,
    openMenu,
    closeMenu,
  };
}
