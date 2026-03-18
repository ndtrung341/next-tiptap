import React from "react";

import { useEditorState, useTiptap } from "@tiptap/react";

import {
  canSetTextAlign,
  isTextAlignActive,
  type TextAlignType,
} from "../../hooks/use-text-align";
import { MenuButton } from "../menu-button";
import AlignCenterButton from "./align-center-button";
import AlignJustifyButton from "./align-justify-button";
import AlignLeftButton from "./align-left-button";
import AlignRightButton from "./align-right-button";
import { type IconProps } from "../ui/icon";
import { PopoverClose } from "../ui/popover";
import { Toolbar } from "../ui/toolbar";

const ALIGNMENTS: TextAlignType[] = ["left", "center", "right", "justify"];

const ALIGN_ICONS: Record<TextAlignType, IconProps["name"]> = {
  left: "AlignLeft",
  right: "AlignRight",
  center: "AlignCenter",
  justify: "AlignJustify",
};

const TextAlignPopover = () => {
  const { editor } = useTiptap();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      const current =
        ALIGNMENTS.find((align) => isTextAlignActive(editor, align)) ?? "left";
      const canSetAny = ALIGNMENTS.some((align) =>
        canSetTextAlign(editor, align),
      );
      return { current, canSetAny };
    },
  });

  const { current, canSetAny } = editorState ?? {
    current: "left",
    canSetAny: false,
  };

  return (
    <MenuButton
      type="popover"
      icon={ALIGN_ICONS[current]}
      tooltip="Alignment"
      disabled={!canSetAny}
    >
      <PopoverClose asChild>
        <Toolbar dense>
          <AlignLeftButton />
          <AlignCenterButton />
          <AlignRightButton />
          <AlignJustifyButton />
        </Toolbar>
      </PopoverClose>
    </MenuButton>
  );
};

export default TextAlignPopover;
