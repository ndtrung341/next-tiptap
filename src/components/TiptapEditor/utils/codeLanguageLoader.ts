import { createLowlight } from "lowlight";
import {
  CODE_BLOCK_LANGUAGUE_SYNTAX_DEFAULT,
  CODE_BLOCK_LANGUAGUES,
} from "../constants/code-languages";

export const languagesLoader: Record<string, () => Promise<any>> = {
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
  less: () => import("highlight.js/lib/languages/less"),
  makefile: () => import("highlight.js/lib/languages/makefile"),
  markdown: () => import("highlight.js/lib/languages/markdown"),
  objectivec: () => import("highlight.js/lib/languages/objectivec"),
  php: () => import("highlight.js/lib/languages/php"),
  plaintext: () => import("highlight.js/lib/languages/plaintext"),
  python: () => import("highlight.js/lib/languages/python"),
  scss: () => import("highlight.js/lib/languages/scss"),
  shell: () => import("highlight.js/lib/languages/shell"),
  sql: () => import("highlight.js/lib/languages/sql"),
  typescript: () => import("highlight.js/lib/languages/typescript"),
  vbnet: () => import("highlight.js/lib/languages/vbnet"),
  xml: () => import("highlight.js/lib/languages/xml"),
};

export async function loadLanguage(
  languageName: string,
  lowlight: ReturnType<typeof createLowlight>
) {
  if (lowlight.registered(languageName)) return false;
  try {
    const { default: language } = await languagesLoader[languageName]?.();
    lowlight.register(languageName, language);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function findLanguage(value: string | undefined) {
  const lowercase = value?.toLowerCase() || CODE_BLOCK_LANGUAGUE_SYNTAX_DEFAULT;
  const language = CODE_BLOCK_LANGUAGUES.find(
    (language) => language.syntax === lowercase || language.alias?.split(", ").includes(lowercase)
  );
  return language;
}
