/** @jsxImportSource @tiptap/core */
import { Link as TiptapLink } from "@tiptap/extension-link";
import { Plugin } from "@tiptap/pm/state";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customLink: {
      openLinkMenu: () => ReturnType;
      closeLinkMenu: () => ReturnType;
    };
  }

  interface Storage {
    link: LinkStorage;
  }
}

export type LinkMenuState = "view" | "edit" | "hidden";

export interface LinkStorage {
  menuState: LinkMenuState;
}

export const Link = TiptapLink.extend({
  // @ts-expect-error: parent?.() spread causes optional/required mismatch
  addOptions() {
    return {
      ...this.parent?.(),
      autolink: false,
      openOnClick: false,
    };
  },

  addStorage() {
    return {
      menuState: "hidden",
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      openLinkMenu: () => () => {
        const isLinkActive = this.editor.isActive(this.name);
        this.storage.menuState = isLinkActive ? "view" : "edit";
        return true;
      },

      closeLinkMenu: () => () => {
        this.storage.menuState = "hidden";
        return true;
      },
    };
  },

  onSelectionUpdate() {
    // Auto-close menu when selection moves away from link
    if (this.storage.menuState !== "hidden" && !this.editor.isActive("link")) {
      this.editor.commands.closeLinkMenu();
    }
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      new Plugin({
        props: {
          handleClick: (view, pos, event) => {
            // Only handle left clicks in editable mode
            if (event.button !== 0 || !view.editable) {
              return false;
            }

            // Find if click target is a link element
            let linkElement: HTMLAnchorElement | null = null;
            if (event.target instanceof HTMLAnchorElement) {
              linkElement = event.target;
            } else {
              linkElement = (event.target as Element)?.closest?.("a");
            }

            if (!linkElement) {
              return false;
            }

            if (this.storage.menuState === "hidden") {
              this.editor
                .chain()
                .extendMarkRange(this.type.name)
                .openLinkMenu()
                .run();
            } else {
              this.editor.commands.closeLinkMenu();
            }

            return false;
          },
        },
      }),
    ];
  },

  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      "Mod-k": () => {
        this.editor.commands.openLinkMenu();
        return true;
      },
      Escape: () => {
        if (this.storage.menuState !== "hidden") {
          this.editor.commands.closeLinkMenu();
          return true;
        }
        return false;
      },
    };
  },
});

export default Link;
