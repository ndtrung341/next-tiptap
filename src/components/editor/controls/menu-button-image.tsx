import React, { ChangeEvent, memo, useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { Toolbar } from "../ui/toolbar";
import { Icon } from "../ui/icon";
import { browserFileTable } from "../lib/browser-file-table";
import { CldUploadWidget } from "next-cloudinary";

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
    if (file?.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      editor.chain().setImage({ src: url }).focus().run();
    }
  };

  const onUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const file = target.files?.[0];
      if (file?.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        browserFileTable[url] = file;
        editor.chain().setImage({ src: url }).focus().run();
      }
    },
    [editor]
  );

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
      <CldUploadWidget
        uploadPreset="gdgamojk"
        onSuccess={(result, { widget }) => {
          //@ts-ignore
          const url = result.info.url;
          editor.chain().setImage({ src: url }).focus().run();
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <Toolbar.Button tooltip="Insert Image" onClick={() => open()}>
              <Icon name="Image" />
            </Toolbar.Button>
          );
        }}
      </CldUploadWidget>
    </React.Fragment>
  );
};

export default memo(MenuButtonImage, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
