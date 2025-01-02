import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import * as prod from "react/jsx-runtime";
import { codeToHast } from "shiki/bundle/full";
import type { JSX } from "react";

export async function highlight(code: string, lang: string) {
  const out = await codeToHast(code, {
    lang,
    themes: {
      light: "github-light-default",
      dark: "one-dark-pro",
    },
    //  structure: "inline",
  });

  return toJsxRuntime(out as any, {
    Fragment: prod.Fragment,
    jsx: prod.jsx,
    jsxs: prod.jsxs,
    components: {
      pre: ({ children }) => children as any,
    },
  }) as JSX.Element;
}
