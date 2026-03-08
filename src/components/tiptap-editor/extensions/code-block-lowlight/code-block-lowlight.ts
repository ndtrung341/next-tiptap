import CodeBlock from "@tiptap/extension-code-block";

import { defaultLanguage, getSupportedLanguages } from "@/lib/lowlight";

import { lowlightPlugin } from "./lowlight-plugin";

export const CodeBlockLowlight = CodeBlock.extend({
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
    return [lowlightPlugin];
  },
});
