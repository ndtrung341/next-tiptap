import React, { ChangeEvent, memo, useCallback, useRef } from 'react';
import { Editor } from '@tiptap/core';
import { Toolbar } from '../ui/toolbar';
import { Icon } from '../ui/icon';
import { browserFileTable } from '../lib/browser-file-table';
import UploadWidget from '@/components/cloudinary/upload-widget';
import MediaLibrary from '@/components/cloudinary/media-library';

interface MenuButtonImageProps {
  editor: Editor;
}

export const MenuButtonImage = ({ editor }: MenuButtonImageProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(() => {
    fileInput.current?.click();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file = target.files?.[0];
    if (file?.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      editor.chain().setImage({ src: url }).focus().run();
    }
  };

  //   const onUpload = useCallback(
  //     (e: ChangeEvent<HTMLInputElement>) => {
  //       const target = e.target;
  //       const file = target.files?.[0];
  //       if (file?.type.startsWith('image/')) {
  //         const url = URL.createObjectURL(file);
  //         browserFileTable[url] = file;
  //         editor.chain().setImage({ src: url }).focus().run();
  //       }
  //     },
  //     [editor]
  //   );

  function handleOnInsert({ assets }: any) {
    if (Array.isArray(assets)) {
      const url = assets[0].url;
      editor.chain().setImage({ src: url }).focus().run();
    }
  }

  return (
    <React.Fragment>
      {/* <Toolbar.Button tooltip="Insert Image" onClick={handleClick}>
        <Icon name="Image" />
      </Toolbar.Button>
      <input
        className="w-0 h-0 overflow-hidden opacity-0"
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={onUpload}
      /> */}

      <UploadWidget
        onSuccess={(result, widget) => {
          const url = result.info.url;
          editor.chain().setImage({ src: url }).focus().run();
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <Toolbar.Button tooltip='Insert Image' onClick={() => open()}>
              <Icon name='Image' />
            </Toolbar.Button>
          );
        }}
      </UploadWidget>

      {/* <MediaLibrary
        onInsert={handleOnInsert}
        options={{
          insertCaption: 'Add Assets',
          multiple: false
        }}
      >
        {({ open }) => {
          return (
            <Toolbar.Button tooltip='Insert Image' onClick={() => open!()}>
              <Icon name='Image' />
            </Toolbar.Button>
          );
        }}
      </MediaLibrary> */}
    </React.Fragment>
  );
};

export default memo(MenuButtonImage, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
