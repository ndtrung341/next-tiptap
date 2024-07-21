import { ReactNodeViewRenderer } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/core';
import { Image as BaseImage } from '@tiptap/extension-image';
import ResizeImage from '../components/resize-image';

export default BaseImage.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      group: 'block',
      defining: true,
      isolating: true
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute('src'),
        renderHTML: (attributes) => ({
          src: attributes.src
        })
      },
      width: {
        default: '100%'
      },
      alt: {
        default: undefined,
        parseHTML: (element) => element.getAttribute('alt'),
        renderHTML: (attributes) => ({
          alt: attributes.alt
        })
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]'
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizeImage);
  }
});
