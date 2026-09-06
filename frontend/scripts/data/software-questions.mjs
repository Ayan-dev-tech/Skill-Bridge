export const softwareQuestions = {
  beginner: [
    {
      id: "soft-beg-1",
      questionText: "What is the time complexity of searching for an element in an unsorted array of size N?",
      options: [
        { id: "soft-beg-1-a", label: "A", text: "O(1) constant time, because direct index lookups retrieve elements instantly regardless of array size" },
        { id: "soft-beg-1-b", label: "B", text: "O(N) linear time, because in the worst case every element must be inspected sequentially from start to end" },
        { id: "soft-beg-1-c", label: "C", text: "O(log N) logarithmic time, because the search space can be repeatedly halved using binary comparisons" },
        { id: "soft-beg-1-d", label: "D", text: "O(N^2) quadratic time, because comparing array elements requires nested loop iterations across all pairs" }
      ],
      correctOptionId: "soft-beg-1-b",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "array-linear-search-complexity",
      explanationAfterAnswer: "In an unsorted array, there is no ordering to guide searches. Finding a specific element requires checking each position sequentially, leading to O(N) worst-case time complexity."
    },
    {
      id: "soft-beg-2",
      questionText: "What distinguishes a Stack from a Queue in fundamental computer science data structures?",
      options: [
        { id: "soft-beg-2-a", label: "A", text: "A Stack stores floating-point numbers in memory, while a Queue stores character string objects" },
        { id: "soft-beg-2-b", label: "B", text: "A Stack follows Last-In-First-Out (LIFO) order, while a Queue follows First-In-First-Out (FIFO) order" },
        { id: "soft-beg-2-c", label: "C", text: "A Stack requires continuous heap memory allocation, while a Queue operates exclusively on disk storage" },
        { id: "soft-beg-2-d", label: "D", text: "A Stack permits random access by integer index, while a Queue requires hash table key lookups" }
      ],
      correctOptionId: "soft-beg-2-b",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "stack-vs-queue-ordering",
      explanationAfterAnswer: "A Stack inserts and removes items from the same end (LIFO - like a stack of plates). A Queue inserts items at the back and removes them from the front (FIFO - like a line of people waiting)."
    },
    {
      id: "soft-beg-3",
      questionText: "What is the primary function of an operating system kernel?",
      options: [
        { id: "soft-beg-3-a", label: "A", text: "To compile application source code into executable binary packages during software installation" },
        { id: "soft-beg-3-b", label: "B", text: "To render graphical desktop windows, mouse pointers, and desktop background wallpapers" },
        { id: "soft-beg-3-c", label: "C", text: "To manage core hardware resources including CPU scheduling, memory allocation, and device I/O" },
        { id: "soft-beg-3-d", label: "D", text: "To automatically download and install web browser security extensions from public software stores" }
      ],
      correctOptionId: "soft-beg-3-c",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "os-kernel-responsibilities",
      explanationAfterAnswer: "The kernel is the core of the operating system that has complete control over everything in the system, managing hardware resources (CPU, RAM, block storage, peripherals) and mediating software access via system calls."
    },
    {
      id: "soft-beg-4",
      questionText: "In object-oriented programming, what does the concept of Encapsulation achieve?",
      options: [
        { id: "soft-beg-4-a", label: "A", text: "Bundling data and methods within an object while hiding internal implementation details from external access" },
        { id: "soft-beg-4-b", label: "B", text: "Allowing a single child class to inherit property definitions simultaneously from multiple parent classes" },
        { id: "soft-beg-4-c", label: "C", text: "Automatically compiling source code into multiple distinct native operating system executable formats" },
        { id: "soft-beg-4-d", label: "D", text: "Converting runtime memory data structures into static JSON files saved on persistent local hard drives" }
      ],
      correctOptionId: "soft-beg-4-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "oop-encapsulation-principle",
      explanationAfterAnswer: "Encapsulation binds data and the methods that manipulate that data into a cohesive unit (class) while restricting direct external access to internal state, exposing only controlled public interfaces."
    },
    {
      id: "soft-beg-5",
      questionText: "What is the primary operational purpose of unit testing in software development?",
      options: [
        { id: "soft-beg-5-a", label: "A", text: "To test individual isolated functions or modules in isolation to ensure they produce expected outputs" },
        { id: "soft-beg-5-b", label: "B", text: "To measure how many concurrent user requests a production database server can support before failure" },
        { id: "soft-beg-5-c", label: "C", text: "To deploy compiled application binaries to cloud staging environments across multiple availability zones" },
        { id: "soft-beg-5-d", label: "D", text: "To generate user documentation and API release notes automatically from database commit histories" }
      ],
      correctOptionId: "soft-beg-5-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "unit-testing-fundamentals",
      explanationAfterAnswer: "Unit testing verifies that small, isolated pieces of code (functions, methods) work correctly given defined inputs, catching regressions early in development before integration."
    },
    {
      id: "soft-beg-6",
      questionText: "A program enters an infinite recursion loop without a valid base case. What runtime error occurs?",
      options: [
        { id: "soft-beg-6-a", label: "A", text: "A Stack Overflow error, because recursive function call frames exhaust the allocated thread call stack memory" },
        { id: "soft-beg-6-b", label: "B", text: "A Segmentation Fault, caused by physical memory chips overheating due to excessive mathematical calculations" },
        { id: "soft-beg-6-c", label: "C", text: "A Deadlock exception, because two background threads acquire mutual exclusion locks in conflicting order" },
        { id: "soft-beg-6-d", label: "D", text: "A Null Pointer Dereference, because the operating system deletes unreferenced variables from heap storage" }
      ],
      correctOptionId: "soft-beg-6-a",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "recursion-stack-overflow",
      explanationAfterAnswer: "Each recursive call pushes a new stack frame (return address, arguments, local variables) onto the execution stack. Without a terminating base case, the stack exceeds its allocated memory limit, triggering a stack overflow."
    },
    {
      id: "soft-beg-7",
      questionText: "Why do relational databases create B-Tree indexes on frequently queried table columns?",
      options: [
        { id: "soft-beg-7-a", label: "A", text: "To compress character string fields into binary format to minimize total hard drive storage usage" },
        { id: "soft-beg-7-b", label: "B", text: "To allow the query optimizer to locate rows in logarithmic time O(log N) rather than scanning the full table" },
        { id: "soft-beg-7-c", label: "C", text: "To eliminate the need for primary key constraints and unique index definitions across related tables" },
        { id: "soft-beg-7-d", label: "D", text: "To automatically convert unstructured JSON payloads into normalized third normal form relations" }
      ],
      correctOptionId: "soft-beg-7-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "database-btree-indexes",
      explanationAfterAnswer: "B-Tree indexes maintain sorted balanced trees of keys and row pointers, allowing search, range queries, and ordering in O(log N) disk reads, avoiding expensive O(N) full table scans."
    },
    {
      id: "soft-beg-8",
      questionText: "In version control with Git, what is the effect of running `git checkout -b feature/login`?",
      options: [
        { id: "soft-beg-8-a", label: "A", text: "It deletes the remote feature branch and reverts local tracked files to the previous commit state" },
        { id: "soft-beg-8-b", label: "B", text: "It creates a new branch named 'feature/login' and immediately switches your working directory to it" },
        { id: "soft-beg-8-c", label: "C", text: "It merges all commits from the 'feature/login' branch into the main production branch automatically" },
        { id: "soft-beg-8-d", label: "D", text: "It pushes all uncommitted local code changes directly to the remote repository on the central server" }
      ],
      correctOptionId: "soft-beg-8-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "git-branching-workflow",
      explanationAfterAnswer: "The `-b` flag tells Git to create a new branch with the specified name and immediately switch the HEAD pointer and working tree to point to this new branch."
    },
    {
      id: "soft-beg-9",
      questionText: "A sorting algorithm must guarantee stable sorting of records with identical keys. Which algorithm is naturally stable?",
      options: [
        { id: "soft-beg-9-a", label: "A", text: "Merge Sort, which preserves the relative original input order of elements with equal key values" },
        { id: "soft-beg-9-b", label: "B", text: "Heap Sort, which organizes array values into binary max-heaps using non-adjacent element swaps" },
        { id: "soft-beg-9-c", label: "C", text: "Quick Sort with in-place Lomuto partitioning, which swaps distant elements across pivot values" },
        { id: "soft-beg-9-d", label: "D", text: "Selection Sort, which iteratively finds the minimum element and swaps it with the current position" }
      ],
      correctOptionId: "soft-beg-9-a",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "sorting-algorithm-stability",
      explanationAfterAnswer: "A sorting algorithm is stable if it preserves the original relative order of records with equal keys. Merge Sort divides and merges subarrays while carefully prioritizing elements from the left subarray when keys match, preserving stability."
    },
    {
      id: "soft-beg-10",
      questionText: "What is the primary memory management difference between Stack memory and Heap memory in compiled languages (e.g. C/Rust)?",
      options: [
        { id: "soft-beg-10-a", label: "A", text: "Stack memory stores global shared databases, while Heap memory stores local CPU instruction registers" },
        { id: "soft-beg-10-b", label: "B", text: "Stack allocations are fast and automatically freed on function return, while Heap allocations are dynamic and persistent" },
        { id: "soft-beg-10-c", label: "C", text: "Stack memory is stored on external persistent solid-state drives, while Heap memory resides in L1 cache" },
        { id: "soft-beg-10-d", label: "D", text: "Stack memory allows arbitrary runtime resizing of arrays, while Heap memory requires fixed compile-time sizes" }
      ],
      correctOptionId: "soft-beg-10-b",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "stack-vs-heap-memory",
      explanationAfterAnswer: "Stack memory is managed automatically by the CPU call stack; variables are pushed on function call and popped on return (very fast). Heap memory is allocated dynamically at runtime (malloc/new) and persists until explicitly freed or garbage-collected."
    }
  ],

  intermediate: [
    {
      id: "soft-int-1",
      questionText: "How does a Hash Table achieve average-case O(1) time complexity for key lookup operations?",
      options: [
        { id: "soft-int-1-a", label: "A", text: "By sorting all key-value entries sequentially in memory and performing binary searches on each request" },
        { id: "soft-int-1-b", label: "B", text: "By using a hash function to map keys to numerical array indices, allowing direct bucket memory access" },
        { id: "soft-int-1-c", label: "C", text: "By compressing key strings into 8-bit binary masks that are evaluated simultaneously by SIMD CPU registers" },
        { id: "soft-int-1-d", label: "D", text: "By storing data in balanced red-black binary search trees that self-rebalance after each read mutation" }
      ],
      correctOptionId: "soft-int-1-b",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "hash-table-mechanics",
      explanationAfterAnswer: "A hash function computes an integer hash code from the key, which is modulated to an array bucket index. Under a good hash distribution and low load factor, this allows direct array indexing in O(1) average time."
    },
    {
      id: "soft-int-2",
      questionText: "In concurrent programming, what is a 'Race Condition' and how does it compromise software correctness?",
      options: [
        { id: "soft-int-2-a", label: "A", text: "A condition where two threads execute identical calculations simultaneously, wasting CPU cycles unnecessarily" },
        { id: "soft-int-2-b", label: "B", text: "A condition where software execution speed is restricted by the read latency of mechanical hard drive disks" },
        { id: "soft-int-2-c", label: "C", text: "A condition where output depends on non-deterministic timing of concurrent threads accessing shared mutable state" },
        { id: "soft-int-2-d", label: "D", text: "A condition where network latency between microservices exceeds the timeout threshold of the load balancer" }
      ],
      correctOptionId: "soft-int-2-c",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "race-condition-concurrency",
      explanationAfterAnswer: "A race condition occurs when multiple threads concurrently read and write shared data without synchronization, causing the final program state to depend unpredictably on thread scheduling."
    },
    {
      id: "soft-int-3",
      questionText: "What distinguishes a process from a thread in modern multitasking operating systems?",
      options: [
        { id: "soft-int-3-a", label: "A", text: "Processes have isolated virtual memory address spaces, while threads within a process share the same address space" },
        { id: "soft-int-3-b", label: "B", text: "Processes execute on graphics processing units, while threads execute exclusively on central processing unit cores" },
        { id: "soft-int-3-c", label: "C", text: "Processes are managed entirely by application code, while threads require dedicated kernel hypervisor runtimes" },
        { id: "soft-int-3-d", label: "D", text: "Processes cannot communicate over networks, while threads possess built-in TCP/IP socket protocol stacks" }
      ],
      correctOptionId: "soft-int-3-a",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "process-vs-thread-memory",
      explanationAfterAnswer: "A process is an execution unit with its own private address space, file descriptors, and security context. Threads are lightweight execution units within a process that share code, heap memory, and global variables, but have distinct call stacks."
    },
    {
      id: "soft-int-4",
      questionText: "A service experiences a memory leak where memory usage grows continuously until the OS kills it. How is this diagnosed?",
      options: [
        { id: "soft-int-4-a", label: "A", text: "Inspect memory heap snapshots using a profiler to identify uncollected objects retained by active references" },
        { id: "soft-int-4-b", label: "B", text: "Increase the swap partition size on the disk so that leaking allocations never exhaust physical system RAM" },
        { id: "soft-int-4-c", label: "C", text: "Restart the application server container every fifteen minutes using an automated cron background job" },
        { id: "soft-int-4-d", label: "D", text: "Convert all relational database table schemas from InnoDB into MyISAM to eliminate foreign key overhead" }
      ],
      correctOptionId: "soft-int-4-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "memory-leak-profiling",
      explanationAfterAnswer: "Memory leaks occur when allocated objects that are no longer needed remain reachable from GC roots (event listeners, caches, closures). Heap dumps and memory profilers capture object retention paths to isolate the leak."
    },
    {
      id: "soft-int-5",
      questionText: "In API design, what does 'Idempotence' mean and why is it critical for distributed network calls?",
      options: [
        { id: "soft-int-5-a", label: "A", text: "The API endpoint encrypts all payload bodies using symmetric keys before sending responses across network routes" },
        { id: "soft-int-5-b", label: "B", text: "Making the same request multiple times produces the same system state as making it once, making retries safe" },
        { id: "soft-int-5-c", label: "C", text: "The API endpoint automatically translates incoming JSON payloads into binary protocol buffer representations" },
        { id: "soft-int-5-d", label: "D", text: "The API endpoint processes requests in constant time O(1) regardless of the size of the request body payload" }
      ],
      correctOptionId: "soft-int-5-b",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "idempotency-distributed-systems",
      explanationAfterAnswer: "An operation is idempotent if f(f(x)) = f(x). In networks where timeouts occur, clients can safely retry idempotent requests (such as HTTP PUT, DELETE, or payments with idempotency keys) without risking duplicate processing."
    },
    {
      id: "soft-int-6",
      questionText: "What problem does the Dependency Injection design pattern solve in modular software systems?",
      options: [
        { id: "soft-beg-6-a", label: "A", text: "It decouples components by passing dependencies from the outside rather than hardcoding them inside classes" },
        { id: "soft-beg-6-b", label: "B", text: "It compresses compiled binary executable files to minimize memory consumption during cold application starts" },
        { id: "soft-beg-6-c", label: "C", text: "It replaces asynchronous Promise calls with synchronous blocking routines to prevent thread context switching" },
        { id: "soft-beg-6-d", label: "D", text: "It prevents database deadlocks by forcing all SQL queries to execute within a single global transaction lock" }
      ],
      correctOptionId: "soft-beg-6-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "dependency-injection-decoupling",
      explanationAfterAnswer: "Dependency Injection inverts control: objects receive their dependencies (e.g. database client, logger) via constructors or setters, making classes decoupled, testable with mocks, and easily configurable."
    },
    {
      id: "soft-int-7",
      questionText: "How does a thread-safe Read-Write Lock (RWLock) improve concurrent throughput over a mutual exclusion lock (Mutex)?",
      options: [
        { id: "soft-int-7-a", label: "A", text: "By allowing multiple reader threads to access shared state concurrently while requiring exclusive access for writers" },
        { id: "soft-int-7-b", label: "B", text: "By converting all write operations into asynchronous background thread execution passes without blocking" },
        { id: "soft-int-7-c", label: "C", text: "By caching shared state variables in CPU L1 hardware registers to eliminate physical memory reads" },
        { id: "soft-int-7-d", label: "D", text: "By eliminating the requirement for lock acquisition when running on multi-core operating system platforms" }
      ],
      correctOptionId: "soft-int-7-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "read-write-locks-concurrency",
      explanationAfterAnswer: "A standard mutex allows only one thread at a time, serializing reads. An RWLock allows arbitrary numbers of reader threads to access data simultaneously, acquiring an exclusive lock only when a thread needs to mutate data."
    },
    {
      id: "soft-int-8",
      questionText: "What is the primary architectural difference between REST and gRPC for inter-service communication?",
      options: [
        { id: "soft-int-8-a", label: "A", text: "REST uses text-based JSON over HTTP/1.1, while gRPC uses binary Protocol Buffers over HTTP/2 with strong contracts" },
        { id: "soft-int-8-b", label: "B", text: "REST requires dedicated UDP transport protocols, while gRPC communicates exclusively over unencrypted websockets" },
        { id: "soft-int-8-c", label: "C", text: "REST is restricted to internal microservices, while gRPC is designed strictly for public browser client interfaces" },
        { id: "soft-int-8-d", label: "D", text: "REST enforces strict compile-time type validation, while gRPC operates without any schema definitions" }
      ],
      correctOptionId: "soft-int-8-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "grpc-vs-rest-protocols",
      explanationAfterAnswer: "REST typically sends human-readable JSON payloads over HTTP/1.1. gRPC uses HTTP/2 multiplexing, binary serialization via Protocol Buffers (.proto), and code-generated typed stubs, delivering higher throughput and lower serialization overhead."
    },
    {
      id: "soft-int-9",
      questionText: "How does copy-on-write (COW) optimization improve the efficiency of the `fork()` system call in Unix/Linux?",
      options: [
        { id: "soft-int-9-a", label: "A", text: "By sharing memory pages read-only between parent and child until one process modifies a page, avoiding full copies" },
        { id: "soft-int-9-b", label: "B", text: "By compressing all child process memory allocations into swap partitions on local solid-state drives" },
        { id: "soft-int-9-c", label: "C", text: "By compiling the child process source code directly into kernel machine bytecode during the call" },
        { id: "soft-int-9-d", label: "D", text: "By terminating the parent process immediately so that the child can inherit all physical memory hardware" }
      ],
      correctOptionId: "soft-int-9-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "fork-copy-on-write-os",
      explanationAfterAnswer: "Copy-on-write duplicates page tables, pointing both parent and child to the same physical memory pages marked read-only. Only when either process writes to a page does the MMU trap, allocating a new physical copy of that specific page."
    },
    {
      id: "soft-int-10",
      questionText: "What condition is required to produce a Deadlock in a multi-threaded application (Coffman conditions)?",
      options: [
        { id: "soft-int-10-a", label: "A", text: "Mutual exclusion, hold and wait, no preemption, and circular wait existing simultaneously among threads" },
        { id: "soft-int-10-b", label: "B", text: "A single thread running in an infinite loop while holding a lock on an uninitialized memory pointer" },
        { id: "soft-int-10-c", label: "C", text: "Two threads attempting to read from the same database table using unindexed sequential select queries" },
        { id: "soft-int-10-d", label: "D", text: "A worker thread exceeding its maximum allocated stack memory limit while processing a recursive calculation" }
      ],
      correctOptionId: "soft-int-10-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "deadlock-coffman-conditions",
      explanationAfterAnswer: "A deadlock can occur if and only if all four Coffman conditions hold: Mutual Exclusion (exclusive resource hold), Hold and Wait (holding while waiting for others), No Preemption (resources cannot be forcibly confiscated), and Circular Wait."
    }
  ],

  advanced: [
    {
      id: "soft-adv-1",
      questionText: "In high-performance systems programming, what is False Sharing in multi-core CPU architectures and how is it resolved?",
      options: [
        { id: "soft-adv-1-a", label: "A", text: "Independent variables on the same cache line modified by different cores invalidate each other's L1 cache; pad to cache line" },
        { id: "soft-adv-1-b", label: "B", text: "Two threads attempting to read from the same socket file descriptor; resolve by creating duplicate network sockets" },
        { id: "soft-adv-1-c", label: "C", text: "Virtual memory page tables overlapping in physical RAM; resolve by disabling kernel address space layout randomization" },
        { id: "soft-adv-1-d", label: "D", text: "Operating system processes sharing environment variables; resolve by compiling binaries with static runtime libraries" }
      ],
      correctOptionId: "soft-adv-1-a",
      difficulty: "advanced",
      complexity: "fundamental",
      conceptTag: "false-sharing-cache-lines",
      explanationAfterAnswer: "False sharing occurs when threads on different cores modify independent variables that reside within the same 64-byte cache line. Cache coherency protocols (MESI) repeatedly invalidate the cache line across cores. Aligning/padding data to 64 bytes eliminates this."
    },
    {
      id: "soft-adv-2",
      questionText: "How do lock-free data structures (e.g. lock-free queues) guarantee progress without using mutexes or semaphores?",
      options: [
        { id: "soft-adv-2-a", label: "A", text: "By using atomic hardware instructions like Compare-And-Swap (CAS) in retry loops, ensuring at least one thread makes progress" },
        { id: "soft-adv-2-b", label: "B", text: "By disabling hardware interrupts on all CPU cores whenever a thread enters a critical execution section" },
        { id: "soft-adv-2-c", label: "C", text: "By converting all pointer operations into read-only transaction snapshots evaluated in GPU memory" },
        { id: "soft-adv-2-d", label: "D", text: "By assigning dedicated physical memory hardware modules to each thread to eliminate memory bus sharing" }
      ],
      correctOptionId: "soft-adv-2-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "lock-free-cas-mechanics",
      explanationAfterAnswer: "Lock-free structures use atomic primitives (CAS, LL/SC). If multiple threads attempt an atomic update simultaneously, one succeeds and others fail and retry. This guarantees system-wide progress without thread suspension or priority inversion."
    },
    {
      id: "soft-adv-3",
      questionText: "What is the ABA problem in lock-free concurrent programming and what is the standard solution?",
      options: [
        { id: "soft-adv-3-a", label: "A", text: "A pointer changes from A to B and back to A; a CAS succeeds assuming no change; resolve using tagged pointers with version counters" },
        { id: "soft-adv-3-b", label: "B", text: "Two threads deadlock by acquiring Lock A then Lock B in reverse order; resolve by sorting lock acquisition orders" },
        { id: "soft-adv-3-c", label: "C", text: "A memory allocator runs out of 64-bit address space; resolve by switching from heap memory to thread stack memory" },
        { id: "soft-adv-3-d", label: "D", text: "A CPU branch predictor fails to speculative execute nested loop iterations; resolve by unrolling loop structures" }
      ],
      correctOptionId: "soft-adv-3-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "aba-problem-tagged-pointers",
      explanationAfterAnswer: "In the ABA problem, thread 1 reads value A. Before thread 1 executes CAS(A, new), other threads change A to B and back to A. CAS succeeds because pointer values match, though intermediate state was modified. Tagged pointers (pointer + monotonic counter) fix this."
    },
    {
      id: "soft-adv-4",
      questionText: "In the Linux kernel, how does the Completely Fair Scheduler (CFS) determine which task to run next on a CPU?",
      options: [
        { id: "soft-adv-4-a", label: "A", text: "It tracks virtual runtime (vruntime) in a red-black tree, always selecting the runnable task with the smallest vruntime" },
        { id: "soft-adv-4-b", label: "B", text: "It executes tasks in strict round-robin order based on the physical process identifier assigned at boot time" },
        { id: "soft-adv-4-c", label: "C", text: "It assigns all available CPU cycles to whichever process opened the greatest number of network socket handles" },
        { id: "soft-adv-4-d", label: "D", text: "It randomizes task execution order using hardware random number generators to avoid thread starvation" }
      ],
      correctOptionId: "soft-adv-4-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "linux-cfs-vruntime-scheduler",
      explanationAfterAnswer: "CFS models an 'ideal multi-tasking CPU'. It tracks each task's virtual runtime (vruntime), weighted by its nice value. Tasks are indexed in a time-ordered red-black tree; the leftmost node (smallest vruntime) is always picked next."
    },
    {
      id: "soft-adv-5",
      questionText: "How does the Linux `io_uring` asynchronous I/O interface achieve massive throughput gains over legacy `epoll` and `aio`?",
      options: [
        { id: "soft-adv-5-a", label: "A", text: "By using shared-memory ring buffers between user space and kernel space, submitting and completing I/O with zero syscalls" },
        { id: "soft-adv-5-b", label: "B", text: "By disabling kernel security checks and executing user space application code directly in CPU ring 0" },
        { id: "soft-adv-5-c", label: "C", text: "By compressing all network packet payloads into binary protocol buffers before transmitting them to devices" },
        { id: "soft-adv-5-d", label: "D", text: "By restricting all asynchronous disk writes to execute sequentially in single-threaded lockstep mode" }
      ],
      correctOptionId: "soft-adv-5-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "io-uring-ring-buffers",
      explanationAfterAnswer: "io_uring uses two ring buffers (Submission Queue and Completion Queue) shared between userspace and kernel. Applications enqueue requests and reap completions via atomic memory operations without context-switching into the kernel via syscalls."
    },
    {
      id: "soft-adv-6",
      questionText: "Why is Memory Ordering (Sequential Consistency vs Acquire-Release semantics) critical in C++11 and Rust concurrency?",
      options: [
        { id: "soft-adv-6-a", label: "A", text: "Compilers and out-of-order CPUs reorder instructions; explicit memory barriers prevent observing invalid state across cores" },
        { id: "soft-adv-6-b", label: "B", text: "Operating systems delete unreferenced global variables if memory addresses are not assigned in sequential order" },
        { id: "soft-adv-6-c", label: "C", text: "Network routing switches drop TCP packets unless payload bytes are ordered sequentially in local RAM memory" },
        { id: "soft-adv-6-d", label: "D", text: "Hardware cache controllers require memory addresses to be multiples of 1024 bytes to execute read operations" }
      ],
      correctOptionId: "soft-adv-6-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "memory-ordering-acquire-release",
      explanationAfterAnswer: "Modern superscalar CPUs and optimizing compilers aggressively reorder independent memory reads and writes. Acquire-release memory ordering provides synchronization guarantees (preventing reordering across the fence) without the performance overhead of seq_cst."
    },
    {
      id: "soft-adv-7",
      questionText: "What mechanism does Garbage Collection with Generational Hypothesis (e.g. V8, JVM) exploit to minimize pause times?",
      options: [
        { id: "soft-adv-7-a", label: "A", text: "Most allocated objects die young; frequent fast minor collections scan young gen while old gen is collected rarely" },
        { id: "soft-adv-7-b", label: "B", text: "All objects in memory are assigned permanent physical hardware addresses that never require garbage collection" },
        { id: "soft-adv-7-c", label: "C", text: "Garbage collectors convert allocated heap objects into static binary files stored on local solid-state drives" },
        { id: "soft-adv-7-d", label: "D", text: "The runtime terminates all active threads whenever total allocated heap memory exceeds one gigabyte" }
      ],
      correctOptionId: "soft-adv-7-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "generational-garbage-collection",
      explanationAfterAnswer: "The weak generational hypothesis states that the vast majority of objects die shortly after allocation. Generational collectors segregate heap into Young and Old generations, running fast minor collections on the young space where most objects are reclaimed quickly."
    },
    {
      id: "soft-adv-8",
      questionText: "In distributed database log-structured storage engines (e.g. LSM-Trees in RocksDB), why are writes faster than in B-Trees?",
      options: [
        { id: "soft-adv-8-a", label: "A", text: "Writes append sequentially to an in-memory MemTable and write-ahead log, avoiding expensive in-place random disk seeks" },
        { id: "soft-adv-8-b", label: "B", text: "Writes bypass the file system entirely and stream binary data directly across unencrypted local network sockets" },
        { id: "soft-adv-8-c", label: "C", text: "Writes delete all existing historical table data before committing new transaction entries to disk partitions" },
        { id: "soft-adv-8-d", label: "D", text: "Writes convert relational SQL tables into unindexed text files that require zero index maintenance overhead" }
      ],
      correctOptionId: "soft-adv-8-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "lsm-tree-write-amplification",
      explanationAfterAnswer: "B-Trees require random in-place updates across disk blocks, causing heavy write amplification and random I/O. LSM-trees transform writes into fast sequential appends to an in-memory MemTable and WAL, flushing immutable SSTables to disk in bulk."
    },
    {
      id: "soft-adv-9",
      questionText: "What specific trade-off does the Raft consensus algorithm make compared to Multi-Paxos regarding log compaction and leadership?",
      options: [
        { id: "soft-adv-9-a", label: "A", text: "Raft enforces strong leadership with strictly linear log append flows, making it simpler to reason about than Paxos" },
        { id: "soft-adv-9-b", label: "B", text: "Raft eliminates the mathematical requirement for quorum majorities when electing cluster leader instances" },
        { id: "soft-adv-9-c", label: "C", text: "Raft allows multiple leaders to commit conflicting log entries concurrently across separate cluster partitions" },
        { id: "soft-adv-9-d", label: "D", text: "Raft requires all cluster nodes to possess identical hardware clock crystals synchronized to UTC time" }
      ],
      correctOptionId: "soft-adv-9-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "raft-vs-paxos-consensus",
      explanationAfterAnswer: "Paxos allows log entries to be chosen out of order and stitched together later. Raft enforces strong leader invariants: log entries flow unidirectionally from leader to followers, and a leader is never elected unless it contains all committed entries, simplifying formal reasoning."
    },
    {
      id: "soft-adv-10",
      questionText: "How does the Two-Generals Problem demonstrate the impossibility of guaranteed consensus over an unreliable network?",
      options: [
        { id: "soft-adv-10-a", label: "A", text: "No finite exchange of acknowledgments over an unreliable link can guarantee both parties know the other agreed" },
        { id: "soft-adv-10-b", label: "B", text: "Two military generals cannot agree on an attack time if their mechanical watch clocks drift by five seconds" },
        { id: "soft-adv-10-c", label: "C", text: "Network routing switches drop packets whenever two servers attempt to open TCP connections simultaneously" },
        { id: "soft-adv-10-d", label: "D", text: "Symmetric cryptographic algorithms fail to decrypt data if messages are transmitted across wireless networks" }
      ],
      correctOptionId: "soft-adv-10-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "two-generals-problem-consensus",
      explanationAfterAnswer: "The Two-Generals thought experiment proves that two processes communicating over an uncoordinated, lossy channel cannot reach guaranteed common knowledge: the last messenger to acknowledge can never be certain their acknowledgment was received."
    }
  ]
};
