import { supportedLanguages } from "./shiki.config";

import type { SpecialLanguage } from "@shikijs/types";

export function getSupportedLanguages() {
  return Object.entries(supportedLanguages).map(([key, value]) => ({
    label: value.name,
    value: key,
    alias: value.aliases.join(", "),
  }));
}

export function isSpecialLanguage(lang: string): lang is SpecialLanguage {
  const special = ["plaintext", "txt", "text", "plain", "ansi"];
  return special.includes(lang);
}
