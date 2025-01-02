import React, { useCallback } from "react";
import { BubbleMenu } from "../BubbleMenu";
import { Toolbar, ToolbarDivider } from "../ui/Toolbar";
import BoldButton from "../controls/BoldButton";
import ItalicButton from "../controls/ItalicButton";
import UnderlineButton from "../controls/UnderlineButton";
import AlignDropdown from "../controls/AlignPopover";
import { useTiptapContext } from "../Provider";
import { isNodeSelected } from "../../utils/isNodeSelected";
import isTextSelected from "../../utils/isTextSelected";
import HeadingDropdown from "../controls/HeadingDropdown";
import MoreMarkDropdown from "../controls/MoreMarkPopover";
import LinkButton from "../controls/LinkButton";

export const TextMenu = ({ enable }: { enable: boolean }) => {
  const { editor } = useTiptapContext();

  const shouldShow = useCallback(({ view, editor }: any) => {
    if (!view || editor.view.dragging) {
      return false;
    }

    if (isNodeSelected(editor)) {
      return false;
    }

    return isTextSelected(editor);
  }, []);

  if (!enable) return null;

  return (
    <BubbleMenu
      editor={editor}
      pluginKey={"text-bubble"}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: "top-start",
        maxWidth: "auto",
        appendTo: "parent",
      }}
    >
      <Toolbar>
        <HeadingDropdown />

        <ToolbarDivider />

        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <MoreMarkDropdown />
        <LinkButton />

        <ToolbarDivider />

        <AlignDropdown />
      </Toolbar>
    </BubbleMenu>
  );
};

export default TextMenu;
