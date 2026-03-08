import { createHighlightPlugin } from "prosemirror-highlight";
import { createParser, type Parser } from "prosemirror-highlight/lowlight";

import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "@/lib/lowlight";

let highlighter: Highlighter | undefined;
let highlighterPromise: Promise<void> | undefined;
let parser: Parser | undefined;

const loadHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      langs: ["plaintext", "xml"],
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
  if (!loadedLanguages.includes(language)) {
    return highlighter.loadLanguage(language);
  }

  if (!parser) {
    parser = createParser(highlighter);
  }

  return parser(options);
};

export const lowlightPlugin = createHighlightPlugin({
  parser: lazyParser,
});
