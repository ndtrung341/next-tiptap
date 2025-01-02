import React, { useEffect, useState } from "react";

import { Toolbar } from "../ui/Toolbar";
import MenuButton from "../MenuButton";

import AlignLeftButton from "./AlignLeftButton";
import AlignCenterButton from "./AlignCenterButton";
import AlignRightButton from "./AlignRightButton";
import AlignJustifyButton from "./AlignJustifyButton";

import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";
import { PopoverClose } from "../ui/Popover";

const AlignPopover = () => {
  const { editor } = useTiptapContext();

  const current = useEditorState({
    editor,
    selector: (ctx) => {
      if (ctx.editor.isActive({ textAlign: "right" })) return "AlignRight";
      else if (ctx.editor.isActive({ textAlign: "center" })) return "AlignCenter";
      else if (ctx.editor.isActive({ textAlign: "justify" })) return "AlignJustify";
      return "AlignLeft";
    },
  });

  const isDisabled = !editor.isEditable || !editor.can().setTextAlign("left");

  return (
    <MenuButton type="popover" icon={current} tooltip="Alignment" disabled={isDisabled}>
      <PopoverClose asChild>
        <Toolbar dense={true}>
          <AlignLeftButton />
          <AlignCenterButton />
          <AlignRightButton />
          <AlignJustifyButton />
        </Toolbar>
      </PopoverClose>
    </MenuButton>
  );
};

export default AlignPopover;
