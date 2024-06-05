import React from "react";

import { Editor } from "@tiptap/react";
import { Toolbar } from "../ui/toolbar";

import MenuButtonBold from "../controls/menu-button-bold";
import MenuButtonItalic from "../controls/menu-button-italic";
import MenuButtonUnderline from "../controls/menu-button-underline";

import MenuButtonColor from "../controls/menu-button-color";
import MenuButtonHighlight from "../controls/menu-button-highlight";

import MenuSelectHeading from "../controls/menu-select-heading";
import MenuSelectTextAlign from "../controls/menu-select-text-align";

import MenuButtonBulletedList from "../controls/menu-button-bulleted-list";
import MenuButtonOrderedList from "../controls/menu-button-ordered-list";
import MenuButtonBlockquote from "../controls/menu-button-blockquote";
import MenuButtonLink from "../controls/menu-button-link";
import MenuButtonImage from "../controls/menu-button-image";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export type FixedMenuProps = {
  editor: Editor;
};

const FixedMenu = ({ editor }: FixedMenuProps) => {
  return (
    <TooltipProvider disableHoverableContent delayDuration={500} skipDelayDuration={0}>
      <Toolbar.Wrapper>
        <Toolbar.Group>
          <MenuSelectHeading editor={editor} />
        </Toolbar.Group>

        <Toolbar.Divider />

        <Toolbar.Group>
          <MenuButtonBold editor={editor} />
          <MenuButtonItalic editor={editor} />
          <MenuButtonUnderline editor={editor} />
        </Toolbar.Group>

        <Toolbar.Divider />

        <Toolbar.Group>
          <MenuButtonColor editor={editor} />
          <MenuButtonHighlight editor={editor} />
        </Toolbar.Group>

        <Toolbar.Divider />

        <Toolbar.Group>
          <MenuSelectTextAlign editor={editor} />
        </Toolbar.Group>

        <Toolbar.Divider />

        <Toolbar.Group>
          <MenuButtonOrderedList editor={editor} />
          <MenuButtonBulletedList editor={editor} />
        </Toolbar.Group>

        <Toolbar.Divider />

        <Toolbar.Group>
          <MenuButtonImage editor={editor} />
          <MenuButtonLink editor={editor} />
          <MenuButtonBlockquote editor={editor} />
        </Toolbar.Group>
      </Toolbar.Wrapper>
    </TooltipProvider>
  );
};

export default FixedMenu;
// export default React.memo(FixedMenu, (prevProps, nextProps) => {
//   return prevProps.editor === nextProps.editor;
// });
