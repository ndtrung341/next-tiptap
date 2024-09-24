import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

import Link from './link';
import Image from './image-resize';
import CodeBlockLowlight from './code-block-lowlight/code-block-lowlight';
import Heading from './heading';

export const extensions = [
  Image,
  StarterKit.configure({
    heading: false,
    horizontalRule: false,
    codeBlock: false,
    hardBreak: false,
    dropcursor: {}
  }),
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6]
  }),
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'image']
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true
  }),
  Link.configure({
    openOnClick: false
  }),
  Placeholder.configure({
    placeholder: 'Type or paste your content here!'
  }),
  CodeBlockLowlight
];
