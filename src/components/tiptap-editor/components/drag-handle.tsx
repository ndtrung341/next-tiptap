import React, { useCallback, useMemo, useState } from "react";

import { type Middleware } from "@floating-ui/dom";
import TiptapDragHandle from "@tiptap/extension-drag-handle-react";
import { useTiptap } from "@tiptap/react";

import MenuButton from "./menu-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import { getSelectedDOM, moveNode } from "../helpers/tiptap";

import type { Node as TiptapNode } from "@tiptap/pm/model";


export const DragHandle = () => {
  const { editor } = useTiptap();
  const [node, setNode] = useState<TiptapNode | null>(null);
  const [nodePos, setNodePos] = useState<number>(-1);
  const [open, setOpen] = useState(false);

  const menuPosition = useMemo(() => {
    return {
      middleware: [
        {
          name: "customPosition",
          fn: ({ rects }) => {
            const contentEl = editor.view.dom;
            const contentStyle = getComputedStyle(contentEl);
            const paddingLeft = parseFloat(contentStyle.paddingLeft);

            return {
              x: paddingLeft - rects.floating.width - 8,
              y: rects.reference.y,
            };
          },
        },
      ] as Middleware[],
    };
  }, [editor]);

  const handleNodeChange = useCallback((data: any) => {
    if (data.node) setNode(data.node);
    setNodePos(data.pos);
  }, []);

  const handleMove = useCallback(
    (direction: "up" | "down") => {
      const success = moveNode(editor, direction);
      if (!success) return;

      const domNode = getSelectedDOM(editor);
      if (!domNode) return;

      const rect = domNode.getBoundingClientRect();

      requestAnimationFrame(() => {
        // Radix locks pointer-events on body while dropdown is open — temporarily clear it
        // so the synthetic mousemove can fire without being blocked.
        const originalStyle = document.body.style.pointerEvents;
        document.body.style.pointerEvents = "";

        domNode.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });

        // Simulate a mousemove at the moved node's position so TiptapDragHandle
        // recomputes and snaps to the new node location.
        editor.view.dom.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2,
          }),
        );

        // Restore the original pointer-events so can still dismiss the dropdown on outside clicks.
        requestAnimationFrame(() => {
          document.body.style.pointerEvents = originalStyle;
        });
      });
    },
    [editor],
  );
  const handleCopy = useCallback(async () => {
    if (!editor || !node || nodePos < 0) return false;

    const { state, view } = editor;
    const slice = state.doc.slice(nodePos, nodePos + node.nodeSize);
    const textContent = slice.content.textBetween(0, slice.size, "\n");
    const htmlContent = view.serializeForClipboard(slice).dom.innerHTML;

    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([textContent], { type: "text/plain" }),
        "text/html": new Blob([htmlContent], { type: "text/html" }),
      }),
    ]);

    return true;
  }, [editor, node, nodePos]);

  const handleDuplicate = useCallback(() => {
    if (!editor || !node || nodePos < 0) return false;

    return editor.commands.insertContentAt(
      nodePos + node.nodeSize,
      node.toJSON(),
    );
  }, [editor, node, nodePos]);

  const handleDelete = useCallback(() => {
    if (!editor || !node || nodePos < 0) return false;

    return editor.commands.deleteRange({
      from: nodePos,
      to: nodePos + node.nodeSize,
    });
  }, [editor, node, nodePos]);

  const handleCut = useCallback(async () => {
    const success = await handleCopy();
    if (success) handleDelete();
  }, [editor, node, nodePos]);

  if (!editor) return null;

  return (
    <TiptapDragHandle
      editor={editor}
      onNodeChange={handleNodeChange}
      computePositionConfig={menuPosition}
      className="duration-200 ease-out"
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <div style={{ position: "relative", cursor: "grab" }}>
          <MenuButton
            icon="GripVertical"
            buttonStyle={{ height: "1.5rem", zIndex: open ? 0 : 1 }}
            onMouseDown={() => editor.commands.setNodeSelection(nodePos)}
            onMouseUp={() => {
              setOpen(!open);
              editor.commands.setMeta("hideBubbleMenu", true);
            }}
          />
          <DropdownMenuTrigger style={{ position: "absolute", inset: 0 }} />
        </div>

        <DropdownMenuContent
          style={{ minWidth: "12rem" }}
          side="bottom"
          align="start"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
            <MenuButton
              text="Move up"
              hideText={false}
              tooltip={false}
              icon="ArrowUp"
              onClick={() => handleMove("up")}
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
            <MenuButton
              text="Move down"
              hideText={false}
              tooltip={false}
              icon="ArrowDown"
              onClick={() => handleMove("down")}
            />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <MenuButton
              text="Copy"
              hideText={false}
              tooltip={false}
              icon="Clipboard"
              onClick={handleCopy}
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <MenuButton
              text="Cut"
              hideText={false}
              tooltip={false}
              icon="Scissors"
              onClick={handleCut}
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <MenuButton
              text="Duplicate"
              hideText={false}
              tooltip={false}
              icon="Copy"
              onClick={handleDuplicate}
            />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <MenuButton
              text="Delete"
              hideText={false}
              tooltip={false}
              icon="Trash"
              buttonStyle={{ color: "#fb2c36" }}
              onClick={handleDelete}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TiptapDragHandle>
  );
};

export default DragHandle;
