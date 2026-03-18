import React from "react";

import { useEditorState, useTiptap } from "@tiptap/react";

import { MenuButton } from "./menu-button";
import { Toolbar } from "./ui/toolbar";

export const StatusBar = () => {
  const { editor } = useTiptap();

  const { fullScreen, sourceView, counter } = useEditorState({
    editor,
    selector: ({ editor }) => {
      const fullScreen = editor.storage.fullScreen.enabled;
      const sourceView = editor.storage.sourceView.enabled;
      const words = editor.storage.characterCount.words();
      const characters = editor.storage.characterCount.characters();

      return { fullScreen, sourceView, counter: { words, characters } };
    },
  });

  return (
    <div className="rte-status-bar">
      <Toolbar dense>
        <MenuButton
          icon="SourceCode"
          text="Source Code"
          active={sourceView}
          onMouseDown={(e) => e.preventDefault()}
          onClick={editor.commands.toggleSourceView}
        />
        <MenuButton
          icon="Maximize"
          text="Fullscreen"
          active={fullScreen}
          onMouseDown={(e) => e.preventDefault()}
          onClick={editor.commands.toggleFullScreen}
        />
      </Toolbar>

      <div className="rte-counter">
        <span className="rte-word-count">Words: {counter.words}</span>
        <span className="rte-charater">Characters: {counter.characters}</span>
      </div>
    </div>
  );
};

export default StatusBar;
