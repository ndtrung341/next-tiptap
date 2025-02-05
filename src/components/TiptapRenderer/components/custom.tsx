import dynamic from "next/dynamic";
import Image from "next/image";
import { Components } from "rehype-react";
import HeadingWithAnchor from "./HeadingWithAnchor";
import CopyButton from "./CopyButton";
import type { ReactElement } from "react";

const SyntaxHighlighter = dynamic(() => import("./SyntaxHighlighter"), {
  ssr: false,
});

export const components: Partial<Components> = {
  h2: (props) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props) => <HeadingWithAnchor level={4} {...props} />,
  img: ({ src, alt, width, ...props }: any) => (
    <Image
      src={src}
      alt={alt || ""}
      width={props["data-width"]}
      height={props["data-height"]}
      className="mx-auto rounded-lg"
    />
  ),
  iframe: ({ ...props }) => (
    <div>
      <iframe
        {...props}
        allowFullScreen={true}
        className="w-full h-full aspect-video mx-auto rounded-lg"
      />
    </div>
    //  <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
    //    <div className="absolute inset-0">
    //      <iframe {...props} allowFullScreen={true} className="w-full h-full" />
    //    </div>
    //  </div>
  ),
  pre: ({ children, ...props }) => {
    const code = (children as ReactElement).props.children;
    return (
      <div className="relative group not-prose rounded-lg overflow-hidden border border-[#d1d9e0] dark:border-[#3d444d]">
        <CopyButton code={String(code)} />
        <pre {...(props as any)}>{children}</pre>
      </div>
    );
  },
  code: ({ children, ...props }) => {
    const match = /language-(\w+)/.exec(props.className || "");
    const code = String(children).replace(/\n$/, "");
    return match ? (
      <SyntaxHighlighter language={match[1]} content={code} />
    ) : (
      <code {...props}>{children}</code>
    );
  },
  table: (props: any) => (
    <table className="not-prose w-full table-auto border-collapse mx-auto text-sm" {...props} />
  ),
  tr: (props: any) => (
    <tr
      className="border-b last:border-b-0 border-b-[#d1d9e0] dark:border-b-[#3d444d]"
      {...props}
    />
  ),
  td: (props: any) => <td className="px-2.5 py-3.5" {...props} />,
  th: (props: any) => <td className="px-2.5 py-3.5 font-bold" {...props} />,
};
