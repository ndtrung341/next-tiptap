import CodeBlock from "@tiptap/extension-code-block";

import { defaultLanguage, getSupportedLanguages } from "@/lib/shiki";

import { shikiPlugin } from "./shiki-plugin";

export const CodeBlockShiki = CodeBlock.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      enableTabIndentation: true,
      tabSize: 2,
      defaultLanguage: defaultLanguage,
      supportedLanguages: getSupportedLanguages(),
    };
  },

  addProseMirrorPlugins() {
    return [shikiPlugin];
  },
});
