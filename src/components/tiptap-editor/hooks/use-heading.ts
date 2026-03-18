import { useCallback } from "react";

import { useEditorState, useTiptap, type Editor } from "@tiptap/react";

// Types
export const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;
export type HeadingLevel = (typeof HEADING_LEVELS)[number];
export type HeadingType = "paragraph" | `heading${HeadingLevel}`;

// Utility functions
export function canToggleHeading(
  editor: Editor | null,
  level?: HeadingLevel,
): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.can().setNode("heading", { level });
}

export function isHeadingActive(
  editor: Editor | null,
  level?: HeadingLevel,
): boolean {
  if (!editor) return false;
  return level
    ? editor.isActive("heading", { level })
    : editor.isActive("paragraph");
}

export function getCurrentHeading(editor: Editor | null): HeadingType | null {
  if (!editor) return null;
  if (editor.isActive("paragraph")) return "paragraph";
  const active = HEADING_LEVELS.find((level) =>
    editor.isActive("heading", { level }),
  );
  return active ? `heading${active}` : null;
}

export function toggleHeading(
  editor: Editor | null,
  level?: HeadingLevel,
): boolean {
  if (!editor) return false;
  if (!canToggleHeading(editor, level)) return false;

  const chain = editor.chain().focus();

  return level
    ? chain.clearNodes().toggleHeading({ level }).run()
    : chain.setParagraph().run();
}

// Hook
export function useHeading() {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        currentType: getCurrentHeading(editor),
        canToggle: canToggleHeading(editor),
      };
    },
  });

  const handleToggle = useCallback(
    (type: HeadingType) => {
      if (type === "paragraph") {
        return toggleHeading(editor);
      }

      const level = Number(type.split("heading")[1]) as HeadingLevel;
      return toggleHeading(editor, level);
    },
    [editor],
  );

  return {
    ...editorState,
    toggleHeading: handleToggle,
  };
}
