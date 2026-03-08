import { type LanguageFn } from "highlight.js";
import { createLowlight } from "lowlight";

export type BundledLanguage =
  | "bash"
  | "c"
  | "csharp"
  | "css"
  | "go"
  | "graphql"
  | "java"
  | "javascript"
  | "json"
  | "kotlin"
  | "makefile"
  | "markdown"
  | "objectivec"
  | "rust"
  | "ruby"
  | "php"
  | "plaintext"
  | "python"
  | "scss"
  | "shell"
  | "sql"
  | "typescript"
  | "xml";

const bundledLanguages = {
  bash: () => import("highlight.js/lib/languages/bash"),
  c: () => import("highlight.js/lib/languages/c"),
  csharp: () => import("highlight.js/lib/languages/csharp"),
  css: () => import("highlight.js/lib/languages/css"),
  go: () => import("highlight.js/lib/languages/go"),
  graphql: () => import("highlight.js/lib/languages/graphql"),
  java: () => import("highlight.js/lib/languages/java"),
  javascript: () => import("highlight.js/lib/languages/javascript"),
  json: () => import("highlight.js/lib/languages/json"),
  kotlin: () => import("highlight.js/lib/languages/kotlin"),
  makefile: () => import("highlight.js/lib/languages/makefile"),
  markdown: () => import("highlight.js/lib/languages/markdown"),
  objectivec: () => import("highlight.js/lib/languages/objectivec"),
  rust: () => import("highlight.js/lib/languages/rust"),
  ruby: () => import("highlight.js/lib/languages/ruby"),
  php: () => import("highlight.js/lib/languages/php"),
  plaintext: () => import("highlight.js/lib/languages/plaintext"),
  python: () => import("highlight.js/lib/languages/python"),
  scss: () => import("highlight.js/lib/languages/scss"),
  shell: () => import("highlight.js/lib/languages/shell"),
  sql: () => import("highlight.js/lib/languages/sql"),
  typescript: () => import("highlight.js/lib/languages/typescript"),
  xml: () => import("highlight.js/lib/languages/xml"),
} as Record<BundledLanguage, () => Promise<{ default: LanguageFn }>>;

export const createHighlighter = async ({
  langs = [],
}: {
  langs?: BundledLanguage[];
} = {}) => {
  const lowlight = createLowlight();

  const loadLanguage = async (language: BundledLanguage) => {
    if (lowlight.registered(language)) {
      return;
    }

    const loader = bundledLanguages[language];
    if (!loader) {
      console.warn(`Language ${language} not found in bundle`);
      return;
    }
    try {
      const { default: lang } = await loader();
      lowlight.register(language, lang);
    } catch (err) {
      console.error(`Failed to load language: ${language}`, err);
    }
  };

  // Pre-load langs
  await Promise.all(langs.map(loadLanguage));

  return Object.assign(lowlight, {
    getLoadedLanguages: lowlight.listLanguages,
    loadLanguage,
  });
};

export type Highlighter = Awaited<ReturnType<typeof createHighlighter>>;

export { bundledLanguages };
