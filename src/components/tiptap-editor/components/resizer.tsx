import React, { useMemo } from "react";

import { createPortal } from "react-dom";

import { type Editor, useEditorState, useTiptap } from "@tiptap/react";

import { useResizable } from "../hooks/use-resizable";

interface ResizeProps {
  nodeTypes?: string[];
}

const getActiveNodeType = (
  editor: Editor,
  nodeTypes: string[],
): string | null => {
  if (!editor.isFocused || !editor.isEditable) return null;
  return nodeTypes.find((nodeType) => editor.isActive(nodeType)) || null;
};

const getContentWidth = (el: Element) => {
  const { paddingLeft, paddingRight } = getComputedStyle(el);
  return el.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
};

const selectorMap = {
  image: "img",
  imageFigure: "img",
  youtube: "iframe",
} as const;

export const Resizer = ({
  nodeTypes = ["image", "imageFigure", "youtube"],
}: ResizeProps) => {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      const activeType = getActiveNodeType(editor, nodeTypes);
      if (!activeType) return null;

      const { view, state } = editor;

      return {
        type: activeType,
        element: view.nodeDOM(state.selection.anchor) as HTMLElement,
        selection: state.selection,
      };
    },
  });

  const targetElement = useMemo(() => {
    if (!editorState || !editorState.element) return null;

    const selector = selectorMap[editorState.type as keyof typeof selectorMap];

    const target = editorState.element;

    if (target?.hasChildNodes()) {
      return target.querySelector(selector);
    }

    return target;
  }, [editorState]);

  // const { rect, startResize } = useResizable(targetElement, {
  //   keepRatio: true,
  //   maxWidth: editor.view.dom.firstElementChild?.clientWidth,
  //   onResizeEnd: (size: number) => {
  //     if (!editor || !editorState) return;
  //     editor.commands.updateAttributes(editorState.type!, { width: size });
  //   },
  // });

  const { rect, startResize } = useResizable(targetElement, {
    keepRatio: true,
    maxWidth: getContentWidth(editor.view.dom),
    onResizeEnd: (size: number) => {
      if (!editor || !editorState) return;
      editor.commands.updateAttributes(editorState.type!, { width: size });
    },
  });

  const renderHandle = (
    cursor: "nw-resize" | "sw-resize" | "ne-resize" | "se-resize",
    styles: React.CSSProperties,
  ) => {
    const side: "left" | "right" = cursor.includes("w") ? "left" : "right";

    return (
      <div
        className="rte-resizer__control"
        style={{ position: "absolute", cursor, ...styles }}
        onMouseDown={(e) => {
          e.preventDefault();
          startResize(side, e.clientX);
        }}
      />
    );
  };

  if (!editorState || !editor.options.element) {
    return null;
  }

  return createPortal(
    <div
      className="rte-resizer"
      style={{
        position: "absolute",
        width: rect?.width,
        height: rect?.height,
        transform: `translate(${rect?.left}px, ${rect?.top || 0}px)`,
        pointerEvents: "none",
      }}
    >
      <div style={{ pointerEvents: "auto" }}>
        {renderHandle("nw-resize", {
          left: -10,
          top: -10,
          width: 12,
          height: 12,
        })}
        {renderHandle("sw-resize", {
          left: -10,
          bottom: -10,
          width: 12,
          height: 12,
        })}
        {renderHandle("ne-resize", {
          right: -10,
          top: -10,
          width: 12,
          height: 12,
        })}
        {renderHandle("se-resize", {
          right: -10,
          bottom: -10,
          width: 12,
          height: 12,
        })}
      </div>
    </div>,
    editor.options.element as HTMLElement,
  );
};

export default Resizer;

// import { Editor, useCurrentEditor, useEditorState } from "@tiptap/react";
// import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
// import { createPortal } from "react-dom";
// import { useTiptapEditor } from "../provider";

// const MAX_WIDTH = 800;
// const MIN_WIDTH = 96;

// const clamp = (value: number, min: number, max: number) =>
//   Math.min(max, Math.max(min, value));

// type ResizeInfo = {
//   currentHeight: number;
//   currentWidth: number;
//   direction: number;
//   isResizing: boolean;
//   ratio: number;
//   startHeight: number;
//   startWidth: number;
//   startX: number;
//   startY: number;
// };

// const Resizer = () => {
//   const { editor } = useTiptapEditor();
//   const controlRef = useRef<HTMLDivElement>(null);
//   const resizeInfoRef = useRef<ResizeInfo>({
//     currentHeight: 0,
//     currentWidth: 0,
//     direction: 0,
//     isResizing: false,
//     ratio: 0,
//     startHeight: 0,
//     startWidth: 0,
//     startX: 0,
//     startY: 0,
//   });

//   const nodeState = useEditorState({
//     editor,
//     selector: (ctx) => {
//       if (!ctx.editor.isFocused || !ctx.editor.isEditable) return null;

//       const nodeType = ctx.editor.isActive("image")
//         ? "image"
//         : ctx.editor.isActive("youtube")
//           ? "youtube"
//           : null;

//       if (!nodeType) return null;

//       const { selection } = ctx.editor.state;
//       const node = ctx.editor.view.nodeDOM(selection.anchor) as HTMLElement;

//       return { node, nodeType, nodePos: selection.anchor };
//     },
//   });

//   const { maxWidth, minWidth } = useMemo(() => {
//     const maxWidth =
//       editor.view.dom.firstElementChild?.clientWidth || MAX_WIDTH;
//     console.log(maxWidth);
//     const minWidth = MAX_WIDTH * 0.25 || MIN_WIDTH;
//     return { maxWidth, minWidth };
//   }, [editor.view.dom.firstElementChild]);

//   const startResizing = (
//     event: React.PointerEvent<HTMLDivElement>,
//     direction: number
//   ) => {
//     event.preventDefault();
//     const resizeInfo = resizeInfoRef.current;

//     resizeInfo.startX = event.clientX;
//     resizeInfo.startY = event.clientY;
//     resizeInfo.isResizing = true;
//     resizeInfo.direction = direction;

//     document.addEventListener("pointermove", handleResize);
//     document.addEventListener("pointerup", stopResizing);
//   };

//   const handleResize = (event: PointerEvent) => {
//     const node = nodeState?.node;
//     const resizeInfo = resizeInfoRef.current;

//     if (!node || !resizeInfo.isResizing) return;

//     let diff = resizeInfo.startX - event.clientX;
//     diff = resizeInfo.direction ? -diff : diff;

//     const newWidth = clamp(resizeInfo.startWidth + diff, minWidth, maxWidth);
//     const newHeight = newWidth / resizeInfo.ratio;

//     resizeInfo.currentWidth = newWidth;
//     resizeInfo.currentHeight = newHeight;

//     node.style.width = `${newWidth}px`;
//     node.style.height = `${newHeight}px`;

//     updateControlPosition();
//   };

//   const stopResizing = () => {
//     const resizeInfo = resizeInfoRef.current;
//     if (!resizeInfo.isResizing) return;
//     console.log("stop", maxWidth);
//     resizeInfo.isResizing = false;
//     document.removeEventListener("pointermove", handleResize);
//     document.removeEventListener("pointerup", stopResizing);

//     requestAnimationFrame(() =>
//       editor?.commands.updateAttributes(nodeState!.nodeType, {
//         width: Math.round((resizeInfo.currentWidth / maxWidth) * 100),
//       })
//     );
//   };

//   const updateControlPosition = useCallback(() => {
//     const node = nodeState!.node;
//     const control = controlRef.current!;

//     const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = node;
//     requestAnimationFrame(() => {
//       control.style.width = `${offsetWidth}px`;
//       control.style.height = `${offsetHeight}px`;
//       control.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
//     });
//   }, [nodeState]);

//   useEffect(() => {
//     const node = nodeState?.node;

//     if (!node) return;

//     const { width, height } = node.getBoundingClientRect();
//     const resizeInfo = resizeInfoRef.current;

//     resizeInfo.startWidth = width;
//     resizeInfo.startHeight = height;
//     resizeInfo.currentWidth = width;
//     resizeInfo.currentHeight = height;
//     resizeInfo.ratio = width / height;

//     updateControlPosition();
//   }, [nodeState]);

//   const renderResizerHandle = (
//     cursor: string,
//     direction: number,
//     position: React.CSSProperties
//   ) => (
//     <div
//       className="rte-resizer__control"
//       style={{ cursor, ...position }}
//       onPointerDown={(event) => startResizing(event, direction)}
//     />
//   );
//   console.log("render");
//   if (!nodeState || !editor?.view.dom) return;

//   return createPortal(
//     <div ref={controlRef} className="rte-resizer">
//       {renderResizerHandle("nw-resize", 0, { width: 12, left: -10, top: -10 })}
//       {renderResizerHandle("sw-resize", 0, {
//         width: 12,
//         left: -10,
//         bottom: -10,
//       })}
//       {renderResizerHandle("sw-resize", 1, { width: 12, right: -10, top: -10 })}
//       {renderResizerHandle("nw-resize", 1, {
//         width: 12,
//         right: -10,
//         bottom: -10,
//       })}
//     </div>,
//     editor.view.dom.parentElement!
//   );
// };

// export default memo(Resizer);
