import { type Dispatch, Extension, isNodeActive } from "@tiptap/core";
import { TextSelection, type EditorState, type Transaction } from "@tiptap/pm/state";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
    };
    outdent: {
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create({
  name: "indent",
  addOptions() {
    return {
      types: ["heading", "paragraph"],
      minLevel: 0,
      maxLevel: 4,
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.indent || attributes.indent == this.options.minLevel) return {};
              return { "data-indent": attributes.indent };
            },
            parseHTML: (element) => {
              const level = Number.parseInt(element.getAttribute("data-indent") || "", 10);
              return level && level > this.options.minLevel ? level : null;
            },
          },
        },
      },
    ];
  },
  addCommands() {
    const setNodeIndentMarkup = (tr: Transaction, pos: number, delta: number) => {
      const node = tr.doc.nodeAt(pos) ?? null;
      if (node) {
        const nextLevel = (node.attrs.indent || 0) + delta;
        const { minLevel, maxLevel } = this.options;
        let indent = nextLevel;
        if (nextLevel < minLevel) {
          indent = minLevel;
        } else if (nextLevel > maxLevel) {
          indent = maxLevel;
        }
        if (indent !== node.attrs.indent) {
          const clonedAttrs = { ...node.attrs };
          delete clonedAttrs.indent;

          const nodeAttrs = indent > minLevel ? { ...clonedAttrs, indent } : clonedAttrs;
          return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
        }
      }
      return tr;
    };
    const updateIndentLevel = (tr: Transaction, delta: number) => {
      const { doc, selection } = tr;
      if (doc && selection && selection instanceof TextSelection) {
        const { from, to } = selection;
        doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            tr = setNodeIndentMarkup(tr, pos, delta);
            return false;
          }
          return true;
        });
      }
      return tr;
    };
    const applyIndent =
      (direction: number) =>
      () =>
      ({ tr, state, dispatch }: { tr: Transaction; state: EditorState; dispatch: Dispatch }) => {
        const { selection } = state;
        tr.setSelection(selection);
        tr = updateIndentLevel(tr, direction);
        if (tr.docChanged) {
          if (dispatch) {
            dispatch(tr);
          }
        }
        return true;
      };
    return {
      indent: applyIndent(1),
      outdent: applyIndent(-1),
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return !isNodeActive(this.editor.state, "listItem") && this.editor.commands.indent();
      },
      "Shift-Tab": () => {
        return !isNodeActive(this.editor.state, "listItem") && this.editor.commands.outdent();
      },
      Backspace: ({ editor }) => {
        const { selection } = editor.state;
        const { $anchor } = selection;

        if ($anchor.parentOffset !== 0) return false;

        const parentNode = $anchor.parent;
        const nodeTypeMatches = this.options.types.includes(parentNode.type.name);
        const indentLevel = parentNode.attrs.indent || 0;

        if (nodeTypeMatches && indentLevel > this.options.minLevel) {
          return this.editor.commands.outdent();
        }

        return false;
      },
    };
  },
});
