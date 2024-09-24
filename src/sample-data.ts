const title = 'A Comprehensive Guide to JavaScript';
const content = `
<h2 id="introduction">Introduction</h2>
<p>
  JavaScript is one of the most widely used programming languages in the world today. Originally
  created to add interactivity to web pages, it has evolved into a powerful language that can be
  used for everything from web development to server-side applications. In this guide, we will
  explore the core concepts of JavaScript, its features, and how it has changed the landscape of
  programming.
</p>
<img
  src="http://res.cloudinary.com/dmhzdv5kf/image/upload/v1727094250/zfeozxucmlgkf6hqpia5.jpg"
  width="100%"
/>
<h2 id="what-is-javascript">What is JavaScript?</h2>
<p>
  JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript
  specification. It is a dynamic language that supports object-oriented, imperative, and functional
  programming styles. JavaScript is primarily known for its role in web development, where it
  enables interactive elements on websites.
</p>
<h2 id="history-of-javascript">History of JavaScript</h2>
<p>
  JavaScript was created in 1995 by Brendan Eich while working at Netscape. Initially named Mocha,
  it was later renamed to LiveScript before finally being called JavaScript. The language was
  designed to make web pages more dynamic and user-friendly. Over the years, JavaScript has
  undergone significant changes and improvements, leading to the rich ecosystem we see today.
</p>
<h3 id="evolution-of-javascript">Evolution of JavaScript</h3>
<p>
  JavaScript's journey began with its initial release in 1995. It quickly became a core technology
  of the World Wide Web, alongside HTML and CSS. The introduction of AJAX (Asynchronous JavaScript
  and XML) in the early 2000s allowed developers to create dynamic, single-page applications,
  revolutionizing web development.
</p>
<p>
  In 2009, the release of ECMAScript 5 brought many new features, such as JSON support, strict mode,
  and array methods. ECMAScript 6, released in 2015, introduced significant improvements like arrow
  functions, classes, modules, and promises. Subsequent versions have continued to enhance the
  language, adding features that improve usability and performance.
</p>
<h2 id="core-concepts-of-javascript">Core Concepts of JavaScript</h2>
<h3 id="variables">Variables</h3>
<p>
  In JavaScript, variables are used to store data values. You can declare variables using
  <code>var</code>, <code>let</code>, or <code>const</code>. Each has its own scope and usage:
</p>
<ul>
  <li>
    <p>
      <strong>var:</strong> Function-scoped or globally scoped. It is hoisted to the top of its
      scope.
    </p>
  </li>
  <li>
    <p>
      <strong>let:</strong> Block-scoped. It is not hoisted and cannot be accessed before its
      declaration.
    </p>
  </li>
  <li>
    <p>
      <strong>const:</strong> Block-scoped. Used to declare constants that cannot be reassigned.
    </p>
  </li>
</ul>
<h3 id="data-types">Data Types</h3>
<p>JavaScript has several built-in data types:</p>
<ul>
  <li>
    <p>
      <strong>Primitive types:</strong> Undefined, Null, Boolean, Number, BigInt, String, Symbol.
    </p>
  </li>
  <li>
    <p><strong>Reference types:</strong> Objects, Arrays, Functions.</p>
  </li>
</ul>
<h3 id="functions">Functions</h3>
<p>
  Functions are one of the core building blocks in JavaScript. They can be declared using function
  declarations, function expressions, or arrow functions:
</p>
<pre><code class="language-javascript">function myFunction() {\n    // Function body\n}</code></pre>
<p>Arrow functions provide a concise syntax and lexically bind the <code>this</code> keyword:</p>
<pre><code class="language-javascript">const myArrowFunction = () =&gt; {\n    // Function body\n};</code></pre>
<h2 id="object-oriented-javascript">Object-Oriented JavaScript</h2>
<p>
  JavaScript is an object-oriented language, meaning it uses objects to represent data and
  functionality. Objects are collections of key-value pairs, where keys are strings, and values can
  be any data type, including functions:
</p>
<pre><code class="language-javascript">const person = {\n    name: 'John',\n    age: 30,\n    greet() {\n        console.log('Hello, ' + this.name);\n    }\n};</code></pre>
<p>You can create objects using object literals, constructors, or classes (introduced in ES6).</p>
<h2 id="asynchronous-javascript">Asynchronous JavaScript</h2>
<p>
  Asynchronous programming is essential for web applications to perform non-blocking operations.
  JavaScript uses callbacks, promises, and async/await to handle asynchronous tasks:
</p>
<h3 id="callbacks">Callbacks</h3>
<p>
  Callbacks are functions passed as arguments to other functions. They are executed once a certain
  condition is met:
</p>
<pre><code class="language-javascript">setTimeout(() =&gt; {\n    console.log('Executed after 2 seconds');\n}, 2000);</code></pre>
<h3 id="promises">Promises</h3>
<p>
  Promises represent the eventual completion (or failure) of an asynchronous operation. They provide
  a cleaner alternative to callbacks:
</p>
<pre><code class="language-javascript">const myPromise = new Promise((resolve, reject) =&gt; {\n    // Asynchronous operation\n});\nmyPromise.then(result =&gt; {\n    console.log(result);\n}).catch(error =&gt; {\n    console.error(error);\n});</code></pre>
<h3 id="asyncawait">Async/Await</h3>
<p>
  Async/await syntax allows you to write asynchronous code in a more synchronous fashion. It is
  built on top of promises:
</p>
<pre><code class="language-javascript">\nconst fetchData = async () =&gt; {\n    try {\n        const response = await fetch('https://api.example.com/data');\n        const data = await response.json();\n        console.log(data);\n    } catch (error) {\n        console.error(error);\n    }\n};\n    </code></pre>
<h2 id="modern-javascript-features">Modern JavaScript Features</h2>
<p>JavaScript has introduced many modern features that enhance its capabilities:</p>
<ul>
  <li>
    <p>
      <strong>Template Literals:</strong> Allow for multi-line strings and string interpolation.
    </p>
  </li>
  <li>
    <p><strong>Destructuring:</strong> Simplifies extracting values from arrays and objects.</p>
  </li>
  <li>
    <p>
      <strong>Modules:</strong> Enable better organization of code through import/export syntax.
    </p>
  </li>
</ul>
<h2 id="conclusion">Conclusion</h2>
<p>
  JavaScript is an essential language for anyone looking to develop modern web applications. Its
  versatility, extensive ecosystem, and continuous evolution make it a powerful tool for developers.
  By understanding its core concepts, object-oriented features, and asynchronous capabilities, you
  can harness the full potential of JavaScript to create dynamic, interactive web experiences.
</p>
<p>
  As you continue your journey with JavaScript, keep exploring its features and stay updated with
  the latest advancements. With practice and perseverance, you'll become proficient in one of the
  most sought-after programming languages in the world.
</p>

`;

export const sample = { title, content };
