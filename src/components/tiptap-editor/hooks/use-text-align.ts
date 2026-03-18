import { useCallback } from "react";

import { useEditorState, useTiptap, type Editor } from "@tiptap/react";

// Type
export type TextAlignType = "left" | "right" | "justify" | "center";

// Utility functions
export function canSetTextAlign(
  editor: Editor | null,
  alignment: TextAlignType,
) {
  if (!editor || !editor.isEditable) return false;
  if (editor.isActive("table")) return false;
  return editor.can().setTextAlign(alignment);
}

export function isTextAlignActive(
  editor: Editor | null,
  alignment: TextAlignType,
) {
  if (!editor) return false;
  return editor.isActive({ textAlign: alignment });
}

export function setTextAlign(editor: Editor | null, alignment: TextAlignType) {
  if (!editor || !editor.isEditable) return false;
  if (!canSetTextAlign(editor, alignment)) return false;
  return editor.chain().focus().setTextAlign(alignment).run();
}

// Hook
export function useTextAlign(alignment: TextAlignType) {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        isActive: isTextAlignActive(editor, alignment),
        canAlign: canSetTextAlign(editor, alignment),
      };
    },
  });

  const handleTextAlign = useCallback(() => {
    return setTextAlign(editor, alignment);
  }, [editor, alignment]);

  return {
    ...editorState,
    setTextAlign: handleTextAlign,
  };
}
