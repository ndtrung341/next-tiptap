import React, { ReactNode } from "react";

interface PostContentProps {
  children: ReactNode;
}

const PostContent = ({ children }: PostContentProps) => {
  return (
    <div className="order-2 min-w-full prose prose-blue dark:prose-invert prose-headings:scroll-m-20 article-content">
      {children}
    </div>
  );
};

PostContent.displayName = "PostContent";

export default PostContent;
