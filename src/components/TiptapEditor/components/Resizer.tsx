import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "./Provider";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type ResizeInfo = {
  currentHeight: number;
  currentWidth: number;
  direction: number;
  isResizing: boolean;
  ratio: number;
  startHeight: number;
  startWidth: number;
  startX: number;
  startY: number;
};

const Resizer = () => {
  const { editor, contentElement, setIsResizing } = useTiptapContext();
  const controlRef = useRef<HTMLDivElement>(null);
  const resizeInfoRef = useRef<ResizeInfo>({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });

  const nodeState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor.isFocused || !ctx.editor.isEditable) return null;

      const nodeType = ctx.editor.isActive("image")
        ? "image"
        : ctx.editor.isActive("youtube")
        ? "youtube"
        : null;

      if (!nodeType) return null;

      const { selection } = ctx.editor.state;
      const node = ctx.editor.view.nodeDOM(selection.anchor) as HTMLElement;

      return { node, nodeType, nodePos: selection.anchor };
    },
  });

  const { maxWidth, minWidth } = useMemo(() => {
    const width = contentElement.current?.getBoundingClientRect().width || 0;
    return { maxWidth: width, minWidth: width * 0.25 };
  }, [contentElement.current]);

  const startResizing = (event: React.PointerEvent<HTMLDivElement>, direction: number) => {
    event.preventDefault();
    const resizeInfo = resizeInfoRef.current;

    resizeInfo.startX = event.clientX;
    resizeInfo.startY = event.clientY;
    resizeInfo.isResizing = true;
    resizeInfo.direction = direction;

    document.addEventListener("pointermove", handleResize);
    document.addEventListener("pointerup", stopResizing);

    setIsResizing(true);
  };

  const handleResize = (event: PointerEvent) => {
    const node = nodeState?.node;
    const resizeInfo = resizeInfoRef.current;

    if (!node || !resizeInfo.isResizing) return;

    let diff = resizeInfo.startX - event.clientX;
    diff = resizeInfo.direction ? -diff : diff;

    const newWidth = clamp(resizeInfo.startWidth + diff, minWidth, maxWidth);
    const newHeight = newWidth / resizeInfo.ratio;

    resizeInfo.currentWidth = newWidth;
    resizeInfo.currentHeight = newHeight;

    node.style.width = `${newWidth}px`;
    node.style.height = `${newHeight}px`;

    updateControlPosition();
  };

  const stopResizing = () => {
    const resizeInfo = resizeInfoRef.current;
    if (!resizeInfo.isResizing) return;

    resizeInfo.isResizing = false;
    document.removeEventListener("pointermove", handleResize);
    document.removeEventListener("pointerup", stopResizing);

    setIsResizing(false);
    requestAnimationFrame(() =>
      editor?.commands.updateAttributes(nodeState!.nodeType, {
        width: Math.round((resizeInfo.currentWidth / maxWidth) * 100),
      })
    );
  };

  const updateControlPosition = useCallback(() => {
    const node = nodeState!.node;
    const control = controlRef.current!;

    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = node;
    requestAnimationFrame(() => {
      control.style.width = `${offsetWidth}px`;
      control.style.height = `${offsetHeight}px`;
      control.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    });
  }, [nodeState]);

  useEffect(() => {
    const node = nodeState?.node;

    if (!node) return;

    const { width, height } = node.getBoundingClientRect();
    const resizeInfo = resizeInfoRef.current;

    resizeInfo.startWidth = width;
    resizeInfo.startHeight = height;
    resizeInfo.currentWidth = width;
    resizeInfo.currentHeight = height;
    resizeInfo.ratio = width / height;

    updateControlPosition();
  }, [nodeState]);

  if (!nodeState || !contentElement.current) return;

  const renderResizerHandle = (
    cursor: string,
    direction: number,
    position: React.CSSProperties
  ) => (
    <div
      className="rte-resizer__control"
      style={{ cursor, ...position }}
      onPointerDown={(event) => startResizing(event, direction)}
    />
  );

  return createPortal(
    <div ref={controlRef} className="rte-resizer">
      {renderResizerHandle("nw-resize", 0, { width: 12, left: -10, top: -10 })}
      {renderResizerHandle("sw-resize", 0, { width: 12, left: -10, bottom: -10 })}
      {renderResizerHandle("sw-resize", 1, { width: 12, right: -10, top: -10 })}
      {renderResizerHandle("nw-resize", 1, { width: 12, right: -10, bottom: -10 })}
    </div>,
    contentElement.current
  );
};

export default memo(Resizer);
