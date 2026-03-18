import { useCallback } from "react";

import { useEditorState, useTiptap, type Editor } from "@tiptap/react";

// Types
export type UndoRedoAction = "undo" | "redo";

// Utility functions
export function canUndoRedo(
  editor: Editor | null,
  action: UndoRedoAction,
): boolean {
  if (!editor || !editor.isEditable) return false;

  return editor.can()[action]();
}

export function executeUndoRedo(
  editor: Editor | null,
  action: UndoRedoAction,
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canUndoRedo(editor, action)) return false;

  return editor.chain().focus()[action]().run();
}

// Hook
export function useHistory() {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        canUndo: canUndoRedo(editor, "undo"),
        canRedo: canUndoRedo(editor, "redo"),
      };
    },
  });

  const undo = useCallback(() => executeUndoRedo(editor, "undo"), [editor]);

  const redo = useCallback(() => executeUndoRedo(editor, "redo"), [editor]);

  return {
    ...editorState,
    undo,
    redo,
  };
}
