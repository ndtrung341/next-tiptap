import React from "react";

import { useTiptapState } from "@tiptap/react";

import {
  canToggleMark,
  isMarkActive,
  type MarkType,
} from "../../hooks/use-mark";
import { MenuButton } from "../menu-button";
import CodeButton from "./code-button";
import StrikeButton from "./strike-button";
import SubscriptButton from "./subscript-button";
import SuperscriptButton from "./superscript-button";
import { PopoverClose } from "../ui/popover";
import { Toolbar } from "../ui/toolbar";

const MORE_MARKS: MarkType[] = ["strike", "superscript", "subscript", "code"];

const MoreFormatPopover = () => {
  const editorState = useTiptapState(({ editor }) => {
    const isAnyActive = MORE_MARKS.some((mark) => isMarkActive(editor, mark));
    const canToggleAny = MORE_MARKS.some((mark) => canToggleMark(editor, mark));

    return {
      isAnyActive,
      canToggleAny,
    };
  });

  return (
    <MenuButton
      type="popover"
      icon="LetterCase"
      tooltip="More format"
      active={editorState?.isAnyActive}
      disabled={!editorState?.canToggleAny}
    >
      <PopoverClose asChild>
        <Toolbar dense>
          <StrikeButton />
          <SuperscriptButton />
          <SubscriptButton />
          <CodeButton />
        </Toolbar>
      </PopoverClose>
    </MenuButton>
  );
};

export default MoreFormatPopover;
