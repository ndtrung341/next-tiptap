import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";

function removeHtmlEntities(html: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

export const formatHtml = async (content: string) => {
  try {
    const decodedContent = removeHtmlEntities(content).trim();
    return await prettier.format(decodedContent, {
      parser: "html",
      plugins: [parserHtml],
      printWidth: 80,
      htmlWhitespaceSensitivity: "ignore",
      bracketSameLine: true,
      singleAttributePerLine: true,
      useTabs: false,
      tabWidth: 2,
    });
  } catch (error) {
    console.error("Format failed:", error);
    return content;
  }
};
