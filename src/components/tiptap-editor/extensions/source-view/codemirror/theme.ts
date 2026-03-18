import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";

const themeExtension = EditorView.theme({
  "&": {
    flex: "1",
    color: "var(--cm-fg)",
    backgroundColor: "var(--cm-bg)",
    fontSize: "var(--cm-font-size, 13px)",
    fontFamily: "var(--cm-font)",
  },

  ".cm-scroller": {
    lineHeight: "var(--cm-line-height, 2)",
  },

  ".cm-content, .cm-gutter": { minHeight: "unset" },

  ".cm-line": {
    paddingInline: "16px",
  },

  ".cm-gutters": {
    color: "var(--cm-gutter-fg)",
    backgroundColor: "var(--cm-gutter-bg)",
    borderRight: "var(--cm-gutter-border, none)",
  },

  ".cm-content": {
    caretColor: "var(--cm-caret)",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "var(--cm-caret)",
  },

  ".cm-activeLine": {
    backgroundColor: "var(--cm-line-highlight)",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "var(--cm-line-highlight)",
  },

  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "var(--cm-selection) !important",
  },
});

const highlightStyle = HighlightStyle.define([
  { tag: [t.standard(t.tagName), t.tagName], color: "var(--cm-tag)" },
  { tag: [t.comment, t.bracket], color: "var(--cm-comment)" },
  { tag: [t.className, t.propertyName], color: "var(--cm-property)" },
  {
    tag: [t.variableName, t.attributeName, t.number, t.operator],
    color: "var(--cm-variable)",
  },
  { tag: [t.keyword, t.typeName, t.typeOperator], color: "var(--cm-keyword)" },
  { tag: [t.string, t.meta, t.regexp], color: "var(--cm-string)" },
  { tag: [t.name, t.quote], color: "var(--cm-name)" },
  {
    tag: [t.heading, t.strong],
    color: "var(--cm-heading)",
    fontWeight: "bold",
  },
  { tag: t.emphasis, color: "var(--cm-emphasis)", fontStyle: "italic" },
  { tag: t.deleted, color: "var(--cm-deleted)" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: "var(--cm-atom)" },
  { tag: t.link, color: "var(--cm-link)", textDecoration: "underline" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.invalid, color: "var(--cm-invalid)" },
]);

export const theme: Extension = [
  themeExtension,
  syntaxHighlighting(highlightStyle),
];
