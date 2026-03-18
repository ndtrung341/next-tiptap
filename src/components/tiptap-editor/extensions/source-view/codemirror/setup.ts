import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import {
  history,
  defaultKeymap,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
import {
  foldGutter,
  indentOnInput,
  bracketMatching,
  foldKeymap,
} from "@codemirror/language";
import { searchKeymap } from "@codemirror/search";
import {
  EditorView,
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
} from "@codemirror/view";

export const setup = [
  html(),
  EditorView.lineWrapping,
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  highlightActiveLine(),
  history(),
  foldGutter({
    markerDOM: (open) => {
      const el = document.createElement("span");
      el.textContent = open ? "▾" : "▸";
      return el;
    },
  }),
  drawSelection(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  keymap.of([
    indentWithTab,
    ...defaultKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...closeBracketsKeymap,
    ...searchKeymap,
  ]),
];
