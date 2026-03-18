import { useCallback } from "react";

import { useEditorState, useTiptap, type Editor } from "@tiptap/react";

// Types
export type ListType = "bulletList" | "orderedList";

// Utility functions
export function canToggleList(editor: Editor | null, type: ListType): boolean {
  if (!editor || !editor.isEditable) return false;

  switch (type) {
    case "bulletList":
      return editor.can().toggleBulletList();
    case "orderedList":
      return editor.can().toggleOrderedList();
    default:
      return false;
  }
}

export function isListActive(editor: Editor | null, type: ListType): boolean {
  if (!editor) return false;
  return editor.isActive(type);
}

export function toggleList(editor: Editor | null, type: ListType): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canToggleList(editor, type)) return false;

  const chain = editor.chain().focus();

  // If list is active, just turn it off
  if (editor.isActive(type)) {
    return chain
      .liftListItem("listItem")
      .lift("bulletList")
      .lift("orderedList")
      .run();
  }

  // If list is NOT active, clear wrapping nodes first, then toggle
  switch (type) {
    case "bulletList":
      return chain.clearNodes().toggleBulletList().run();
    case "orderedList":
      return chain.clearNodes().toggleOrderedList().run();
    default:
      return false;
  }
}

// Hook
export function useList(type: ListType) {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        isActive: isListActive(editor, type),
        canToggle: canToggleList(editor, type),
      };
    },
  });

  const handleToggle = useCallback(() => {
    return toggleList(editor, type);
  }, [editor, type]);

  return {
    ...editorState,
    toggleList: handleToggle,
  };
}
