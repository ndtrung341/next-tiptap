import {
  CharacterCount,
  CodeBlock,
  ImageFigure,
  Link,
  ListKeymap,
  Placeholder,
  StarterKit,
  Subscript,
  Superscript,
  TextAlign,
  Underline,
  Selection,
  ImageCaption,
  Youtube,
  Image,
  TextStyle,
  Color,
  Highlight,
  Table,
} from "./extensions";

const ExtensionKit = [
  StarterKit.configure({
    horizontalRule: false,
    hardBreak: false,
    codeBlock: false,
  }),
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: true,
    placeholder: ({ editor, node }) => {
      // @ts-ignore
      const placeholder = editor.options.editorProps["placeholder"];
      switch (node.type.name) {
        case ImageCaption.name:
          return placeholder?.imageCaption;
        default:
          return placeholder?.paragraph;
      }
    },
  }),
  Selection,
  CharacterCount,
  Underline,
  Superscript,
  Subscript,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  ListKeymap,
  Link,
  Image,
  ImageFigure,
  CodeBlock,
  Youtube,
  Table,
];

export default ExtensionKit;
