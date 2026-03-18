import React from "react";

import { useEmoji } from "../../hooks/use-emoji";
import EmojiPicker from "../emoji-picker";
import { MenuButton } from "../menu-button";

const EmojiPopover = () => {
  const { emojis, canSetEmoji, handleSelect } = useEmoji();

  return (
    <MenuButton
      type="popover"
      icon={"Emoji"}
      hideArrow
      tooltip={"Emoji"}
      disabled={!canSetEmoji}
    >
      <EmojiPicker emojis={emojis} onSelect={handleSelect} />
    </MenuButton>
  );
};

export default EmojiPopover;
