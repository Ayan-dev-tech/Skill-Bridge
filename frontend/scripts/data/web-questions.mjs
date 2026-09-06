export const webQuestions = {
  beginner: [
    {
      id: "web-beg-1",
      questionText: "What is the primary role of the Document Object Model (DOM) in web browsers?",
      options: [
        { id: "web-beg-1-a", label: "A", text: "To provide an in-memory tree representation of the HTML document that scripts can dynamically access and modify" },
        { id: "web-beg-1-b", label: "B", text: "To encrypt and compress network packets before transmitting them over secure WebSocket connections" },
        { id: "web-beg-1-c", label: "C", text: "To compile client-side JavaScript source code directly into native operating system machine instructions" },
        { id: "web-beg-1-d", label: "D", text: "To store persistent relational database records directly inside local browser flash storage partitions" }
      ],
      correctOptionId: "web-beg-1-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "dom-fundamentals",
      explanationAfterAnswer: "The DOM represents an HTML or XML document as a tree structure where each node is an object representing a part of the document, providing an API for programmatic manipulation via JavaScript."
    },
    {
      id: "web-beg-2",
      questionText: "What distinguishes an HTTP GET request from an HTTP POST request?",
      options: [
        { id: "web-beg-2-a", label: "A", text: "GET requests can only transmit binary images, while POST requests are mathematically restricted to ASCII text" },
        { id: "web-beg-2-b", label: "B", text: "GET requests retrieve data and should be idempotent, while POST requests submit data to be processed" },
        { id: "web-beg-2-c", label: "C", text: "GET requests require transport layer TLS encryption, while POST requests transmit data in unencrypted plaintext" },
        { id: "web-beg-2-d", label: "D", text: "GET requests execute asynchronously on worker threads, while POST requests block the browser event loop" }
      ],
      correctOptionId: "web-beg-2-b",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "http-get-vs-post",
      explanationAfterAnswer: "Under HTTP specifications, GET is safe and idempotent, intended for fetching resources without modifying server state. POST submits data in the request body to create or process resources, potentially modifying server state."
    },
    {
      id: "web-beg-3",
      questionText: "In the CSS box model, what is the correct order of layers from the inside out?",
      options: [
        { id: "web-beg-3-a", label: "A", text: "Margin on the inside, followed sequentially by Border, Padding, and the inner Content box" },
        { id: "web-beg-3-b", label: "B", text: "Border on the inside, followed sequentially by Content, Margin, and the outer Padding area" },
        { id: "web-beg-3-c", label: "C", text: "Content on the inside, followed sequentially by Padding, Border, and the outermost Margin" },
        { id: "web-beg-3-d", label: "D", text: "Padding on the inside, followed sequentially by Content, Margin, and the outer Border area" }
      ],
      correctOptionId: "web-beg-3-c",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "css-box-model",
      explanationAfterAnswer: "The CSS box model consists of Content (text/images) at the core, surrounded by Padding (clears area around content), surrounded by Border, surrounded by Margin (clears area outside border)."
    },
    {
      id: "web-beg-4",
      questionText: "What distinguishes localStorage from sessionStorage in client-side web storage APIs?",
      options: [
        { id: "web-beg-4-a", label: "A", text: "localStorage stores relational SQL databases, while sessionStorage stores unstructured binary files" },
        { id: "web-beg-4-b", label: "B", text: "localStorage is accessible by external third-party domains, while sessionStorage is restricted to origin URLs" },
        { id: "web-beg-4-c", label: "C", text: "localStorage encrypts stored string data with AES, while sessionStorage stores items in unencrypted memory" },
        { id: "web-beg-4-d", label: "D", text: "localStorage persists across browser restarts, while sessionStorage clears when the tab or session closes" }
      ],
      correctOptionId: "web-beg-4-d",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "local-vs-session-storage",
      explanationAfterAnswer: "localStorage has no expiration date and persists until explicitly cleared by user or script. sessionStorage is scoped to the browser tab lifecycle and is cleared when the tab or window closes."
    },
    {
      id: "web-beg-5",
      questionText: "What does the Single Responsibility Principle mean in modern frontend component architecture?",
      options: [
        { id: "web-beg-5-a", label: "A", text: "Every component should be encapsulated to perform one specific, well-defined functional or visual purpose" },
        { id: "web-beg-5-b", label: "B", text: "Every component must be contained in a single monolithic file alongside all global application styles" },
        { id: "web-beg-5-c", label: "C", text: "Every component must restrict all user interaction events to a single mouse click handler per render" },
        { id: "web-beg-5-d", label: "D", text: "Every component must be rendered exclusively by the server without any client hydration steps" }
      ],
      correctOptionId: "web-beg-5-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "component-single-responsibility",
      explanationAfterAnswer: "The Single Responsibility Principle dictates that a component should do one thing well (e.g. rendering a user badge, handling a search input), making it easier to test, maintain, and reuse across views."
    },
    {
      id: "web-beg-6",
      questionText: "A webpage's layout shifts unexpectedly as high-resolution images finish loading over slow networks. How should this be fixed?",
      options: [
        { id: "web-beg-6-a", label: "A", text: "Declare explicit width, height, or aspect-ratio attributes on img tags so the browser reserves layout space" },
        { id: "web-beg-6-b", label: "B", text: "Convert all images into base64 strings embedded directly inside client-side JavaScript bundle files" },
        { id: "web-beg-6-c", label: "C", text: "Configure the web server to disable gzip and brotli compression algorithms for static asset delivery" },
        { id: "web-beg-6-d", label: "D", text: "Set CSS position: fixed on all image elements to prevent rendering engines from calculating reflows" }
      ],
      correctOptionId: "web-beg-6-a",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "cls-image-dimensions",
      explanationAfterAnswer: "Cumulative Layout Shift (CLS) occurs when elements load and push existing content down. Providing explicit width/height or CSS aspect-ratio lets the browser allocate layout space before the image binary downloads."
    },
    {
      id: "web-beg-7",
      questionText: "Why should asynchronous network requests in JavaScript use async/await or Promises instead of synchronous XHR?",
      options: [
        { id: "web-beg-7-a", label: "A", text: "Synchronous requests block the main execution thread, freezing the UI and making the browser unresponsive" },
        { id: "web-beg-7-b", label: "B", text: "Synchronous requests automatically strip HTTP authorization headers before sending data to servers" },
        { id: "web-beg-7-c", label: "C", text: "Asynchronous requests bypass browser cross-origin security restrictions on external API endpoints" },
        { id: "web-beg-7-d", label: "D", text: "Asynchronous requests eliminate the mathematical requirement for TCP handshake negotiations" }
      ],
      correctOptionId: "web-beg-7-a",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "async-await-event-loop",
      explanationAfterAnswer: "JavaScript in browsers runs on a single main thread that manages rendering and user interaction. Synchronous network calls block this thread completely, freezing user scrolling, clicks, and animations."
    },
    {
      id: "web-beg-8",
      questionText: "What is the primary purpose of semantic HTML tags like <main>, <nav>, <header>, and <article>?",
      options: [
        { id: "web-beg-8-a", label: "A", text: "They compile client-side React code into native WebAssembly bytecode for faster browser execution" },
        { id: "web-beg-8-b", label: "B", text: "They convey structural meaning to assistive technologies (screen readers) and search engine crawlers" },
        { id: "web-beg-8-c", label: "C", text: "They enforce strict type checking on JavaScript variables declared within the enclosing element" },
        { id: "web-beg-8-d", label: "D", text: "They automatically apply responsive mobile CSS grid layouts without writing any custom stylesheets" }
      ],
      correctOptionId: "web-beg-8-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "semantic-html-accessibility",
      explanationAfterAnswer: "Semantic HTML elements communicate the role and structure of content to screen readers, accessible accessibility trees, and search engines, creating landmark regions that users can navigate easily."
    },
    {
      id: "web-beg-9",
      questionText: "A user submits an online form and immediately double-clicks the submit button, causing duplicate database records. How is this prevented?",
      options: [
        { id: "web-beg-9-a", label: "A", text: "Disable the submit button upon first click and implement backend request idempotency keys for submissions" },
        { id: "web-beg-9-b", label: "B", text: "Convert all form input field elements from text inputs into read-only paragraph tags upon focus" },
        { id: "web-beg-9-c", label: "C", text: "Configure the form to submit data exclusively using HTTP GET queries with random salt parameters" },
        { id: "web-beg-9-d", label: "D", text: "Clear the user's browser cache and reload the entire web page on every individual keystroke" }
      ],
      correctOptionId: "web-beg-9-a",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "form-submission-idempotency",
      explanationAfterAnswer: "Disabling the submit button on click prevents rapid UI clicks, while a server-side idempotency key ensures that even if duplicate HTTP packets arrive, the backend processes the mutation exactly once."
    },
    {
      id: "web-beg-10",
      questionText: "What is the function of the HTTP Status Code 401 Unauthorized versus 403 Forbidden?",
      options: [
        { id: "web-beg-10-a", label: "A", text: "401 indicates valid credentials but insufficient permissions, while 403 indicates missing authentication" },
        { id: "web-beg-10-b", label: "B", text: "401 indicates missing or invalid authentication credentials, while 403 indicates authenticated but access denied" },
        { id: "web-beg-10-c", label: "C", text: "401 indicates that the requested server route is missing, while 403 indicates a database query timeout" },
        { id: "web-beg-10-d", label: "D", text: "401 indicates that the client browser is unsupported, while 403 indicates that server CPU memory is exhausted" }
      ],
      correctOptionId: "web-beg-10-b",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "http-status-401-vs-403",
      explanationAfterAnswer: "401 Unauthorized means the request lacks valid authentication credentials (you must log in). 403 Forbidden means the server understands who you are, but you lack authorization to access the resource."
    }
  ],

  intermediate: [
    {
      id: "web-int-1",
      questionText: "How does the JavaScript Event Loop coordinate the execution of microtasks (Promises) versus macrotasks (setTimeout)?",
      options: [
        { id: "web-int-1-a", label: "A", text: "Microtasks execute after all pending macrotasks finish, right before the browser rendering frame begins" },
        { id: "web-int-1-b", label: "B", text: "The microtask queue is completely drained after each synchronous call stack completion before the next macrotask runs" },
        { id: "web-int-1-c", label: "C", text: "Macrotasks and microtasks execute concurrently on separate operating system background threads" },
        { id: "web-int-1-d", label: "D", text: "Microtasks are cancelled automatically if a new macrotask arrives in the queue within five milliseconds" }
      ],
      correctOptionId: "web-int-1-b",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "event-loop-microtasks",
      explanationAfterAnswer: "At the end of each task on the call stack, the JavaScript runtime completely exhausts the microtask queue (Promise callbacks, queueMicrotask, MutationObservers) before picking the next macrotask (setTimeout, I/O)."
    },
    {
      id: "web-int-2",
      questionText: "In React, what problem does the useCallback hook specifically solve?",
      options: [
        { id: "web-int-2-a", label: "A", text: "It memoizes heavy synchronous computational calculations to prevent them from executing on the main thread" },
        { id: "web-int-2-b", label: "B", text: "It memoizes a callback function definition between renders, maintaining reference equality for optimized child components" },
        { id: "web-int-2-c", label: "C", text: "It automatically captures unhandled JavaScript runtime exceptions thrown during component render lifecycles" },
        { id: "web-int-2-d", label: "D", text: "It converts client component state mutations into server actions executed directly on backend workers" }
      ],
      correctOptionId: "web-int-2-b",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "react-usecallback-memoization",
      explanationAfterAnswer: "In React, functions are recreated on every render. useCallback memoizes the function instance based on a dependency array, preserving reference equality (===) so that child components wrapped in React.memo skip unnecessary re-renders."
    },
    {
      id: "web-int-3",
      questionText: "What distinguishes Server-Side Rendering (SSR) from Static Site Generation (SSG) in frameworks like Next.js?",
      options: [
        { id: "web-int-3-a", label: "A", text: "SSR renders HTML dynamically on each user request, while SSG pre-renders HTML pages ahead of time at build time" },
        { id: "web-int-3-b", label: "B", text: "SSR is executed inside the user's browser, while SSG requires continuous Node.js server runtimes in production" },
        { id: "web-int-3-c", label: "C", text: "SSR eliminates the need for client hydration, while SSG requires downloading complete server database drivers" },
        { id: "web-int-3-d", label: "D", text: "SSR cannot fetch data from external REST APIs, while SSG dynamically connects to live WebSocket feeds" }
      ],
      correctOptionId: "web-int-3-a",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "ssr-vs-ssg-rendering",
      explanationAfterAnswer: "SSR generates HTML dynamically per request on the server (suitable for personalized, real-time data). SSG generates HTML once during compilation, allowing pages to be cached globally on CDNs for near-instant delivery."
    },
    {
      id: "web-int-4",
      questionText: "How does Cross-Origin Resource Sharing (CORS) evaluate whether a cross-origin HTTP request is permitted?",
      options: [
        { id: "web-int-4-a", label: "A", text: "The client browser verifies that the destination server IP address belongs to the same local subnet range" },
        { id: "web-int-4-b", label: "B", text: "The browser sends an OPTIONS preflight request to verify that server response headers allow the origin and method" },
        { id: "web-int-4-c", label: "C", text: "The operating system firewall inspects the application process signature against global DNS records" },
        { id: "web-int-4-d", label: "D", text: "The web server forces the connecting client browser to restart and clear all stored session cookies" }
      ],
      correctOptionId: "web-int-4-b",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "cors-preflight-mechanics",
      explanationAfterAnswer: "For non-simple requests, browsers dispatch an HTTP OPTIONS preflight call with Origin and Access-Control-Request-* headers. The browser checks if the server responds with Access-Control-Allow-Origin matching the calling domain before proceeding."
    },
    {
      id: "web-int-5",
      questionText: "An e-commerce search bar triggers an API call on every keystroke, causing severe backend query overload. What is the solution?",
      options: [
        { id: "web-int-5-a", label: "A", text: "Implement a debounce function that waits for the user to pause typing before dispatching the network request" },
        { id: "web-int-5-b", label: "B", text: "Convert all search queries into synchronous XMLHttpRequest calls executed directly on the main thread" },
        { id: "web-int-5-c", label: "C", text: "Store the entire product catalog database in the user's browser cookie storage header partition" },
        { id: "web-int-5-d", label: "D", text: "Disable browser JavaScript and force the search input to submit a standard multi-part form post" }
      ],
      correctOptionId: "web-int-5-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "debounce-vs-throttle",
      explanationAfterAnswer: "Debouncing delays the function execution until a specified delay has elapsed since the last event (e.g. 300ms after user stops typing). This collapses 20 rapid keystrokes into a single optimized network query."
    },
    {
      id: "web-int-6",
      questionText: "What role does optimistic UI update play in modern full-stack web applications?",
      options: [
        { id: "web-int-6-a", label: "A", text: "It updates the client interface immediately assuming the mutation succeeds, rolling back if the server fails" },
        { id: "web-int-6-b", label: "B", text: "It caches all user modifications on the server for twenty-four hours before committing them to the database" },
        { id: "web-int-6-c", label: "C", text: "It converts frontend state changes into binary WebAssembly instructions to bypass network validation" },
        { id: "web-int-6-d", label: "D", text: "It forces the client browser to refresh the entire webpage immediately following every user interaction" }
      ],
      correctOptionId: "web-int-6-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "optimistic-ui-updates",
      explanationAfterAnswer: "Optimistic updates immediately render expected state changes in the UI (e.g. toggling a 'like' button) without waiting for server round-trip latency, rolling back to the previous state with a notification if the network request errors."
    },
    {
      id: "web-int-7",
      questionText: "How does code splitting improve the Initial Page Load performance of a large web application?",
      options: [
        { id: "web-int-7-a", label: "A", text: "It breaks the bundle into smaller chunks loaded on demand, reducing the initial JavaScript parsed by the browser" },
        { id: "web-int-7-b", label: "B", text: "It minifies HTML whitespace so that CSS files are executed directly by the operating system kernel" },
        { id: "web-int-7-c", label: "C", text: "It replaces all external library dependencies with native browser DOM manipulation equivalents" },
        { id: "web-int-7-d", label: "D", text: "It splits database queries across multiple relational tables during server-side template compilation" }
      ],
      correctOptionId: "web-int-7-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "code-splitting-bundlers",
      explanationAfterAnswer: "Rather than shipping a monolithic multi-megabyte bundle, bundlers split code by route or dynamic import (React.lazy), loading only the JavaScript required for the initial route and fetching other chunks lazily."
    },
    {
      id: "web-int-8",
      questionText: "Why is setting 'HttpOnly' and 'SameSite=Lax' flags on session cookies considered standard security practice?",
      options: [
        { id: "web-int-8-a", label: "A", text: "HttpOnly blocks client-side script access mitigating XSS theft, while SameSite restricts cross-site CSRF delivery" },
        { id: "web-int-8-b", label: "B", text: "HttpOnly compresses cookie data using gzip, while SameSite encrypts cookies with local public key certificates" },
        { id: "web-int-8-c", label: "C", text: "HttpOnly forces the browser to delete session cookies after sixty seconds of inactivity across user tabs" },
        { id: "web-int-8-d", label: "D", text: "HttpOnly restricts cookie transmission exclusively to internal private subnets without public internet access" }
      ],
      correctOptionId: "web-int-8-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "cookie-security-flags",
      explanationAfterAnswer: "HttpOnly prevents document.cookie access from JavaScript, thwarting cookie theft via XSS. SameSite=Lax/Strict prevents the browser from sending the cookie in cross-site requests, mitigating CSRF attacks."
    },
    {
      id: "web-int-9",
      questionText: "What problem occurs when multiple clients update the same database record simultaneously without concurrency controls?",
      options: [
        { id: "web-int-9-a", label: "A", text: "The Lost Update anomaly, where the later write unintentionally overwrites changes committed by the earlier write" },
        { id: "web-int-9-b", label: "B", text: "The database server immediately terminates all client TCP sockets and triggers automatic index rebuilds" },
        { id: "web-int-9-c", label: "C", text: "The operating system converts the relational database tables into uncompressed plain text CSV archives" },
        { id: "web-int-9-d", label: "D", text: "All future client read queries on that table return HTTP 404 Not Found status errors indefinitely" }
      ],
      correctOptionId: "web-int-9-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "lost-update-concurrency",
      explanationAfterAnswer: "In a lost update, Client A and Client B read state X simultaneously. Client A updates X and saves. Client B updates X based on the original read and saves, silently overwriting A's modifications without knowing. Optimistic concurrency (version checks) resolves this."
    },
    {
      id: "web-int-10",
      questionText: "How does the browser's Service Worker API enable Progressive Web App (PWA) offline capability?",
      options: [
        { id: "web-int-10-a", label: "A", text: "By acting as a client-side network proxy that intercepts fetch requests and serves cached responses from CacheStorage" },
        { id: "web-int-10-b", label: "B", text: "By embedding a lightweight headless relational database inside the browser's GPU rendering pipeline" },
        { id: "web-int-10-c", label: "C", text: "By generating synthetic Wi-Fi connections that simulate internet availability using cellular radio hardware" },
        { id: "web-int-10-d", label: "D", text: "By compiling web application TypeScript files into native mobile Android APK files in the background" }
      ],
      correctOptionId: "web-int-10-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "service-worker-cache-storage",
      explanationAfterAnswer: "Service Workers run in a background thread and intercept network fetch events. When offline, the worker intercepts requests and returns matching cached responses from the CacheStorage API, enabling full offline operation."
    }
  ],

  advanced: [
    {
      id: "web-adv-1",
      questionText: "How does React 18 Concurrent Rendering with Fiber avoid blocking the main thread during heavy component tree updates?",
      options: [
        { id: "web-adv-1-a", label: "A", text: "By breaking rendering work into interruptible units of work, yielding to browser frame tasks via scheduler deadlines" },
        { id: "web-adv-1-b", label: "B", text: "By delegating virtual DOM tree reconciliation to background Web Workers running in separate browser processes" },
        { id: "web-adv-1-c", label: "C", text: "By compiling React JSX code into low-level machine code using ahead-of-time WebAssembly compiler passes" },
        { id: "web-adv-1-d", label: "D", text: "By disabling all state updates until the user stops interacting with the web page for several seconds" }
      ],
      correctOptionId: "web-adv-1-a",
      difficulty: "advanced",
      complexity: "fundamental",
      conceptTag: "react-fiber-concurrent-rendering",
      explanationAfterAnswer: "React Fiber structures the component tree as a linked list of fiber nodes. In Concurrent Mode, the scheduler can pause a low-priority render to yield execution back to the browser for user input or animation, then resume where it left off."
    },
    {
      id: "web-adv-2",
      questionText: "In distributed web architectures, how does the CRDT (Conflict-free Replicated Data Type) model achieve collaborative editing?",
      options: [
        { id: "web-adv-2-a", label: "A", text: "By requiring all clients to acquire a distributed mutex lock from a central Redis server before typing each character" },
        { id: "web-adv-2-b", label: "B", text: "By designing data structures whose operations commute mathematically, allowing replicas to converge without central coordination" },
        { id: "web-adv-2-c", label: "C", text: "By overwriting the entire document state with whichever client possesses the lowest latency ping to the web gateway" },
        { id: "web-adv-2-d", label: "D", text: "By converting collaborative text operations into sequential SQL update statements executed inside serializable transactions" }
      ],
      correctOptionId: "web-adv-2-b",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "crdt-collaborative-editing",
      explanationAfterAnswer: "CRDTs (like Yjs or Automerge) use mathematical structures where concurrent operations can be merged in any order (associative, commutative, idempotent) while guaranteeing that all replicas reach identical states without central coordination."
    },
    {
      id: "web-adv-3",
      questionText: "What vulnerability occurs when an application parses untrusted JSON into objects that pollute the JavaScript prototype chain?",
      options: [
        { id: "web-adv-3-a", label: "A", text: "Prototype Pollution, where injected properties modify Object.prototype, altering property resolution across all objects" },
        { id: "web-adv-3-b", label: "B", text: "Buffer Overflow, where extra JSON keys overwrite the execution instruction pointer in the V8 virtual machine" },
        { id: "web-adv-3-c", label: "C", text: "Heap Spraying, where malicious JSON tokens consume all available operating system physical RAM memory" },
        { id: "web-adv-3-d", label: "D", text: "Type Confusion, where string variables are dynamically coerced into native kernel file descriptor handles" }
      ],
      correctOptionId: "web-adv-3-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "prototype-pollution-vulnerability",
      explanationAfterAnswer: "If recursive object merge functions fail to sanitize keys like '__proto__' or 'constructor.prototype', an attacker can inject properties onto Object.prototype. This affects all objects in the runtime, often leading to auth bypass or RCE."
    },
    {
      id: "web-adv-4",
      questionText: "How does the Server-Sent Events (SSE) protocol differ fundamentally from WebSockets for server-to-client updates?",
      options: [
        { id: "web-adv-4-a", label: "A", text: "SSE provides unidirectional streaming over standard HTTP with built-in reconnection, whereas WebSockets provide full-duplex TCP framing" },
        { id: "web-adv-4-b", label: "B", text: "SSE is mathematically restricted to binary data frames, while WebSockets can only transmit unencrypted plain text strings" },
        { id: "web-adv-4-c", label: "C", text: "SSE requires custom browser plugins to execute, while WebSockets are natively supported by all modern web rendering engines" },
        { id: "web-adv-4-d", label: "D", text: "SSE terminates connections after each message, while WebSockets maintain persistent connections for twenty-four hours" }
      ],
      correctOptionId: "web-adv-4-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "sse-vs-websockets",
      explanationAfterAnswer: "SSE runs over standard HTTP/1.1 or HTTP/2, streaming text events unidirectionally from server to client with native browser reconnection and event IDs. WebSockets upgrade the connection to a custom full-duplex protocol over TCP."
    },
    {
      id: "web-adv-5",
      questionText: "Why does the React Server Components (RSC) paradigm represent a fundamental shift in client bundle economics?",
      options: [
        { id: "web-adv-5-a", label: "A", text: "Server components execute exclusively on the server, streaming a virtual DOM representation without adding their dependencies to client bundles" },
        { id: "web-adv-5-b", label: "B", text: "Server components compile React code into native WebAssembly modules that execute directly inside operating system kernels" },
        { id: "web-adv-5-c", label: "C", text: "Server components eliminate the need for relational databases by storing all application state in browser session cookies" },
        { id: "web-adv-5-d", label: "D", text: "Server components convert dynamic web pages into static PDF documents that are downloaded by the client browser" }
      ],
      correctOptionId: "web-adv-5-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "rsc-bundle-architecture",
      explanationAfterAnswer: "RSCs run only on the server, accessing databases/filesystems directly. They render to a streamable JSON-like UI tree format (RSC payload). Their heavy npm dependencies never ship to the client, keeping bundle sizes zero for those parts."
    },
    {
      id: "web-adv-6",
      questionText: "In high-performance web animations, why should transforms and opacity be animated rather than width, height, or top/left?",
      options: [
        { id: "web-adv-6-a", label: "A", text: "Transform and opacity bypass layout reflow and repaint passes, executing compositing directly on the GPU" },
        { id: "web-adv-6-b", label: "B", text: "Width and height properties automatically disable browser hardware acceleration for all DOM elements on the page" },
        { id: "web-adv-6-c", label: "C", text: "Transform properties force the browser to convert HTML elements into static SVG images before rendering" },
        { id: "web-adv-6-d", label: "D", text: "Top and left properties trigger synchronous database transactions that block the main JavaScript execution thread" }
      ],
      correctOptionId: "web-adv-6-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "composite-only-animations-gpu",
      explanationAfterAnswer: "Mutating width/height/top triggers the browser's layout (reflow) and paint pipelines on the CPU. Transforms and opacity promote the element to its own compositor layer on the GPU, allowing smooth 60/120fps animations without reflow."
    },
    {
      id: "web-adv-7",
      questionText: "What mechanism does the WebAuthn API utilize to provide phishing-resistant authentication for web applications?",
      options: [
        { id: "web-adv-7-a", label: "A", text: "It uses asymmetric key pairs scoped to the origin domain, signed by hardware authenticators during registration and login" },
        { id: "web-adv-7-b", label: "B", text: "It sends a six-digit verification code via SMS to the user's registered mobile phone number upon every login attempt" },
        { id: "web-adv-7-c", label: "C", text: "It captures high-resolution webcam photos of the user and verifies facial features using client-side neural networks" },
        { id: "web-adv-7-d", label: "D", text: "It stores master passwords in encrypted browser cookies that are automatically submitted with all HTTP requests" }
      ],
      correctOptionId: "web-adv-7-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "webauthn-phishing-resistance",
      explanationAfterAnswer: "WebAuthn uses public key cryptography tied to a specific relying party ID (origin domain). During authentication, the hardware authenticator signs a challenge using the private key matching that exact domain, making phishing mathematically impossible."
    },
    {
      id: "web-adv-8",
      questionText: "How does Cache-Control: stale-while-revalidate optimize user experience while keeping content fresh?",
      options: [
        { id: "web-adv-8-a", label: "A", text: "The browser serves stale cached content immediately while asynchronously fetching and updating the cache in the background" },
        { id: "web-adv-8-b", label: "B", text: "The browser forces the server to recompute database queries whenever a user scrolls down the webpage" },
        { id: "web-adv-8-c", label: "C", text: "The browser deletes all local storage caches if the user does not visit the website for more than seven days" },
        { id: "web-adv-8-d", label: "D", text: "The server rejects all subsequent client requests until the background cache validation process completes" }
      ],
      correctOptionId: "web-adv-8-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "stale-while-revalidate-caching",
      explanationAfterAnswer: "stale-while-revalidate tells clients/CDNs: 'If the resource is stale but within the revalidation window, serve the stale version instantly (zero latency) and trigger a background network fetch to revalidate and update the cache for next time.'"
    },
    {
      id: "web-adv-9",
      questionText: "In database isolation levels, what concurrency phenomenon does 'Snapshot Isolation' eliminate compared to 'Read Committed'?",
      options: [
        { id: "web-adv-9-a", label: "A", text: "Non-Repeatable Reads, by providing transactions with a consistent snapshot of data as of the transaction start time" },
        { id: "web-adv-9-b", label: "B", text: "Deadlocks, by forcing all database transactions to execute sequentially in single-threaded lockstep" },
        { id: "web-adv-9-c", label: "C", text: "Disk space fragmentation, by compressing database index files into read-only binary archives" },
        { id: "web-adv-9-d", label: "D", text: "Network latency, by replicating database tables directly into client browser memory partitions" }
      ],
      correctOptionId: "web-adv-9-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "snapshot-isolation-mvcc",
      explanationAfterAnswer: "Under Read Committed, re-reading a row mid-transaction can return different values if another transaction committed changes (Non-Repeatable Read). Snapshot Isolation uses MVCC to ensure all reads see a consistent snapshot from the transaction's start."
    },
    {
      id: "web-adv-10",
      questionText: "How does HTTP/3 with QUIC eliminate the Head-of-Line (HoL) blocking issue present in HTTP/2?",
      options: [
        { id: "web-adv-10-a", label: "A", text: "By multiplexing streams over UDP with independent packet loss recovery per stream instead of a single shared TCP stream" },
        { id: "web-adv-10-b", label: "B", text: "By requiring web servers to cache all website assets in local browser memory before accepting connections" },
        { id: "web-adv-10-c", label: "C", text: "By establishing separate physical fiber optic connections for every individual image loaded by the webpage" },
        { id: "web-adv-10-d", label: "D", text: "By compressing all HTTP request headers into fixed-size 32-bit integer binary identifiers" }
      ],
      correctOptionId: "web-adv-10-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "quic-http3-hol-blocking",
      explanationAfterAnswer: "HTTP/2 multiplexes streams over a single TCP connection; a single lost packet stalls the entire TCP window across all streams. HTTP/3 runs over QUIC (UDP), so packet loss on one stream only pauses that individual stream while others continue unimpeded."
    }
  ]
};
