import React, { ChangeEvent, Fragment, useCallback, useRef } from "react";
import MenuButton from "../MenuButton";
import { useEditorState } from "@tiptap/react";
import { useTiptapContext } from "../Provider";
import UploadWidget from "@/components/Cloudinary/upload-widget";
import MediaLibrary from "@/components/Cloudinary/media-library";

const ImageButton = () => {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("image"),
        disabled: !ctx.editor.isEditable,
      };
    },
  });

  //  const fileInput = useRef<HTMLInputElement>(null);
  //  const handleClick = useCallback(() => {
  //    fileInput.current?.click();
  //  }, []);

  //  const onUpload = useCallback(
  //    (e: ChangeEvent<HTMLInputElement>) => {
  //      const target = e.target;
  //      const file = target.files?.[0];
  //      if (file?.type.startsWith("image/")) {
  //        const url = URL.createObjectURL(file);
  //        editor.chain().setImage({ src: url }).focus().run();
  //      }
  //    },
  //    [editor]
  //  );

  return (
    //  <MediaLibrary
    //    onInsert={({ assets }: any) => {
    //      if (!Array.isArray(assets)) return;
    //      const image = assets[0];
    //      console.log(image);
    //      editor
    //        .chain()
    //        .focus()
    //        .insertImage({
    //          src: image.url,
    //          width: image.width,
    //          height: image.height,
    //          // originalWidth: image.width,
    //          // originalHeight: image.height,
    //        })
    //        .run();
    //      //   editor.chain().focus().setImageBlock({ src: image.url, caption: "" }).run();
    //    }}
    //  >
    //    {({ open }) => {
    //      return <MenuButton icon="Image" tooltip="Image" {...state} onClick={open} />;
    //    }}
    //  </MediaLibrary>

    <UploadWidget
      onSuccess={(result, widget) => {
        // @ts-ignore
        const image = result.info!;
        editor
          .chain()
          .focus()
          .insertImage({
            src: image.url,
            width: image.width,
            height: image.height,
            // originalWidth: image.width,
            // originalHeight: image.height,
          })
          .run();
        widget.close();
      }}
    >
      {({ open }) => {
        return <MenuButton icon="Image" tooltip="Image" {...state} onClick={open} />;
      }}
    </UploadWidget>

    //  <Fragment>
    //    <MenuButton icon="Image" tooltip="Image" {...state} onClick={handleClick} />
    //    <input
    //      style={{ display: "none" }}
    //      type="file"
    //      accept="image/*"
    //      ref={fileInput}
    //      onChange={onUpload}
    //    />
    //  </Fragment>
  );
};

export default ImageButton;
