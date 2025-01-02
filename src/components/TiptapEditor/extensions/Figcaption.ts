import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { NodeType } from "@tiptap/pm/model";
import { TextSelection } from "@tiptap/pm/state";

export const Figcaption = Node.create({
  name: "figcaption",
  group: "block",
  inline: false,
  content: "inline*",
  marks: "",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: "figcaption" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["figcaption", mergeAttributes(HTMLAttributes), 0];
  },

  addKeyboardShortcuts() {
    return {
      "Mod-a": ({ editor }) => handleSelectAll(editor, this.type),
      Backspace: ({ editor }) => handleDeleteOrBackspace(editor, "Backspace", this.type),
      Delete: ({ editor }) => handleDeleteOrBackspace(editor, "Delete", this.type),
    };
  },
});

export default Figcaption;

function handleSelectAll(editor: Editor, nodeType: NodeType) {
  const { state, view } = editor;
  const { selection } = state;
  const { $anchor } = selection;

  // If cursor is not in imageCaption, let default Ctrl+A behavior work
  if ($anchor.parent.type !== nodeType) {
    return false;
  }

  const tr = state.tr;
  const start = $anchor.start();
  const end = $anchor.end();

  view.dispatch(tr.setSelection(TextSelection.create(tr.doc, start, end)));
  return true;
}

function handleDeleteOrBackspace(
  editor: Editor,
  handle: "Delete" | "Backspace",
  nodeType: NodeType
) {
  const { selection } = editor.state;
  const { $from, empty } = selection;

  // if the cursor is not inside imageCaption
  // do nothing
  if ($from.parent.type !== nodeType) {
    return false;
  }

  // if the cursor is at the end of a node and `Delete` pressed
  // or the cursor is at the start of a node and `Backspace` pressed
  if (handle === "Delete") {
    const isAtEnd = empty && $from.parentOffset === $from.parent.nodeSize - 2;
    return isAtEnd;
  } else if (handle === "Backspace") {
    const isAtStart = empty && $from.parentOffset === 0;
    return isAtStart;
  }

  return false;
}
