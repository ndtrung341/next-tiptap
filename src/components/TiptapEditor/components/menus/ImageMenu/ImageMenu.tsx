import React, {useCallback, useEffect, useRef, useState} from "react";
import {useTiptapContext} from "../../Provider";
import {BubbleMenu} from "../../BubbleMenu";
import {Toolbar, ToolbarDivider} from "../../ui/Toolbar";
import MenuButton from "../../MenuButton";
import {useEditorState} from "@tiptap/react";
import {getNodeContainer} from "@/components/TiptapEditor/utils/getNodeContainer";
import AltTextEdit from "./AltTextEdit";
import type {Instance} from "tippy.js";
import SizeDropdown from "./SizeDropdown";
import {NodeSelection, Selection, TextSelection} from "@tiptap/pm/state";
import {Node} from "@tiptap/pm/model";

export const ImageMenu = () => {
  const tippyInstance = useRef<Instance | null>(null);
  const {editor, isResizing, contentElement} = useTiptapContext();
  const [isEditText, setIsEditText] = useState(false);

  const image = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor.isActive("image") && !ctx.editor.isActive("imageFigure")) {
        return null;
      }

      const {node, pos} = getImageOrFigureNode(ctx.editor.state.selection);
      if (!node) return null;

      return {
        pos,
        src: node.attrs.src,
        alt: node.attrs.alt,
        width: node.attrs.width,
        hasCaption: ctx.editor.isActive("imageFigure"),
      };
    },
  });

  // Get reference bounding box for Tippy
  const getReferenceClientRect = useCallback(() => {
    const selector = editor.isActive("imageFigure") ? "figure" : "img";
    const node = getNodeContainer(editor, selector);
    return node?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);
  }, [editor]);

  const updateImageAttr = (name: string, value: any) => {
    const {
      state: {selection},
    } = editor;
    return editor
      .chain()
      .command(({commands}) => {
        if (image?.pos && selection.from !== image.pos) return commands.setNodeSelection(image.pos);
        return true;
      })
      .updateAttributes("image", {[name]: value})
      .focus()
      .run();
  };

  // Toggle caption between figure and image
  const toggleCaption = () =>
    editor.chain().focus()[image?.hasCaption ? "figureToImage" : "imageToFigure"]().run();

  // Toggle alt text edit form and update Tippy position
  const toggleEditAltText = () => {
    setIsEditText((prev) => !prev);
    requestAnimationFrame(() => tippyInstance.current?.popperInstance?.update());
  };

  const setAltText = (value: string) => {
    updateImageAttr("alt", value);
    toggleEditAltText();
  };

  const setSize = (value: number | null) => updateImageAttr("width", value);

  const removeImage = () => editor.chain().focus().removeImage().run();

  // Download image with proper filename
  const downloadImage = useCallback(async () => {
    if (!image?.src) return console.error("No image source available for download.");

    try {
      const res = await fetch(image.src);
      if (!res.ok) throw new Error("Failed to fetch the image.");
      const blob = await res.blob();
      const extension = blob.type.split(/\/|\+/)[1];

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `image.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }, [image]);

  if (isResizing) return null;

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="image-bubble"
      shouldShow={({editor}) => editor.isActive("imageFigure") || editor.isActive("image")}
      updateDelay={100}
      tippyOptions={{
        maxWidth: "auto",
        offset: [0, 15],
        //   offset: ({ placement }) => {
        //     return placement == "top" ? [0, 15] : [0, 10];
        //   },
        appendTo: () => contentElement.current!,
        getReferenceClientRect,
        onShow: (instance) => {
          tippyInstance.current = instance;
        },
        onDestroy: () => (tippyInstance.current = null),
        onHidden: () => setIsEditText(false),
      }}
    >
      {isEditText ? (
        <AltTextEdit
          initialText={image?.alt}
          onApply={setAltText}
          onCancel={() => {
            editor.commands.focus();
            toggleEditAltText();
          }}
        />
      ) : (
        <Toolbar>
          <MenuButton
            text="Alt text"
            hideText={false}
            tooltip={"Alternative text"}
            onClick={toggleEditAltText}
          />
          <MenuButton
            icon="ImageCaption"
            tooltip={`Caption: ${image?.hasCaption ? "ON" : "OFF"}`}
            active={image?.hasCaption}
            onClick={toggleCaption}
          />
          <ToolbarDivider/>
          <SizeDropdown value={image?.width} onChange={setSize}/>
          <ToolbarDivider/>
          <MenuButton icon="Download" tooltip="Download" onClick={downloadImage}/>
          <MenuButton icon="Trash" tooltip="Delete" onClick={removeImage}/>
        </Toolbar>
      )}
    </BubbleMenu>
  );
};

export default ImageMenu;

const getImageOrFigureNode = (selection: Selection): { node: Node | null; pos: number | null } => {
  let node: Node | null = null;
  let pos: number | null = null;

  if (selection instanceof TextSelection) {
    // is in figcaption
    const $anchor = selection.$anchor;
    const figure = $anchor.node(-1);
    node = figure.firstChild;
    pos = $anchor.before(-1) + 1; // Position of the image inside the figure
  } else if (selection instanceof NodeSelection) {
    // is in figure or image
    node = selection.node;
    pos = selection.from;
    if (node.type.name === "imageFigure") {
      node = node.firstChild;
      pos += 1; // Adjust position for the image inside the figure
    }
  }

  return {node, pos};
};
