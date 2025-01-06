export const title = "Tiptap with React and Next.js: Building a Powerful Rich Text Editor";

const content = `
<h2>Introduction</h2>
<p>
  In web development, creating feature-rich text editors has always been challenging. Tiptap, a headless editor framework, combined with React and Next.js, opens up possibilities for sophisticated content management systems and collaborative editing tools.
</p>

<h3>What is Tiptap?</h3>
<p>
  Tiptap is built on ProseMirror, providing a modular architecture and headless functionality. This approach gives developers full control over the UI while offering powerful editing capabilities.
</p>

<img 
   src="https://res.cloudinary.com/dmhzdv5kf/image/upload/v1735024108/668464364417bf4b0898c526_docs-v2-blog_s0krle.jpg"
   alt="Tiptap Editor"
   data-width="1200"
   data-height="800"
/>

<h3>Key Features</h3>

<ul>
  <li>Extensible architecture with various extensions</li>
  <li>Collaborative editing support</li>
  <li>TypeScript support</li>
  <li>Framework-agnostic with excellent React support</li>
</ul>

<h2>Getting Started</h2>

<h3>Installation</h3>
<p>To integrate Tiptap into a Next.js project, install the necessary dependencies:</p>
<pre><code class="language-bash">npm install @tiptap/react @tiptap/pm @tiptap/starter-kit</code></pre>

<h3>Basic Setup</h3>
<p>Create a basic Tiptap editor component:</p>
<pre><code class="language-javascript">import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '&lt;p&gt;Hello, Tiptap!&lt;/p&gt;',
  })

  return &lt;EditorContent editor={editor} /&gt;
}

export default TiptapEditor</code></pre>

<h3>Using in Next.js</h3>
<p>Import and use the Tiptap editor in your Next.js pages:</p>
<pre><code class="language-javascript">import TiptapEditor from '../components/TiptapEditor'

const EditorPage = () => {
  return (
    &lt;div&gt;
      &lt;h1&gt;My Tiptap Editor&lt;/h1&gt;
      &lt;TiptapEditor /&gt;
    &lt;/div&gt;
  )
}

export default EditorPage</code></pre>

<h2>Customizing</h2>
<p>
  Tiptap's extensibility allows easy customization. Here's an example of adding a custom button to toggle bold text:
</p>
<pre><code class="language-javascript">import { useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '&lt;p&gt;Hello, Tiptap!&lt;/p&gt;',
  })

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run()
  }, [editor])

  return (
    &lt;div&gt;
      &lt;button onClick={toggleBold}&gt;Toggle Bold&lt;/button&gt;
      &lt;EditorContent editor={editor} /&gt;
    &lt;/div&gt;
  )
}

export default TiptapEditor</code></pre>

<h2>Collaborative</h2>
<p>
  Tiptap supports collaborative editing. Here's a basic setup using Socket.io in a Next.js application:
</p>
<pre><code class="language-javascript">import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const CollaborativeEditor = () => {
  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider('ws://localhost:1234', 'example-document', ydoc)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({
        document: ydoc,
      }),
    ],
  })

  return &lt;EditorContent editor={editor} /&gt;
}

export default CollaborativeEditor</code></pre>

<h2>Optimizing</h2>

<ul>
  <li><strong>Dynamic Imports:</strong> Use Next.js dynamic imports to load Tiptap when needed.</li>
  <li><strong>Server-side Rendering:</strong> Ensure Tiptap is only instantiated on the client-side.</li>
  <li><strong>Persistent Storage:</strong> Implement storage solutions using Next.js API routes and databases.</li>
</ul>

<pre><code class="language-javascript">import dynamic from 'next/dynamic'

const TiptapEditor = dynamic(() => import('../components/TiptapEditor'), {
  ssr: false,
  loading: () => &lt;p&gt;Loading editor...&lt;/p&gt;,
})

const EditorPage = () => {
  return (
    &lt;div&gt;
      &lt;h1&gt;My Tiptap Editor&lt;/h1&gt;
      &lt;TiptapEditor /&gt;
    &lt;/div&gt;
  )
}

export default EditorPage</code></pre>

<h2>Advanced Features</h2>
<ul>
  <li>Custom nodes and marks for specialized content</li>
  <li>Collaborative cursors and highlighting</li>
  <li>History management (undo/redo)</li>
  <li>Complex structures (tables, task lists)</li>
</ul>

<h2>Real-world Applications</h2>
<p>
  Tiptap, React, and Next.js can power various applications:
</p>
<ul>
  <li>Content Management Systems (CMS)</li>
  <li>Collaborative document editing platforms</li>
  <li>In-browser IDEs and code editors</li>
  <li>Interactive educational tools</li>
</ul>

<iframe 
   width="560" 
   height="315" 
   src="https://www.youtube.com/embed/ZGk2m37r49g" 
></iframe>

<h2>Conclusion</h2>
<p>
  Tiptap, combined with React and Next.js, offers a powerful solution for building rich text editors. Its extensibility, performance optimization capabilities, and support for collaborative editing make it an excellent choice for a wide range of web applications.
</p>

<figure>
   <img
      src="https://res.cloudinary.com/dmhzdv5kf/image/upload/v1735023550/6660c5607775f0c58f52a4f0_editor-hero_eb3mes.png"
      alt="Tiptap Editor Example"
      data-width="1038"
      data-height="644"
   />
   <figcaption>Tiptap: A powerful combination of technologies</figcaption>
</figure>

<h2>Resources</h2>
<ul>
  <li><a href="https://tiptap.dev/docs">Tiptap Documentation</a></li>
  <li><a href="https://nextjs.org/docs">Next.js Documentation</a></li>
  <li><a href="https://react.dev/">React Documentation</a></li>
  <li><a href="https://prosemirror.net/">ProseMirror Documentation</a></li>
</ul>
`;

export const mock = {
    title,
    content,
    wordCount: 483,
    cover: "https://res.cloudinary.com/dmhzdv5kf/image/upload/v1733364957/shk91N6yUj_zkms92.jpg",
    author: "ChatGPT",
    createdAt: "Jan, 02 2025",
};
