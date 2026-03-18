import { useCallback } from "react";

import { useEditorState, useTiptap, type Editor } from "@tiptap/react";

// Types
export type TextStyleProperty = "color" | "backgroundColor";

export interface TextStyleAttributes {
  color?: string;
  backgroundColor?: string;
}

// Utility functions
export function canSetTextStyle(
  editor: Editor | null,
  property: TextStyleProperty,
): boolean {
  if (!editor || !editor.isEditable) return false;

  const testValues: Record<TextStyleProperty, string> = {
    color: "currentColor",
    backgroundColor: "currentColor",
  };

  return editor
    .can()
    .setMark("textStyle", { [property]: testValues[property] });
}

export function getActiveTextStyle(
  editor: Editor | null,
  property: TextStyleProperty,
): string | undefined {
  if (!editor) return undefined;

  const attributes = editor.getAttributes("textStyle");
  return attributes[property];
}

export function isTextStyleActive(
  editor: Editor | null,
  property: TextStyleProperty,
  value?: string,
): boolean {
  if (!editor) return false;

  const currentValue = getActiveTextStyle(editor, property);

  if (value) {
    return currentValue === value;
  }

  return Boolean(currentValue);
}

export function setTextStyle(
  editor: Editor | null,
  attributes: TextStyleAttributes,
): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.chain().focus().setMark("textStyle", attributes).run();
}

export function unsetTextStyle(
  editor: Editor | null,
  property: TextStyleProperty,
): boolean {
  if (!editor || !editor.isEditable) return false;

  return editor
    .chain()
    .focus()
    .setMark("textStyle", { [property]: null })
    .removeEmptyTextStyle()
    .run();
}

export function toggleTextStyle(
  editor: Editor | null,
  property: TextStyleProperty,
  value: string,
): boolean {
  if (!editor?.isEditable) return false;

  const isActive = isTextStyleActive(editor, property, value);

  if (isActive) {
    return unsetTextStyle(editor, property);
  } else {
    return setTextStyle(editor, { [property]: value });
  }
}

// Hook
export function useTextStyle(property: TextStyleProperty) {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        currentValue: getActiveTextStyle(editor, property),
        canSetValue: canSetTextStyle(editor, property),
      };
    },
  });

  const setValue = useCallback(
    (value: string) => {
      return setTextStyle(editor, { [property]: value });
    },
    [editor, property],
  );

  const unsetValue = useCallback(() => {
    return unsetTextStyle(editor, property);
  }, [editor, property]);

  const toggleValue = useCallback(
    (value: string) => {
      return toggleTextStyle(editor, property, value);
    },
    [editor, property],
  );

  return {
    ...editorState,
    setValue,
    unsetValue,
    toggleValue,
  };
}
