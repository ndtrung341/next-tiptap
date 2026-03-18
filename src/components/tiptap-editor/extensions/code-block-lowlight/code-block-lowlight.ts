import CodeBlock from "@tiptap/extension-code-block";

import { defaultLanguage, getSupportedLanguages } from "@/lib/lowlight";

import { lowlightPlugin } from "./lowlight-plugin";

export const CodeBlockLowlight = CodeBlock.extend({
  // @ts-expect-error: parent?.() spread causes optional/required mismatch
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
