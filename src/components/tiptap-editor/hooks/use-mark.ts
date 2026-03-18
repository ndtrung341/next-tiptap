import { useCallback } from "react";

import { useEditorState, useTiptap, type Editor } from "@tiptap/react";

// Types
export type MarkType =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "code"
  | "superscript"
  | "subscript";

// Utility functions
export function canToggleMark(editor: Editor | null, type: MarkType): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.can().toggleMark(type);
}

export function isMarkActive(editor: Editor | null, type: MarkType): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive(type);
}

export function toggleMark(editor: Editor | null, type: MarkType): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canToggleMark(editor, type)) return false;

  return editor.chain().focus().toggleMark(type).run();
}

// Hook
export function useMark(type: MarkType) {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        isActive: isMarkActive(editor, type),
        canToggle: canToggleMark(editor, type),
      };
    },
  });

  const handleToggle = useCallback(() => {
    return toggleMark(editor, type);
  }, [editor, type]);

  return {
    ...editorState,
    toggleMark: handleToggle,
  };
}
