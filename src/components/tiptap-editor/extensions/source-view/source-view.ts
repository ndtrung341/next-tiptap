import { Annotation, Compartment } from "@codemirror/state";
import { EditorView as CodeMirror } from "@codemirror/view";
import { createDocument, Extension, getHTMLFromFragment } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

import { setup } from "./codemirror/setup";
import { theme } from "./codemirror/theme";
import { prettify } from "./prettify";

export interface SourceViewOptions {}

export interface SourceViewStorage {
  enabled: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    sourceView: {
      toggleSourceView: () => ReturnType;
      setSourceView: (enabled: boolean) => ReturnType;
    };
  }

  interface Storage {
    sourceView: SourceViewStorage;
  }
}

const externalChange = Annotation.define<boolean>();
const editableCompartment = new Compartment();

export const SourceView = Extension.create<
  SourceViewOptions,
  SourceViewStorage
>(() => {
  let isDirty = false;
  let element: HTMLElement;
  let initialEditable: boolean;
  let cm: CodeMirror;

  function syncToCodeMirror(state: EditorState) {
    const content = getHTMLFromFragment(state.doc.content, state.schema);
    prettify(content).then((formatted) => {
      cm.dispatch({
        changes: { from: 0, to: cm.state.doc.length, insert: formatted },
        annotations: externalChange.of(true),
        effects: editableCompartment.reconfigure(
          CodeMirror.editable.of(initialEditable),
        ),
      });
    });
  }

  function syncToTiptap(state: EditorState) {
    if (!isDirty) return;

    const content = cm.state.doc.toString();
    const newDoc = createDocument(content, state.schema);
    state.tr.replaceWith(0, state.doc.content.size, newDoc);

    isDirty = false;
  }

  function show(view: EditorView) {
    requestAnimationFrame(() => {
      element.style.display = "";
      view.dom.parentElement!.style.display = "none";
      cm.focus();
    });
  }

  function hide(view: EditorView) {
    requestAnimationFrame(() => {
      element.style.display = "none";
      view.dom.parentElement!.style.display = "";
      view.focus();
    });
  }

  return {
    name: "sourceView",

    addStorage() {
      return { enabled: false };
    },

    onCreate({ editor }) {
      if (typeof window === "undefined" || !this.editor.view) return;

      element = document.createElement("div");
      element.className = "rte-source__content";
      element.style.display = "none";

      cm = new CodeMirror({
        parent: element,
        extensions: [
          setup,
          theme,
          editableCompartment.of(CodeMirror.editable.of(initialEditable)),
          CodeMirror.updateListener.of((update) => {
            if (
              update.docChanged &&
              !update.transactions.some((tr) => tr.annotation(externalChange))
            ) {
              isDirty = true;
            }
          }),
        ],
      });

      editor.view.dom.parentElement?.insertAdjacentElement("afterend", element);
    },

    onDestroy() {
      cm?.destroy();
      element?.remove();
    },

    addCommands() {
      return {
        setSourceView:
          (enabled: boolean) =>
          ({ view, state, editor }) => {
            this.storage.enabled = enabled;

            if (enabled) {
              if (initialEditable !== editor.isEditable) {
                initialEditable = editor.isEditable;
              }

              editor.setEditable(false);
              syncToCodeMirror(state);
              show(view);
            } else {
              editor.setEditable(initialEditable);
              syncToTiptap(state);
              hide(view);
            }

            return true;
          },

        toggleSourceView:
          () =>
          ({ commands }) =>
            commands.setSourceView(!this.storage.enabled),
      };
    },
  };
});
