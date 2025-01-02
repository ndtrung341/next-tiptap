import Figcaption from "../Figcaption";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import ImageFigure from "./ImageFigure";

export const ImageCaption = Figcaption.extend({
  name: "imageCaption",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("imageCaptionFocus"),
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable, isFocused } = this.editor;
            const { $anchor } = selection;

            // If not editable, not focused, or selection is not in the imageCaption node,
            // return no decorations
            if (!isEditable || !isFocused || $anchor.parent.type.name !== this.name) {
              return DecorationSet.create(doc, []);
            }

            // Get the parent 'figure' node (container for the image) and check if it's an ImageFigure
            const figure = $anchor.node($anchor.depth - 1);
            if (figure.type.name !== ImageFigure.name) {
              return DecorationSet.create(doc, []);
            }

            const captionPos = $anchor.before($anchor.depth);
            const captionEndPos = $anchor.after($anchor.depth);

            // Apply decoration to the figcaption node
            return DecorationSet.create(doc, [
              Decoration.node(captionPos, captionEndPos, {
                class: "ProseMirror-selectednode", // Apply class to figcaption
              }),
            ]);
          },
        },
      }),
    ];
  },
});

export default ImageCaption;
