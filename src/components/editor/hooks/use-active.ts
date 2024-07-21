import { useCallback, useEffect, useState } from 'react';

import { Editor } from '@tiptap/core';

export const useActive = (editor: Editor, ...args: any) => {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback((value: unknown = null) => {
    if (value !== null && typeof value === 'boolean') {
      setActive(value);
    } else {
      setActive((v) => !v);
    }
  }, []);

  useEffect(() => {
    const listener = () => {
      // eslint-disable-next-line prefer-spread
      toggleActive(editor.isActive.apply(editor, args));
    };

    //  editor.on("selectionUpdate", listener);
    editor.on('transaction', listener);

    return () => {
      // editor.off("selectionUpdate", listener);
      editor.off('transaction', listener);
    };
  }, [editor, args, toggleActive]);

  return active;
};
