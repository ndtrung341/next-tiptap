"use client";

import { Editor, type EditorInstance } from "@/components/editor";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

const sampleContent = `
<h2 style="text-align: center">Hey there 👋</h2>
<p>
  This is a example of <code>tiptap</code>, which combines
  <a
    target="_blank"
    rel="noopener noreferrer nofollow"
    href="https://tiptap.dev/"
    >Tiptap</a
  >
  with customizable
  <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.radix-ui.com/"
    >Radix UI</a
  >
  styles, plus a suite of additional components and extensions! Sure, there are
  <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong>
  you’d probably expect from a rich text editor.
</p>
<ul>
  <li><p>That’s a bullet list with one …</p></li>
  <li><p>… or two list items.</p></li>
</ul>
<p>
  Isn’t that great? And all of that is editable.
  <strong
    ><span style="color: #ff9900">But wait, </span
    ><span style="color: #403101"
      ><mark
        data-color="#ffd699"
        style="background-color: #ffd699; color: inherit"
        >there’s more!</mark
      ></span
    ></strong
  >
</p>

<p>Feel free to add and resize images:</p>

<img src="http://res.cloudinary.com/dmhzdv5kf/image/upload/v1717576178/digkpfdytif303d7oxxz.jpg" width="100%">


<blockquote>
  <p>Wow, that’s amazing. Good work! 👏 <br />— Mom</p>
</blockquote>

<img src="https://res.cloudinary.com/dmhzdv5kf/image/upload/v1717585934/pjyuokets7i2rv8wschi.jpg" width="100%">

<p>Give it a try and click around!</p>
`;

export default function Home() {
  const [content, setContent] = useState<null | string>();
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    const content = window.localStorage.getItem("content");
    setContent(Boolean(content) ? content : sampleContent);
  }, []);

  const handleUpdate = useCallback(
    debounce((editor: EditorInstance) => {
      const html = !editor.isEmpty ? editor.getHTML() : "";
      window.localStorage.setItem("content", html);
    }, 300),
    []
  );

  if (!content) return;

  return (
    <main className="max-w-screen-md mx-auto px-5">
      <label className="flex items-center gap-2 my-4 cursor-pointer">
        <input
          type="checkbox"
          checked={isEditable}
          onChange={() => {
            setIsEditable(!isEditable);
          }}
        />
        Editable
      </label>

      <div className="border bg-background shadow rounded-lg mb-4">
        <Editor
          content={content}
          editable={isEditable}
          onUpdate={({ editor }) => {
            handleUpdate(editor);
          }}
        />
      </div>
      {/* <article className="mt-8 mb-6 px-6 prose prose-base prose-blue xl:prose-md prose-headings:scroll-mt-[80px]  focus:outline-none">
        <div dangerouslySetInnerHTML={{ __html: sampleContent }}></div>
      </article> */}
    </main>
  );
}
