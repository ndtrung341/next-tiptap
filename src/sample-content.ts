export const sampleContent = `
<p>
  Welcome to our React Block Editor Template built on top of
  <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://tiptap.dev/"
    >Tiptap</a
  >,
  <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://nextjs.org/"
    >Next.js</a
  >
  and
  <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://tailwindcss.com/"
    >Tailwind</a
  >. This project can be a good starting point for your own implementation of a block editor.
</p>
<pre><code class="language-typescript">import { useEditor, EditorContent } from '@tiptap/react'
function App() {
  const editor = useEditor()
  
  return &lt;EditorContent editor={editor} /&gt;
}</code></pre>
<p>This editor includes features like:</p>
<ul>
  <li><p>A DragHandle including a DragHandle menu</p></li>
  <li>
    <p>
      A Slash menu that can be triggered via typing a <code>/</code> into an empty paragraph or by
      using the <strong>+ Button</strong> next to the drag handle
    </p>
  </li>
  <li>
    <p>
      A TextFormatting menu that allows you to change the <span>font size</span>,
      <strong>font weight</strong>, <span>font family</span>,
      <span style="color: rgb(185, 28, 28)">color</span>,
      <mark data-color="#7e7922" style="background-color: #7e7922; color: inherit">highlight</mark>
      and more
    </p>
  </li>
  <li>
    <p>A Table of Contents that can be viewed via clicking on the button on the top left corner</p>
  </li>
  <li><p>Live collaboration including content synchronization and collaborative cursors</p></li>
  <li>
    <p>
      AI implementation with text and image generation and auto completion via the
      <code>TAB</code> key.
    </p>
  </li>
</ul>
<img
  style="text-align: center"
  src="http://res.cloudinary.com/dmhzdv5kf/image/upload/v1717576178/digkpfdytif303d7oxxz.jpg"
  width="250"
/>
<h2>Get started</h2>
<p>
  To access our block editor template, simply head over to your
  <a
    target="_blank"
    rel="noopener noreferrer nofollow"
    class="link"
    href="https://cloud.tiptap.dev/react-templates"
    >Tiptap Account</a
  >
  If you are not already a member, sign up for an account and complete the 2-minute React Template
  survey. Once finished, we will send you an invite to the private GitHub repository.
</p>
<h2>Installed extensions</h2>
<ul>
  <li><p>@tiptap-pro/extension-ai</p></li>
  <li><p>@tiptap-pro/extension-drag-handle</p></li>
  <li><p>@tiptap-pro/extension-drag-handle-react</p></li>
  <li><p>@tiptap-pro/extension-emoji</p></li>
  <li><p>@tiptap-pro/extension-file-handler</p></li>
  <li><p>@tiptap-pro/extension-mathematics</p></li>
  <li><p>@tiptap-pro/extension-node-range</p></li>
  <li><p>@tiptap-pro/extension-table-of-contents</p></li>
  <li><p>@tiptap-pro/extension-unique-id</p></li>
  <li><p>@tiptap/extension-bullet-list</p></li>
  <li><p>@tiptap/extension-character-count</p></li>
  <li><p>@tiptap/extension-code-block</p></li>
  <li><p>@tiptap/extension-code-block-lowlight</p></li>
  <li><p>@tiptap/extension-collaboration</p></li>
  <li><p>@tiptap/extension-collaboration-cursor</p></li>
  <li><p>@tiptap/extension-color</p></li>
  <li><p>@tiptap/extension-document</p></li>
  <li><p>@tiptap/extension-dropcursor</p></li>
  <li><p>@tiptap/extension-focus</p></li>
  <li><p>@tiptap/extension-font-family</p></li>
  <li><p>@tiptap/extension-heading</p></li>
  <li><p>@tiptap/extension-highlight</p></li>
  <li><p>@tiptap/extension-horizontal-rule</p></li>
  <li><p>@tiptap/extension-image</p></li>
  <li><p>@tiptap/extension-link</p></li>
  <li><p>@tiptap/extension-ordered-list</p></li>
  <li><p>@tiptap/extension-paragraph</p></li>
  <li><p>@tiptap/extension-placeholder</p></li>
  <li><p>@tiptap/extension-subscript</p></li>
  <li><p>@tiptap/extension-superscript</p></li>
  <li><p>@tiptap/extension-table</p></li>
  <li><p>@tiptap/extension-table-header</p></li>
  <li><p>@tiptap/extension-table-row</p></li>
  <li><p>@tiptap/extension-task-item</p></li>
  <li><p>@tiptap/extension-task-list</p></li>
  <li><p>@tiptap/extension-text-align</p></li>
  <li><p>@tiptap/extension-text-style</p></li>
  <li><p>@tiptap/extension-typography</p></li>
  <li><p>@tiptap/extension-underline</p></li>
</ul>
<p></p>
`;
