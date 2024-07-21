import React from 'react';

import { Editor } from '@tiptap/core';
import { Toolbar } from '../ui/toolbar';
import { TooltipProvider } from '@radix-ui/react-tooltip';

import MenuButtonBold from '../controls/menu-button-bold';
import MenuButtonItalic from '../controls/menu-button-italic';
import MenuButtonUnderline from '../controls/menu-button-underline';

import MenuButtonColor from '../controls/menu-button-color';
import MenuButtonHighlight from '../controls/menu-button-highlight';

import MenuSelectHeading from '../controls/menu-select-heading';
import MenuSelectTextAlign from '../controls/menu-select-text-align';

import MenuButtonBulletedList from '../controls/menu-button-bulleted-list';
import MenuButtonOrderedList from '../controls/menu-button-ordered-list';
import MenuButtonBlockquote from '../controls/menu-button-blockquote';
import MenuButtonLink from '../controls/menu-button-link';
import MenuButtonImage from '../controls/menu-button-image';
import MenuButtonUndo from '../controls/menu-button-undo';
import MenuButtonRedo from '../controls/menu-button-redo';
import MenuButtonCodeblock from '../controls/menu-button-codeblock';

export type FixedMenuProps = {
  editor: Editor;
  className?: string;
};

const FixedMenu = ({ editor, className }: FixedMenuProps) => {
  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <Toolbar.Wrapper className={className}>
        <Toolbar.Group>
          <MenuButtonUndo editor={editor} />
          <MenuButtonRedo editor={editor} />
        </Toolbar.Group>

        <Toolbar.Divider />

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
          <MenuButtonCodeblock editor={editor} />
        </Toolbar.Group>
      </Toolbar.Wrapper>
    </TooltipProvider>
  );
};

export default FixedMenu;
