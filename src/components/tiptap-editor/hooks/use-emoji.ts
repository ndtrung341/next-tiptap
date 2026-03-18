import { useCallback, useEffect, useState } from "react";

import { useEditorState, useTiptap } from "@tiptap/react";

import { getEmojiData, type EmojiItem } from "../helpers/emoji";

export function useEmoji() {
  const { editor } = useTiptap();
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);

  const canSetEmoji = useEditorState({
    editor,
    selector: ({ editor }) => editor.isEditable,
  });

  const handleSelect = useCallback(
    (emoji: EmojiItem) => {
      editor.chain().focus().insertContent(emoji.emoji).run();
    },
    [editor],
  );

  useEffect(() => {
    getEmojiData().then(setEmojis);
  }, []);

  return { emojis, canSetEmoji, handleSelect };
}
