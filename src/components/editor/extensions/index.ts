import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Link from "./link";
import Image from "./image-resize";

export const extensions = [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    hardBreak: false,
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph", "image"],
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Link.configure({
    openOnClick: false,
  }),
  Image.configure({
    allowBase64: false,
  }),
];
