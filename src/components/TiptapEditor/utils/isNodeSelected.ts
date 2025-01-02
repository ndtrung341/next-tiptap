import { Editor, isNodeSelection } from "@tiptap/react";
import { CodeBlock, ImageFigure, Link } from "../extensions";

export const isNodeSelected = (editor: Editor) => {
  const customNodes = [CodeBlock.name, ImageFigure.name, Link.name];

  return (
    customNodes.some((type) => editor.isActive(type)) || isNodeSelection(editor.state.selection)
  );
};
