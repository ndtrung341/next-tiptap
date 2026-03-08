import { createHighlightPlugin } from "prosemirror-highlight";
import { createParser, type Parser } from "prosemirror-highlight/shiki";

import { createHighlighter, isSpecialLanguage } from "@/lib/shiki";

import type { Highlighter, BundledLanguage } from "@/lib/shiki";

let highlighter: Highlighter | undefined;
let highlighterPromise: Promise<void> | undefined;
let parser: Parser | undefined;

const loadHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["text"],
    }).then((h) => {
      highlighter = h;
    });
  }

  return highlighterPromise;
};

/**
 * Lazy load highlighter and highlighter languages.
 *
 * When the highlighter or the required language is not loaded, it returns a
 * promise that resolves when the highlighter or the language is loaded.
 * Otherwise, it returns an array of decorations.
 */
const lazyParser: Parser = (options) => {
  if (!highlighter) {
    return loadHighlighter();
  }

  const language = options.language as BundledLanguage;
  const loadedLanguages = highlighter.getLoadedLanguages();
  if (!isSpecialLanguage(language) && !loadedLanguages.includes(language)) {
    return highlighter.loadLanguage(language);
  }

  if (!parser) {
    parser = createParser(highlighter, {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      cssVariablePrefix: "--rte-shiki-",
    });
  }

  return parser(options);
};

export const shikiPlugin = createHighlightPlugin({
  parser: lazyParser,
});
