import { Node } from "@tiptap/pm/model";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { isNodeSelection, isTextSelection, posToDOMRect } from "@tiptap/react";

import type { Content, DOMNode, Editor } from "@tiptap/react";

/**
 * Checks if the current selection in the editor is valid
 * @param editor - The TipTap editor instance
 * @param excludeNodeTypes - Array of node type names to exclude from valid node selections
 * @returns True if the selection is valid (either valid text or valid node selection)
 */
export const isValidSelection = (
  editor: Editor | null,
  excludeNodeTypes: string[] = [],
): boolean => {
  if (!editor) return false;

  const { selection } = editor.state;

  const isValidText = isValidTextSelection(editor);
  const isValidNode =
    isNodeSelection(selection) &&
    !excludeNodeTypes.includes(selection.node.type.name);

  return isValidText || isValidNode;
};

/**
 * Checks if the current text selection in the editor is valid
 * @param editor - The TipTap editor instance
 * @returns True if there is a non-empty text selection
 */
export const isValidTextSelection = (editor: Editor | null): boolean => {
  if (!editor) return false;

  const { selection, doc } = editor.state;

  // Sometime check for `empty` is not enough.
  // Doubleclick an empty paragraph returns a node size of 2.
  // So we check also for an empty text size.
  const isEmptyTextBlock =
    isTextSelection(selection) &&
    !doc.textBetween(selection.from, selection.to).length;

  return !selection.empty && !isEmptyTextBlock;
};

/**
 * Gets the bounding rectangle of the current selection in the editor
 * @param editor - The TipTap editor instance
 * @returns DOMRect representing the bounds of the selection, or empty DOMRect if no editor
 */
export const getSelectionBoundingRect = (editor: Editor | null): DOMRect => {
  if (!editor) return new DOMRect();

  const {
    state: { selection },
    view,
  } = editor;
  const { ranges } = selection;

  const from = Math.min(...ranges.map((range) => range.$from.pos));
  const to = Math.max(...ranges.map((range) => range.$to.pos));

  if (isNodeSelection(selection)) {
    const node = view.nodeDOM(from) as HTMLElement;
    if (node) return node.getBoundingClientRect();
  }

  return posToDOMRect(view, from, to);
};

/**
 * Gets the DOM element corresponding to the current selection
 * @param editor - The TipTap editor instance
 * @returns HTMLElement for the selected node, or null if no valid selection
 */
export function getSelectedDOM(editor: Editor | null) {
  if (!editor) return null;

  const { state, view } = editor;
  const { selection } = state;

  if (selection instanceof NodeSelection) {
    return view.nodeDOM(selection.from) as HTMLElement | null;
  }

  if (selection instanceof TextSelection) {
    const $anchor = selection.$anchor;

    // Ensure the depth is sufficient to avoid errors
    if ($anchor.depth >= 1) {
      const dom = view.nodeDOM($anchor.before(1));
      if (dom instanceof HTMLElement) {
        return dom;
      }
    }
  }

  return null;
}

/**
 * Finds the closest DOM ancestor that matches the given predicate
 * @param editor - The TipTap editor instance
 * @param predicate - Function that tests each DOM node
 * @returns The first ancestor DOM node that matches the predicate, or null if none found
 */
export function getClosestDOM(
  editor: Editor | null,
  predicate: (node: DOMNode) => boolean,
): DOMNode | null {
  if (!editor) return null;

  const { view, state } = editor;
  let node: DOMNode =
    view.nodeDOM(state.selection.from) ||
    view.domAtPos(state.selection.from).node;

  while (node && !predicate(node)) {
    node = node.parentElement as DOMNode;
  }

  return node;
}

/**
 * Gets the bounding rectangle of the top-level ancestor node containing the selection
 * @param editor - The TipTap editor instance
 * @returns DOMRect of the ancestor node, or empty DOMRect if no editor or node found
 */
export function getAncestorBoundingRect(editor: Editor | null): DOMRect {
  if (!editor) return new DOMRect();

  const { selection } = editor.state;
  const { $from } = selection;

  let depth = $from.depth;
  let pos = $from.pos;

  while (depth > 0) {
    pos = $from.before(depth);
    depth--;
  }

  const nodeDOM = editor.view.nodeDOM(pos) as HTMLElement | null;

  return nodeDOM ? nodeDOM.getBoundingClientRect() : new DOMRect();
}

/**
 * Loads initial content into the editor without adding to history
 * @param editor - The TipTap editor instance
 * @param content - The content to load into the editor
 * @returns True if the content was successfully loaded, false otherwise
 */
export function loadInitialContent(
  editor: Editor | null,
  content: Content,
): boolean {
  if (!editor) return false;

  const { doc } = editor.state;

  return editor
    .chain()
    .setMeta("addToHistory", false)
    .setMeta("preventUpdate", true)
    .insertContentAt({ from: 0, to: doc.content.size }, content, {
      updateSelection: false,
    })
    .run();
}

/**
 * Gets the editor content in the specified format (defaults to HTML)
 * @param editor - The TipTap editor instance
 * @param format - Format to return content in ("html" or "json")
 * @returns Editor content in the specified format
 */
export function getEditorContent(editor: Editor | null, format: "html"): string;
export function getEditorContent(
  editor: Editor | null,
  format: "json",
): Exclude<Content, string>;

export function getEditorContent(
  editor: Editor | null,
  format?: "html" | "json",
): Content;
export function getEditorContent(
  editor: Editor | null,
  format: "html" | "json" = "html",
): Content {
  if (!editor) return null;

  if (format === "html") {
    return editor.isEmpty ? "" : editor.getHTML();
  }

  return editor.getJSON();
}

/**
 * Gets the anchor node and its position in the document
 * @param editor - The TipTap editor instance
 * @param allowEmptySelection - Whether to allow empty selections (defaults to true)
 * @returns Object containing the node and its position, or null if no valid anchor found
 */
export function getAnchorNodeAndPos(
  editor: Editor | null,
  allowEmptySelection: boolean = true,
): { node: Node; pos: number } | null {
  if (!editor) return null;

  const { state } = editor;
  const { selection } = state;

  if (selection instanceof NodeSelection) {
    const node = selection.node;
    const pos = selection.from;

    return { node, pos };
  }

  if (selection.empty && !allowEmptySelection) return null;

  const $anchor = selection.$anchor;
  const depth = 1; // explicitly use depth 1
  const node = $anchor.node(depth);
  const pos = $anchor.before(depth);

  return { node, pos };
}

/**
 * Moves a node up or down in the editor document
 * @param editor - The TipTap editor instance
 * @param direction - Direction to move the node ("up" or "down")
 * @returns True if the node was successfully moved, false otherwise
 */
export function moveNode(
  editor: Editor | null,
  direction: "up" | "down",
): boolean {
  if (!editor || !editor.isEditable) return false;

  const nodeInfo = getAnchorNodeAndPos(editor);
  if (!nodeInfo) return false;

  try {
    const { pos, node } = nodeInfo;
    const tr = editor.state.tr;
    const $pos = tr.doc.resolve(pos);
    const parent = $pos.parent;
    const index = $pos.index();

    if (index < 0 || index >= parent.childCount) {
      return false;
    }

    if (direction === "up" && index > 0) {
      const prevNode = parent.child(index - 1);
      const prevSize = prevNode.nodeSize;

      const movedNode = node.type.create(node.attrs, node.content, node.marks);
      tr.deleteRange(pos, pos + node.nodeSize);
      const insertPos = pos - prevSize;
      tr.insert(insertPos, movedNode);
      tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos)));
    } else if (direction === "down" && index < parent.childCount - 1) {
      const nextNode = parent.child(index + 1);
      const nextSize = nextNode.nodeSize;

      const movedNode = node.type.create(node.attrs, node.content, node.marks);
      tr.deleteRange(pos, pos + node.nodeSize);
      const insertPos = pos + nextSize;
      tr.insert(insertPos, movedNode);
      tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos)));
    } else {
      return false;
    }

    editor.view.dispatch(tr);
    return true;
  } catch (err) {
    console.error("Error moving node:", err);
    return false;
  }
}
