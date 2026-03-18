import React, { useEffect, useState, useCallback } from "react";

import { createPortal } from "react-dom";

import {
  useFloating,
  flip,
  shift,
  offset,
  limitShift,
  autoUpdate,
  type Placement,
  type Strategy,
  type Middleware,
} from "@floating-ui/react-dom";
import { useTiptap, type Editor } from "@tiptap/react";

import { getSelectionBoundingRect, isValidSelection } from "../helpers/tiptap";
import { cn } from "../helpers/utils";

interface BubbleMenuProps extends React.ComponentProps<"div"> {
  zIndex?: number;
  placement?: Placement;
  strategy?: Strategy;
  middleware?: Middleware[];
  shouldShow?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  getReferenceClientRect?: (editor: Editor) => DOMRect;
}

const DEFAULT_MIDDLEWARE: Middleware[] = [
  offset(10),
  flip({ padding: 10 }),
  shift({ padding: 10, limiter: limitShift() }),
];

export const BubbleMenu = ({
  zIndex = 50,
  placement = "top",
  strategy = "absolute",
  middleware = DEFAULT_MIDDLEWARE,
  className,
  shouldShow,
  onShow,
  onHide,
  getReferenceClientRect = getSelectionBoundingRect,
  ...props
}: BubbleMenuProps) => {
  const { editor } = useTiptap();

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement,
    strategy,
    middleware,
    whileElementsMounted: autoUpdate,
  });

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      newOpen ? onShow?.() : onHide?.();
      setIsOpen(newOpen);
    },
    [onShow, onHide],
  );

  const updateMenu = useCallback(() => {
    if (!editor) return;

    const shouldShowResult =
      typeof shouldShow === "boolean" ? shouldShow : isValidSelection(editor);

    if (shouldShowResult) {
      refs.setReference({
        getBoundingClientRect: () => getReferenceClientRect(editor),
        getClientRects: () => [getReferenceClientRect(editor)],
      });
    }

    if (shouldShowResult !== isOpen) {
      handleOpenChange(shouldShowResult);
    }
  }, [editor, shouldShow, isOpen, getReferenceClientRect, handleOpenChange]);

  useEffect(() => {
    if (!editor || !isOpen) return;

    const handleBlur = (event: FocusEvent) => {
      const relatedTarget = event.relatedTarget as Node | null;
      const menuElement = refs.floating.current;
      if (menuElement && !menuElement.contains(relatedTarget)) {
        handleOpenChange(false);
      }
    };

    const editorDOM = editor.view.dom;
    editorDOM.addEventListener("blur", handleBlur);

    return () => {
      editorDOM.removeEventListener("blur", handleBlur);
    };
  }, [editor, isOpen, handleOpenChange, refs.floating]);

  useEffect(() => {
    if (!editor || !isOpen) return;

    const handleDragStart = () => {
      handleOpenChange(false);
    };

    const editorDOM = editor.view.dom;
    editorDOM.addEventListener("dragstart", handleDragStart);

    return () => {
      editorDOM.removeEventListener("dragstart", handleDragStart);
    };
  }, [editor, isOpen, handleOpenChange]);

  useEffect(() => {
    if (!editor || !isOpen) return;

    editor.on("selectionUpdate", updateMenu);
    return () => {
      editor.off("selectionUpdate", updateMenu);
    };
  }, [editor, isOpen, updateMenu]);

  useEffect(() => {
    if (!editor) return;
    updateMenu();
  }, [editor, updateMenu]);

  if (!editor || !isOpen) {
    return null;
  }

  const portalRoot = (editor.options.element as HTMLElement) || document.body;

  return createPortal(
    <div
      ref={refs.setFloating}
      className={cn("rte-bubble-menu", className)}
      style={{
        ...floatingStyles,
        zIndex,
      }}
      {...props}
    />,
    portalRoot,
  );
};

export default BubbleMenu;
