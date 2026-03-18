import { useCallback } from "react";

import { useEditorState, useTiptap, type Editor } from "@tiptap/react";

// Types
export interface TableInsertOptions {
  rows: number;
  cols: number;
  withHeaderRow?: boolean;
}

export type CellAlign =
  | "top"
  | "top-left"
  | "top-right"
  | "middle"
  | "middle-left"
  | "middle-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export type TableAction =
  | "addRowBefore"
  | "addRowAfter"
  | "addColumnBefore"
  | "addColumnAfter"
  | "deleteRow"
  | "deleteColumn"
  | "toggleHeaderRow"
  | "toggleHeaderColumn"
  | "mergeCells"
  | "splitCell"
  | "deleteTable";

// Utility functions
export function canInsertTable(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.can().insertTable();
}

export function isTableActive(editor: Editor | null): boolean {
  if (!editor) return false;
  return editor.isActive("table");
}

export function canExecuteTableAction(
  editor: Editor | null,
  action: TableAction,
): boolean {
  if (!editor || !editor.isEditable || !isTableActive(editor)) return false;

  switch (action) {
    case "addRowBefore":
      return editor.can().addRowBefore();
    case "addRowAfter":
      return editor.can().addRowAfter();
    case "addColumnBefore":
      return editor.can().addColumnBefore();
    case "addColumnAfter":
      return editor.can().addColumnAfter();
    case "deleteRow":
      return editor.can().deleteRow();
    case "deleteColumn":
      return editor.can().deleteColumn();
    case "toggleHeaderRow":
      return editor.can().toggleHeaderRow();
    case "toggleHeaderColumn":
      return editor.can().toggleHeaderColumn();
    case "mergeCells":
      return editor.can().mergeCells();
    case "splitCell":
      return editor.can().splitCell();
    case "deleteTable":
      return editor.can().deleteTable();
    default:
      return false;
  }
}

export function insertTable(
  editor: Editor | null,
  options: TableInsertOptions,
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canInsertTable(editor)) return false;

  return editor
    .chain()
    .focus()
    .insertTable({
      rows: options.rows,
      cols: options.cols,
      withHeaderRow: options.withHeaderRow || false,
    })
    .run();
}

export function executeTableAction(
  editor: Editor | null,
  action: TableAction,
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canExecuteTableAction(editor, action)) return false;

  const chain = editor.chain().focus();

  switch (action) {
    case "addRowBefore":
      return chain.addRowBefore().run();
    case "addRowAfter":
      return chain.addRowAfter().run();
    case "addColumnBefore":
      return chain.addColumnBefore().run();
    case "addColumnAfter":
      return chain.addColumnAfter().run();
    case "deleteRow":
      return chain.deleteRow().run();
    case "deleteColumn":
      return chain.deleteColumn().run();
    case "toggleHeaderRow":
      return chain.toggleHeaderRow().run();
    case "toggleHeaderColumn":
      return chain.toggleHeaderColumn().run();
    case "mergeCells":
      return chain.mergeCells().run();
    case "splitCell":
      return chain.splitCell().run();
    case "deleteTable":
      return chain.deleteTable().run();
    default:
      return false;
  }
}

// Hook
export function useTable() {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        isActive: isTableActive(editor),
        canInsert: canInsertTable(editor),
        shouldShowMenu: isTableActive(editor),
      };
    },
  });

  const insert = useCallback(
    (options: TableInsertOptions) => insertTable(editor, options),
    [editor],
  );

  const addRowBefore = useCallback(
    () => executeTableAction(editor, "addRowBefore"),
    [editor],
  );

  const addRowAfter = useCallback(
    () => executeTableAction(editor, "addRowAfter"),
    [editor],
  );

  const addColumnBefore = useCallback(
    () => executeTableAction(editor, "addColumnBefore"),
    [editor],
  );

  const addColumnAfter = useCallback(
    () => executeTableAction(editor, "addColumnAfter"),
    [editor],
  );

  const deleteRow = useCallback(
    () => executeTableAction(editor, "deleteRow"),
    [editor],
  );

  const deleteColumn = useCallback(
    () => executeTableAction(editor, "deleteColumn"),
    [editor],
  );

  const toggleHeaderRow = useCallback(
    () => executeTableAction(editor, "toggleHeaderRow"),
    [editor],
  );

  const toggleHeaderColumn = useCallback(
    () => executeTableAction(editor, "toggleHeaderColumn"),
    [editor],
  );

  const mergeCells = useCallback(
    () => executeTableAction(editor, "mergeCells"),
    [editor],
  );

  const splitCell = useCallback(
    () => executeTableAction(editor, "splitCell"),
    [editor],
  );

  const deleteTable = useCallback(
    () => executeTableAction(editor, "deleteTable"),
    [editor],
  );

  const toggleCellAlignment = useCallback(
    (align: CellAlign) => editor.chain().focus().toggleCellAlign(align).run(),
    [editor],
  );

  return {
    ...editorState,
    insert,
    addRowBefore,
    addRowAfter,
    addColumnBefore,
    addColumnAfter,
    deleteRow,
    deleteColumn,
    toggleHeaderRow,
    toggleHeaderColumn,
    mergeCells,
    splitCell,
    deleteTable,
    toggleCellAlignment,
  };
}
