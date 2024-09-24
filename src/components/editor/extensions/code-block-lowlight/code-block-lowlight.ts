import { createLowlight } from 'lowlight';
import {
  ExtendedRegExpMatchArray,
  ReactNodeViewRenderer,
  textblockTypeInputRule
} from '@tiptap/react';
import { CodeBlockLowlight as BaseCodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import CodeBlock from '../../components/code-block';
import {
  findLanguage,
  loadLanguage
} from '../../lib/code-block-language-loader';
import { LowlightPlugin } from './low-light-plugin';
import { CODE_BLOCK_LANGUAGUE_SYNTAX_DEFAULT } from '../../constants/code_block_languages';
import plaintext from 'highlight.js/lib/languages/plaintext';

export const backtickInputRegex = /^```([a-z]+)?[\s\n]$/;
export const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/;

const lowlight = createLowlight();
lowlight.register('plaintext', plaintext);

export default BaseCodeBlockLowlight.extend({
  name: 'codeBlock',

  addInputRules() {
    const findAndLoadLanguage = (match: ExtendedRegExpMatchArray) => {
      const language = findLanguage(match[1]);
      const syntax = language?.syntax || CODE_BLOCK_LANGUAGUE_SYNTAX_DEFAULT;
      loadLanguage(syntax, lowlight);
      return { language: syntax };
    };
    return [
      textblockTypeInputRule({
        find: backtickInputRegex,
        type: this.type,
        getAttributes: findAndLoadLanguage
      }),
      textblockTypeInputRule({
        find: tildeInputRegex,
        type: this.type,
        getAttributes: findAndLoadLanguage
      })
    ];
  },

  addProseMirrorPlugins() {
    return [
      LowlightPlugin({
        lowlight,
        name: this.name,
        defaultLanguage: CODE_BLOCK_LANGUAGUE_SYNTAX_DEFAULT
      })
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock);
  }
}).configure({
  lowlight
});
