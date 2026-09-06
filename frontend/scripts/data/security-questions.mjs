export const securityQuestions = {
  beginner: [
    {
      id: "sec-beg-1",
      questionText: "What is the primary role of a network firewall in an IT infrastructure?",
      options: [
        { id: "sec-beg-1-a", label: "A", text: "To inspect and control incoming and outgoing network traffic based on predefined security rules" },
        { id: "sec-beg-1-b", label: "B", text: "To translate private internal IP addresses to routable external addresses across corporate subnets" },
        { id: "sec-beg-1-c", label: "C", text: "To establish encrypted point-to-point tunnels between remote branch offices and corporate data centers" },
        { id: "sec-beg-1-d", label: "D", text: "To dynamically assign IP configurations and DNS gateway addresses to connecting client hosts" }
      ],
      correctOptionId: "sec-beg-1-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "firewall-basics",
      explanationAfterAnswer: "A firewall monitors and filters network traffic based on configured security policies, establishing a security boundary between trusted internal networks and untrusted external networks."
    },
    {
      id: "sec-beg-2",
      questionText: "Which of the following best describes Multi-Factor Authentication (MFA)?",
      options: [
        { id: "sec-beg-2-a", label: "A", text: "Requiring two independent system administrators to concurrently approve every interactive user session" },
        { id: "sec-beg-2-b", label: "B", text: "Verifying identity using credentials from two or more distinct categories such as passwords and security keys" },
        { id: "sec-beg-2-c", label: "C", text: "Enforcing periodic passphrase rotations combining numbers, symbols, uppercase letters, and minimum length" },
        { id: "sec-beg-2-d", label: "D", text: "Authenticating client requests through sequential cryptographic handshakes across border gateway proxies" }
      ],
      correctOptionId: "sec-beg-2-b",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "mfa-principles",
      explanationAfterAnswer: "MFA requires two or more distinct categories of credentials: something you know (password), something you have (security key or authenticator app), or something you are (biometrics)."
    },
    {
      id: "sec-beg-3",
      questionText: "What distinguishes symmetric encryption from asymmetric encryption?",
      options: [
        { id: "sec-beg-3-a", label: "A", text: "Symmetric uses one-way hash transformations without reversal, while asymmetric enables two-way data recovery" },
        { id: "sec-beg-3-b", label: "B", text: "Symmetric requires dedicated hardware security modules, while asymmetric executes entirely in memory" },
        { id: "sec-beg-3-c", label: "C", text: "Symmetric uses a single shared key for encryption and decryption, while asymmetric uses a public-private key pair" },
        { id: "sec-beg-3-d", label: "D", text: "Symmetric is restricted to static data at rest, while asymmetric is exclusively deployed for data in transit" }
      ],
      correctOptionId: "sec-beg-3-c",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "encryption-fundamentals",
      explanationAfterAnswer: "Symmetric encryption (such as AES) uses the same secret key for encryption and decryption. Asymmetric encryption (such as RSA or ECC) uses mathematically linked public and private key pairs."
    },
    {
      id: "sec-beg-4",
      questionText: "Which social engineering attack tricks victims into revealing credentials through deceptive communications?",
      options: [
        { id: "sec-beg-4-a", label: "A", text: "A credential stuffing attack testing breached credential lists against target authentication endpoints" },
        { id: "sec-beg-4-b", label: "B", text: "A watering hole attack compromising legitimate websites regularly frequented by target personnel" },
        { id: "sec-beg-4-c", label: "C", text: "A man-in-the-middle attack intercepting unencrypted transport layer communication across public networks" },
        { id: "sec-beg-4-d", label: "D", text: "A phishing attack delivering fraudulent messages designed to deceive recipients into disclosing credentials" }
      ],
      correctOptionId: "sec-beg-4-d",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "social-engineering-phishing",
      explanationAfterAnswer: "Phishing uses deceptive emails, messages, or websites masquerading as trustworthy entities to trick individuals into disclosing sensitive information such as login credentials."
    },
    {
      id: "sec-beg-5",
      questionText: "What does the 'A' represent in the CIA triad of information security?",
      options: [
        { id: "sec-beg-5-a", label: "A", text: "Availability, ensuring authorized users have timely and reliable access to critical systems and data" },
        { id: "sec-beg-5-b", label: "B", text: "Authentication, verifying the claimed identity of a user or system before granting access permissions" },
        { id: "sec-beg-5-c", label: "C", text: "Authorization, determining the specific access privileges and permissions granted to a verified identity" },
        { id: "sec-beg-5-d", label: "D", text: "Accountability, maintaining audit logs to trace actions and system events back to individual user sessions" }
      ],
      correctOptionId: "sec-beg-5-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "cia-triad",
      explanationAfterAnswer: "The CIA triad consists of Confidentiality (preventing unauthorized disclosure), Integrity (preventing unauthorized modification), and Availability (ensuring accessible, reliable service)."
    },
    {
      id: "sec-beg-6",
      questionText: "An employee receives an urgent message appearing to come from an executive. What is the best immediate response?",
      options: [
        { id: "sec-beg-6-a", label: "A", text: "Forward the suspicious message to the corporate email administrator to block the sending domain" },
        { id: "sec-beg-6-b", label: "B", text: "Verify the authenticity of the request through an independent, pre-established communication channel" },
        { id: "sec-beg-6-c", label: "C", text: "Reply directly to the email requesting secondary identity confirmation and digital signature verification" },
        { id: "sec-beg-6-d", label: "D", text: "Inspect the email header routing trail to verify whether SPF and DKIM pass checks were recorded" }
      ],
      correctOptionId: "sec-beg-6-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "phishing-mitigation",
      explanationAfterAnswer: "Executive impersonation exploits urgency and authority. The standard defense is out-of-band verification using a trusted, independent communication channel such as an internal phone directory."
    },
    {
      id: "sec-beg-7",
      questionText: "Why should web applications never store user passwords in plaintext inside databases?",
      options: [
        { id: "sec-beg-7-a", label: "A", text: "Plaintext passwords cause relational indexing fragmentation during high-volume database queries" },
        { id: "sec-beg-7-b", label: "B", text: "Plaintext passwords expose all user credentials immediately if the database storage layer is compromised" },
        { id: "sec-beg-7-c", label: "C", text: "Plaintext passwords violate database syntax standards by storing unhashed character data in table fields" },
        { id: "sec-beg-7-d", label: "D", text: "Plaintext passwords prevent authentication microservices from caching user login tokens efficiently" }
      ],
      correctOptionId: "sec-beg-7-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "password-storage-safety",
      explanationAfterAnswer: "Plaintext storage guarantees full account compromise if database dumps or backups are leaked. Passwords must be hashed using salted, adaptive algorithms like bcrypt or Argon2."
    },
    {
      id: "sec-beg-8",
      questionText: "What does the padlock icon and HTTPS in a web browser's address bar signify?",
      options: [
        { id: "sec-beg-8-a", label: "A", text: "The destination website is certified free of application vulnerabilities and malware infections" },
        { id: "sec-beg-8-b", label: "B", text: "The web host's physical data center possesses verified enterprise compliance security certifications" },
        { id: "sec-beg-8-c", label: "C", text: "The website operator has been cryptographically vetted by the operating system vendor" },
        { id: "sec-beg-8-d", label: "D", text: "Traffic between the browser and web server is encrypted and protected against eavesdropping via TLS" }
      ],
      correctOptionId: "sec-beg-8-d",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "tls-transport-security",
      explanationAfterAnswer: "HTTPS confirms transport-layer encryption via TLS, ensuring data confidentiality and integrity between client and server. It does not verify the security of the backend application itself."
    },
    {
      id: "sec-beg-9",
      questionText: "Which method provides the most effective protection for an enterprise wireless network?",
      options: [
        { id: "sec-beg-9-a", label: "A", text: "Deploying WPA3 Enterprise with 802.1X certificate-based individual authentication per connecting device" },
        { id: "sec-beg-9-b", label: "B", text: "Suppressing the wireless SSID beacon broadcast to hide the network name from nearby mobile scanning tools" },
        { id: "sec-beg-9-c", label: "C", text: "Restricting network access by configuring static MAC address filtering on wireless access controllers" },
        { id: "sec-beg-9-d", label: "D", text: "Configuring WPA2-PSK with a complex shared passphrase distributed to all corporate staff members" }
      ],
      correctOptionId: "sec-beg-9-a",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "wireless-network-hardening",
      explanationAfterAnswer: "WPA3 Enterprise with 802.1X provides individual credentials and mutual certificate authentication, preventing credential sharing and rogue access point spoofing."
    },
    {
      id: "sec-beg-10",
      questionText: "What risk arises from leaving default administrative credentials on newly installed network switches?",
      options: [
        { id: "sec-beg-10-a", label: "A", text: "Network routing switches throttle bandwidth allocation to prevent unverified firmware execution" },
        { id: "sec-beg-10-b", label: "B", text: "Automated scanning tools exploit known vendor credentials to gain unauthorized administrative access" },
        { id: "sec-beg-10-c", label: "C", text: "Internal hardware diagnostics fail to initialize packet forwarding buffers across Gigabit Ethernet ports" },
        { id: "sec-beg-10-d", label: "D", text: "The network switch automatically reverts to unmanaged hub mode after forty-eight hours of uptime" }
      ],
      correctOptionId: "sec-beg-10-b",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "default-credentials-risk",
      explanationAfterAnswer: "Factory default credentials are systematically cataloged in publicly available threat databases and targeted by automated scanners within minutes of network exposure."
    }
  ],

  intermediate: [
    {
      id: "sec-int-1",
      questionText: "How does a Cross-Site Scripting (XSS) attack execute in a target web application?",
      options: [
        { id: "sec-int-1-a", label: "A", text: "By manipulating HTTP caching headers to store sensitive authentication cookies in intermediate proxies" },
        { id: "sec-int-1-b", label: "B", text: "By appending SQL syntax into URL parameters to dump user password hashes from the relational database" },
        { id: "sec-int-1-c", label: "C", text: "By injecting untrusted client script into web application pages that executes in other users' browsers" },
        { id: "sec-int-1-d", label: "D", text: "By corrupting browser DNS cache records to redirect legitimate API requests to adversary endpoints" }
      ],
      correctOptionId: "sec-int-1-c",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "xss-vulnerability-mechanism",
      explanationAfterAnswer: "XSS occurs when an application includes untrusted user input without context-aware encoding, leading the browser to execute injected scripts in the security context of the user."
    },
    {
      id: "sec-int-2",
      questionText: "Which HTTP header is specifically designed to restrict where scripts, styles, and assets can load from?",
      options: [
        { id: "sec-int-2-a", label: "A", text: "Strict-Transport-Security (HSTS), enforcing encrypted HTTPS communication for all domain connections" },
        { id: "sec-int-2-b", label: "B", text: "X-Frame-Options, preventing malicious sites from rendering the target page inside hidden frame overlays" },
        { id: "sec-int-2-c", label: "C", text: "Access-Control-Allow-Origin, controlling which external web domains can access cross-origin API responses" },
        { id: "sec-int-2-d", label: "D", text: "Content-Security-Policy (CSP), declaring authorized sources from which scripts and resources may be loaded" }
      ],
      correctOptionId: "sec-int-2-d",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "csp-security-headers",
      explanationAfterAnswer: "Content-Security-Policy (CSP) allows site operators to restrict the origins of executable scripts, stylesheets, and media, effectively neutralizing unauthorized inline script execution."
    },
    {
      id: "sec-int-3",
      questionText: "Why are adaptive algorithms like Argon2 and bcrypt preferred over fast hashes like SHA-256 for passwords?",
      options: [
        { id: "sec-int-3-a", label: "A", text: "They incorporate configurable work factors and memory hardness to resist GPU and ASIC brute-force attacks" },
        { id: "sec-int-3-b", label: "B", text: "They generate variable-length outputs that eliminate hash collision vulnerabilities across large datasets" },
        { id: "sec-int-3-c", label: "C", text: "They use asymmetric key pairs requiring separate public and private keys to verify password matches" },
        { id: "sec-int-3-d", label: "D", text: "They eliminate the need for random cryptographic salts by computing deterministic seed values" }
      ],
      correctOptionId: "sec-int-3-a",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "adaptive-password-hashing",
      explanationAfterAnswer: "Fast hash functions like SHA-256 are engineered for speed, allowing billions of guesses per second on GPUs. Adaptive functions introduce computational work factors and memory demands to thwart hardware cracking."
    },
    {
      id: "sec-int-4",
      questionText: "A security analyst observes high volumes of outbound DNS queries for random hex subdomains. What is the threat?",
      options: [
        { id: "sec-int-4-a", label: "A", text: "Standard browser cache prefetching optimizing domain name resolution latency for anticipated user clicks" },
        { id: "sec-int-4-b", label: "B", text: "DNS tunneling and data exfiltration encoding unauthorized data within sequential lookup query labels" },
        { id: "sec-int-4-c", label: "C", text: "Authoritative name server zone synchronization transferring DNS resource records to secondary servers" },
        { id: "sec-int-4-d", label: "D", text: "Dynamic DNS client registration updating external public IP address bindings following lease renewal" }
      ],
      correctOptionId: "sec-int-4-b",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "dns-tunneling-exfiltration",
      explanationAfterAnswer: "DNS tunneling encapsulates non-DNS traffic or stolen data inside DNS queries (e.g. data.attacker.com), bypassing standard egress firewall rules that leave port 53 open."
    },
    {
      id: "sec-int-5",
      questionText: "What is the most robust defense against SQL Injection vulnerabilities in modern web applications?",
      options: [
        { id: "sec-int-5-a", label: "A", text: "Filtering incoming request parameters with regular expressions to remove single quotes and semicolons" },
        { id: "sec-int-5-b", label: "B", text: "Storing database credentials in encrypted configuration files rather than hardcoding them in source" },
        { id: "sec-int-5-c", label: "C", text: "Using parameterized queries (prepared statements) that separate user input from SQL command structure" },
        { id: "sec-int-5-d", label: "D", text: "Restricting database connections to communicate exclusively over mutually authenticated TLS sockets" }
      ],
      correctOptionId: "sec-int-5-c",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "parameterized-queries-sqli",
      explanationAfterAnswer: "Parameterized queries ensure the database driver treats user input strictly as data values, preventing user input from altering the compiled SQL query syntax."
    },
    {
      id: "sec-int-6",
      questionText: "What security advantage does network micro-segmentation provide inside a corporate infrastructure?",
      options: [
        { id: "sec-beg-6-a", label: "A", text: "It isolates workloads into discrete zones, preventing adversaries from moving laterally if a host is breached" },
        { id: "sec-beg-6-b", label: "B", text: "It increases raw packet throughput by bypassing perimeter firewall inspection for internal subnet traffic" },
        { id: "sec-beg-6-c", label: "C", text: "It removes the operational requirement to apply operating system security updates on internal servers" },
        { id: "sec-beg-6-d", label: "D", text: "It automates edge router failover by dynamically re-routing external traffic across redundant gateways" }
      ],
      correctOptionId: "sec-beg-6-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "network-microsegmentation",
      explanationAfterAnswer: "Micro-segmentation restricts communication between workloads according to granular policies, limiting an attacker's ability to move laterally across an internal network."
    },
    {
      id: "sec-int-7",
      questionText: "If an API verifies JWTs without enforcing the signature algorithm (accepting 'alg: none'), what attack occurs?",
      options: [
        { id: "sec-int-7-a", label: "A", text: "Attackers can forge arbitrary claims and tamper with tokens without needing a valid cryptographic signature" },
        { id: "sec-int-7-b", label: "B", text: "Attackers can cause server denial of service by triggering recursive cryptographic verification routines" },
        { id: "sec-int-7-c", label: "C", text: "Attackers can bypass Cross-Origin Resource Sharing (CORS) preflight validation on protected endpoints" },
        { id: "sec-int-7-d", label: "D", text: "Attackers can force identity servers to issue refresh tokens with permanent operational validity periods" }
      ],
      correctOptionId: "sec-int-7-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "jwt-none-algorithm-flaw",
      explanationAfterAnswer: "If a server blindly honors 'alg: none', an attacker can modify the token payload (e.g. elevating role to admin) and strip the signature, gaining unauthorized privileges."
    },
    {
      id: "sec-int-8",
      questionText: "What is the primary security goal of implementing the Principle of Least Privilege (PoLP)?",
      options: [
        { id: "sec-int-8-a", label: "A", text: "To restrict user and process permissions strictly to what is necessary, minimizing potential blast radius" },
        { id: "sec-int-8-b", label: "B", text: "To reduce cloud infrastructure billing costs by removing unused role-based access control assignments" },
        { id: "sec-int-8-c", label: "C", text: "To eliminate the need for administrative accounts by delegating all operational tasks to background services" },
        { id: "sec-int-8-d", label: "D", text: "To enforce automatic session logout whenever an authenticated user remains inactive for fifteen minutes" }
      ],
      correctOptionId: "sec-int-8-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "least-privilege-principle",
      explanationAfterAnswer: "Least Privilege dictates that users, processes, and systems should hold only the bare minimum permissions required to perform their functions, containing damage from compromise."
    },
    {
      id: "sec-int-9",
      questionText: "How does Online Certificate Status Protocol (OCSP) Stapling improve upon traditional revocation checking?",
      options: [
        { id: "sec-int-9-a", label: "A", text: "It allows web clients to query multiple Certificate Authorities concurrently to verify root trust chains" },
        { id: "sec-int-9-b", label: "B", text: "It embeds the revocation status of all public certificates directly into local operating system trust stores" },
        { id: "sec-int-9-c", label: "C", text: "It allows web servers to deliver timestamped, CA-signed revocation proof during the TLS handshake" },
        { id: "sec-int-9-d", label: "D", text: "It replaces asymmetric public key infrastructure with symmetric shared secret keys across web browsers" }
      ],
      correctOptionId: "sec-int-9-c",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "ocsp-stapling-pki",
      explanationAfterAnswer: "OCSP Stapling delegates status retrieval to the web server, which caches a signed OCSP response and presents it to connecting clients during TLS negotiation, enhancing speed and privacy."
    },
    {
      id: "sec-int-10",
      questionText: "Which defense effectively prevents Cross-Site Request Forgery (CSRF) on state-changing web endpoints?",
      options: [
        { id: "sec-int-10-a", label: "A", text: "Restricting all backend database transactions to execute in read-only mode for unauthenticated client sessions" },
        { id: "sec-int-10-b", label: "B", text: "Validating unpredictable anti-CSRF tokens and using SameSite cookie flags on state-changing requests" },
        { id: "sec-int-10-c", label: "C", text: "Encoding all incoming form parameters into base64 strings before processing them in application controllers" },
        { id: "sec-int-10-d", label: "D", text: "Mandating password complexity rules that enforce credential changes every thirty days for active users" }
      ],
      correctOptionId: "sec-int-10-b",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "csrf-mitigation-tokens",
      explanationAfterAnswer: "CSRF protection requires unpredictable anti-CSRF tokens tied to the user's session that third-party sites cannot read or guess, alongside SameSite cookie attributes."
    }
  ],

  advanced: [
    {
      id: "sec-adv-1",
      questionText: "What underlying microarchitectural processor mechanism enables Spectre speculative execution side-channel attacks?",
      options: [
        { id: "sec-adv-1-a", label: "A", text: "Branch predictors executing instructions speculatively past bounds checks and leaving cache timing traces" },
        { id: "sec-adv-1-b", label: "B", text: "Memory management unit page table fragmentation allowing unprivileged user space to read kernel frames" },
        { id: "sec-adv-1-c", label: "C", text: "Hardware thermal throttling desynchronizing clock cycles between physical processor execution cores" },
        { id: "sec-adv-1-d", label: "D", text: "Improper cyclic redundancy checks on L1 data cache lines during asynchronous direct memory access" }
      ],
      correctOptionId: "sec-adv-1-a",
      difficulty: "advanced",
      complexity: "fundamental",
      conceptTag: "spectre-microarchitectural-flaw",
      explanationAfterAnswer: "Spectre exploits speculative execution where CPUs predict branch targets and execute code before bounds checks complete. When squashed, cache state changes persist and leak data via timing attacks."
    },
    {
      id: "sec-adv-2",
      questionText: "In modern binary exploitation, what is the primary purpose of Return-Oriented Programming (ROP)?",
      options: [
        { id: "sec-adv-2-a", label: "A", text: "To defeat Address Space Layout Randomization by brute-forcing fixed virtual memory offsets in running processes" },
        { id: "sec-adv-2-b", label: "B", text: "To defeat Data Execution Prevention (W^X / DEP) by chaining existing executable instruction sequences ending in ret" },
        { id: "sec-adv-2-c", label: "C", text: "To accelerate reverse engineering by translating raw assembly opcodes into structured control flow graphs" },
        { id: "sec-adv-2-d", label: "D", text: "To execute kernel shellcode by directly corrupting the hardware interrupt descriptor table from user space" }
      ],
      correctOptionId: "sec-adv-2-b",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "rop-dep-bypass",
      explanationAfterAnswer: "When memory regions are marked non-executable (DEP/NX), ROP circumvents this by reusing existing snippets of executable binary code ('gadgets') ending in return instructions to build arbitrary logic."
    },
    {
      id: "sec-adv-3",
      questionText: "How is Kernel Address Space Layout Randomization (KASLR) typically defeated during exploit development?",
      options: [
        { id: "sec-adv-3-a", label: "A", text: "By transmitting high-volume ICMP echo requests to exhaust kernel socket buffer memory allocations" },
        { id: "sec-adv-3-b", label: "B", text: "By corrupting the system real-time clock to desynchronize kernel random number generator initialization" },
        { id: "sec-adv-3-c", label: "C", text: "By using an information leak vulnerability that reveals a kernel pointer to calculate the randomized base offset" },
        { id: "sec-adv-3-d", label: "D", text: "By modifying system security limits in user space configuration files to exceed kernel allocation limits" }
      ],
      correctOptionId: "sec-adv-3-c",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "kaslr-bypass-infoleak",
      explanationAfterAnswer: "KASLR randomizes the base memory location of kernel code. Attackers leverage an information disclosure bug that leaks a known kernel function pointer to calculate the base slide offset."
    },
    {
      id: "sec-adv-4",
      questionText: "In Kubernetes, which container configuration enables an attacker to perform a host node breakout?",
      options: [
        { id: "sec-adv-4-a", label: "A", text: "Running in privileged mode with hostPID and hostNetwork enabled or the host filesystem mounted read-write" },
        { id: "sec-adv-4-b", label: "B", text: "Configuring the pod to resolve DNS through cluster CoreDNS services rather than node-local caching daemons" },
        { id: "sec-adv-4-c", label: "C", text: "Attaching a Horizontal Pod Autoscaler that adjusts pod replica counts based on CPU utilization metrics" },
        { id: "sec-adv-4-d", label: "D", text: "Deploying a container image built on minimal Alpine Linux rather than an enterprise Linux distribution" }
      ],
      correctOptionId: "sec-adv-4-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "container-escape-privilege",
      explanationAfterAnswer: "Privileged containers disable Linux cgroup and namespace isolation. Access to host devices or the root filesystem allows escape via chroot, device access, or cgroup release agent manipulation."
    },
    {
      id: "sec-adv-5",
      questionText: "What condition permits an attacker to perform a Blind Time-Based SQL Injection attack against an API?",
      options: [
        { id: "sec-adv-5-a", label: "A", text: "The endpoint returns identical responses regardless of query results, but evaluates injected delay functions" },
        { id: "sec-adv-5-b", label: "B", text: "The database server exposes detailed error stack traces and internal schema definitions in HTTP 500 responses" },
        { id: "sec-adv-5-c", label: "C", text: "The database connection pool suffers from connection starvation due to unindexed queries on large tables" },
        { id: "sec-adv-5-d", label: "D", text: "The application communicates with the database over an unencrypted network connection without TLS verification" }
      ],
      correctOptionId: "sec-adv-5-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "blind-time-based-sqli",
      explanationAfterAnswer: "When an application leaks no data or differential error messages, an attacker injects conditional time-delay commands (like pg_sleep or WAITFOR DELAY) to infer data bit-by-bit from response times."
    },
    {
      id: "sec-adv-6",
      questionText: "In SAML 2.0 implementations, what design flaw enables XML Signature Wrapping (XSW) attacks?",
      options: [
        { id: "sec-adv-6-a", label: "A", text: "A mismatch between the XML structure used during signature canonicalization and that interpreted by the app" },
        { id: "sec-adv-6-b", label: "B", text: "A mismatch between the XML node validated by the signature verifier and the node consumed by business logic" },
        { id: "sec-adv-6-c", label: "C", text: "A mismatch between namespace resolution during signature verification and resolution during assertion processing" },
        { id: "sec-adv-6-d", label: "D", text: "A mismatch between schema validation of the assertion and resolution of referenced signed element identifiers" }
      ],
      correctOptionId: "sec-adv-6-b",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "saml-xml-signature-wrapping",
      explanationAfterAnswer: "XSW exploits architectural discrepancies where signature verification validates an intact assertion, while business logic retrieves user claims from an unsigned, wrapped element elsewhere in the DOM."
    },
    {
      id: "sec-adv-7",
      questionText: "What cryptographic flaw made WPA2's 4-way handshake vulnerable to Key Reinstallation Attacks (KRACK)?",
      options: [
        { id: "sec-adv-7-a", label: "A", text: "The client reinstalling an in-use pairwise key upon receiving retransmitted Message 3, resetting the packet counter" },
        { id: "sec-adv-7-b", label: "B", text: "The access point using weak Diffie-Hellman primes that allow pre-computation attacks against session keys" },
        { id: "sec-adv-7-c", label: "C", text: "The authentication server transmitting the master pre-shared key in plaintext beacon frames during discovery" },
        { id: "sec-adv-7-d", label: "D", text: "The wireless controller generating predictable initialization vectors during RC4 stream cipher encapsulation" }
      ],
      correctOptionId: "sec-adv-7-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "krack-wpa2-handshake",
      explanationAfterAnswer: "KRACK exploits Message 3 retransmission. When re-received, vulnerable clients reinstall the already active PTK and reset its transmit replay counter (nonce), enabling keystream reuse attacks."
    },
    {
      id: "sec-adv-8",
      questionText: "Why is ML-KEM (Kyber) categorized as lattice-based post-quantum cryptography?",
      options: [
        { id: "sec-adv-8-a", label: "A", text: "Its security relies on high-dimensional lattice vector problems that cannot be solved efficiently by Shor's algorithm" },
        { id: "sec-adv-8-b", label: "B", text: "It employs quantum key distribution channels that leverage photon entanglement to detect eavesdropping on optical lines" },
        { id: "sec-adv-8-c", label: "C", text: "It utilizes super-singular elliptic curve isogenies requiring exponential classical resources to compute path morphisms" },
        { id: "sec-adv-8-d", label: "D", text: "It generates symmetric one-time pads derived from cosmic background radiation sensors embedded in security modules" }
      ],
      correctOptionId: "sec-adv-8-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "post-quantum-lattice-crypto",
      explanationAfterAnswer: "ML-KEM security reduces to the Module Learning with Errors (M-LWE) problem over high-dimensional lattices, which resists both classical algorithms and quantum attacks based on Shor's algorithm."
    },
    {
      id: "sec-adv-9",
      questionText: "In eBPF security observability tooling, how can a root-privileged adversary attempt to blind kernel telemetry?",
      options: [
        { id: "sec-adv-9-a", label: "A", text: "By detaching kernel tracepoints via bpf syscalls or flooding the ring buffer to induce massive unlogged event drops" },
        { id: "sec-adv-9-b", label: "B", text: "By modifying userspace /etc/resolv.conf configuration files to redirect internal DNS queries to external resolvers" },
        { id: "sec-adv-9-c", label: "C", text: "By installing unapproved compilers on the host worker node to trigger local static binary analysis warnings" },
        { id: "sec-adv-9-d", label: "D", text: "By adjusting system timezone configurations to create clock drift between worker nodes and the control plane" }
      ],
      correctOptionId: "sec-adv-9-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "ebpf-telemetry-evasion",
      explanationAfterAnswer: "An adversary with root or CAP_BPF can interact directly with the bpf() syscall to detach attached probes, corrupt BPF maps, or generate high-volume synthetic events to overflow ring buffers."
    },
    {
      id: "sec-adv-10",
      questionText: "Which defense mechanism specifically protects cloud instance metadata endpoints (169.254.169.254) against SSRF?",
      options: [
        { id: "sec-adv-10-a", label: "A", text: "Enforcing IMDSv2 requiring session-oriented PUT requests with signed token headers alongside strict egress filtering" },
        { id: "sec-adv-10-b", label: "B", text: "Configuring public DNS records to map internal private IP subnets to corporate reverse proxy load balancers" },
        { id: "sec-adv-10-c", label: "C", text: "Encoding all outbound HTTP request bodies into base64 strings before transmitting them over network gateways" },
        { id: "sec-adv-10-d", label: "D", text: "Enforcing multi-factor authentication on all administrative SSH connections established to worker compute nodes" }
      ],
      correctOptionId: "sec-adv-10-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "imdsv2-ssrf-mitigation",
      explanationAfterAnswer: "IMDSv2 requires clients to first execute a PUT request to generate a session token (which standard SSRF vectors cannot easily forge) before querying metadata, and sets token hop limits to block proxies."
    }
  ]
};
