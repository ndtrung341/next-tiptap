import { Link as TiptapLink, LinkOptions } from "@tiptap/extension-link";
import { getMarkRange } from "@tiptap/core";
import { Plugin, Selection, TextSelection } from "@tiptap/pm/state";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customLink: {
      insertLink: (attrs: any) => ReturnType;
      startEditLink: () => ReturnType;
      confirmEditLink: (attrs?: { text?: string; href?: string }) => ReturnType;
    };
  }
}

export interface LinkEditorStorage {
  mode: number; // 0: hidden, 1: update, -1: create
  tempPos: Selection | null;
}

export const Link = TiptapLink.extend<LinkOptions, LinkEditorStorage>({
  inclusive: false,

  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
    };
  },

  addStorage() {
    return {
      mode: 0,
      tempPos: null,
    };
  },

  onSelectionUpdate() {
    if (this.storage.mode == -1 && !this.editor.isActive("link")) {
      this.editor.commands.confirmEditLink();
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      startEditLink:
        () =>
        ({ editor, chain }) => {
          const mode = editor.isActive("link") ? 1 : -1;

          if (mode === -1) {
            chain()
              .command(({ chain, tr }) => {
                this.storage.tempPos = tr.selection;
                if (tr.selection.empty)
                  return chain()
                    .blur()
                    .focus(tr.selection.anchor)
                    .insertLink({ text: "\u200B" })
                    .run();
                // @ts-ignore
                return chain().setLink({href:""}).run();
              })
              .setMeta("addToHistory", false)
              .setMeta("preventUpdate", true)
              .setMeta("preventClearTempLink", true)
              .run();
          }

          this.storage.mode = mode;

          return true;
        },
      insertLink:
        (attrs) =>
        ({ chain }) => {
          const { text, href } = attrs;
          return chain()
            .insertContent(
              {
                type: "text",
                text: text,
                marks: [
                  {
                    type: "link",
                    attrs: {
                      href,
                      target: "_blank",
                    },
                  },
                ],
              },
              { updateSelection: false }
            )
            .setLink({ href })
            .run();
        },
      confirmEditLink:
        (updated) =>
        ({ chain, state }) => {
          const { doc, schema } = state;

          const shouldUpdate = Boolean(updated);

          chain()
            .command(({ tr, commands }) => {
              if (shouldUpdate) return commands.insertLink(updated);
              clearTempLinks(tr, doc, this.storage.tempPos);
              return true;
            })
            .setMeta("addToHistory", shouldUpdate)
            .setMeta("preventUpdate", !shouldUpdate)
            .run();

          this.storage.mode = 0;
          this.storage.tempPos = null;

          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      new Plugin({
        props: {
          handleClick: (view, pos, event) => {
            if (!view.editable) {
              return false;
            }

            const { schema, doc, tr } = view.state;
            const range = getMarkRange(doc.resolve(pos), schema.marks.link);
            const target = event.target as HTMLElement;
            const linkElement = target.closest("a");

            if (!linkElement?.href || !range) {
              return false;
            }
            const $start = doc.resolve(range.from);
            const $end = doc.resolve(range.to);

            const transaction = tr.setSelection(new TextSelection($start, $end));

            view.dispatch(transaction);

            this.storage.mode = 1;
          },
        },
        appendTransaction: (transactions, oldState, newState) => {
          const hasDocChanges =
            transactions.some((transaction) => transaction.docChanged) &&
            !oldState.doc.eq(newState.doc);
          const skipTransaction = transactions.some((transaction) =>
            transaction.getMeta("preventClearTempLink")
          );

          if (!hasDocChanges || skipTransaction) return;

          const tr = newState.tr;

          const range = getMarkRange(newState.selection.$anchor, newState.schema.marks.link);
          if (!range) {
            return;
          }

          clearTempLinks(tr, newState.doc, newState.selection);

          if (!tr.steps.length) {
            return;
          }

          return tr;
        },
      }),
    ];
  },

  addKeyboardShortcuts() {
    return {
      "Mod-k": () => this.editor.commands.startEditLink(),
    };
  },
});

function clearTempLinks(tr: any, doc: any, selection: any) {
  const { from, to, empty } = selection;
  if (empty) {
    tr.removeMark(from, from + 1);
    tr.insertText("", from, from + 1);
  } else {
    doc.nodesBetween(from, to, (node: any, pos: any) => {
      const linkMark = node.marks.find(
        (mark: any) => mark.type.name === "link" && !mark.attrs.href
      );

      if (linkMark) {
        tr.removeMark(pos, pos + node.nodeSize, linkMark);
      }
    });
  }
}

export default Link;
