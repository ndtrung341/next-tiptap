import { Editor } from "@tiptap/react";

export const getNodeContainer = (editor: Editor, selector: string) => {
  const {
    view,
    state: {
      selection: { from },
    },
  } = editor;

  const node = (view.nodeDOM(from) || view.domAtPos(from).node) as HTMLElement;
  let container: HTMLElement | null = node;

  while (container && container?.nodeName.toLocaleLowerCase() !== selector.toLocaleLowerCase()) {
    container = container.parentElement;
  }

  return container;
};
