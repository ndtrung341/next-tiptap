import { Extension } from "@tiptap/core";

export type FullScreenOptions = {
  className: string;
  containerSelector: string;
};

export interface FullScreenStorage {
  enabled: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fullScreen: {
      toggleFullScreen: () => ReturnType;
      setFullScreen: (enabled: boolean) => ReturnType;
    };
  }

  interface Storage {
    fullScreen: FullScreenStorage;
  }
}

export const FullScreen = Extension.create<
  FullScreenOptions,
  FullScreenStorage
>(() => {
  let scrollPosition = 0;

  return {
    name: "fullScreen",

    addOptions() {
      return {
        className: "rte-editor--full-screen",
        containerSelector: ".rte-editor",
      };
    },

    addStorage() {
      return {
        enabled: false,
      };
    },

    addCommands() {
      return {
        toggleFullScreen:
          () =>
          ({ commands }) => {
            return commands.setFullScreen(!this.storage.enabled);
          },

        setFullScreen: (enabled) => () => {
          const selector = this.options.containerSelector;
          const container = document.querySelector(selector);

          if (!container) {
            return false;
          }

          if (enabled) {
            scrollPosition = window.scrollY;
          } else {
            requestAnimationFrame(() => {
              window.scrollTo(0, scrollPosition);
            });
          }

          container.classList.toggle(this.options.className, enabled);
          this.storage.enabled = enabled;

          return true;
        },
      };
    },

    addKeyboardShortcuts() {
      return {
        "Mod-Shift-F": () => this.editor.commands.toggleFullScreen(),
      };
    },
  };
});
