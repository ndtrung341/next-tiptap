export const htmlMock = `
<h2>Welcome to Rich Text Editor</h2>
<p>A modern rich text editor built with <strong>Tiptap</strong> and <strong>Radix UI</strong>. Supports text formatting, media embedding, and advanced content structures.</p>

<h2>Text Formatting</h2>
<p>Supports various text styles: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s>, and <code>inline code</code>.</p>
<p>Also supports <sub>subscript</sub> and <sup>superscript</sup>.</p>

<h2>Text Styling</h2>
<p>Customize with <span style="color: rgb(255, 0, 0)">custom colors</span> and <span style="background-color: rgb(255, 255, 0)">background highlights</span> to emphasize important content.</p>
<p>You can combine both: <span style="background-color: rgb(59, 130, 246); color: rgb(255, 255, 255)">Blue background with white text</span> creates a tag-like appearance.</p>

<h2>Text Alignment</h2>
<p style="text-align: left">This paragraph is left-aligned, the default alignment for most text content.</p>
<p style="text-align: center">This paragraph is center-aligned, perfect for titles or important statements.</p>
<p style="text-align: right">This paragraph is right-aligned, often used for signatures or timestamps.</p>
<p style="text-align: justify">This paragraph uses justified alignment. When you have longer text content, justified alignment distributes the words evenly across the line width, creating clean edges on both sides.</p>

<h2>Headings Structure</h2>
<p>Supports heading levels from H1 to H6 for clear document hierarchy.</p>

<h2>Lists</h2>
<h3>Unordered Lists</h3>
<ul>
  <li><p>First item</p></li>
  <li><p>Second item with <strong>bold text</strong></p></li>
  <li>
    <p>Third item with nested list:</p>
    <ul>
      <li><p>Nested item 1</p></li>
      <li><p>Nested item 2 with <em>italic</em></p></li>
    </ul>
  </li>
</ul>
<h3>Ordered Lists</h3>
<ol>
  <li><p>Install dependencies</p></li>
  <li><p>Configure the editor</p></li>
  <li><p>Deploy your application</p></li>
</ol>

<h2>Blockquotes</h2>
<blockquote>
  <p>"The best way to predict the future is to invent it." <strong>- Alan Kay</strong></p>
</blockquote>

<h2>Code Blocks</h2>
<h3>HTML</h3>
<pre><code class="language-html">&lt;div class="container"&gt;
  &lt;h1&gt;Hello World&lt;/h1&gt;
  &lt;p&gt;Welcome to the editor.&lt;/p&gt;
&lt;/div&gt;</code></pre>
<h3>JavaScript</h3>
<pre><code class="language-javascript">function greetUser(name) {
  const greeting = \`Hello, \${name}! Welcome to Tiptap Editor.\`;
  console.log(greeting);
  return greeting;
}

const message = greetUser('World');
console.log(message);</code></pre>
<h3>CSS</h3>
<pre><code class="language-css">.editor-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
}</code></pre>
<h3>React</h3>
<pre><code class="language-tsx">import { useRef } from 'react';
import TiptapEditor, { type TiptapEditorRef } from '@/components/tiptap-editor';

export default function MyEditor() {
  const editorRef = useRef&lt;TiptapEditorRef&gt;(null);

  const handleChange = (content: string) =&gt; {
    console.log('Content updated:', content);
  };

  return (
    &lt;TiptapEditor
      ref={editorRef}
      output="html"
      minHeight={320}
      onChange={handleChange}
      placeholder="Start typing..."
    /&gt;
  );
}</code></pre>

<h2>Tables</h2>
<table style="min-width: 105px">
  <colgroup>
    <col style="min-width: 35px" />
    <col style="min-width: 35px" />
    <col style="min-width: 35px" />
  </colgroup>
  <tbody>
    <tr>
      <th colspan="1" rowspan="1"><p>Feature</p></th>
      <th colspan="1" rowspan="1"><p>Description</p></th>
      <th colspan="1" rowspan="1"><p>Status</p></th>
    </tr>
    <tr>
      <td colspan="1" rowspan="1"><p><strong>Text Formatting</strong></p></td>
      <td colspan="1" rowspan="1"><p>Bold, italic, underline, strikethrough, code</p></td>
      <td colspan="1" rowspan="1"><p>✅ Available</p></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1"><p><strong>Images</strong></p></td>
      <td colspan="1" rowspan="1"><p>Upload, resize, and add captions</p></td>
      <td colspan="1" rowspan="1"><p>✅ Available</p></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1"><p><strong>Tables</strong></p></td>
      <td colspan="1" rowspan="1"><p>Resizable columns with cell formatting</p></td>
      <td colspan="1" rowspan="1"><p>✅ Available</p></td>
    </tr>
  </tbody>
</table>

<h2>Images</h2>
<h3>Standalone Image</h3>
<img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=500&fit=crop" alt="Developer workspace" data-width="800" data-height="500" />
<h3>Image with Caption</h3>
<figure>
  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop" alt="Coding on laptop" data-width="800" data-height="500" />
  <figcaption>A developer working on a modern laptop with dual monitors</figcaption>
</figure>

<h2>YouTube Embeds</h2>
<p>Embed YouTube videos directly in your content:</p>
<div>
  <iframe
    width="640"
    height="360"
    allowfullscreen="true"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  ></iframe>
</div>

<h2>Links</h2>
<p>Add <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev">external links</a> to reference other resources, or create <a target="_blank" rel="noopener noreferrer nofollow" href="#internal">internal links</a> for navigation within your document.</p>
<p>Links can also be <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/ndtrung341/next-tiptap"><strong>combined with text formatting</strong></a> for better visibility.</p>

<h2>Keyboard Shortcuts</h2>
<ul>
  <li><p><code>Ctrl/Cmd + B</code> - <strong>Bold</strong></p></li>
  <li><p><code>Ctrl/Cmd + I</code> - <em>Italic</em></p></li>
  <li><p><code>Ctrl/Cmd + U</code> - <u>Underline</u></p></li>
  <li><p><code>Ctrl/Cmd + Z</code> - Undo / <code>Ctrl/Cmd + Shift + Z</code> - Redo</p></li>
  <li><p>And more shortcuts for alignment, headings, lists...</p></li>
</ul>

<h2>Conclusion</h2>
<p>This editor provides a comprehensive set of features for creating rich, engaging content. Whether you're building a blog, documentation site, or content management system, it offers the flexibility and power you need.</p>
`;

export const jsonMock = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Welcome to Rich Text Editor" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "A modern rich text editor built with " },
        { type: "text", text: "Tiptap", marks: [{ type: "bold" }] },
        { type: "text", text: " and " },
        { type: "text", text: "Radix UI", marks: [{ type: "bold" }] },
        {
          type: "text",
          text: ". Supports text formatting, media embedding, and advanced content structures.",
        },
      ],
    },

    // Text Formatting
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Text Formatting" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Supports various text styles: " },
        { type: "text", text: "bold", marks: [{ type: "bold" }] },
        { type: "text", text: ", " },
        { type: "text", text: "italic", marks: [{ type: "italic" }] },
        { type: "text", text: ", " },
        { type: "text", text: "underline", marks: [{ type: "underline" }] },
        { type: "text", text: ", " },
        { type: "text", text: "strikethrough", marks: [{ type: "strike" }] },
        { type: "text", text: ", and " },
        { type: "text", text: "inline code", marks: [{ type: "code" }] },
        { type: "text", text: "." },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Also supports " },
        { type: "text", text: "subscript", marks: [{ type: "subscript" }] },
        { type: "text", text: " and " },
        { type: "text", text: "superscript", marks: [{ type: "superscript" }] },
        { type: "text", text: "." },
      ],
    },

    // Text Styling
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Text Styling" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Customize with " },
        {
          type: "text",
          text: "custom colors",
          marks: [{ type: "textStyle", attrs: { color: "rgb(255, 0, 0)" } }],
        },
        { type: "text", text: " and " },
        {
          type: "text",
          text: "background highlights",
          marks: [{ type: "highlight", attrs: { color: "rgb(255, 255, 0)" } }],
        },
        { type: "text", text: " to emphasize important content." },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "You can combine both: " },
        {
          type: "text",
          text: "Blue background with white text",
          marks: [
            { type: "textStyle", attrs: { color: "rgb(255, 255, 255)" } },
            { type: "highlight", attrs: { color: "rgb(59, 130, 246)" } },
          ],
        },
        { type: "text", text: " creates a tag-like appearance." },
      ],
    },

    // Text Alignment
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Text Alignment" }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "This paragraph is left-aligned, the default alignment for most text content.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "center" },
      content: [
        {
          type: "text",
          text: "This paragraph is center-aligned, perfect for titles or important statements.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "right" },
      content: [
        {
          type: "text",
          text: "This paragraph is right-aligned, often used for signatures or timestamps.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "justify" },
      content: [
        {
          type: "text",
          text: "This paragraph uses justified alignment. When you have longer text content, justified alignment distributes the words evenly across the line width, creating clean edges on both sides.",
        },
      ],
    },

    // Headings Structure
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Headings Structure" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Supports heading levels from H1 to H6 for clear document hierarchy.",
        },
      ],
    },

    // Lists
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Lists" }],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Unordered Lists" }],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "First item" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Second item with " },
                { type: "text", text: "bold text", marks: [{ type: "bold" }] },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Third item with nested list:" }],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Nested item 1" }],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        { type: "text", text: "Nested item 2 with " },
                        {
                          type: "text",
                          text: "italic",
                          marks: [{ type: "italic" }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Ordered Lists" }],
    },
    {
      type: "orderedList",
      attrs: { start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Install dependencies" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Configure the editor" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Deploy your application" }],
            },
          ],
        },
      ],
    },

    // Blockquotes
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Blockquotes" }],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: '"The best way to predict the future is to invent it." ',
            },
            { type: "text", text: "- Alan Kay", marks: [{ type: "bold" }] },
          ],
        },
      ],
    },

    // Code Blocks
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Code Blocks" }],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "HTML" }],
    },
    {
      type: "codeBlock",
      attrs: { language: "html" },
      content: [
        {
          type: "text",
          text: '<div class="container">\n  <h1>Hello World</h1>\n  <p>Welcome to the editor.</p>\n</div>',
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "JavaScript" }],
    },
    {
      type: "codeBlock",
      attrs: { language: "javascript" },
      content: [
        {
          type: "text",
          text: "function greetUser(name) {\n  const greeting = `Hello, ${name}! Welcome to Tiptap Editor.`;\n  console.log(greeting);\n  return greeting;\n}\n\nconst message = greetUser('World');\nconsole.log(message);",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "CSS" }],
    },
    {
      type: "codeBlock",
      attrs: { language: "css" },
      content: [
        {
          type: "text",
          text: ".editor-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 2rem;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 8px;\n}",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "React" }],
    },
    {
      type: "codeBlock",
      attrs: { language: "tsx" },
      content: [
        {
          type: "text",
          text: "import { useRef } from 'react';\nimport TiptapEditor, { type TiptapEditorRef } from '@/components/tiptap-editor';\n\nexport default function MyEditor() {\n  const editorRef = useRef<TiptapEditorRef>(null);\n\n  const handleChange = (content: string) => {\n    console.log('Content updated:', content);\n  };\n\n  return (\n    <TiptapEditor\n      ref={editorRef}\n      output=\"html\"\n      minHeight={320}\n      onChange={handleChange}\n      placeholder=\"Start typing...\"\n    />\n  );\n}",
        },
      ],
    },

    // Tables
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Tables" }],
    },
    {
      type: "table",
      content: [
        {
          type: "tableRow",
          content: [
            {
              type: "tableHeader",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Feature" }],
                },
              ],
            },
            {
              type: "tableHeader",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Description" }],
                },
              ],
            },
            {
              type: "tableHeader",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Status" }],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Text Formatting",
                      marks: [{ type: "bold" }],
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Bold, italic, underline, strikethrough, code",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "✅ Available" }],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Images", marks: [{ type: "bold" }] },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Upload, resize, and add captions" },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "✅ Available" }],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Tables", marks: [{ type: "bold" }] },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Resizable columns with cell formatting",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "✅ Available" }],
                },
              ],
            },
          ],
        },
      ],
    },

    // Images
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Images" }],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Standalone Image" }],
    },
    {
      type: "image",
      attrs: {
        src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=500&fit=crop",
        alt: "Developer workspace",
        "data-width": 800,
        "data-height": 500,
      },
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Image with Caption" }],
    },
    {
      type: "figure",
      content: [
        {
          type: "image",
          attrs: {
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
            alt: "Coding on laptop",
            "data-width": 800,
            "data-height": 500,
          },
        },
        {
          type: "figcaption",
          content: [
            {
              type: "text",
              text: "A developer working on a modern laptop with dual monitors",
            },
          ],
        },
      ],
    },

    // YouTube
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "YouTube Embeds" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Embed YouTube videos directly in your content:",
        },
      ],
    },
    {
      type: "youtube",
      attrs: {
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        width: 640,
        height: 360,
      },
    },

    // Links
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Links" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Add " },
        {
          type: "text",
          text: "external links",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev",
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          ],
        },
        { type: "text", text: " to reference other resources, or create " },
        {
          type: "text",
          text: "internal links",
          marks: [
            {
              type: "link",
              attrs: {
                href: "#internal",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
              },
            },
          ],
        },
        { type: "text", text: " for navigation within your document." },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Links can also be " },
        {
          type: "text",
          text: "combined with text formatting",
          marks: [
            { type: "bold" },
            {
              type: "link",
              attrs: {
                href: "https://github.com/ndtrung341/next-tiptap",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
              },
            },
          ],
        },
        { type: "text", text: " for better visibility." },
      ],
    },

    // Keyboard Shortcuts
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Keyboard Shortcuts" }],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ctrl/Cmd + B",
                  marks: [{ type: "code" }],
                },
                { type: "text", text: " - " },
                { type: "text", text: "Bold", marks: [{ type: "bold" }] },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ctrl/Cmd + I",
                  marks: [{ type: "code" }],
                },
                { type: "text", text: " - " },
                { type: "text", text: "Italic", marks: [{ type: "italic" }] },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ctrl/Cmd + U",
                  marks: [{ type: "code" }],
                },
                { type: "text", text: " - " },
                {
                  type: "text",
                  text: "Underline",
                  marks: [{ type: "underline" }],
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ctrl/Cmd + Z",
                  marks: [{ type: "code" }],
                },
                { type: "text", text: " - Undo / " },
                {
                  type: "text",
                  text: "Ctrl/Cmd + Shift + Z",
                  marks: [{ type: "code" }],
                },
                { type: "text", text: " - Redo" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "And more shortcuts for alignment, headings, lists...",
                },
              ],
            },
          ],
        },
      ],
    },

    // Conclusion
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Conclusion" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This editor provides a comprehensive set of features for creating rich, engaging content. Whether you're building a blog, documentation site, or content management system, it offers the flexibility and power you need.",
        },
      ],
    },
  ],
};

export const mockData = {
  title: "Rich Text Editor Features Demo",
  html: htmlMock,
  json: jsonMock,
  wordCount: 892,
  cover:
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=800&fit=crop",
  author: "Demo Content",
  createdAt: "Nov 10, 2025",
  readingTime: 5,
};
