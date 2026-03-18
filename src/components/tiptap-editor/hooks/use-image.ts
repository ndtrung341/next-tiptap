import { useCallback } from "react";

import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { useEditorState, useTiptap, type Editor } from "@tiptap/react";

// Types
export type ImageAttributes = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type ImageData = ImageAttributes & {
  hasCaption: boolean;
};

export type ImageInsertOptions = ImageAttributes & {};

// Utility functions
export function canInsertImage(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.can().setImage({ src: "" });
}

export function isImageActive(editor: Editor | null): boolean {
  if (!editor) return false;
  return editor.isActive("image") || editor.isActive("imageFigure");
}

export function getCurrentImageData(editor: Editor | null): ImageData | null {
  if (!editor || !isImageActive(editor)) return null;

  const { selection } = editor.state;
  let node = null;

  // Determine if we're in a figure caption or directly on an image
  if (selection instanceof TextSelection) {
    // In figcaption - get the figure's first child (image)
    const figure = selection.$anchor.node(-1);
    node = figure?.firstChild;
  } else if (selection instanceof NodeSelection) {
    // Direct image or figure selection
    node = selection.node;
    if (node.type.name === "imageFigure") {
      node = node.firstChild; // Get image from figure
    }
  }

  if (!node || node.type.name !== "image") return null;

  return {
    src: node.attrs.src || "",
    alt: node.attrs.alt || "",
    width: node.attrs.width,
    height: node.attrs.height,
    // hasCaption: editor.isActive("imageFigure"),
    hasCaption: node.attrs.caption !== null,
    caption: node.attrs.caption,
  };
}

export function insertImage(
  editor: Editor | null,
  options: ImageInsertOptions,
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canInsertImage(editor)) return false;

  return editor.chain().focus().insertImage(options).run();
}

export function updateImageAttributes(
  editor: Editor | null,
  attributes: Partial<ImageAttributes>,
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!isImageActive(editor)) return false;

  return editor.chain().focus().updateAttributes("image", attributes).run();
}

export function removeImage(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!isImageActive(editor)) return false;
  return editor.chain().focus().removeImage().run();
}

export function toggleImageCaption(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!isImageActive(editor)) return false;

  const hasCaption = editor.isActive("imageFigure");

  if (hasCaption) {
    return editor.chain().focus().figureToImage().run();
  } else {
    return editor.chain().focus().imageToFigure().run();
  }
}

export function downloadImage(src: string, filename?: string): void {
  if (!src) {
    console.error("No image source available for download.");
    return;
  }

  fetch(src)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch the image.");
      return response.blob();
    })
    .then((blob) => {
      const extension = blob.type.split(/\/|\+/)[1] || "jpg";
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || `image.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading image:", error);
    });
}

// Hook
export function useImage() {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      const imageData = getCurrentImageData(editor);

      return {
        isActive: isImageActive(editor),
        canInsert: canInsertImage(editor),
        imageData,
        canToggleCaption: isImageActive(editor),
        canUpdateAttributes: isImageActive(editor),
        canRemove: isImageActive(editor),
      };
    },
  });

  const insert = useCallback(
    (options: ImageInsertOptions) => {
      return insertImage(editor, options);
    },
    [editor],
  );

  const updateAttributes = useCallback(
    (attributes: Partial<ImageAttributes>) => {
      return updateImageAttributes(editor, attributes);
    },
    [editor],
  );

  const setAlt = useCallback(
    (alt: string) => {
      return updateAttributes({ alt });
    },
    [updateAttributes],
  );

  const setSize = useCallback(
    (width: number | null) => {
      return updateAttributes({ width: width || undefined });
    },
    [updateAttributes],
  );

  const toggleCaption = useCallback(() => {
    return toggleImageCaption(editor);
  }, [editor]);

  const remove = useCallback(() => {
    return removeImage(editor);
  }, [editor]);

  const download = useCallback(() => {
    if (editorState.imageData?.src) {
      downloadImage(editorState.imageData.src);
    }
  }, [editorState.imageData?.src]);

  return {
    ...editorState,
    insert,
    updateAttributes,
    setAlt,
    setSize,
    toggleCaption,
    remove,
    download,
  };
}
