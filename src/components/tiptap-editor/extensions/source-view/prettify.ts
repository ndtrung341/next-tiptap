import parserHtml from "prettier/plugins/html";
import prettier from "prettier/standalone";

export const prettify = async (content: string) => {
  try {
    return await prettier.format(content, {
      parser: "html",
      plugins: [parserHtml],
      printWidth: 100,
      tabWidth: 2,
    });
  } catch (error) {
    console.error("Format failed:", error);
    return content;
  }
};
