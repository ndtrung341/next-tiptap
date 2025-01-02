import React, { memo, useCallback, useRef, useState } from "react";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../../Provider";
import { BubbleMenu } from "../../BubbleMenu";
import LinkEdit from "./LinkEdit";
import LinkView from "./LinkView";

export const LinkMenu = () => {
  const { editor, contentElement } = useTiptapContext();
  const [isEditing, setIsEditing] = useState(false);
  const mode = useRef<number>(0);

  const link = useEditorState({
    editor,
    selector: (context) => {
      mode.current = context.editor.storage.link.mode;

      if (!context.editor.isActive("link")) return null;
      const {
        state: { selection, doc },
      } = context.editor;
      const url = context.editor.getAttributes("link").href;
      const text = doc.textBetween(selection.from, selection.to);

      return { url, text };
    },
  });

  const shouldShow = useCallback(({ editor, from, to }: any) => {
    setIsEditing(mode.current == -1);
    return editor.isActive("link") && (mode.current == -1 || from !== to);
  }, []);

  const applyLink = useCallback((url: string, text?: string) => {
    editor
      .chain()
      .confirmEditLink({
        href: url,
        text: text || url,
      })
      .run();
    setIsEditing(false);
  }, []);

  const removeLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  const startEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const cancelEdit = useCallback(() => {
    if (mode.current == -1) {
      editor.commands.confirmEditLink();
    } else {
      setIsEditing(false);
    }
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="link-menu"
      updateDelay={100}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: "bottom-start",
        duration: 100,
        appendTo: () => contentElement.current!,
        onHidden: () => setIsEditing(false),
      }}
    >
      {isEditing ? (
        <LinkEdit
          initialUrl={link?.url}
          initialText={link?.text}
          isCreate={mode.current === -1}
          onApply={applyLink}
          onCancel={cancelEdit}
        />
      ) : (
        <LinkView url={link?.url} onEdit={startEdit} onRemove={removeLink} />
      )}
    </BubbleMenu>
  );
};

export default memo(LinkMenu);
