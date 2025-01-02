import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

export const themeConfig = EditorView.theme({
  "&": {
    color: "inherit",
    fontSize: "90%",
    paddingBlock: "10px",
    backgroundColor: "inherit",
    outline: "none !important",
    display: "inline-flex !important",
    width: "100%",
  },
  ".cm-content": {
    lineHeight: 1.75,
    fontFamily: "var(--font-mono)",
  },
  ".cm-gutters": {
    color: "inherit",
    backgroundColor: "inherit",
    borderRight: "unset",
  },
  ".cm-lineNumbers .cm-gutterElement": {
    paddingRight: "24px",
    opacity: "75%",
  },
  ".cm-lineWrapping ": {
    wordBreak: "break-all !important",
  },
});

export const highlightStyle = HighlightStyle.define([
  { tag: [t.standard(t.tagName), t.tagName], class: "cm-tag" },
  { tag: [t.comment, t.bracket], class: "cm-comment" },
  { tag: [t.className, t.propertyName], class: "cm-class" },
  { tag: [t.variableName, t.attributeName, t.number, t.operator], class: "cm-variable" },
  { tag: [t.keyword, t.typeName, t.typeOperator, t.typeName], class: "cm-keyword" },
  { tag: [t.string, t.meta, t.regexp], class: "cm-string" },
  { tag: [t.name, t.quote], class: "cm-name" },
  { tag: [t.heading, t.strong], class: "cm-heading", fontWeight: "bold" },
  { tag: [t.emphasis], class: "cm-emphasis", fontStyle: "italic" },
  { tag: [t.deleted], class: "cm-deleted" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], class: "cm-atom" },
  { tag: t.link, textDecoration: "underline" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.invalid, class: "cm-invalid" },
]);

export const theme: Extension = [themeConfig, syntaxHighlighting(highlightStyle)];
