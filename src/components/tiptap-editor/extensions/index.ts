import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TableKit as Table } from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit as TextStyle } from "@tiptap/extension-text-style";
import { CharacterCount, Placeholder, Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";

import { CellAlign } from "./cell-align";
import { CodeBlockLowlight } from "./code-block-lowlight";
import { CodeBlockShiki } from "./code-block-shiki";
import { FullScreen } from "./full-screen";
import { ImageFigure } from "./image";
import { Link } from "./link";
import { SourceView } from "./source-view";
import { Youtube } from "./youtube";

type ExtensionConfig = {
  placeholder?: string | Record<string, string>;
};

export function createExtensions({ placeholder }: ExtensionConfig) {
  return [
    StarterKit.configure({
      horizontalRule: false,
      hardBreak: false,
      codeBlock: false,
      link: false,
      listItem: {},
    }),
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: true,
      showOnlyWhenEditable: true,
      placeholder: ({ node }) => {
        if (typeof placeholder === "string") return placeholder;
        if (placeholder && node.type.name in placeholder) {
          return placeholder[node.type.name];
        }
        return "Write something…";
      },
    }),
    Link,
    Subscript,
    Superscript,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Selection,
    CharacterCount,
    CellAlign,
    Table.configure({
      table: {
        cellMinWidth: 35,
        resizable: true,
      },
    }),
    TextStyle.configure({
      lineHeight: false,
      fontFamily: false,
      fontSize: false,
    }),
    ImageFigure,
    // CodeBlockLowlight,
    CodeBlockShiki,
    Youtube,
    FullScreen,
    SourceView,
  ];
}

// const placeholders: Record<string, Record<string, string>> = {
//   en: {
//     paragraph: "Type your content here...",
//     imageCaption: "Type caption for image (optional)",
//   },
//   vi: {
//     paragraph: "Nhập nội dung bài viết...",
//     imageCaption: "Nhập chú thích ảnh (tuỳ chọn)",
//   },
//   jp: {
//     paragraph: "ここに内容を入力してください...",
//     imageCaption: "画像のキャプションを入力（任意）",
//   },
// };
