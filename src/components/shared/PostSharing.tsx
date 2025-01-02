import React from "react";
import { TbBrandFacebook, TbBrandLinkedin, TbBrandX } from "react-icons/tb";

const PostSharing = () => {
  return (
    <div className="flex justify-center lg:justify-end order-3 lg:order-1">
      <div className="sticky lg:h-[calc(100vh-120px)] top-24 flex lg:flex-col gap-4">
        <TbBrandFacebook
          size={40}
          className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600"
        />
        <TbBrandLinkedin
          size={40}
          className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600"
        />
        <TbBrandX
          size={40}
          className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600"
        />
      </div>
    </div>
  );
};

export default PostSharing;
