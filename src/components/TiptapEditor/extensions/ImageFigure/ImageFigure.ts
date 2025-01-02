import { JSONContent } from "@tiptap/core";
import { NodeSelection, Plugin, TextSelection } from "@tiptap/pm/state";
// @ts-ignore : This import is necessary due to missing type definitions in the package.
import { __serializeForClipboard as serializeForClipboard } from "@tiptap/pm/view";

import Figure from "../Figure";
import ImageCaption from "./ImageCaption";
import Image from "../Image/Image";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageFigure: {
      setImageFigure: (options: { src: string; caption?: string }) => ReturnType;
      imageToFigure: () => ReturnType;
      figureToImage: () => ReturnType;
      removeImage: () => ReturnType;
    };
  }
}

export const ImageFigure = Figure.extend({
  name: "imageFigure",
  content: "image imageCaption?",
  //   atom: true,

  addExtensions() {
    return [ImageCaption];
  },

  addCommands() {
    return {
      /**
       * Insert an imageFigure node with an image and optional caption.
       */
      setImageFigure:
        ({ src, caption }) =>
        ({ chain }) => {
          const content: JSONContent[] = [
            { type: Image.name, attrs: { src } },
            caption === null || caption === undefined
              ? {}
              : {
                  type: ImageCaption.name,
                  content: caption === "" ? undefined : [{ type: "text", text: caption }],
                },
          ];
          return chain().insertContent({ type: this.name, content }).run();
        },

      /**
       * Convert a standalone image into an imageFigure node.
       */
      imageToFigure:
        () =>
        ({ state, chain }) => {
          const { selection } = state;
          const { $anchor } = selection;

          const imagePos = $anchor.pos;
          const imageNode = state.doc.nodeAt(imagePos);

          if (!imageNode || imageNode.type.name !== Image.name) {
            return false;
          }

          const range = {
            from: imagePos,
            to: imagePos + imageNode.nodeSize,
          };

          const content: JSONContent[] = [
            { type: Image.name, attrs: imageNode.attrs },
            { type: ImageCaption.name, content: undefined },
          ];

          return chain()
            .insertContentAt(range, {
              type: this.name,
              content,
            })
            .setTextSelection(range.to + content.length)
            .run();
        },

      /**
       * Convert an imageFigure node back to a standalone image.
       */
      figureToImage:
        () =>
        ({ state, commands }) => {
          const { selection } = state;
          const { $anchor } = selection;

          let depth = $anchor.depth;
          let pos = $anchor.pos;

          while (depth > 0) {
            pos = $anchor.before(depth);
            depth--;
          }

          const figureNode = state.doc.nodeAt(pos);

          if (!figureNode || figureNode.type.name !== this.name) {
            return false;
          }

          const range = {
            from: pos,
            to: pos + figureNode.nodeSize,
          };

          const content = figureNode.firstChild;

          return commands.insertContentAt(range, content);
        },

      /**
       * Remove an image or imageFigure node.
       */
      removeImage:
        () =>
        ({ state, tr, dispatch }) => {
          const { selection } = state;
          const { $anchor } = selection;

          let depth = $anchor.depth;
          let pos = $anchor.pos;

          while (depth > 0) {
            pos = $anchor.before(depth);
            depth--;
          }

          const node = state.doc.nodeAt(pos);

          if (!node || (node.type.name !== this.name && node.type.name !== Image.name)) {
            return false;
          }

          if (dispatch) {
            tr.deleteRange(pos, pos + node.nodeSize);
            dispatch(tr);
          }

          return true;
        },
    };
  },

  /**
   * Handle drag-and-drop behavior for imageFigure nodes.
   */
  addProseMirrorPlugins() {
    let draggedNode: NodeSelection | null;

    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            dragstart: (view, event) => {
              if (
                !event.dataTransfer ||
                !event.target ||
                !(event.target instanceof HTMLImageElement)
              ) {
                return false;
              }

              // Get the position of the dragged image
              const pos = view.posAtDOM(event.target, 0);
              const $pos = view.state.doc.resolve(pos);

              // Check if the image is part of a `figure` node
              if ($pos.parent.type !== this.type) {
                return false;
              }

              // Set up drag data
              draggedNode = NodeSelection.create(view.state.doc, $pos.before($pos.depth));
              const draggedSlice = draggedNode.content();
              const { dom, text, slice } = serializeForClipboard(view, draggedSlice);

              event.dataTransfer.clearData();
              event.dataTransfer.setData("text/html", dom.innerHTML);
              event.dataTransfer.setData("text/plain", text);
              event.dataTransfer.effectAllowed = "copyMove";
              view.dragging = { slice: slice, move: event.ctrlKey };

              return true;
            },
            drop: (view) => {
              if (draggedNode) {
                view.dispatch(view.state.tr.setSelection(draggedNode));
                draggedNode = null;
              }
            },
            dragend: () => {
              draggedNode = null;
            },
          },
        },
      }),
    ];
  },
});

export default ImageFigure;
