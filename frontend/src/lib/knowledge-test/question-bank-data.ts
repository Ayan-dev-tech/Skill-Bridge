/**
 * Skill Bridge — Comprehensive Calibrated Fallback Question Bank
 * 150 meticulously engineered questions across 5 domains and 3 difficulty tiers.
 * Every question features:
 * - 4 options belonging to the exact same technical conceptual domain
 * - Balanced character lengths (no giveaway lengths)
 * - Technically plausible distractors without obvious elimination clues
 * - Balanced base answer distribution across A, B, C, D
 * - Dynamic Fisher-Yates runtime shuffling support
 */

import { DifficultyLevel, KnowledgeQuestion } from "./types";

export type QuestionBank = Record<
  string,
  Record<DifficultyLevel, Omit<KnowledgeQuestion, "questionNumber">[]>
>;

export const FALLBACK_QUESTION_BANK: QuestionBank = {
  "security": {
    "beginner": [
      {
        "id": "sec-beg-1",
        "questionText": "What is the primary role of a network firewall in an IT infrastructure?",
        "options": [
          {
            "id": "sec-beg-1-a",
            "label": "A",
            "text": "To inspect and control incoming and outgoing network traffic based on predefined security rules"
          },
          {
            "id": "sec-beg-1-b",
            "label": "B",
            "text": "To translate private internal IP addresses to routable external addresses across corporate subnets"
          },
          {
            "id": "sec-beg-1-c",
            "label": "C",
            "text": "To establish encrypted point-to-point tunnels between remote branch offices and corporate data centers"
          },
          {
            "id": "sec-beg-1-d",
            "label": "D",
            "text": "To dynamically assign IP configurations and DNS gateway addresses to connecting client hosts"
          }
        ],
        "correctOptionId": "sec-beg-1-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "firewall-basics",
        "explanationAfterAnswer": "A firewall monitors and filters network traffic based on configured security policies, establishing a security boundary between trusted internal networks and untrusted external networks."
      },
      {
        "id": "sec-beg-2",
        "questionText": "Which of the following best describes Multi-Factor Authentication (MFA)?",
        "options": [
          {
            "id": "sec-beg-2-a",
            "label": "A",
            "text": "Requiring two independent system administrators to concurrently approve every interactive user session"
          },
          {
            "id": "sec-beg-2-b",
            "label": "B",
            "text": "Verifying identity using credentials from two or more distinct categories such as passwords and security keys"
          },
          {
            "id": "sec-beg-2-c",
            "label": "C",
            "text": "Enforcing periodic passphrase rotations combining numbers, symbols, uppercase letters, and minimum length"
          },
          {
            "id": "sec-beg-2-d",
            "label": "D",
            "text": "Authenticating client requests through sequential cryptographic handshakes across border gateway proxies"
          }
        ],
        "correctOptionId": "sec-beg-2-b",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "mfa-principles",
        "explanationAfterAnswer": "MFA requires two or more distinct categories of credentials: something you know (password), something you have (security key or authenticator app), or something you are (biometrics)."
      },
      {
        "id": "sec-beg-3",
        "questionText": "What distinguishes symmetric encryption from asymmetric encryption?",
        "options": [
          {
            "id": "sec-beg-3-a",
            "label": "A",
            "text": "Symmetric uses one-way hash transformations without reversal, while asymmetric enables two-way data recovery"
          },
          {
            "id": "sec-beg-3-b",
            "label": "B",
            "text": "Symmetric requires dedicated hardware security modules, while asymmetric executes entirely in memory"
          },
          {
            "id": "sec-beg-3-c",
            "label": "C",
            "text": "Symmetric uses a single shared key for encryption and decryption, while asymmetric uses a public-private key pair"
          },
          {
            "id": "sec-beg-3-d",
            "label": "D",
            "text": "Symmetric is restricted to static data at rest, while asymmetric is exclusively deployed for data in transit"
          }
        ],
        "correctOptionId": "sec-beg-3-c",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "encryption-fundamentals",
        "explanationAfterAnswer": "Symmetric encryption (such as AES) uses the same secret key for encryption and decryption. Asymmetric encryption (such as RSA or ECC) uses mathematically linked public and private key pairs."
      },
      {
        "id": "sec-beg-4",
        "questionText": "Which social engineering attack tricks victims into revealing credentials through deceptive communications?",
        "options": [
          {
            "id": "sec-beg-4-a",
            "label": "A",
            "text": "A credential stuffing attack testing breached credential lists against target authentication endpoints"
          },
          {
            "id": "sec-beg-4-b",
            "label": "B",
            "text": "A watering hole attack compromising legitimate websites regularly frequented by target personnel"
          },
          {
            "id": "sec-beg-4-c",
            "label": "C",
            "text": "A man-in-the-middle attack intercepting unencrypted transport layer communication across public networks"
          },
          {
            "id": "sec-beg-4-d",
            "label": "D",
            "text": "A phishing attack delivering fraudulent messages designed to deceive recipients into disclosing credentials"
          }
        ],
        "correctOptionId": "sec-beg-4-d",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "social-engineering-phishing",
        "explanationAfterAnswer": "Phishing uses deceptive emails, messages, or websites masquerading as trustworthy entities to trick individuals into disclosing sensitive information such as login credentials."
      },
      {
        "id": "sec-beg-5",
        "questionText": "What does the 'A' represent in the CIA triad of information security?",
        "options": [
          {
            "id": "sec-beg-5-a",
            "label": "A",
            "text": "Availability, ensuring authorized users have timely and reliable access to critical systems and data"
          },
          {
            "id": "sec-beg-5-b",
            "label": "B",
            "text": "Authentication, verifying the claimed identity of a user or system before granting access permissions"
          },
          {
            "id": "sec-beg-5-c",
            "label": "C",
            "text": "Authorization, determining the specific access privileges and permissions granted to a verified identity"
          },
          {
            "id": "sec-beg-5-d",
            "label": "D",
            "text": "Accountability, maintaining audit logs to trace actions and system events back to individual user sessions"
          }
        ],
        "correctOptionId": "sec-beg-5-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "cia-triad",
        "explanationAfterAnswer": "The CIA triad consists of Confidentiality (preventing unauthorized disclosure), Integrity (preventing unauthorized modification), and Availability (ensuring accessible, reliable service)."
      },
      {
        "id": "sec-beg-6",
        "questionText": "An employee receives an urgent message appearing to come from an executive. What is the best immediate response?",
        "options": [
          {
            "id": "sec-beg-6-a",
            "label": "A",
            "text": "Forward the suspicious message to the corporate email administrator to block the sending domain"
          },
          {
            "id": "sec-beg-6-b",
            "label": "B",
            "text": "Verify the authenticity of the request through an independent, pre-established communication channel"
          },
          {
            "id": "sec-beg-6-c",
            "label": "C",
            "text": "Reply directly to the email requesting secondary identity confirmation and digital signature verification"
          },
          {
            "id": "sec-beg-6-d",
            "label": "D",
            "text": "Inspect the email header routing trail to verify whether SPF and DKIM pass checks were recorded"
          }
        ],
        "correctOptionId": "sec-beg-6-b",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "phishing-mitigation",
        "explanationAfterAnswer": "Executive impersonation exploits urgency and authority. The standard defense is out-of-band verification using a trusted, independent communication channel such as an internal phone directory."
      },
      {
        "id": "sec-beg-7",
        "questionText": "Why should web applications never store user passwords in plaintext inside databases?",
        "options": [
          {
            "id": "sec-beg-7-a",
            "label": "A",
            "text": "Plaintext passwords cause relational indexing fragmentation during high-volume database queries"
          },
          {
            "id": "sec-beg-7-b",
            "label": "B",
            "text": "Plaintext passwords violate database syntax standards by storing unhashed character data in table fields"
          },
          {
            "id": "sec-beg-7-c",
            "label": "C",
            "text": "Plaintext passwords expose all user credentials immediately if the database storage layer is compromised"
          },
          {
            "id": "sec-beg-7-d",
            "label": "D",
            "text": "Plaintext passwords prevent authentication microservices from caching user login tokens efficiently"
          }
        ],
        "correctOptionId": "sec-beg-7-c",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "password-storage-safety",
        "explanationAfterAnswer": "Plaintext storage guarantees full account compromise if database dumps or backups are leaked. Passwords must be hashed using salted, adaptive algorithms like bcrypt or Argon2."
      },
      {
        "id": "sec-beg-8",
        "questionText": "What does the padlock icon and HTTPS in a web browser's address bar signify?",
        "options": [
          {
            "id": "sec-beg-8-a",
            "label": "A",
            "text": "The destination website is certified free of application vulnerabilities and malware infections"
          },
          {
            "id": "sec-beg-8-b",
            "label": "B",
            "text": "The web host's physical data center possesses verified enterprise compliance security certifications"
          },
          {
            "id": "sec-beg-8-c",
            "label": "C",
            "text": "The website operator has been cryptographically vetted by the operating system vendor"
          },
          {
            "id": "sec-beg-8-d",
            "label": "D",
            "text": "Traffic between the browser and web server is encrypted and protected against eavesdropping via TLS"
          }
        ],
        "correctOptionId": "sec-beg-8-d",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "tls-transport-security",
        "explanationAfterAnswer": "HTTPS confirms transport-layer encryption via TLS, ensuring data confidentiality and integrity between client and server. It does not verify the security of the backend application itself."
      },
      {
        "id": "sec-beg-9",
        "questionText": "Which method provides the most effective protection for an enterprise wireless network?",
        "options": [
          {
            "id": "sec-beg-9-a",
            "label": "A",
            "text": "Deploying WPA3 Enterprise with 802.1X certificate-based individual authentication per connecting device"
          },
          {
            "id": "sec-beg-9-b",
            "label": "B",
            "text": "Suppressing the wireless SSID beacon broadcast to hide the network name from nearby mobile scanning tools"
          },
          {
            "id": "sec-beg-9-c",
            "label": "C",
            "text": "Restricting network access by configuring static MAC address filtering on wireless access controllers"
          },
          {
            "id": "sec-beg-9-d",
            "label": "D",
            "text": "Configuring WPA2-PSK with a complex shared passphrase distributed to all corporate staff members"
          }
        ],
        "correctOptionId": "sec-beg-9-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "wireless-network-hardening",
        "explanationAfterAnswer": "WPA3 Enterprise with 802.1X provides individual credentials and mutual certificate authentication, preventing credential sharing and rogue access point spoofing."
      },
      {
        "id": "sec-beg-10",
        "questionText": "What risk arises from leaving default administrative credentials on newly installed network switches?",
        "options": [
          {
            "id": "sec-beg-10-a",
            "label": "A",
            "text": "Network routing switches throttle bandwidth allocation to prevent unverified firmware execution"
          },
          {
            "id": "sec-beg-10-b",
            "label": "B",
            "text": "Automated scanning tools exploit known vendor credentials to gain unauthorized administrative access"
          },
          {
            "id": "sec-beg-10-c",
            "label": "C",
            "text": "Internal hardware diagnostics fail to initialize packet forwarding buffers across Gigabit Ethernet ports"
          },
          {
            "id": "sec-beg-10-d",
            "label": "D",
            "text": "The network switch automatically reverts to unmanaged hub mode after forty-eight hours of uptime"
          }
        ],
        "correctOptionId": "sec-beg-10-b",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "default-credentials-risk",
        "explanationAfterAnswer": "Factory default credentials are systematically cataloged in publicly available threat databases and targeted by automated scanners within minutes of network exposure."
      }
    ],
    "intermediate": [
      {
        "id": "sec-int-1",
        "questionText": "How does a Cross-Site Scripting (XSS) attack execute in a target web application?",
        "options": [
          {
            "id": "sec-int-1-a",
            "label": "A",
            "text": "By manipulating HTTP caching headers to store sensitive authentication cookies in intermediate proxies"
          },
          {
            "id": "sec-int-1-b",
            "label": "B",
            "text": "By appending SQL syntax into URL parameters to dump user password hashes from the relational database"
          },
          {
            "id": "sec-int-1-c",
            "label": "C",
            "text": "By injecting untrusted client script into web application pages that executes in other users' browsers"
          },
          {
            "id": "sec-int-1-d",
            "label": "D",
            "text": "By corrupting browser DNS cache records to redirect legitimate API requests to adversary endpoints"
          }
        ],
        "correctOptionId": "sec-int-1-c",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "xss-vulnerability-mechanism",
        "explanationAfterAnswer": "XSS occurs when an application includes untrusted user input without context-aware encoding, leading the browser to execute injected scripts in the security context of the user."
      },
      {
        "id": "sec-int-2",
        "questionText": "Which HTTP header is specifically designed to restrict where scripts, styles, and assets can load from?",
        "options": [
          {
            "id": "sec-int-2-a",
            "label": "A",
            "text": "Strict-Transport-Security (HSTS), enforcing encrypted HTTPS communication for all domain connections"
          },
          {
            "id": "sec-int-2-b",
            "label": "B",
            "text": "X-Frame-Options, preventing malicious sites from rendering the target page inside hidden frame overlays"
          },
          {
            "id": "sec-int-2-c",
            "label": "C",
            "text": "Access-Control-Allow-Origin, controlling which external web domains can access cross-origin API responses"
          },
          {
            "id": "sec-int-2-d",
            "label": "D",
            "text": "Content-Security-Policy (CSP), declaring authorized sources from which scripts and resources may be loaded"
          }
        ],
        "correctOptionId": "sec-int-2-d",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "csp-security-headers",
        "explanationAfterAnswer": "Content-Security-Policy (CSP) allows site operators to restrict the origins of executable scripts, stylesheets, and media, effectively neutralizing unauthorized inline script execution."
      },
      {
        "id": "sec-int-3",
        "questionText": "Why are adaptive algorithms like Argon2 and bcrypt preferred over fast hashes like SHA-256 for passwords?",
        "options": [
          {
            "id": "sec-int-3-a",
            "label": "A",
            "text": "They incorporate configurable work factors and memory hardness to resist GPU and ASIC brute-force attacks"
          },
          {
            "id": "sec-int-3-b",
            "label": "B",
            "text": "They generate variable-length outputs that eliminate hash collision vulnerabilities across large datasets"
          },
          {
            "id": "sec-int-3-c",
            "label": "C",
            "text": "They use asymmetric key pairs requiring separate public and private keys to verify password matches"
          },
          {
            "id": "sec-int-3-d",
            "label": "D",
            "text": "They eliminate the need for random cryptographic salts by computing deterministic seed values"
          }
        ],
        "correctOptionId": "sec-int-3-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "adaptive-password-hashing",
        "explanationAfterAnswer": "Fast hash functions like SHA-256 are engineered for speed, allowing billions of guesses per second on GPUs. Adaptive functions introduce computational work factors and memory demands to thwart hardware cracking."
      },
      {
        "id": "sec-int-4",
        "questionText": "A security analyst observes high volumes of outbound DNS queries for random hex subdomains. What is the threat?",
        "options": [
          {
            "id": "sec-int-4-a",
            "label": "A",
            "text": "Standard browser cache prefetching optimizing domain name resolution latency for anticipated user clicks"
          },
          {
            "id": "sec-int-4-b",
            "label": "B",
            "text": "DNS tunneling and data exfiltration encoding unauthorized data within sequential lookup query labels"
          },
          {
            "id": "sec-int-4-c",
            "label": "C",
            "text": "Authoritative name server zone synchronization transferring DNS resource records to secondary servers"
          },
          {
            "id": "sec-int-4-d",
            "label": "D",
            "text": "Dynamic DNS client registration updating external public IP address bindings following lease renewal"
          }
        ],
        "correctOptionId": "sec-int-4-b",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "dns-tunneling-exfiltration",
        "explanationAfterAnswer": "DNS tunneling encapsulates non-DNS traffic or stolen data inside DNS queries (e.g. data.attacker.com), bypassing standard egress firewall rules that leave port 53 open."
      },
      {
        "id": "sec-int-5",
        "questionText": "What is the most robust defense against SQL Injection vulnerabilities in modern web applications?",
        "options": [
          {
            "id": "sec-int-5-a",
            "label": "A",
            "text": "Filtering incoming request parameters with regular expressions to remove single quotes and semicolons"
          },
          {
            "id": "sec-int-5-b",
            "label": "B",
            "text": "Storing database credentials in encrypted configuration files rather than hardcoding them in source"
          },
          {
            "id": "sec-int-5-c",
            "label": "C",
            "text": "Using parameterized queries (prepared statements) that separate user input from SQL command structure"
          },
          {
            "id": "sec-int-5-d",
            "label": "D",
            "text": "Restricting database connections to communicate exclusively over mutually authenticated TLS sockets"
          }
        ],
        "correctOptionId": "sec-int-5-c",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "parameterized-queries-sqli",
        "explanationAfterAnswer": "Parameterized queries ensure the database driver treats user input strictly as data values, preventing user input from altering the compiled SQL query syntax."
      },
      {
        "id": "sec-int-6",
        "questionText": "What security advantage does network micro-segmentation provide inside a corporate infrastructure?",
        "options": [
          {
            "id": "sec-int-6-a",
            "label": "A",
            "text": "It increases raw packet throughput by bypassing perimeter firewall inspection for internal subnet traffic"
          },
          {
            "id": "sec-int-6-b",
            "label": "B",
            "text": "It removes the operational requirement to apply operating system security updates on internal servers"
          },
          {
            "id": "sec-int-6-c",
            "label": "C",
            "text": "It automates edge router failover by dynamically re-routing external traffic across redundant gateways"
          },
          {
            "id": "sec-int-6-d",
            "label": "D",
            "text": "It isolates workloads into discrete zones, preventing adversaries from moving laterally if a host is breached"
          }
        ],
        "correctOptionId": "sec-int-6-d",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "network-microsegmentation",
        "explanationAfterAnswer": "Micro-segmentation restricts communication between workloads according to granular policies, limiting an attacker's ability to move laterally across an internal network."
      },
      {
        "id": "sec-int-7",
        "questionText": "If an API verifies JWTs without enforcing the signature algorithm (accepting 'alg: none'), what attack occurs?",
        "options": [
          {
            "id": "sec-int-7-a",
            "label": "A",
            "text": "Attackers can forge arbitrary claims and tamper with tokens without needing a valid cryptographic signature"
          },
          {
            "id": "sec-int-7-b",
            "label": "B",
            "text": "Attackers can cause server denial of service by triggering recursive cryptographic verification routines"
          },
          {
            "id": "sec-int-7-c",
            "label": "C",
            "text": "Attackers can bypass Cross-Origin Resource Sharing (CORS) preflight validation on protected endpoints"
          },
          {
            "id": "sec-int-7-d",
            "label": "D",
            "text": "Attackers can force identity servers to issue refresh tokens with permanent operational validity periods"
          }
        ],
        "correctOptionId": "sec-int-7-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "jwt-none-algorithm-flaw",
        "explanationAfterAnswer": "If a server blindly honors 'alg: none', an attacker can modify the token payload (e.g. elevating role to admin) and strip the signature, gaining unauthorized privileges."
      },
      {
        "id": "sec-int-8",
        "questionText": "What is the primary security goal of implementing the Principle of Least Privilege (PoLP)?",
        "options": [
          {
            "id": "sec-int-8-a",
            "label": "A",
            "text": "To reduce cloud infrastructure billing costs by removing unused role-based access control assignments"
          },
          {
            "id": "sec-int-8-b",
            "label": "B",
            "text": "To restrict user and process permissions strictly to what is necessary, minimizing potential blast radius"
          },
          {
            "id": "sec-int-8-c",
            "label": "C",
            "text": "To eliminate the need for administrative accounts by delegating all operational tasks to background services"
          },
          {
            "id": "sec-int-8-d",
            "label": "D",
            "text": "To enforce automatic session logout whenever an authenticated user remains inactive for fifteen minutes"
          }
        ],
        "correctOptionId": "sec-int-8-b",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "least-privilege-principle",
        "explanationAfterAnswer": "Least Privilege dictates that users, processes, and systems should hold only the bare minimum permissions required to perform their functions, containing damage from compromise."
      },
      {
        "id": "sec-int-9",
        "questionText": "How does Online Certificate Status Protocol (OCSP) Stapling improve upon traditional revocation checking?",
        "options": [
          {
            "id": "sec-int-9-a",
            "label": "A",
            "text": "It allows web clients to query multiple Certificate Authorities concurrently to verify root trust chains"
          },
          {
            "id": "sec-int-9-b",
            "label": "B",
            "text": "It embeds the revocation status of all public certificates directly into local operating system trust stores"
          },
          {
            "id": "sec-int-9-c",
            "label": "C",
            "text": "It allows web servers to deliver timestamped, CA-signed revocation proof during the TLS handshake"
          },
          {
            "id": "sec-int-9-d",
            "label": "D",
            "text": "It replaces asymmetric public key infrastructure with symmetric shared secret keys across web browsers"
          }
        ],
        "correctOptionId": "sec-int-9-c",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "ocsp-stapling-pki",
        "explanationAfterAnswer": "OCSP Stapling delegates status retrieval to the web server, which caches a signed OCSP response and presents it to connecting clients during TLS negotiation, enhancing speed and privacy."
      },
      {
        "id": "sec-int-10",
        "questionText": "Which defense effectively prevents Cross-Site Request Forgery (CSRF) on state-changing web endpoints?",
        "options": [
          {
            "id": "sec-int-10-a",
            "label": "A",
            "text": "Restricting all backend database transactions to execute in read-only mode for unauthenticated client sessions"
          },
          {
            "id": "sec-int-10-b",
            "label": "B",
            "text": "Encoding all incoming form parameters into base64 strings before processing them in application controllers"
          },
          {
            "id": "sec-int-10-c",
            "label": "C",
            "text": "Mandating password complexity rules that enforce credential changes every thirty days for active users"
          },
          {
            "id": "sec-int-10-d",
            "label": "D",
            "text": "Validating unpredictable anti-CSRF tokens and using SameSite cookie flags on state-changing requests"
          }
        ],
        "correctOptionId": "sec-int-10-d",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "csrf-mitigation-tokens",
        "explanationAfterAnswer": "CSRF protection requires unpredictable anti-CSRF tokens tied to the user's session that third-party sites cannot read or guess, alongside SameSite cookie attributes."
      }
    ],
    "advanced": [
      {
        "id": "sec-adv-1",
        "questionText": "What underlying microarchitectural processor mechanism enables Spectre speculative execution side-channel attacks?",
        "options": [
          {
            "id": "sec-adv-1-a",
            "label": "A",
            "text": "Branch predictors executing instructions speculatively past bounds checks and leaving cache timing traces"
          },
          {
            "id": "sec-adv-1-b",
            "label": "B",
            "text": "Memory management unit page table fragmentation allowing unprivileged user space to read kernel frames"
          },
          {
            "id": "sec-adv-1-c",
            "label": "C",
            "text": "Hardware thermal throttling desynchronizing clock cycles between physical processor execution cores"
          },
          {
            "id": "sec-adv-1-d",
            "label": "D",
            "text": "Improper cyclic redundancy checks on L1 data cache lines during asynchronous direct memory access"
          }
        ],
        "correctOptionId": "sec-adv-1-a",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "spectre-microarchitectural-flaw",
        "explanationAfterAnswer": "Spectre exploits speculative execution where CPUs predict branch targets and execute code before bounds checks complete. When squashed, cache state changes persist and leak data via timing attacks."
      },
      {
        "id": "sec-adv-2",
        "questionText": "In modern binary exploitation, what is the primary purpose of Return-Oriented Programming (ROP)?",
        "options": [
          {
            "id": "sec-adv-2-a",
            "label": "A",
            "text": "To defeat Address Space Layout Randomization by brute-forcing fixed virtual memory offsets in running processes"
          },
          {
            "id": "sec-adv-2-b",
            "label": "B",
            "text": "To defeat Data Execution Prevention (W^X / DEP) by chaining existing executable instruction sequences ending in ret"
          },
          {
            "id": "sec-adv-2-c",
            "label": "C",
            "text": "To accelerate reverse engineering by translating raw assembly opcodes into structured control flow graphs"
          },
          {
            "id": "sec-adv-2-d",
            "label": "D",
            "text": "To execute kernel shellcode by directly corrupting the hardware interrupt descriptor table from user space"
          }
        ],
        "correctOptionId": "sec-adv-2-b",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "rop-dep-bypass",
        "explanationAfterAnswer": "When memory regions are marked non-executable (DEP/NX), ROP circumvents this by reusing existing snippets of executable binary code ('gadgets') ending in return instructions to build arbitrary logic."
      },
      {
        "id": "sec-adv-3",
        "questionText": "How is Kernel Address Space Layout Randomization (KASLR) typically defeated during exploit development?",
        "options": [
          {
            "id": "sec-adv-3-a",
            "label": "A",
            "text": "By transmitting high-volume ICMP echo requests to exhaust kernel socket buffer memory allocations"
          },
          {
            "id": "sec-adv-3-b",
            "label": "B",
            "text": "By corrupting the system real-time clock to desynchronize kernel random number generator initialization"
          },
          {
            "id": "sec-adv-3-c",
            "label": "C",
            "text": "By using an information leak vulnerability that reveals a kernel pointer to calculate the randomized base offset"
          },
          {
            "id": "sec-adv-3-d",
            "label": "D",
            "text": "By modifying system security limits in user space configuration files to exceed kernel allocation limits"
          }
        ],
        "correctOptionId": "sec-adv-3-c",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "kaslr-bypass-infoleak",
        "explanationAfterAnswer": "KASLR randomizes the base memory location of kernel code. Attackers leverage an information disclosure bug that leaks a known kernel function pointer to calculate the base slide offset."
      },
      {
        "id": "sec-adv-4",
        "questionText": "In Kubernetes, which container configuration enables an attacker to perform a host node breakout?",
        "options": [
          {
            "id": "sec-adv-4-a",
            "label": "A",
            "text": "Configuring the pod to resolve DNS through cluster CoreDNS services rather than node-local caching daemons"
          },
          {
            "id": "sec-adv-4-b",
            "label": "B",
            "text": "Attaching a Horizontal Pod Autoscaler that adjusts pod replica counts based on CPU utilization metrics"
          },
          {
            "id": "sec-adv-4-c",
            "label": "C",
            "text": "Deploying a container image built on minimal Alpine Linux rather than an enterprise Linux distribution"
          },
          {
            "id": "sec-adv-4-d",
            "label": "D",
            "text": "Running in privileged mode with hostPID and hostNetwork enabled or the host filesystem mounted read-write"
          }
        ],
        "correctOptionId": "sec-adv-4-d",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "container-escape-privilege",
        "explanationAfterAnswer": "Privileged containers disable Linux cgroup and namespace isolation. Access to host devices or the root filesystem allows escape via chroot, device access, or cgroup release agent manipulation."
      },
      {
        "id": "sec-adv-5",
        "questionText": "What condition permits an attacker to perform a Blind Time-Based SQL Injection attack against an API?",
        "options": [
          {
            "id": "sec-adv-5-a",
            "label": "A",
            "text": "The endpoint returns identical responses regardless of query results, but evaluates injected delay functions"
          },
          {
            "id": "sec-adv-5-b",
            "label": "B",
            "text": "The database server exposes detailed error stack traces and internal schema definitions in HTTP 500 responses"
          },
          {
            "id": "sec-adv-5-c",
            "label": "C",
            "text": "The database connection pool suffers from connection starvation due to unindexed queries on large tables"
          },
          {
            "id": "sec-adv-5-d",
            "label": "D",
            "text": "The application communicates with the database over an unencrypted network connection without TLS verification"
          }
        ],
        "correctOptionId": "sec-adv-5-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "blind-time-based-sqli",
        "explanationAfterAnswer": "When an application leaks no data or differential error messages, an attacker injects conditional time-delay commands (like pg_sleep or WAITFOR DELAY) to infer data bit-by-bit from response times."
      },
      {
        "id": "sec-adv-6",
        "questionText": "In SAML 2.0 implementations, what design flaw enables XML Signature Wrapping (XSW) attacks?",
        "options": [
          {
            "id": "sec-adv-6-a",
            "label": "A",
            "text": "A mismatch between the XML structure used during signature canonicalization and that interpreted by the app"
          },
          {
            "id": "sec-adv-6-b",
            "label": "B",
            "text": "A mismatch between the XML node validated by the signature verifier and the node consumed by business logic"
          },
          {
            "id": "sec-adv-6-c",
            "label": "C",
            "text": "A mismatch between namespace resolution during signature verification and resolution during assertion processing"
          },
          {
            "id": "sec-adv-6-d",
            "label": "D",
            "text": "A mismatch between schema validation of the assertion and resolution of referenced signed element identifiers"
          }
        ],
        "correctOptionId": "sec-adv-6-b",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "saml-xml-signature-wrapping",
        "explanationAfterAnswer": "XSW exploits architectural discrepancies where signature verification validates an intact assertion, while business logic retrieves user claims from an unsigned, wrapped element elsewhere in the DOM."
      },
      {
        "id": "sec-adv-7",
        "questionText": "What cryptographic flaw made WPA2's 4-way handshake vulnerable to Key Reinstallation Attacks (KRACK)?",
        "options": [
          {
            "id": "sec-adv-7-a",
            "label": "A",
            "text": "The access point using weak Diffie-Hellman primes that allow pre-computation attacks against session keys"
          },
          {
            "id": "sec-adv-7-b",
            "label": "B",
            "text": "The authentication server transmitting the master pre-shared key in plaintext beacon frames during discovery"
          },
          {
            "id": "sec-adv-7-c",
            "label": "C",
            "text": "The client reinstalling an in-use pairwise key upon receiving retransmitted Message 3, resetting the packet counter"
          },
          {
            "id": "sec-adv-7-d",
            "label": "D",
            "text": "The wireless controller generating predictable initialization vectors during RC4 stream cipher encapsulation"
          }
        ],
        "correctOptionId": "sec-adv-7-c",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "krack-wpa2-handshake",
        "explanationAfterAnswer": "KRACK exploits Message 3 retransmission. When re-received, vulnerable clients reinstall the already active PTK and reset its transmit replay counter (nonce), enabling keystream reuse attacks."
      },
      {
        "id": "sec-adv-8",
        "questionText": "Why is ML-KEM (Kyber) categorized as lattice-based post-quantum cryptography?",
        "options": [
          {
            "id": "sec-adv-8-a",
            "label": "A",
            "text": "It employs quantum key distribution channels that leverage photon entanglement to detect eavesdropping on optical lines"
          },
          {
            "id": "sec-adv-8-b",
            "label": "B",
            "text": "It utilizes super-singular elliptic curve isogenies requiring exponential classical resources to compute path morphisms"
          },
          {
            "id": "sec-adv-8-c",
            "label": "C",
            "text": "It generates symmetric one-time pads derived from cosmic background radiation sensors embedded in security modules"
          },
          {
            "id": "sec-adv-8-d",
            "label": "D",
            "text": "Its security relies on high-dimensional lattice vector problems that cannot be solved efficiently by Shor's algorithm"
          }
        ],
        "correctOptionId": "sec-adv-8-d",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "post-quantum-lattice-crypto",
        "explanationAfterAnswer": "ML-KEM security reduces to the Module Learning with Errors (M-LWE) problem over high-dimensional lattices, which resists both classical algorithms and quantum attacks based on Shor's algorithm."
      },
      {
        "id": "sec-adv-9",
        "questionText": "In eBPF security observability tooling, how can a root-privileged adversary attempt to blind kernel telemetry?",
        "options": [
          {
            "id": "sec-adv-9-a",
            "label": "A",
            "text": "By detaching kernel tracepoints via bpf syscalls or flooding the ring buffer to induce massive unlogged event drops"
          },
          {
            "id": "sec-adv-9-b",
            "label": "B",
            "text": "By modifying userspace /etc/resolv.conf configuration files to redirect internal DNS queries to external resolvers"
          },
          {
            "id": "sec-adv-9-c",
            "label": "C",
            "text": "By installing unapproved compilers on the host worker node to trigger local static binary analysis warnings"
          },
          {
            "id": "sec-adv-9-d",
            "label": "D",
            "text": "By adjusting system timezone configurations to create clock drift between worker nodes and the control plane"
          }
        ],
        "correctOptionId": "sec-adv-9-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "ebpf-telemetry-evasion",
        "explanationAfterAnswer": "An adversary with root or CAP_BPF can interact directly with the bpf() syscall to detach attached probes, corrupt BPF maps, or generate high-volume synthetic events to overflow ring buffers."
      },
      {
        "id": "sec-adv-10",
        "questionText": "Which defense mechanism specifically protects cloud instance metadata endpoints (169.254.169.254) against SSRF?",
        "options": [
          {
            "id": "sec-adv-10-a",
            "label": "A",
            "text": "Configuring public DNS records to map internal private IP subnets to corporate reverse proxy load balancers"
          },
          {
            "id": "sec-adv-10-b",
            "label": "B",
            "text": "Enforcing IMDSv2 requiring session-oriented PUT requests with signed token headers alongside strict egress filtering"
          },
          {
            "id": "sec-adv-10-c",
            "label": "C",
            "text": "Encoding all outbound HTTP request bodies into base64 strings before transmitting them over network gateways"
          },
          {
            "id": "sec-adv-10-d",
            "label": "D",
            "text": "Enforcing multi-factor authentication on all administrative SSH connections established to worker compute nodes"
          }
        ],
        "correctOptionId": "sec-adv-10-b",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "imdsv2-ssrf-mitigation",
        "explanationAfterAnswer": "IMDSv2 requires clients to first execute a PUT request to generate a session token (which standard SSRF vectors cannot easily forge) before querying metadata, and sets token hop limits to block proxies."
      }
    ]
  },
  "ai-ml": {
    "beginner": [
      {
        "id": "ai-beg-1",
        "questionText": "What distinguishes supervised learning from unsupervised learning in machine learning?",
        "options": [
          {
            "id": "ai-beg-1-a",
            "label": "A",
            "text": "Supervised learning requires continuous GPU hardware acceleration, while unsupervised runs on low-power mobile devices"
          },
          {
            "id": "ai-beg-1-b",
            "label": "B",
            "text": "Supervised learning exclusively processes numerical tabular arrays, while unsupervised processes audio recordings"
          },
          {
            "id": "ai-beg-1-c",
            "label": "C",
            "text": "Supervised learning trains on labeled input-output pairs, while unsupervised finds inherent patterns in unlabeled data"
          },
          {
            "id": "ai-beg-1-d",
            "label": "D",
            "text": "Supervised learning updates weights through reinforcement rewards, while unsupervised uses fixed decision tree thresholds"
          }
        ],
        "correctOptionId": "ai-beg-1-c",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "supervised-vs-unsupervised",
        "explanationAfterAnswer": "Supervised learning models learn mappings from feature inputs to known ground-truth target labels, whereas unsupervised learning discovers clusters, manifolds, or latent representations without external labels."
      },
      {
        "id": "ai-beg-2",
        "questionText": "What does 'overfitting' mean when training a machine learning model?",
        "options": [
          {
            "id": "ai-beg-2-a",
            "label": "A",
            "text": "The model runs out of available memory space during stochastic gradient descent batch processing"
          },
          {
            "id": "ai-beg-2-b",
            "label": "B",
            "text": "The model converges too rapidly because the learning rate was initialized to an excessively small value"
          },
          {
            "id": "ai-beg-2-c",
            "label": "C",
            "text": "The model requires continuous feature normalization to handle extreme floating-point numerical ranges"
          },
          {
            "id": "ai-beg-2-d",
            "label": "D",
            "text": "The model memorizes noise in the training set and fails to generalize effectively to unseen test data"
          }
        ],
        "correctOptionId": "ai-beg-2-d",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "overfitting-concepts",
        "explanationAfterAnswer": "Overfitting occurs when a high-capacity model captures idiosyncrasies and random noise in the training dataset rather than true underlying relationships, leading to high training accuracy but poor test performance."
      },
      {
        "id": "ai-beg-3",
        "questionText": "What is the primary role of an activation function in an artificial neural network?",
        "options": [
          {
            "id": "ai-beg-3-a",
            "label": "A",
            "text": "To introduce non-linearity, enabling the network to learn complex non-linear functional mappings"
          },
          {
            "id": "ai-beg-3-b",
            "label": "B",
            "text": "To compress high-resolution multi-channel image tensors into lower-dimensional dense embedding vectors"
          },
          {
            "id": "ai-beg-3-c",
            "label": "C",
            "text": "To calculate the final validation accuracy metrics across batches at the end of each training epoch"
          },
          {
            "id": "ai-beg-3-d",
            "label": "D",
            "text": "To initialize weight matrices using zero-mean Gaussian distributions before gradient updates begin"
          }
        ],
        "correctOptionId": "ai-beg-3-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "neural-activation-functions",
        "explanationAfterAnswer": "Without non-linear activation functions (like ReLU or GELU), stacking linear layers collapses mathematically into a single linear transformation, preventing the network from modeling non-linear functions."
      },
      {
        "id": "ai-beg-4",
        "questionText": "Why is a dataset partitioned into distinct training, validation, and test splits?",
        "options": [
          {
            "id": "ai-beg-4-a",
            "label": "A",
            "text": "To prevent data duplication and reduce the storage space required by relational database indexes"
          },
          {
            "id": "ai-beg-4-b",
            "label": "B",
            "text": "To train parameters, tune hyperparameters objectively, and evaluate final generalization performance"
          },
          {
            "id": "ai-beg-4-c",
            "label": "C",
            "text": "To distribute forward pass tensor operations evenly across multiple GPU compute nodes in parallel"
          },
          {
            "id": "ai-beg-4-d",
            "label": "D",
            "text": "To ensure that model hyperparameters can be dynamically adjusted during real-time client inference"
          }
        ],
        "correctOptionId": "ai-beg-4-b",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "train-val-test-split",
        "explanationAfterAnswer": "The training set fits model parameters, the validation set guides hyperparameter tuning and model selection without test leakage, and the test set provides an unbiased evaluation of generalization."
      },
      {
        "id": "ai-beg-5",
        "questionText": "In classification tasks, what metric calculates the proportion of true positive predictions among all positive predictions made?",
        "options": [
          {
            "id": "ai-beg-5-a",
            "label": "A",
            "text": "Recall, measuring what proportion of all actual positive ground truth cases were successfully retrieved"
          },
          {
            "id": "ai-beg-5-b",
            "label": "B",
            "text": "Accuracy, measuring the total percentage of correct predictions across all binary class labels"
          },
          {
            "id": "ai-beg-5-c",
            "label": "C",
            "text": "Precision, measuring how many of the positively predicted instances were actually true positive cases"
          },
          {
            "id": "ai-beg-5-d",
            "label": "D",
            "text": "Specificity, measuring the proportion of true negative instances that were correctly categorized"
          }
        ],
        "correctOptionId": "ai-beg-5-c",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "classification-precision-recall",
        "explanationAfterAnswer": "Precision is defined as TP / (TP + FP), indicating the purity of positive predictions. Recall is TP / (TP + FN), measuring coverage of actual positive samples."
      },
      {
        "id": "ai-beg-6",
        "questionText": "A customer churn prediction model has 98% accuracy on a dataset where 98% of users never churn. What is the issue?",
        "options": [
          {
            "id": "ai-beg-6-a",
            "label": "A",
            "text": "The neural network architecture has too many hidden layers, causing severe vanishing gradient descent"
          },
          {
            "id": "ai-beg-6-b",
            "label": "B",
            "text": "The learning rate was configured too high, causing the optimizer to skip past optimal cost function minima"
          },
          {
            "id": "ai-beg-6-c",
            "label": "C",
            "text": "The training dataset requires transformation using principal component analysis to reduce dimensionality"
          },
          {
            "id": "ai-beg-6-d",
            "label": "D",
            "text": "The accuracy metric is misleading due to class imbalance because predicting the majority class yields high accuracy"
          }
        ],
        "correctOptionId": "ai-beg-6-d",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "class-imbalance-metrics",
        "explanationAfterAnswer": "Under severe class imbalance, a naive model predicting only the majority class achieves high overall accuracy while failing entirely to identify the minority class of interest (churners). Precision, recall, and PR-AUC are required."
      },
      {
        "id": "ai-beg-7",
        "questionText": "Why is feature scaling (e.g. Standardization or Min-Max normalization) important for gradient-based algorithms?",
        "options": [
          {
            "id": "ai-beg-7-a",
            "label": "A",
            "text": "It prevents large-magnitude features from dominating gradients, enabling faster and smoother convergence"
          },
          {
            "id": "ai-beg-7-b",
            "label": "B",
            "text": "It converts categorical string variables directly into dense continuous numerical embedding vectors"
          },
          {
            "id": "ai-beg-7-c",
            "label": "C",
            "text": "It completely eliminates the mathematical need to compute loss function gradients during backpropagation"
          },
          {
            "id": "ai-beg-7-d",
            "label": "D",
            "text": "It guarantees that decision tree split thresholds remain invariant across multi-threaded data batches"
          }
        ],
        "correctOptionId": "ai-beg-7-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "feature-scaling-gradient-descent",
        "explanationAfterAnswer": "Disparate feature scales warp loss surfaces into elongated ellipses, causing gradient descent to oscillate erratically. Scaling normalizes contour curvature, allowing direct and stable convergence."
      },
      {
        "id": "ai-beg-8",
        "questionText": "Which technique helps prevent a deep neural network from overfitting during training?",
        "options": [
          {
            "id": "ai-beg-8-a",
            "label": "A",
            "text": "Increasing model capacity by adding several dense layers with random weight initialization"
          },
          {
            "id": "ai-beg-8-b",
            "label": "B",
            "text": "Applying Dropout to randomly deactivate a subset of neuron activations during each training step"
          },
          {
            "id": "ai-beg-8-c",
            "label": "C",
            "text": "Removing all activation functions so the network functions purely as a series of linear matrices"
          },
          {
            "id": "ai-beg-8-d",
            "label": "D",
            "text": "Increasing the batch size until it equals the total number of samples in the entire dataset"
          }
        ],
        "correctOptionId": "ai-beg-8-b",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "dropout-regularization",
        "explanationAfterAnswer": "Dropout acts as a regularizer by randomly zeroing out neuron outputs during training passes, preventing co-adaptation of feature representations and encouraging redundant, robust representations."
      },
      {
        "id": "ai-beg-9",
        "questionText": "An image classification model achieves 99% accuracy on training data but drops to 62% on validation data. What action is indicated?",
        "options": [
          {
            "id": "ai-beg-9-a",
            "label": "A",
            "text": "Increase model complexity by tripling the channel depth of every convolutional feature extractor"
          },
          {
            "id": "ai-beg-9-b",
            "label": "B",
            "text": "Switch the optimizer from Adam to gradient ascent to force the loss function toward zero error"
          },
          {
            "id": "ai-beg-9-c",
            "label": "C",
            "text": "Add data augmentation and weight decay regularization to constrain variance and reduce overfitting"
          },
          {
            "id": "ai-beg-9-d",
            "label": "D",
            "text": "Eliminate all validation samples and evaluate exclusively on the high-performing training split"
          }
        ],
        "correctOptionId": "ai-beg-9-c",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "high-variance-regularization",
        "explanationAfterAnswer": "A large generalization gap (99% train vs 62% val) is the classic hallmark of high variance (overfitting). Effective remediations include data augmentation, L2 regularization (weight decay), and reducing architecture capacity."
      },
      {
        "id": "ai-beg-10",
        "questionText": "What does the learning rate hyperparameter control in gradient descent optimization?",
        "options": [
          {
            "id": "ai-beg-10-a",
            "label": "A",
            "text": "The total number of epochs the model is permitted to train before early stopping triggers"
          },
          {
            "id": "ai-beg-10-b",
            "label": "B",
            "text": "The ratio of training samples allocated to validation testing during K-fold cross-validation"
          },
          {
            "id": "ai-beg-10-c",
            "label": "C",
            "text": "The threshold value used to convert continuous probability predictions into binary class decisions"
          },
          {
            "id": "ai-beg-10-d",
            "label": "D",
            "text": "The step size taken in the negative gradient direction to update model weights during each step"
          }
        ],
        "correctOptionId": "ai-beg-10-d",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "learning-rate-mechanics",
        "explanationAfterAnswer": "The learning rate scales the magnitude of parameter updates with respect to the gradient of the loss function. Too large causes divergence; too small leads to excessively slow convergence."
      }
    ],
    "intermediate": [
      {
        "id": "ai-int-1",
        "questionText": "How does the self-attention mechanism in Transformer models capture contextual relationships across a sequence?",
        "options": [
          {
            "id": "ai-int-1-a",
            "label": "A",
            "text": "By computing scaled dot-product attention scores between Query, Key, and Value projections of all tokens"
          },
          {
            "id": "ai-int-1-b",
            "label": "B",
            "text": "By sliding fixed-size convolutional kernels across sequential token embeddings to pool localized n-gram patterns"
          },
          {
            "id": "ai-int-1-c",
            "label": "C",
            "text": "By passing hidden state vectors sequentially through recurrent feedback loops with gate reset operations"
          },
          {
            "id": "ai-int-1-d",
            "label": "D",
            "text": "By projecting token counts through singular value decomposition to extract latent topic frequencies"
          }
        ],
        "correctOptionId": "ai-int-1-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "transformer-self-attention",
        "explanationAfterAnswer": "Self-attention computes attention weights between Query and Key representations of every token pair via softmax(QK^T / sqrt(d_k)), creating weighted aggregations of Value vectors across the entire context window in parallel."
      },
      {
        "id": "ai-int-2",
        "questionText": "What is the primary architectural purpose of residual connections (skip connections) in deep neural networks?",
        "options": [
          {
            "id": "ai-int-2-a",
            "label": "A",
            "text": "To compress weight matrices by projecting dense tensor representations into sparse lower-dimensional spaces"
          },
          {
            "id": "ai-int-2-b",
            "label": "B",
            "text": "To mitigate vanishing gradients by providing an unimpeded identity shortcut for backward gradient flow"
          },
          {
            "id": "ai-int-2-c",
            "label": "C",
            "text": "To replace non-linear activation functions with deterministic mathematical identity transformations"
          },
          {
            "id": "ai-int-2-d",
            "label": "D",
            "text": "To dynamically re-order training input batches according to individual sample loss magnitudes"
          }
        ],
        "correctOptionId": "ai-int-2-b",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "residual-connections-gradients",
        "explanationAfterAnswer": "Residual connections (F(x) + x) permit gradients to propagate directly through the identity path during backpropagation without repeated matrix attenuations, enabling stable training of very deep architectures."
      },
      {
        "id": "ai-int-3",
        "questionText": "What is the fundamental difference between Bagging (e.g. Random Forest) and Boosting (e.g. XGBoost)?",
        "options": [
          {
            "id": "ai-int-3-a",
            "label": "A",
            "text": "Bagging exclusively uses deep neural networks, while Boosting is restricted to shallow linear regression models"
          },
          {
            "id": "ai-int-3-b",
            "label": "B",
            "text": "Bagging trains on unlabeled unsupervised data, while Boosting requires continuous reward signals from environments"
          },
          {
            "id": "ai-int-3-c",
            "label": "C",
            "text": "Bagging trains independent models in parallel to reduce variance, while Boosting trains sequentially to reduce bias"
          },
          {
            "id": "ai-int-3-d",
            "label": "D",
            "text": "Bagging assigns exponential sample weights to hard examples, while Boosting averages unweighted predictions"
          }
        ],
        "correctOptionId": "ai-int-3-c",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "bagging-vs-boosting",
        "explanationAfterAnswer": "Bagging averages predictions from independently trained high-variance base estimators on bootstrap samples (variance reduction). Boosting trains estimators sequentially, with each subsequent model focusing on the residuals/errors of predecessors (bias reduction)."
      },
      {
        "id": "ai-int-4",
        "questionText": "When evaluating an information retrieval system or search engine, what does Mean Reciprocal Rank (MRR) evaluate?",
        "options": [
          {
            "id": "ai-int-4-a",
            "label": "A",
            "text": "The average cosine similarity score computed across all document embedding vectors in the index"
          },
          {
            "id": "ai-int-4-b",
            "label": "B",
            "text": "The proportion of retrieved documents that contain exact keyword matches in their title tags"
          },
          {
            "id": "ai-int-4-c",
            "label": "C",
            "text": "The execution latency required by the vector database to perform approximate nearest neighbor lookups"
          },
          {
            "id": "ai-int-4-d",
            "label": "D",
            "text": "The average reciprocal rank of the first relevant retrieved result across a set of queries"
          }
        ],
        "correctOptionId": "ai-int-4-d",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "information-retrieval-mrr",
        "explanationAfterAnswer": "MRR is calculated as (1/|Q|) * sum(1 / rank_i) for the first relevant document returned for each query Q_i. It evaluates whether the top-ranked recommendation is relevant."
      },
      {
        "id": "ai-int-5",
        "questionText": "How does Low-Rank Adaptation (LoRA) enable parameter-efficient fine-tuning (PEFT) of large language models?",
        "options": [
          {
            "id": "ai-int-5-a",
            "label": "A",
            "text": "By freezing pretrained weights and injecting trainable low-rank rank decomposition matrices into attention layers"
          },
          {
            "id": "ai-int-5-b",
            "label": "B",
            "text": "By pruning the bottom 80% of least activated attention heads and fine-tuning only the remaining layers"
          },
          {
            "id": "ai-int-5-c",
            "label": "C",
            "text": "By quantizing all floating-point weight tensors to 1-bit binary representations during forward passes"
          },
          {
            "id": "ai-int-5-d",
            "label": "D",
            "text": "By training a separate lightweight distilled model to generate prompts for the frozen base foundation model"
          }
        ],
        "correctOptionId": "ai-int-5-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "lora-peft-fine-tuning",
        "explanationAfterAnswer": "LoRA decomposes the weight update delta W = B * A, where B and A are low-rank matrices (e.g. rank 8). Original weights remain frozen, reducing trainable parameters by orders of magnitude."
      },
      {
        "id": "ai-int-6",
        "questionText": "In a medical diagnosis task where failing to detect an illness is catastrophic, which metric should the model prioritize?",
        "options": [
          {
            "id": "ai-int-6-a",
            "label": "A",
            "text": "Precision, to ensure that every patient predicted as positive is guaranteed to have the condition"
          },
          {
            "id": "ai-int-6-b",
            "label": "B",
            "text": "Recall, to minimize false negatives and ensure almost all actual positive cases are detected"
          },
          {
            "id": "ai-int-6-c",
            "label": "C",
            "text": "Specificity, to ensure that healthy individuals are never subjected to secondary confirmation tests"
          },
          {
            "id": "ai-int-6-d",
            "label": "D",
            "text": "Cohen's Kappa, to measure agreement between multiple independent statistical baseline classifiers"
          }
        ],
        "correctOptionId": "ai-int-6-b",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "cost-sensitive-metric-selection",
        "explanationAfterAnswer": "When false negatives (missing a sick patient) carry high penalties, high recall is critical (Recall = TP / (TP + FN)). Lower precision produces false alarms, which can be ruled out by follow-up tests."
      },
      {
        "id": "ai-int-7",
        "questionText": "What problem arises when applying Batch Normalization with an extremely small micro-batch size (e.g. 2 samples per worker)?",
        "options": [
          {
            "id": "ai-int-7-a",
            "label": "A",
            "text": "Memory allocation explodes because smaller batches require exponential tensor padding in CUDA kernels"
          },
          {
            "id": "ai-int-7-b",
            "label": "B",
            "text": "Gradient tensors become completely zeroed out due to mathematical floating-point underflow"
          },
          {
            "id": "ai-int-7-c",
            "label": "C",
            "text": "High variance in batch mean and variance estimates introduces noisy normalization and degrades model convergence"
          },
          {
            "id": "ai-int-7-d",
            "label": "D",
            "text": "The network becomes mathematically equivalent to an unregularized single-layer perceptron"
          }
        ],
        "correctOptionId": "ai-int-7-c",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "batch-normalization-batch-size",
        "explanationAfterAnswer": "Batch Normalization relies on mini-batch statistics to estimate population mean and variance. Small batch sizes yield noisy, inaccurate estimates, destabilizing training. Group Normalization or Layer Normalization is preferred."
      },
      {
        "id": "ai-int-8",
        "questionText": "What distinguishes semantic search using dense vector embeddings from traditional BM25 lexical keyword search?",
        "options": [
          {
            "id": "ai-int-8-a",
            "label": "A",
            "text": "Dense embeddings execute without requiring any vector indexing structures or computational storage"
          },
          {
            "id": "ai-int-8-b",
            "label": "B",
            "text": "BM25 is trained end-to-end via gradient descent, while dense embeddings rely on inverted document index files"
          },
          {
            "id": "ai-int-8-c",
            "label": "C",
            "text": "BM25 evaluates multi-modal images, while dense embeddings are mathematically restricted to ASCII characters"
          },
          {
            "id": "ai-int-8-d",
            "label": "D",
            "text": "Dense embeddings capture conceptual meaning and synonyms, while BM25 matches exact lexical term overlap"
          }
        ],
        "correctOptionId": "ai-int-8-d",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "dense-embeddings-vs-bm25",
        "explanationAfterAnswer": "BM25 scores documents based on term frequency and inverse document frequency of exact keywords. Dense vector embeddings (from bi-encoders) represent text in semantic latent spaces, matching concepts even with zero word overlap."
      },
      {
        "id": "ai-int-9",
        "questionText": "Why is the Softmax temperature parameter adjusted during language model generation?",
        "options": [
          {
            "id": "ai-int-9-a",
            "label": "A",
            "text": "Lowering temperature sharpens the distribution toward top tokens, producing more deterministic output"
          },
          {
            "id": "ai-int-9-b",
            "label": "B",
            "text": "Lowering temperature flattens token logits toward a uniform distribution to maximize generation randomness"
          },
          {
            "id": "ai-int-9-c",
            "label": "C",
            "text": "Temperature controls the learning rate decay schedule applied to weights during speculative decoding"
          },
          {
            "id": "ai-int-9-d",
            "label": "D",
            "text": "Temperature scales GPU core clock frequencies dynamically during continuous batch token generation"
          }
        ],
        "correctOptionId": "ai-int-9-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "softmax-temperature-sampling",
        "explanationAfterAnswer": "Dividing logits by temperature T before softmax controls distribution entropy. As T -> 0, the distribution concentrates on the highest-probability token (argmax); as T increases, it spreads probability across more tokens."
      },
      {
        "id": "ai-int-10",
        "questionText": "In a Retrieval-Augmented Generation (RAG) pipeline, what is the primary purpose of a re-ranker model?",
        "options": [
          {
            "id": "ai-int-10-a",
            "label": "A",
            "text": "To compress large document collections into summarized plain-text chunks before initial vector indexing"
          },
          {
            "id": "ai-int-10-b",
            "label": "B",
            "text": "To perform cross-encoder scoring on candidate retrieved chunks to order them accurately by query relevance"
          },
          {
            "id": "ai-int-10-c",
            "label": "C",
            "text": "To translate non-English user queries into standardized English before running semantic embedding lookups"
          },
          {
            "id": "ai-int-10-d",
            "label": "D",
            "text": "To automatically delete outdated documentation records from vector databases after each generation request"
          }
        ],
        "correctOptionId": "ai-int-10-b",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "rag-cross-encoder-reranker",
        "explanationAfterAnswer": "First-stage retrieval (bi-encoders / BM25) is fast but retrieves false positives. A cross-encoder re-ranker performs full joint attention over (query, document) pairs, producing highly accurate relevance rankings for the LLM context."
      }
    ],
    "advanced": [
      {
        "id": "ai-adv-1",
        "questionText": "In Large Language Models, what key computational bottleneck does FlashAttention resolve in the standard self-attention operation?",
        "options": [
          {
            "id": "ai-adv-1-a",
            "label": "A",
            "text": "It replaces multi-head attention with static feed-forward networks using low-rank singular value decompositions"
          },
          {
            "id": "ai-adv-1-b",
            "label": "B",
            "text": "It converts token embeddings from floating-point tensors into ternary integer representations before softmax operations"
          },
          {
            "id": "ai-adv-1-c",
            "label": "C",
            "text": "It tiles attention computation to avoid materializing the full N x N attention matrix in slow GPU High Bandwidth Memory"
          },
          {
            "id": "ai-adv-1-d",
            "label": "D",
            "text": "It splits model parameters across distributed GPU clusters using pipeline parallelism and zero-redundancy buffers"
          }
        ],
        "correctOptionId": "ai-adv-1-c",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "flash-attention-io-awareness",
        "explanationAfterAnswer": "Standard attention reads and writes the intermediate N x N attention matrix to slow GPU HBM repeatedly. FlashAttention is IO-aware: it tiles Q, K, V blocks into fast on-chip SRAM, computing softmax online without materializing the full N x N matrix in HBM."
      },
      {
        "id": "ai-adv-2",
        "questionText": "How does Direct Preference Optimization (DPO) simplify alignment compared to traditional RLHF with PPO?",
        "options": [
          {
            "id": "ai-adv-2-a",
            "label": "A",
            "text": "It trains an independent discriminator network to classify generated outputs as human or synthetic in real time"
          },
          {
            "id": "ai-adv-2-b",
            "label": "B",
            "text": "It replaces supervised fine-tuning by optimizing continuous reinforcement rewards through actor-critic networks"
          },
          {
            "id": "ai-adv-2-c",
            "label": "C",
            "text": "It uses evolutionary genetic algorithms to mutate model weight checkpoints across distributed worker pools"
          },
          {
            "id": "ai-adv-2-d",
            "label": "D",
            "text": "It mathematically derives an exact closed-form policy loss directly from preference data, eliminating the reward model"
          }
        ],
        "correctOptionId": "ai-adv-2-d",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "dpo-vs-ppo-alignment",
        "explanationAfterAnswer": "DPO leverages the analytical mapping between the optimal policy and the reward function under Bradley-Terry preferences, training the policy directly on (chosen, rejected) pairs using binary cross-entropy without training an explicit reward model or sampling with PPO."
      },
      {
        "id": "ai-adv-3",
        "questionText": "What problem in multi-GPU distributed training does the ZeRO-3 (Zero Redundancy Optimizer) memory optimization eliminate?",
        "options": [
          {
            "id": "ai-adv-3-a",
            "label": "A",
            "text": "It eliminates redundant weight tensor replications by sharding optimizer states, gradients, and model parameters across GPUs"
          },
          {
            "id": "ai-adv-3-b",
            "label": "B",
            "text": "It removes the requirement for inter-node InfiniBand network fabrics by compressing gradient updates to 1-bit representations"
          },
          {
            "id": "ai-adv-3-c",
            "label": "C",
            "text": "It replaces all backward pass backpropagation steps with localized forward-mode automatic differentiation passes"
          },
          {
            "id": "ai-adv-3-d",
            "label": "D",
            "text": "It prevents CUDA out-of-memory errors by storing all training datasets exclusively in host CPU swap memory partitions"
          }
        ],
        "correctOptionId": "ai-adv-3-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "zero3-distributed-training",
        "explanationAfterAnswer": "Standard data parallelism replicates model states on every GPU. ZeRO Stage 1 shards optimizer states, Stage 2 shards gradients, and Stage 3 shards model parameters, eliminating all redundant state memory across ranks."
      },
      {
        "id": "ai-adv-4",
        "questionText": "In diffusion models, what is the mathematical role of Classifier-Free Guidance (CFG) during sampling?",
        "options": [
          {
            "id": "ai-adv-4-a",
            "label": "A",
            "text": "It trains an auxiliary image classification head to filter out corrupted latent representations before decoding"
          },
          {
            "id": "ai-adv-4-b",
            "label": "B",
            "text": "It extrapolates the score estimate between conditioned and unconditioned noise predictions to trade diversity for fidelity"
          },
          {
            "id": "ai-adv-4-c",
            "label": "C",
            "text": "It speeds up reverse ODE solvers by skipping intermediate denoising timesteps through bicubic interpolation"
          },
          {
            "id": "ai-adv-4-d",
            "label": "D",
            "text": "It projects continuous noise trajectories onto discrete manifolds using variational autoencoder codebooks"
          }
        ],
        "correctOptionId": "ai-adv-4-b",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "classifier-free-guidance-diffusion",
        "explanationAfterAnswer": "CFG computes updated noise estimates as eps_tilde = eps_uncond + s * (eps_cond - eps_uncond). Increasing guidance scale s shifts generation toward the conditioning prompt, boosting alignment and visual fidelity at the expense of sample diversity."
      },
      {
        "id": "ai-adv-5",
        "questionText": "Why does RoPE (Rotary Position Embedding) exhibit superior length extrapolation compared to absolute positional embeddings?",
        "options": [
          {
            "id": "ai-adv-5-a",
            "label": "A",
            "text": "It stores positional indices in discrete learned lookup tables that expand dynamically as sequence tokens arrive"
          },
          {
            "id": "ai-adv-5-b",
            "label": "B",
            "text": "It uses sinusoidal wave frequencies that decay to zero after the first two thousand input context tokens"
          },
          {
            "id": "ai-adv-5-c",
            "label": "C",
            "text": "It encodes position by multiplying Query and Key vectors by orthogonal 2D rotation matrices, making inner products relative"
          },
          {
            "id": "ai-adv-5-d",
            "label": "D",
            "text": "It computes distance penalties purely based on absolute character offsets from the start of the document"
          }
        ],
        "correctOptionId": "ai-adv-5-c",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "rope-rotary-position-embedding",
        "explanationAfterAnswer": "RoPE rotates representation vectors in complex 2D planes according to position. When computing dot products <R_m q, R_n k>, the result depends strictly on the relative distance (m - n), enabling natural relative attention decay and length extrapolation techniques."
      },
      {
        "id": "ai-adv-6",
        "questionText": "What specific failure mode occurs in Mixture-of-Experts (MoE) architectures without auxiliary load-balancing loss terms?",
        "options": [
          {
            "id": "ai-adv-6-a",
            "label": "A",
            "text": "The model runs out of parameters because expert weights are continually overwritten by the central router head"
          },
          {
            "id": "ai-adv-6-b",
            "label": "B",
            "text": "Loss function gradients become identically zero across all feed-forward networks due to floating-point underflow"
          },
          {
            "id": "ai-adv-6-c",
            "label": "C",
            "text": "Top-k routing switches from sparse gating to dense feed-forward evaluation, exhausting available GPU memory"
          },
          {
            "id": "ai-adv-6-d",
            "label": "D",
            "text": "Routing collapse occurs where the gating router routes all tokens to only a small subset of experts, starving the others"
          }
        ],
        "correctOptionId": "ai-adv-6-d",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "moe-routing-collapse",
        "explanationAfterAnswer": "Without auxiliary load balancing, a positive feedback loop develops: slightly better experts receive more tokens and optimize faster, causing the router to send even more tokens to them, leaving other experts underutilized ('expert collapse')."
      },
      {
        "id": "ai-adv-7",
        "questionText": "In model quantization, how does Activation-aware Weight Quantization (AWQ) protect model performance at 4-bit precision?",
        "options": [
          {
            "id": "ai-adv-7-a",
            "label": "A",
            "text": "By identifying salient weight channels corresponding to high-magnitude activation features and protecting them from quantization error"
          },
          {
            "id": "ai-adv-7-b",
            "label": "B",
            "text": "By pruning attention weights entirely and replacing dense matrix multiplications with sparse lookup dictionaries"
          },
          {
            "id": "ai-adv-7-c",
            "label": "C",
            "text": "By converting all model weights into 8-bit integers while maintaining activations in full 32-bit floating point"
          },
          {
            "id": "ai-adv-7-d",
            "label": "D",
            "text": "By fine-tuning the quantized model over hundreds of millions of domain-specific tokens using AdamW optimization"
          }
        ],
        "correctOptionId": "ai-adv-7-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "awq-quantization-mechanics",
        "explanationAfterAnswer": "AWQ observes that not all weights are equally important: weights that interact with large-magnitude activation channels are critical. By scaling up salient channels before uniform quantization, relative rounding error on critical weights is minimized."
      },
      {
        "id": "ai-adv-8",
        "questionText": "What architectural vulnerability allows jailbreak attacks via Adversarial Suffixes (GCG) to bypass LLM safety alignment?",
        "options": [
          {
            "id": "ai-adv-8-a",
            "label": "A",
            "text": "The input buffer overflows into system prompt memory space, overwriting constitutional safety directives in RAM"
          },
          {
            "id": "ai-adv-8-b",
            "label": "B",
            "text": "Gradient-based search finds adversarial token sequences whose embeddings steer next-token probabilities toward affirmative compliance"
          },
          {
            "id": "ai-adv-8-c",
            "label": "C",
            "text": "Adversarial tokens force the tokenizer to output corrupted Unicode codepoints that crash downstream safety filters"
          },
          {
            "id": "ai-adv-8-d",
            "label": "D",
            "text": "Suffixes trigger speculative decoding routines that skip safety classifier checks during high-throughput inference"
          }
        ],
        "correctOptionId": "ai-adv-8-b",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "gcg-adversarial-suffix-jailbreak",
        "explanationAfterAnswer": "Greedy Coordinate Gradient (GCG) attacks compute token gradients with respect to a target response (e.g. 'Sure, here is...'). The resulting adversarial suffix manipulates the attention state to override safety fine-tuning."
      },
      {
        "id": "ai-adv-9",
        "questionText": "In Speculative Decoding, how is mathematical equivalence to the target model's output distribution strictly guaranteed?",
        "options": [
          {
            "id": "ai-adv-9-a",
            "label": "A",
            "text": "The draft model is trained with knowledge distillation until its parameter weights become identical to the target model"
          },
          {
            "id": "ai-adv-9-b",
            "label": "B",
            "text": "The target model only accepts draft tokens that match the greedy top-1 prediction computed over full vocabulary logits"
          },
          {
            "id": "ai-adv-9-c",
            "label": "C",
            "text": "Draft tokens are evaluated via speculative rejection sampling, accepting with min(1, p_target/p_draft) and resampling upon rejection"
          },
          {
            "id": "ai-adv-9-d",
            "label": "D",
            "text": "Draft token sequences are verified by an external reward model that assigns deterministic quality confidence scores"
          }
        ],
        "correctOptionId": "ai-adv-9-c",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "speculative-decoding-rejection-sampling",
        "explanationAfterAnswer": "Speculative decoding uses a lightweight draft model to generate K tokens, then verifies them in parallel on the target model. Using modified rejection sampling (accept with min(1, p/q) and sample adjusted residual on rejection), the exact target distribution is preserved."
      },
      {
        "id": "ai-adv-10",
        "questionText": "Why do Deep Double Descent curves contradict classical statistical learning theory regarding model complexity?",
        "options": [
          {
            "id": "ai-adv-10-a",
            "label": "A",
            "text": "Increasing model parameters causes training error to increase monotonically while validation error approaches zero"
          },
          {
            "id": "ai-adv-10-b",
            "label": "B",
            "text": "Adding regularization penalties always increases test error once models exceed five hundred million parameters"
          },
          {
            "id": "ai-adv-10-c",
            "label": "C",
            "text": "Test error remains completely flat regardless of whether the model has ten parameters or ten billion parameters"
          },
          {
            "id": "ai-adv-10-d",
            "label": "D",
            "text": "Beyond the interpolation threshold where models fit training data perfectly, test error decreases again as overparameterization grows"
          }
        ],
        "correctOptionId": "ai-adv-10-d",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "deep-double-descent-phenomenon",
        "explanationAfterAnswer": "Classical theory predicts increasing test error past capacity due to overfitting. Double descent shows test error peaks at the interpolation threshold (zero training error), but then declines again in the heavily overparameterized regime due to inductive bias toward minimum-norm solutions."
      }
    ]
  },
  "cloud": {
    "beginner": [
      {
        "id": "cld-beg-1",
        "questionText": "What distinguishes Infrastructure as a Service (IaaS) from Platform as a Service (PaaS)?",
        "options": [
          {
            "id": "cld-beg-1-a",
            "label": "A",
            "text": "IaaS provides raw virtual compute and networking where users manage OS, while PaaS provides managed runtimes for code"
          },
          {
            "id": "cld-beg-1-b",
            "label": "B",
            "text": "IaaS is hosted exclusively on private on-premise hardware, while PaaS is deployed across public cloud data centers"
          },
          {
            "id": "cld-beg-1-c",
            "label": "C",
            "text": "IaaS requires specialized container orchestration engines, while PaaS operates purely on bare-metal physical servers"
          },
          {
            "id": "cld-beg-1-d",
            "label": "D",
            "text": "IaaS bills customers based on application user counts, while PaaS bills based on static network IP reservations"
          }
        ],
        "correctOptionId": "cld-beg-1-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "iaas-vs-paas",
        "explanationAfterAnswer": "Under IaaS (e.g. AWS EC2, GCP Compute Engine), providers manage physical hardware and virtualization, while users manage OS, runtime, and applications. Under PaaS (e.g. Heroku, Elastic Beanstalk), the provider manages OS, patching, and runtimes."
      },
      {
        "id": "cld-beg-2",
        "questionText": "What is the primary operational advantage of containerization over traditional virtual machines?",
        "options": [
          {
            "id": "cld-beg-2-a",
            "label": "A",
            "text": "Containers eliminate the need for network routing protocols by assigning identical MAC addresses to all host workloads"
          },
          {
            "id": "cld-beg-2-b",
            "label": "B",
            "text": "Containers share the host operating system kernel, resulting in faster startup times and lower resource overhead"
          },
          {
            "id": "cld-beg-2-c",
            "label": "C",
            "text": "Containers provide absolute physical hardware isolation by dedicating separate CPU sockets to each running process"
          },
          {
            "id": "cld-beg-2-d",
            "label": "D",
            "text": "Containers prevent software dependency conflicts by embedding complete hypervisor kernels inside image layers"
          }
        ],
        "correctOptionId": "cld-beg-2-b",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "containers-vs-vms",
        "explanationAfterAnswer": "VMs run full guest operating systems on top of a hypervisor, consuming gigabytes of RAM. Containers share the host OS kernel and isolate user space using cgroups and namespaces, achieving lightweight, sub-second startups."
      },
      {
        "id": "cld-beg-3",
        "questionText": "What is the primary purpose of a cloud Content Delivery Network (CDN)?",
        "options": [
          {
            "id": "cld-beg-3-a",
            "label": "A",
            "text": "To encrypt and store transactional database records across geographically separated relational storage clusters"
          },
          {
            "id": "cld-beg-3-b",
            "label": "B",
            "text": "To dynamically balance internal worker thread workloads across clustered multi-core virtual machines"
          },
          {
            "id": "cld-beg-3-c",
            "label": "C",
            "text": "To cache static content at distributed edge points of presence, reducing latency for global end users"
          },
          {
            "id": "cld-beg-3-d",
            "label": "D",
            "text": "To execute continuous integration build pipelines whenever developers push source code to Git repositories"
          }
        ],
        "correctOptionId": "cld-beg-3-c",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "cdn-architecture",
        "explanationAfterAnswer": "CDNs cache static assets (images, JavaScript, CSS, video) on edge servers geographically closer to users, reducing round-trip latency and offloading origin web servers."
      },
      {
        "id": "cld-beg-4",
        "questionText": "What is the core principle of Infrastructure as Code (IaC) tools like Terraform?",
        "options": [
          {
            "id": "cld-beg-4-a",
            "label": "A",
            "text": "Compiling high-level programming language code directly into machine-executable binary microcode"
          },
          {
            "id": "cld-beg-4-b",
            "label": "B",
            "text": "Automatically generating frontend user interfaces directly from relational database schema definitions"
          },
          {
            "id": "cld-beg-4-c",
            "label": "C",
            "text": "Monitoring container resource utilization and terminating processes that exceed allocated memory quotas"
          },
          {
            "id": "cld-beg-4-d",
            "label": "D",
            "text": "Managing and provisioning cloud infrastructure resources through version-controlled declarative configuration files"
          }
        ],
        "correctOptionId": "cld-beg-4-d",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "iac-fundamentals",
        "explanationAfterAnswer": "IaC treats infrastructure provisioning identically to software development: resources are defined in declarative configuration files (like HCL or YAML), versioned in Git, tested, and automated consistently."
      },
      {
        "id": "cld-beg-5",
        "questionText": "In cloud computing architectures, what distinguishes horizontal scaling from vertical scaling?",
        "options": [
          {
            "id": "cld-beg-5-a",
            "label": "A",
            "text": "Horizontal scaling adds more instances of a resource, while vertical scaling upgrades the CPU and RAM of an existing instance"
          },
          {
            "id": "cld-beg-5-b",
            "label": "B",
            "text": "Horizontal scaling migrates workloads to overseas regions, while vertical scaling retains data in local availability zones"
          },
          {
            "id": "cld-beg-5-c",
            "label": "C",
            "text": "Horizontal scaling replaces containerized workloads with bare-metal servers, while vertical scaling uses virtual machines"
          },
          {
            "id": "cld-beg-5-d",
            "label": "D",
            "text": "Horizontal scaling increases storage capacity on disk arrays, while vertical scaling increases network bandwidth"
          }
        ],
        "correctOptionId": "cld-beg-5-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "horizontal-vs-vertical-scaling",
        "explanationAfterAnswer": "Scaling out (horizontal) adds more nodes/instances to a distributed pool. Scaling up (vertical) increases the hardware resources (cores, memory) of a single node, which hits physical limits and requires downtime."
      },
      {
        "id": "cld-beg-6",
        "questionText": "An application experiences sudden morning traffic spikes that cause response timeouts. Which cloud solution addresses this automatically?",
        "options": [
          {
            "id": "cld-beg-6-a",
            "label": "A",
            "text": "Migrating the entire application database from a relational MySQL engine to a single self-hosted flat file store"
          },
          {
            "id": "cld-beg-6-b",
            "label": "B",
            "text": "Configuring an Auto Scaling Group paired with an Application Load Balancer to dynamically launch instances based on metrics"
          },
          {
            "id": "cld-beg-6-c",
            "label": "C",
            "text": "Manually executing system shutdown and restart commands across all production server instances each morning"
          },
          {
            "id": "cld-beg-6-d",
            "label": "D",
            "text": "Re-indexing database tables to reduce storage disk usage during high-concurrency client authentication events"
          }
        ],
        "correctOptionId": "cld-beg-6-b",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "autoscaling-load-balancing",
        "explanationAfterAnswer": "Auto Scaling policies monitor metrics (such as CPU utilization or request count per target) and automatically provision or terminate compute instances behind a load balancer to match demand."
      },
      {
        "id": "cld-beg-7",
        "questionText": "Why should developers store container image layers and artifacts in private container registries rather than public registries?",
        "options": [
          {
            "id": "cld-beg-7-a",
            "label": "A",
            "text": "Public container registries automatically compress images into legacy tarball archives that cannot run in Kubernetes"
          },
          {
            "id": "cld-beg-7-b",
            "label": "B",
            "text": "Public registries restrict container execution to a maximum runtime duration of sixty seconds per container instance"
          },
          {
            "id": "cld-beg-7-c",
            "label": "C",
            "text": "Private registries protect proprietary code, enforce access controls, and scan images for known security vulnerabilities"
          },
          {
            "id": "cld-beg-7-d",
            "label": "D",
            "text": "Private registries eliminate network latency entirely by embedding container images inside local CPU L3 cache memory"
          }
        ],
        "correctOptionId": "cld-beg-7-c",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "container-registry-security",
        "explanationAfterAnswer": "Private registries (like AWS ECR, GCP Artifact Registry, or Harbor) restrict image access via IAM, prevent public leakage of proprietary code/dependencies, and provide automated vulnerability scanning."
      },
      {
        "id": "cld-beg-8",
        "questionText": "What is the primary role of a reverse proxy like Nginx in a microservices deployment?",
        "options": [
          {
            "id": "cld-beg-8-a",
            "label": "A",
            "text": "To compile TypeScript frontend applications into static HTML files during continuous delivery pipeline runs"
          },
          {
            "id": "cld-beg-8-b",
            "label": "B",
            "text": "To manage relational database backups and automate cross-region table replication schedules"
          },
          {
            "id": "cld-beg-8-c",
            "label": "C",
            "text": "To assign static IP addresses to physical motherboard network adapters inside private data centers"
          },
          {
            "id": "cld-beg-8-d",
            "label": "D",
            "text": "To terminate TLS, handle request routing, and balance incoming HTTP traffic across internal upstream services"
          }
        ],
        "correctOptionId": "cld-beg-8-d",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "reverse-proxy-architecture",
        "explanationAfterAnswer": "Reverse proxies sit between external clients and backend microservices, handling TLS termination, URL path-based routing, caching, rate limiting, and load distribution across internal service instances."
      },
      {
        "id": "cld-beg-9",
        "questionText": "A team needs to securely connect their on-premise corporate data center to an AWS Virtual Private Cloud (VPC). Which solution is best?",
        "options": [
          {
            "id": "cld-beg-9-a",
            "label": "A",
            "text": "Configuring an IPsec Site-to-Site VPN or dedicated AWS Direct Connect link into a Virtual Private Gateway"
          },
          {
            "id": "cld-beg-9-b",
            "label": "B",
            "text": "Opening port 22 and port 3389 publicly across all private subnet route tables to enable remote management"
          },
          {
            "id": "cld-beg-9-c",
            "label": "C",
            "text": "Assigning public IPv4 addresses to all internal database instances and whitelisting the corporate office router IP"
          },
          {
            "id": "cld-beg-9-d",
            "label": "D",
            "text": "Deploying a public HTTP proxy server without authentication on an EC2 instance in a public subnet"
          }
        ],
        "correctOptionId": "cld-beg-9-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "hybrid-cloud-connectivity",
        "explanationAfterAnswer": "An IPsec Site-to-Site VPN creates an encrypted tunnel over the internet between on-premise routers and the VPC gateway. For dedicated, consistent low-latency throughput, Direct Connect provides a private physical fiber link."
      },
      {
        "id": "cld-beg-10",
        "questionText": "In cloud object storage (e.g. AWS S3), what is the difference between standard storage and glacier storage classes?",
        "options": [
          {
            "id": "cld-beg-10-a",
            "label": "A",
            "text": "Standard stores structured relational tables, while Glacier stores uncompressed video recordings and disk images"
          },
          {
            "id": "cld-beg-10-b",
            "label": "B",
            "text": "Standard provides immediate millisecond access at higher storage cost, while Glacier offers low-cost archive with retrieval latency"
          },
          {
            "id": "cld-beg-10-c",
            "label": "C",
            "text": "Standard enforces end-to-end client encryption, while Glacier stores all archived files in plaintext format"
          },
          {
            "id": "cld-beg-10-d",
            "label": "D",
            "text": "Standard replicates data across continents, while Glacier is restricted to a single physical hard drive partition"
          }
        ],
        "correctOptionId": "cld-beg-10-b",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "object-storage-tiers",
        "explanationAfterAnswer": "S3 Standard is designed for active, frequently accessed data with millisecond latency. Glacier tiers offer significantly lower storage costs for cold backups, with retrieval times ranging from minutes to hours."
      }
    ],
    "intermediate": [
      {
        "id": "cld-int-1",
        "questionText": "How does a Kubernetes Service of type 'ClusterIP' enable internal service discovery between pods?",
        "options": [
          {
            "id": "cld-int-1-a",
            "label": "A",
            "text": "By exposing the target pod port directly to the public internet using an external cloud provider network load balancer"
          },
          {
            "id": "cld-int-1-b",
            "label": "B",
            "text": "By opening a static host port on every physical worker node across the entire container cluster"
          },
          {
            "id": "cld-int-1-c",
            "label": "C",
            "text": "By allocating a stable internal virtual IP address backed by iptables or IPVS rules that proxy traffic to matching pod endpoints"
          },
          {
            "id": "cld-int-1-d",
            "label": "D",
            "text": "By deploying a dedicated reverse proxy sidecar container inside every application pod namespace"
          }
        ],
        "correctOptionId": "cld-int-1-c",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "k8s-clusterip-service",
        "explanationAfterAnswer": "ClusterIP creates a stable internal IP inside the cluster. Kube-proxy configures iptables or IPVS rules on all nodes to route traffic directed at the Service IP to healthy pods matching the service selector."
      },
      {
        "id": "cld-int-2",
        "questionText": "In continuous deployment, what defines a 'Blue-Green' deployment strategy?",
        "options": [
          {
            "id": "cld-int-2-a",
            "label": "A",
            "text": "Gradually shifting a small percentage of user traffic to the new version before rolling out to the rest of the fleet"
          },
          {
            "id": "cld-int-2-b",
            "label": "B",
            "text": "Stopping all active production instances simultaneously and deploying the new release in place during a maintenance window"
          },
          {
            "id": "cld-int-2-c",
            "label": "C",
            "text": "Deploying code updates exclusively to staging clusters while keeping production systems running on legacy branches"
          },
          {
            "id": "cld-int-2-d",
            "label": "D",
            "text": "Running two identical production environments and switching the router or load balancer to the new version instantly"
          }
        ],
        "correctOptionId": "cld-int-2-d",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "blue-green-deployment",
        "explanationAfterAnswer": "Blue-Green maintains two identical environments: Blue (current production) and Green (new release). Once Green passes verification, the load balancer switches traffic to Green instantly, allowing immediate rollback if issues arise."
      },
      {
        "id": "cld-int-3",
        "questionText": "What is the primary role of a Dead Letter Queue (DLQ) in an asynchronous message queue architecture (e.g. AWS SQS)?",
        "options": [
          {
            "id": "cld-int-3-a",
            "label": "A",
            "text": "To store messages that repeatedly fail processing after a maximum retry threshold for isolation and debugging"
          },
          {
            "id": "cld-int-3-b",
            "label": "B",
            "text": "To compress message payloads into gzip format to reduce message transmission costs across VPC endpoints"
          },
          {
            "id": "cld-int-3-c",
            "label": "C",
            "text": "To route urgent high-priority messages ahead of existing messages in First-In-First-Out queues"
          },
          {
            "id": "cld-int-3-d",
            "label": "D",
            "text": "To automatically encrypt all unread messages with asymmetric public keys before consumer delivery"
          }
        ],
        "correctOptionId": "cld-int-3-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "dlq-message-processing",
        "explanationAfterAnswer": "When a message cannot be processed successfully after a configured number of retries (e.g. due to schema errors or corrupt data), the queue isolates it in a DLQ to prevent blocking consumer pipelines."
      },
      {
        "id": "cld-int-4",
        "questionText": "Why is an internal Terraform state file lock (using DynamoDB or remote backends) critical in team environments?",
        "options": [
          {
            "id": "cld-int-4-a",
            "label": "A",
            "text": "It automatically converts declarative Terraform HCL code into compiled native Go binaries during continuous deployment"
          },
          {
            "id": "cld-int-4-b",
            "label": "B",
            "text": "It prevents concurrent terraform apply executions from corrupting the infrastructure state and causing race conditions"
          },
          {
            "id": "cld-int-4-c",
            "label": "C",
            "text": "It compresses the remote state file using gzip encryption to avoid exceeding cloud storage quota limits"
          },
          {
            "id": "cld-int-4-d",
            "label": "D",
            "text": "It terminates running EC2 instances whenever a developer modifies local configuration variables without review"
          }
        ],
        "correctOptionId": "cld-int-4-b",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "terraform-state-locking",
        "explanationAfterAnswer": "Without state locking, two team members or CI pipelines executing 'terraform apply' concurrently could modify the state file simultaneously, resulting in state corruption and conflicting cloud resource states."
      },
      {
        "id": "cld-int-5",
        "questionText": "How does an ingress controller (such as Nginx Ingress or Traefik) route external traffic into a Kubernetes cluster?",
        "options": [
          {
            "id": "cld-int-5-a",
            "label": "A",
            "text": "By rewriting kernel network namespace routes on every worker node using specialized custom eBPF bytecode programs"
          },
          {
            "id": "cld-int-5-b",
            "label": "B",
            "text": "By creating a dedicated external hardware load balancer instance for every individual pod created in the cluster"
          },
          {
            "id": "cld-int-5-c",
            "label": "C",
            "text": "By monitoring Kubernetes Ingress resources and dynamically configuring an internal reverse proxy to forward traffic to Services"
          },
          {
            "id": "cld-int-5-d",
            "label": "D",
            "text": "By assigning public internet IP addresses directly to individual container network interfaces within the pod network"
          }
        ],
        "correctOptionId": "cld-int-5-c",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "k8s-ingress-controller",
        "explanationAfterAnswer": "An Ingress Controller runs as a pod inside the cluster, watching the Kubernetes API for Ingress rules (hostnames, paths). It configures its internal routing table to proxy traffic directly to matching service endpoints."
      },
      {
        "id": "cld-int-6",
        "questionText": "An application cluster running in a single Availability Zone crashes during a localized power failure. What architecture prevents this downtime?",
        "options": [
          {
            "id": "cld-int-6-a",
            "label": "A",
            "text": "Increasing the local server power supply wattage and installing larger uninterruptible power supply batteries"
          },
          {
            "id": "cld-int-6-b",
            "label": "B",
            "text": "Migrating the workload from a containerized environment to a single oversized bare-metal server instance"
          },
          {
            "id": "cld-int-6-c",
            "label": "C",
            "text": "Configuring the application to run all background processing tasks on ephemeral spot instance workers"
          },
          {
            "id": "cld-int-6-d",
            "label": "D",
            "text": "Deploying workloads across a Multi-AZ architecture behind a regional load balancer with cross-zone automated failover"
          }
        ],
        "correctOptionId": "cld-int-6-d",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "multi-az-high-availability",
        "explanationAfterAnswer": "Availability Zones are physically separated facilities with independent power, cooling, and networking. Distributing instances across multiple AZs ensures that a failure in one zone is absorbed by healthy instances in another."
      },
      {
        "id": "cld-int-7",
        "questionText": "In observability, what is the role of OpenTelemetry in modern distributed systems?",
        "options": [
          {
            "id": "cld-int-7-a",
            "label": "A",
            "text": "To provide a standardized vendor-neutral framework for instrumenting, generating, and collecting metrics, logs, and traces"
          },
          {
            "id": "cld-int-7-b",
            "label": "B",
            "text": "To automate container image building and vulnerability patching inside continuous delivery pipelines"
          },
          {
            "id": "cld-int-7-c",
            "label": "C",
            "text": "To execute synthetic user interface regression tests against staging cluster environments prior to release"
          },
          {
            "id": "cld-int-7-d",
            "label": "D",
            "text": "To automatically provision cloud infrastructure resources using declarative configuration templates"
          }
        ],
        "correctOptionId": "cld-int-7-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "opentelemetry-observability",
        "explanationAfterAnswer": "OpenTelemetry (OTel) is a Cloud Native Computing Foundation (CNCF) standard providing unified APIs, SDKs, and tooling to capture distributed traces, metrics, and logs across services without vendor lock-in."
      },
      {
        "id": "cld-int-8",
        "questionText": "What security risk occurs if a cloud compute instance uses an IAM role with wildcard permissions (`Action: *`, `Resource: *`)?",
        "options": [
          {
            "id": "cld-int-8-a",
            "label": "A",
            "text": "The instance will experience severe CPU degradation due to continuous IAM permission matrix evaluation overhead"
          },
          {
            "id": "cld-int-8-b",
            "label": "B",
            "text": "If the instance is compromised, the attacker can leverage its metadata credentials to control all cloud account resources"
          },
          {
            "id": "cld-int-8-c",
            "label": "C",
            "text": "The cloud provider will automatically revoke the instance's network access after seventy-two hours of activity"
          },
          {
            "id": "cld-int-8-d",
            "label": "D",
            "text": "Database query response times will degrade because queries will require multi-factor authorization approvals"
          }
        ],
        "correctOptionId": "cld-int-8-b",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "iam-overprivileged-roles",
        "explanationAfterAnswer": "Instances access credentials via the instance metadata service. If an overly permissive role (like AdministratorAccess) is attached, any compromise of the application (e.g. via RCE or SSRF) yields full cloud account takeover."
      },
      {
        "id": "cld-int-9",
        "questionText": "How does a Circuit Breaker pattern (e.g. Resilience4j) protect distributed microservices during upstream service degradation?",
        "options": [
          {
            "id": "cld-int-9-a",
            "label": "A",
            "text": "By automatically launching additional worker container instances to overwhelm the failing upstream dependency with requests"
          },
          {
            "id": "cld-int-9-b",
            "label": "B",
            "text": "By re-routing all network packets through unencrypted UDP sockets to bypass timeout inspection firewalls"
          },
          {
            "id": "cld-int-9-c",
            "label": "C",
            "text": "By tripping to an open state after repeated failures, immediately returning fallback responses to prevent cascading failures"
          },
          {
            "id": "cld-int-9-d",
            "label": "D",
            "text": "By terminating database connections permanently and restarting the primary cloud virtual machine host"
          }
        ],
        "correctOptionId": "cld-int-9-c",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "circuit-breaker-resilience",
        "explanationAfterAnswer": "When an upstream dependency fails repeatedly, the circuit breaker opens, failing fast without making network calls. This preserves caller threads/memory and prevents cascading failure across the architecture."
      },
      {
        "id": "cld-int-10",
        "questionText": "What problem is solved by implementing database connection pooling (e.g. PgBouncer) in high-concurrency microservices?",
        "options": [
          {
            "id": "cld-int-10-a",
            "label": "A",
            "text": "It automatically replicates relational database tables across multi-cloud regions to eliminate physical latency"
          },
          {
            "id": "cld-int-10-b",
            "label": "B",
            "text": "It converts relational SQL query results into NoSQL document formats before caching them in Redis memory"
          },
          {
            "id": "cld-int-10-c",
            "label": "C",
            "text": "It eliminates the need for database authentication by allowing anonymous guest queries over local sockets"
          },
          {
            "id": "cld-int-10-d",
            "label": "D",
            "text": "It prevents database exhaustion by reusing a fixed pool of established connections across thousands of incoming client requests"
          }
        ],
        "correctOptionId": "cld-int-10-d",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "db-connection-pooling",
        "explanationAfterAnswer": "Creating new database connections is expensive (forking backend processes, allocating memory, TLS handshakes). Connection poolers maintain a persistent pool of connections, preventing process explosion and server crashes."
      }
    ],
    "advanced": [
      {
        "id": "cld-adv-1",
        "questionText": "In distributed consensus protocols (e.g. Raft used in etcd), how does leader election handle network partitions between cluster nodes?",
        "options": [
          {
            "id": "cld-adv-1-a",
            "label": "A",
            "text": "A candidate node must secure votes from a strict quorum majority (N/2 + 1) of all cluster nodes to become the legitimate leader"
          },
          {
            "id": "cld-adv-1-b",
            "label": "B",
            "text": "The node with the lowest internal IP address automatically assumes leadership regardless of network connectivity"
          },
          {
            "id": "cld-adv-1-c",
            "label": "C",
            "text": "Every isolated network partition elects its own independent leader and merges conflicting log states asynchronously"
          },
          {
            "id": "cld-adv-1-d",
            "label": "D",
            "text": "The cluster delegates leadership selection to an external cloud metadata service via HTTP polling requests"
          }
        ],
        "correctOptionId": "cld-adv-1-a",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "raft-consensus-quorum",
        "explanationAfterAnswer": "Raft requires a candidate to receive positive votes from a majority of nodes ((N/2) + 1). In a partition, only the partition containing the majority can elect a leader or commit entries, preventing split-brain states."
      },
      {
        "id": "cld-adv-2",
        "questionText": "How does eBPF-based container networking (such as Cilium) dramatically outperform standard iptables/kube-proxy implementations?",
        "options": [
          {
            "id": "cld-adv-2-a",
            "label": "A",
            "text": "By bypassing the kernel network stack entirely and streaming raw packet buffers over user space serial interfaces"
          },
          {
            "id": "cld-adv-2-b",
            "label": "B",
            "text": "By attaching BPF programs directly to tc and socket layers with BPF maps, routing packets in O(1) without sequential iptables chains"
          },
          {
            "id": "cld-adv-2-c",
            "label": "C",
            "text": "By compressing all TCP packet headers into UDP datagrams using proprietary proprietary compression algorithms"
          },
          {
            "id": "cld-adv-2-d",
            "label": "D",
            "text": "By disabling container network namespace isolation to let all pods share a single host network device"
          }
        ],
        "correctOptionId": "cld-adv-2-b",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "ebpf-cilium-kube-proxy",
        "explanationAfterAnswer": "Kube-proxy with iptables evaluates rules sequentially, scaling with O(N) complexity as services grow. Cilium uses eBPF bytecode programs with hash-table lookups (O(1)), shortcutting routing at the socket and traffic control (tc) layers."
      },
      {
        "id": "cld-adv-3",
        "questionText": "In high-throughput distributed message brokers (e.g. Apache Kafka), what architectural design enables horizontal consumer throughput?",
        "options": [
          {
            "id": "cld-adv-3-a",
            "label": "A",
            "text": "Storing all messages in an unpartitioned memory queue that broadcasts every record to all registered client nodes"
          },
          {
            "id": "cld-adv-3-b",
            "label": "B",
            "text": "Enforcing synchronous two-phase commit transactions between all active consumers before committing offsets"
          },
          {
            "id": "cld-adv-3-c",
            "label": "C",
            "text": "Sharding topics into ordered partitions where each partition is consumed by exactly one consumer within a consumer group"
          },
          {
            "id": "cld-adv-3-d",
            "label": "D",
            "text": "Deleting message records immediately upon receipt by the first consumer to free up broker memory buffers"
          }
        ],
        "correctOptionId": "cld-adv-3-c",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "kafka-partition-parallelism",
        "explanationAfterAnswer": "Kafka partitions topics. Within a consumer group, each partition is assigned to exactly one consumer thread. Scaling consumers up to the number of partitions provides parallel, ordered processing."
      },
      {
        "id": "cld-adv-4",
        "questionText": "What trade-off does the CAP theorem state distributed databases (e.g. Cassandra vs Spanner) must make during network partitions?",
        "options": [
          {
            "id": "cld-adv-4-a",
            "label": "A",
            "text": "A system must sacrifice either encryption at rest or transport layer encryption whenever network latency exceeds fifty milliseconds"
          },
          {
            "id": "cld-adv-4-b",
            "label": "B",
            "text": "Relational database tables must be converted into document store schemas whenever disk storage exceeds one terabyte"
          },
          {
            "id": "cld-adv-4-c",
            "label": "C",
            "text": "Distributed systems cannot achieve high throughput without using synchronous atomic clocks on all physical hardware"
          },
          {
            "id": "cld-adv-4-d",
            "label": "D",
            "text": "A distributed system can guarantee at most two properties among Consistency, Availability, and Partition Tolerance simultaneously"
          }
        ],
        "correctOptionId": "cld-adv-4-d",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "cap-theorem-distributed-systems",
        "explanationAfterAnswer": "Network partitions (P) are unavoidable in distributed systems. When a partition occurs, the system must choose between returning an error or stale data (Availability vs Consistency)."
      },
      {
        "id": "cld-adv-5",
        "questionText": "In Kubernetes scheduling, what is the role of pod affinity and anti-affinity rules during node placement?",
        "options": [
          {
            "id": "cld-adv-5-a",
            "label": "A",
            "text": "To constrain which nodes pods can be scheduled on based on labels of pods already running on those nodes"
          },
          {
            "id": "cld-adv-5-b",
            "label": "B",
            "text": "To dynamically adjust CPU limits and memory request reservations based on real-time pod resource usage"
          },
          {
            "id": "cld-adv-5-c",
            "label": "C",
            "text": "To enforce mutual TLS encryption on all internal communication between pods within the same namespace"
          },
          {
            "id": "cld-adv-5-d",
            "label": "D",
            "text": "To compile container image layers into native machine code directly on worker nodes before pod startup"
          }
        ],
        "correctOptionId": "cld-adv-5-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "k8s-pod-affinity-rules",
        "explanationAfterAnswer": "Pod affinity allows co-locating cooperating services (e.g. app and cache) on the same node or zone to minimize latency, while pod anti-affinity spreads replicas across nodes or failure domains to ensure resilience."
      },
      {
        "id": "cld-adv-6",
        "questionText": "How does Google Cloud Spanner achieve external consistency (serializability) across globally distributed multi-region clusters?",
        "options": [
          {
            "id": "cld-adv-6-a",
            "label": "A",
            "text": "By delegating all write transactions to a single centralized master database server located in a single data center"
          },
          {
            "id": "cld-adv-6-b",
            "label": "B",
            "text": "By using TrueTime API with synchronized GPS receivers and atomic clocks to enforce monotonic commit timestamps"
          },
          {
            "id": "cld-adv-6-c",
            "label": "C",
            "text": "By converting all transactions into eventually consistent asynchronous background gossip protocol exchanges"
          },
          {
            "id": "cld-adv-6-d",
            "label": "D",
            "text": "By locking the entire database table structure whenever a client initiates a cross-region write operation"
          }
        ],
        "correctOptionId": "cld-adv-6-b",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "spanner-truetime-consistency",
        "explanationAfterAnswer": "TrueTime exposes clock uncertainty bounded to an interval [t.earliest, t.latest] using GPS and atomic clocks. By waiting out the uncertainty window (commit wait), Spanner guarantees that if T2 starts after T1 commits, T2 receives a higher timestamp."
      },
      {
        "id": "cld-adv-7",
        "questionText": "What condition leads to a 'Split-Brain' scenario in a distributed cluster with an even number of nodes (e.g. 4 nodes)?",
        "options": [
          {
            "id": "cld-adv-7-a",
            "label": "A",
            "text": "A worker node runs out of physical disk space while processing continuous database backup snapshots"
          },
          {
            "id": "cld-adv-7-b",
            "label": "B",
            "text": "The cluster orchestrator schedules container pods that exceed the maximum memory limits of the worker node"
          },
          {
            "id": "cld-adv-7-c",
            "label": "C",
            "text": "A symmetrical network partition divides the cluster into two equal halves (2 and 2), where neither or both claim authority"
          },
          {
            "id": "cld-adv-7-d",
            "label": "D",
            "text": "A node clock drifts by two milliseconds during high-concurrency read-only database query execution"
          }
        ],
        "correctOptionId": "cld-adv-7-c",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "split-brain-quorum-failure",
        "explanationAfterAnswer": "In an even-node cluster (4 nodes), a 2-2 partition prevents either side from achieving a strict majority (>2). If misconfigured to allow 50% quorums, both partitions elect leaders and accept writes, causing irrecoverable state divergence."
      },
      {
        "id": "cld-adv-8",
        "questionText": "In service mesh architectures (e.g. Istio with Envoy), how is transparent mTLS enforced between microservices without app code changes?",
        "options": [
          {
            "id": "cld-adv-8-a",
            "label": "A",
            "text": "The Linux kernel automatically encrypts all socket calls using pre-shared symmetric keys embedded in the bootloader"
          },
          {
            "id": "cld-adv-8-b",
            "label": "B",
            "text": "The container runtime injects custom SSL certificate validation code into the compiled application bytecode"
          },
          {
            "id": "cld-adv-8-c",
            "label": "C",
            "text": "The network router establishes dedicated physical fiber optic patch connections between worker nodes"
          },
          {
            "id": "cld-adv-8-d",
            "label": "D",
            "text": "Envoy sidecar proxies intercept pod traffic via iptables PREROUTING/OUTPUT rules and perform mutual TLS handshakes"
          }
        ],
        "correctOptionId": "cld-adv-8-d",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "service-mesh-mtls-interception",
        "explanationAfterAnswer": "Istio's init container configures iptables inside the pod network namespace to redirect all inbound and outbound TCP traffic to the local Envoy sidecar. Envoy handles TLS handshakes and certificate rotation transparently."
      },
      {
        "id": "cld-adv-9",
        "questionText": "What is the primary benefit of deploying an immutable infrastructure model in cloud production environments?",
        "options": [
          {
            "id": "cld-adv-9-a",
            "label": "A",
            "text": "Servers are never modified in-place; updates are deployed by replacing instances with newly built, tested images"
          },
          {
            "id": "cld-adv-9-b",
            "label": "B",
            "text": "Servers are configured to reject all external network connections except those originating from physical SSH keys"
          },
          {
            "id": "cld-adv-9-c",
            "label": "C",
            "text": "Operating systems are permanently locked in read-only RAM mode, preventing writing any logs to persistent disks"
          },
          {
            "id": "cld-adv-9-d",
            "label": "D",
            "text": "Application dependencies are compiled directly into kernel firmware to eliminate runtime memory overhead"
          }
        ],
        "correctOptionId": "cld-adv-9-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "immutable-infrastructure",
        "explanationAfterAnswer": "Immutable infrastructure eliminates configuration drift. Rather than modifying running servers via SSH or patch scripts, new versioned images (AMIs/containers) are spun up and traffic redirected, enabling reliable, repeatable rollouts and rollbacks."
      },
      {
        "id": "cld-adv-10",
        "questionText": "How does a distributed tracing system (e.g. Jaeger) correlate requests across dozens of asynchronous microservices?",
        "options": [
          {
            "id": "cld-adv-10-a",
            "label": "A",
            "text": "By recording screen video captures of server terminal sessions during user transaction execution"
          },
          {
            "id": "cld-adv-10-b",
            "label": "B",
            "text": "By propagating unique TraceId and SpanId metadata via HTTP/gRPC headers across service boundaries and spans"
          },
          {
            "id": "cld-adv-10-c",
            "label": "C",
            "text": "By synchronizing database write transactions using global distributed hardware locks across physical racks"
          },
          {
            "id": "cld-adv-10-d",
            "label": "D",
            "text": "By calculating MD5 hashes of client IP addresses and storing them in temporary memory caches"
          }
        ],
        "correctOptionId": "cld-adv-10-b",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "distributed-tracing-context-propagation",
        "explanationAfterAnswer": "Distributed tracing passes context headers (such as W3C TraceContext traceparent: trace-id, parent-span-id, flags) along with network requests, allowing a backend collector to assemble a DAG representing the entire call path."
      }
    ]
  },
  "web": {
    "beginner": [
      {
        "id": "web-beg-1",
        "questionText": "What is the primary role of the Document Object Model (DOM) in web browsers?",
        "options": [
          {
            "id": "web-beg-1-a",
            "label": "A",
            "text": "To encrypt and compress network packets before transmitting them over secure WebSocket connections"
          },
          {
            "id": "web-beg-1-b",
            "label": "B",
            "text": "To compile client-side JavaScript source code directly into native operating system machine instructions"
          },
          {
            "id": "web-beg-1-c",
            "label": "C",
            "text": "To provide an in-memory tree representation of the HTML document that scripts can dynamically access and modify"
          },
          {
            "id": "web-beg-1-d",
            "label": "D",
            "text": "To store persistent relational database records directly inside local browser flash storage partitions"
          }
        ],
        "correctOptionId": "web-beg-1-c",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "dom-fundamentals",
        "explanationAfterAnswer": "The DOM represents an HTML or XML document as a tree structure where each node is an object representing a part of the document, providing an API for programmatic manipulation via JavaScript."
      },
      {
        "id": "web-beg-2",
        "questionText": "What distinguishes an HTTP GET request from an HTTP POST request?",
        "options": [
          {
            "id": "web-beg-2-a",
            "label": "A",
            "text": "GET requests can only transmit binary images, while POST requests are mathematically restricted to ASCII text"
          },
          {
            "id": "web-beg-2-b",
            "label": "B",
            "text": "GET requests require transport layer TLS encryption, while POST requests transmit data in unencrypted plaintext"
          },
          {
            "id": "web-beg-2-c",
            "label": "C",
            "text": "GET requests execute asynchronously on worker threads, while POST requests block the browser event loop"
          },
          {
            "id": "web-beg-2-d",
            "label": "D",
            "text": "GET requests retrieve data and should be idempotent, while POST requests submit data to be processed"
          }
        ],
        "correctOptionId": "web-beg-2-d",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "http-get-vs-post",
        "explanationAfterAnswer": "Under HTTP specifications, GET is safe and idempotent, intended for fetching resources without modifying server state. POST submits data in the request body to create or process resources, potentially modifying server state."
      },
      {
        "id": "web-beg-3",
        "questionText": "In the CSS box model, what is the correct order of layers from the inside out?",
        "options": [
          {
            "id": "web-beg-3-a",
            "label": "A",
            "text": "Content on the inside, followed sequentially by Padding, Border, and the outermost Margin"
          },
          {
            "id": "web-beg-3-b",
            "label": "B",
            "text": "Margin on the inside, followed sequentially by Border, Padding, and the inner Content box"
          },
          {
            "id": "web-beg-3-c",
            "label": "C",
            "text": "Border on the inside, followed sequentially by Content, Margin, and the outer Padding area"
          },
          {
            "id": "web-beg-3-d",
            "label": "D",
            "text": "Padding on the inside, followed sequentially by Content, Margin, and the outer Border area"
          }
        ],
        "correctOptionId": "web-beg-3-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "css-box-model",
        "explanationAfterAnswer": "The CSS box model consists of Content (text/images) at the core, surrounded by Padding (clears area around content), surrounded by Border, surrounded by Margin (clears area outside border)."
      },
      {
        "id": "web-beg-4",
        "questionText": "What distinguishes localStorage from sessionStorage in client-side web storage APIs?",
        "options": [
          {
            "id": "web-beg-4-a",
            "label": "A",
            "text": "localStorage stores relational SQL databases, while sessionStorage stores unstructured binary files"
          },
          {
            "id": "web-beg-4-b",
            "label": "B",
            "text": "localStorage persists across browser restarts, while sessionStorage clears when the tab or session closes"
          },
          {
            "id": "web-beg-4-c",
            "label": "C",
            "text": "localStorage is accessible by external third-party domains, while sessionStorage is restricted to origin URLs"
          },
          {
            "id": "web-beg-4-d",
            "label": "D",
            "text": "localStorage encrypts stored string data with AES, while sessionStorage stores items in unencrypted memory"
          }
        ],
        "correctOptionId": "web-beg-4-b",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "local-vs-session-storage",
        "explanationAfterAnswer": "localStorage has no expiration date and persists until explicitly cleared by user or script. sessionStorage is scoped to the browser tab lifecycle and is cleared when the tab or window closes."
      },
      {
        "id": "web-beg-5",
        "questionText": "What does the Single Responsibility Principle mean in modern frontend component architecture?",
        "options": [
          {
            "id": "web-beg-5-a",
            "label": "A",
            "text": "Every component must be contained in a single monolithic file alongside all global application styles"
          },
          {
            "id": "web-beg-5-b",
            "label": "B",
            "text": "Every component must restrict all user interaction events to a single mouse click handler per render"
          },
          {
            "id": "web-beg-5-c",
            "label": "C",
            "text": "Every component should be encapsulated to perform one specific, well-defined functional or visual purpose"
          },
          {
            "id": "web-beg-5-d",
            "label": "D",
            "text": "Every component must be rendered exclusively by the server without any client hydration steps"
          }
        ],
        "correctOptionId": "web-beg-5-c",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "component-single-responsibility",
        "explanationAfterAnswer": "The Single Responsibility Principle dictates that a component should do one thing well (e.g. rendering a user badge, handling a search input), making it easier to test, maintain, and reuse across views."
      },
      {
        "id": "web-beg-6",
        "questionText": "A webpage's layout shifts unexpectedly as high-resolution images finish loading over slow networks. How should this be fixed?",
        "options": [
          {
            "id": "web-beg-6-a",
            "label": "A",
            "text": "Convert all images into base64 strings embedded directly inside client-side JavaScript bundle files"
          },
          {
            "id": "web-beg-6-b",
            "label": "B",
            "text": "Configure the web server to disable gzip and brotli compression algorithms for static asset delivery"
          },
          {
            "id": "web-beg-6-c",
            "label": "C",
            "text": "Set CSS position: fixed on all image elements to prevent rendering engines from calculating reflows"
          },
          {
            "id": "web-beg-6-d",
            "label": "D",
            "text": "Declare explicit width, height, or aspect-ratio attributes on img tags so the browser reserves layout space"
          }
        ],
        "correctOptionId": "web-beg-6-d",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "cls-image-dimensions",
        "explanationAfterAnswer": "Cumulative Layout Shift (CLS) occurs when elements load and push existing content down. Providing explicit width/height or CSS aspect-ratio lets the browser allocate layout space before the image binary downloads."
      },
      {
        "id": "web-beg-7",
        "questionText": "Why should asynchronous network requests in JavaScript use async/await or Promises instead of synchronous XHR?",
        "options": [
          {
            "id": "web-beg-7-a",
            "label": "A",
            "text": "Synchronous requests block the main execution thread, freezing the UI and making the browser unresponsive"
          },
          {
            "id": "web-beg-7-b",
            "label": "B",
            "text": "Synchronous requests automatically strip HTTP authorization headers before sending data to servers"
          },
          {
            "id": "web-beg-7-c",
            "label": "C",
            "text": "Asynchronous requests bypass browser cross-origin security restrictions on external API endpoints"
          },
          {
            "id": "web-beg-7-d",
            "label": "D",
            "text": "Asynchronous requests eliminate the mathematical requirement for TCP handshake negotiations"
          }
        ],
        "correctOptionId": "web-beg-7-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "async-await-event-loop",
        "explanationAfterAnswer": "JavaScript in browsers runs on a single main thread that manages rendering and user interaction. Synchronous network calls block this thread completely, freezing user scrolling, clicks, and animations."
      },
      {
        "id": "web-beg-8",
        "questionText": "What is the primary purpose of semantic HTML tags like <main>, <nav>, <header>, and <article>?",
        "options": [
          {
            "id": "web-beg-8-a",
            "label": "A",
            "text": "They compile client-side React code into native WebAssembly bytecode for faster browser execution"
          },
          {
            "id": "web-beg-8-b",
            "label": "B",
            "text": "They convey structural meaning to assistive technologies (screen readers) and search engine crawlers"
          },
          {
            "id": "web-beg-8-c",
            "label": "C",
            "text": "They enforce strict type checking on JavaScript variables declared within the enclosing element"
          },
          {
            "id": "web-beg-8-d",
            "label": "D",
            "text": "They automatically apply responsive mobile CSS grid layouts without writing any custom stylesheets"
          }
        ],
        "correctOptionId": "web-beg-8-b",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "semantic-html-accessibility",
        "explanationAfterAnswer": "Semantic HTML elements communicate the role and structure of content to screen readers, accessible accessibility trees, and search engines, creating landmark regions that users can navigate easily."
      },
      {
        "id": "web-beg-9",
        "questionText": "A user submits an online form and immediately double-clicks the submit button, causing duplicate database records. How is this prevented?",
        "options": [
          {
            "id": "web-beg-9-a",
            "label": "A",
            "text": "Convert all form input field elements from text inputs into read-only paragraph tags upon focus"
          },
          {
            "id": "web-beg-9-b",
            "label": "B",
            "text": "Configure the form to submit data exclusively using HTTP GET queries with random salt parameters"
          },
          {
            "id": "web-beg-9-c",
            "label": "C",
            "text": "Disable the submit button upon first click and implement backend request idempotency keys for submissions"
          },
          {
            "id": "web-beg-9-d",
            "label": "D",
            "text": "Clear the user's browser cache and reload the entire web page on every individual keystroke"
          }
        ],
        "correctOptionId": "web-beg-9-c",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "form-submission-idempotency",
        "explanationAfterAnswer": "Disabling the submit button on click prevents rapid UI clicks, while a server-side idempotency key ensures that even if duplicate HTTP packets arrive, the backend processes the mutation exactly once."
      },
      {
        "id": "web-beg-10",
        "questionText": "What is the function of the HTTP Status Code 401 Unauthorized versus 403 Forbidden?",
        "options": [
          {
            "id": "web-beg-10-a",
            "label": "A",
            "text": "401 indicates valid credentials but insufficient permissions, while 403 indicates missing authentication"
          },
          {
            "id": "web-beg-10-b",
            "label": "B",
            "text": "401 indicates that the requested server route is missing, while 403 indicates a database query timeout"
          },
          {
            "id": "web-beg-10-c",
            "label": "C",
            "text": "401 indicates that the client browser is unsupported, while 403 indicates that server CPU memory is exhausted"
          },
          {
            "id": "web-beg-10-d",
            "label": "D",
            "text": "401 indicates missing or invalid authentication credentials, while 403 indicates authenticated but access denied"
          }
        ],
        "correctOptionId": "web-beg-10-d",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "http-status-401-vs-403",
        "explanationAfterAnswer": "401 Unauthorized means the request lacks valid authentication credentials (you must log in). 403 Forbidden means the server understands who you are, but you lack authorization to access the resource."
      }
    ],
    "intermediate": [
      {
        "id": "web-int-1",
        "questionText": "How does the JavaScript Event Loop coordinate the execution of microtasks (Promises) versus macrotasks (setTimeout)?",
        "options": [
          {
            "id": "web-int-1-a",
            "label": "A",
            "text": "The microtask queue is completely drained after each synchronous call stack completion before the next macrotask runs"
          },
          {
            "id": "web-int-1-b",
            "label": "B",
            "text": "Microtasks execute after all pending macrotasks finish, right before the browser rendering frame begins"
          },
          {
            "id": "web-int-1-c",
            "label": "C",
            "text": "Macrotasks and microtasks execute concurrently on separate operating system background threads"
          },
          {
            "id": "web-int-1-d",
            "label": "D",
            "text": "Microtasks are cancelled automatically if a new macrotask arrives in the queue within five milliseconds"
          }
        ],
        "correctOptionId": "web-int-1-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "event-loop-microtasks",
        "explanationAfterAnswer": "At the end of each task on the call stack, the JavaScript runtime completely exhausts the microtask queue (Promise callbacks, queueMicrotask, MutationObservers) before picking the next macrotask (setTimeout, I/O)."
      },
      {
        "id": "web-int-2",
        "questionText": "In React, what problem does the useCallback hook specifically solve?",
        "options": [
          {
            "id": "web-int-2-a",
            "label": "A",
            "text": "It memoizes heavy synchronous computational calculations to prevent them from executing on the main thread"
          },
          {
            "id": "web-int-2-b",
            "label": "B",
            "text": "It memoizes a callback function definition between renders, maintaining reference equality for optimized child components"
          },
          {
            "id": "web-int-2-c",
            "label": "C",
            "text": "It automatically captures unhandled JavaScript runtime exceptions thrown during component render lifecycles"
          },
          {
            "id": "web-int-2-d",
            "label": "D",
            "text": "It converts client component state mutations into server actions executed directly on backend workers"
          }
        ],
        "correctOptionId": "web-int-2-b",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "react-usecallback-memoization",
        "explanationAfterAnswer": "In React, functions are recreated on every render. useCallback memoizes the function instance based on a dependency array, preserving reference equality (===) so that child components wrapped in React.memo skip unnecessary re-renders."
      },
      {
        "id": "web-int-3",
        "questionText": "What distinguishes Server-Side Rendering (SSR) from Static Site Generation (SSG) in frameworks like Next.js?",
        "options": [
          {
            "id": "web-int-3-a",
            "label": "A",
            "text": "SSR is executed inside the user's browser, while SSG requires continuous Node.js server runtimes in production"
          },
          {
            "id": "web-int-3-b",
            "label": "B",
            "text": "SSR eliminates the need for client hydration, while SSG requires downloading complete server database drivers"
          },
          {
            "id": "web-int-3-c",
            "label": "C",
            "text": "SSR renders HTML dynamically on each user request, while SSG pre-renders HTML pages ahead of time at build time"
          },
          {
            "id": "web-int-3-d",
            "label": "D",
            "text": "SSR cannot fetch data from external REST APIs, while SSG dynamically connects to live WebSocket feeds"
          }
        ],
        "correctOptionId": "web-int-3-c",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "ssr-vs-ssg-rendering",
        "explanationAfterAnswer": "SSR generates HTML dynamically per request on the server (suitable for personalized, real-time data). SSG generates HTML once during compilation, allowing pages to be cached globally on CDNs for near-instant delivery."
      },
      {
        "id": "web-int-4",
        "questionText": "How does Cross-Origin Resource Sharing (CORS) evaluate whether a cross-origin HTTP request is permitted?",
        "options": [
          {
            "id": "web-int-4-a",
            "label": "A",
            "text": "The client browser verifies that the destination server IP address belongs to the same local subnet range"
          },
          {
            "id": "web-int-4-b",
            "label": "B",
            "text": "The operating system firewall inspects the application process signature against global DNS records"
          },
          {
            "id": "web-int-4-c",
            "label": "C",
            "text": "The web server forces the connecting client browser to restart and clear all stored session cookies"
          },
          {
            "id": "web-int-4-d",
            "label": "D",
            "text": "The browser sends an OPTIONS preflight request to verify that server response headers allow the origin and method"
          }
        ],
        "correctOptionId": "web-int-4-d",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "cors-preflight-mechanics",
        "explanationAfterAnswer": "For non-simple requests, browsers dispatch an HTTP OPTIONS preflight call with Origin and Access-Control-Request-* headers. The browser checks if the server responds with Access-Control-Allow-Origin matching the calling domain before proceeding."
      },
      {
        "id": "web-int-5",
        "questionText": "An e-commerce search bar triggers an API call on every keystroke, causing severe backend query overload. What is the solution?",
        "options": [
          {
            "id": "web-int-5-a",
            "label": "A",
            "text": "Implement a debounce function that waits for the user to pause typing before dispatching the network request"
          },
          {
            "id": "web-int-5-b",
            "label": "B",
            "text": "Convert all search queries into synchronous XMLHttpRequest calls executed directly on the main thread"
          },
          {
            "id": "web-int-5-c",
            "label": "C",
            "text": "Store the entire product catalog database in the user's browser cookie storage header partition"
          },
          {
            "id": "web-int-5-d",
            "label": "D",
            "text": "Disable browser JavaScript and force the search input to submit a standard multi-part form post"
          }
        ],
        "correctOptionId": "web-int-5-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "debounce-vs-throttle",
        "explanationAfterAnswer": "Debouncing delays the function execution until a specified delay has elapsed since the last event (e.g. 300ms after user stops typing). This collapses 20 rapid keystrokes into a single optimized network query."
      },
      {
        "id": "web-int-6",
        "questionText": "What role does optimistic UI update play in modern full-stack web applications?",
        "options": [
          {
            "id": "web-int-6-a",
            "label": "A",
            "text": "It caches all user modifications on the server for twenty-four hours before committing them to the database"
          },
          {
            "id": "web-int-6-b",
            "label": "B",
            "text": "It updates the client interface immediately assuming the mutation succeeds, rolling back if the server fails"
          },
          {
            "id": "web-int-6-c",
            "label": "C",
            "text": "It converts frontend state changes into binary WebAssembly instructions to bypass network validation"
          },
          {
            "id": "web-int-6-d",
            "label": "D",
            "text": "It forces the client browser to refresh the entire webpage immediately following every user interaction"
          }
        ],
        "correctOptionId": "web-int-6-b",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "optimistic-ui-updates",
        "explanationAfterAnswer": "Optimistic updates immediately render expected state changes in the UI (e.g. toggling a 'like' button) without waiting for server round-trip latency, rolling back to the previous state with a notification if the network request errors."
      },
      {
        "id": "web-int-7",
        "questionText": "How does code splitting improve the Initial Page Load performance of a large web application?",
        "options": [
          {
            "id": "web-int-7-a",
            "label": "A",
            "text": "It minifies HTML whitespace so that CSS files are executed directly by the operating system kernel"
          },
          {
            "id": "web-int-7-b",
            "label": "B",
            "text": "It replaces all external library dependencies with native browser DOM manipulation equivalents"
          },
          {
            "id": "web-int-7-c",
            "label": "C",
            "text": "It breaks the bundle into smaller chunks loaded on demand, reducing the initial JavaScript parsed by the browser"
          },
          {
            "id": "web-int-7-d",
            "label": "D",
            "text": "It splits database queries across multiple relational tables during server-side template compilation"
          }
        ],
        "correctOptionId": "web-int-7-c",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "code-splitting-bundlers",
        "explanationAfterAnswer": "Rather than shipping a monolithic multi-megabyte bundle, bundlers split code by route or dynamic import (React.lazy), loading only the JavaScript required for the initial route and fetching other chunks lazily."
      },
      {
        "id": "web-int-8",
        "questionText": "Why is setting 'HttpOnly' and 'SameSite=Lax' flags on session cookies considered standard security practice?",
        "options": [
          {
            "id": "web-int-8-a",
            "label": "A",
            "text": "HttpOnly compresses cookie data using gzip, while SameSite encrypts cookies with local public key certificates"
          },
          {
            "id": "web-int-8-b",
            "label": "B",
            "text": "HttpOnly forces the browser to delete session cookies after sixty seconds of inactivity across user tabs"
          },
          {
            "id": "web-int-8-c",
            "label": "C",
            "text": "HttpOnly restricts cookie transmission exclusively to internal private subnets without public internet access"
          },
          {
            "id": "web-int-8-d",
            "label": "D",
            "text": "HttpOnly blocks client-side script access mitigating XSS theft, while SameSite restricts cross-site CSRF delivery"
          }
        ],
        "correctOptionId": "web-int-8-d",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "cookie-security-flags",
        "explanationAfterAnswer": "HttpOnly prevents document.cookie access from JavaScript, thwarting cookie theft via XSS. SameSite=Lax/Strict prevents the browser from sending the cookie in cross-site requests, mitigating CSRF attacks."
      },
      {
        "id": "web-int-9",
        "questionText": "What problem occurs when multiple clients update the same database record simultaneously without concurrency controls?",
        "options": [
          {
            "id": "web-int-9-a",
            "label": "A",
            "text": "The Lost Update anomaly, where the later write unintentionally overwrites changes committed by the earlier write"
          },
          {
            "id": "web-int-9-b",
            "label": "B",
            "text": "The database server immediately terminates all client TCP sockets and triggers automatic index rebuilds"
          },
          {
            "id": "web-int-9-c",
            "label": "C",
            "text": "The operating system converts the relational database tables into uncompressed plain text CSV archives"
          },
          {
            "id": "web-int-9-d",
            "label": "D",
            "text": "All future client read queries on that table return HTTP 404 Not Found status errors indefinitely"
          }
        ],
        "correctOptionId": "web-int-9-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "lost-update-concurrency",
        "explanationAfterAnswer": "In a lost update, Client A and Client B read state X simultaneously. Client A updates X and saves. Client B updates X based on the original read and saves, silently overwriting A's modifications without knowing. Optimistic concurrency (version checks) resolves this."
      },
      {
        "id": "web-int-10",
        "questionText": "How does the browser's Service Worker API enable Progressive Web App (PWA) offline capability?",
        "options": [
          {
            "id": "web-int-10-a",
            "label": "A",
            "text": "By embedding a lightweight headless relational database inside the browser's GPU rendering pipeline"
          },
          {
            "id": "web-int-10-b",
            "label": "B",
            "text": "By acting as a client-side network proxy that intercepts fetch requests and serves cached responses from CacheStorage"
          },
          {
            "id": "web-int-10-c",
            "label": "C",
            "text": "By generating synthetic Wi-Fi connections that simulate internet availability using cellular radio hardware"
          },
          {
            "id": "web-int-10-d",
            "label": "D",
            "text": "By compiling web application TypeScript files into native mobile Android APK files in the background"
          }
        ],
        "correctOptionId": "web-int-10-b",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "service-worker-cache-storage",
        "explanationAfterAnswer": "Service Workers run in a background thread and intercept network fetch events. When offline, the worker intercepts requests and returns matching cached responses from the CacheStorage API, enabling full offline operation."
      }
    ],
    "advanced": [
      {
        "id": "web-adv-1",
        "questionText": "How does React 18 Concurrent Rendering with Fiber avoid blocking the main thread during heavy component tree updates?",
        "options": [
          {
            "id": "web-adv-1-a",
            "label": "A",
            "text": "By delegating virtual DOM tree reconciliation to background Web Workers running in separate browser processes"
          },
          {
            "id": "web-adv-1-b",
            "label": "B",
            "text": "By compiling React JSX code into low-level machine code using ahead-of-time WebAssembly compiler passes"
          },
          {
            "id": "web-adv-1-c",
            "label": "C",
            "text": "By breaking rendering work into interruptible units of work, yielding to browser frame tasks via scheduler deadlines"
          },
          {
            "id": "web-adv-1-d",
            "label": "D",
            "text": "By disabling all state updates until the user stops interacting with the web page for several seconds"
          }
        ],
        "correctOptionId": "web-adv-1-c",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "react-fiber-concurrent-rendering",
        "explanationAfterAnswer": "React Fiber structures the component tree as a linked list of fiber nodes. In Concurrent Mode, the scheduler can pause a low-priority render to yield execution back to the browser for user input or animation, then resume where it left off."
      },
      {
        "id": "web-adv-2",
        "questionText": "In distributed web architectures, how does the CRDT (Conflict-free Replicated Data Type) model achieve collaborative editing?",
        "options": [
          {
            "id": "web-adv-2-a",
            "label": "A",
            "text": "By requiring all clients to acquire a distributed mutex lock from a central Redis server before typing each character"
          },
          {
            "id": "web-adv-2-b",
            "label": "B",
            "text": "By overwriting the entire document state with whichever client possesses the lowest latency ping to the web gateway"
          },
          {
            "id": "web-adv-2-c",
            "label": "C",
            "text": "By converting collaborative text operations into sequential SQL update statements executed inside serializable transactions"
          },
          {
            "id": "web-adv-2-d",
            "label": "D",
            "text": "By designing data structures whose operations commute mathematically, allowing replicas to converge without central coordination"
          }
        ],
        "correctOptionId": "web-adv-2-d",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "crdt-collaborative-editing",
        "explanationAfterAnswer": "CRDTs (like Yjs or Automerge) use mathematical structures where concurrent operations can be merged in any order (associative, commutative, idempotent) while guaranteeing that all replicas reach identical states without central coordination."
      },
      {
        "id": "web-adv-3",
        "questionText": "What vulnerability occurs when an application parses untrusted JSON into objects that pollute the JavaScript prototype chain?",
        "options": [
          {
            "id": "web-adv-3-a",
            "label": "A",
            "text": "Prototype Pollution, where injected properties modify Object.prototype, altering property resolution across all objects"
          },
          {
            "id": "web-adv-3-b",
            "label": "B",
            "text": "Buffer Overflow, where extra JSON keys overwrite the execution instruction pointer in the V8 virtual machine"
          },
          {
            "id": "web-adv-3-c",
            "label": "C",
            "text": "Heap Spraying, where malicious JSON tokens consume all available operating system physical RAM memory"
          },
          {
            "id": "web-adv-3-d",
            "label": "D",
            "text": "Type Confusion, where string variables are dynamically coerced into native kernel file descriptor handles"
          }
        ],
        "correctOptionId": "web-adv-3-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "prototype-pollution-vulnerability",
        "explanationAfterAnswer": "If recursive object merge functions fail to sanitize keys like '__proto__' or 'constructor.prototype', an attacker can inject properties onto Object.prototype. This affects all objects in the runtime, often leading to auth bypass or RCE."
      },
      {
        "id": "web-adv-4",
        "questionText": "How does the Server-Sent Events (SSE) protocol differ fundamentally from WebSockets for server-to-client updates?",
        "options": [
          {
            "id": "web-adv-4-a",
            "label": "A",
            "text": "SSE is mathematically restricted to binary data frames, while WebSockets can only transmit unencrypted plain text strings"
          },
          {
            "id": "web-adv-4-b",
            "label": "B",
            "text": "SSE provides unidirectional streaming over standard HTTP with built-in reconnection, whereas WebSockets provide full-duplex TCP framing"
          },
          {
            "id": "web-adv-4-c",
            "label": "C",
            "text": "SSE requires custom browser plugins to execute, while WebSockets are natively supported by all modern web rendering engines"
          },
          {
            "id": "web-adv-4-d",
            "label": "D",
            "text": "SSE terminates connections after each message, while WebSockets maintain persistent connections for twenty-four hours"
          }
        ],
        "correctOptionId": "web-adv-4-b",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "sse-vs-websockets",
        "explanationAfterAnswer": "SSE runs over standard HTTP/1.1 or HTTP/2, streaming text events unidirectionally from server to client with native browser reconnection and event IDs. WebSockets upgrade the connection to a custom full-duplex protocol over TCP."
      },
      {
        "id": "web-adv-5",
        "questionText": "Why does the React Server Components (RSC) paradigm represent a fundamental shift in client bundle economics?",
        "options": [
          {
            "id": "web-adv-5-a",
            "label": "A",
            "text": "Server components compile React code into native WebAssembly modules that execute directly inside operating system kernels"
          },
          {
            "id": "web-adv-5-b",
            "label": "B",
            "text": "Server components eliminate the need for relational databases by storing all application state in browser session cookies"
          },
          {
            "id": "web-adv-5-c",
            "label": "C",
            "text": "Server components execute exclusively on the server, streaming a virtual DOM representation without adding their dependencies to client bundles"
          },
          {
            "id": "web-adv-5-d",
            "label": "D",
            "text": "Server components convert dynamic web pages into static PDF documents that are downloaded by the client browser"
          }
        ],
        "correctOptionId": "web-adv-5-c",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "rsc-bundle-architecture",
        "explanationAfterAnswer": "RSCs run only on the server, accessing databases/filesystems directly. They render to a streamable JSON-like UI tree format (RSC payload). Their heavy npm dependencies never ship to the client, keeping bundle sizes zero for those parts."
      },
      {
        "id": "web-adv-6",
        "questionText": "In high-performance web animations, why should transforms and opacity be animated rather than width, height, or top/left?",
        "options": [
          {
            "id": "web-adv-6-a",
            "label": "A",
            "text": "Width and height properties automatically disable browser hardware acceleration for all DOM elements on the page"
          },
          {
            "id": "web-adv-6-b",
            "label": "B",
            "text": "Transform properties force the browser to convert HTML elements into static SVG images before rendering"
          },
          {
            "id": "web-adv-6-c",
            "label": "C",
            "text": "Top and left properties trigger synchronous database transactions that block the main JavaScript execution thread"
          },
          {
            "id": "web-adv-6-d",
            "label": "D",
            "text": "Transform and opacity bypass layout reflow and repaint passes, executing compositing directly on the GPU"
          }
        ],
        "correctOptionId": "web-adv-6-d",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "composite-only-animations-gpu",
        "explanationAfterAnswer": "Mutating width/height/top triggers the browser's layout (reflow) and paint pipelines on the CPU. Transforms and opacity promote the element to its own compositor layer on the GPU, allowing smooth 60/120fps animations without reflow."
      },
      {
        "id": "web-adv-7",
        "questionText": "What mechanism does the WebAuthn API utilize to provide phishing-resistant authentication for web applications?",
        "options": [
          {
            "id": "web-adv-7-a",
            "label": "A",
            "text": "It uses asymmetric key pairs scoped to the origin domain, signed by hardware authenticators during registration and login"
          },
          {
            "id": "web-adv-7-b",
            "label": "B",
            "text": "It sends a six-digit verification code via SMS to the user's registered mobile phone number upon every login attempt"
          },
          {
            "id": "web-adv-7-c",
            "label": "C",
            "text": "It captures high-resolution webcam photos of the user and verifies facial features using client-side neural networks"
          },
          {
            "id": "web-adv-7-d",
            "label": "D",
            "text": "It stores master passwords in encrypted browser cookies that are automatically submitted with all HTTP requests"
          }
        ],
        "correctOptionId": "web-adv-7-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "webauthn-phishing-resistance",
        "explanationAfterAnswer": "WebAuthn uses public key cryptography tied to a specific relying party ID (origin domain). During authentication, the hardware authenticator signs a challenge using the private key matching that exact domain, making phishing mathematically impossible."
      },
      {
        "id": "web-adv-8",
        "questionText": "How does Cache-Control: stale-while-revalidate optimize user experience while keeping content fresh?",
        "options": [
          {
            "id": "web-adv-8-a",
            "label": "A",
            "text": "The browser forces the server to recompute database queries whenever a user scrolls down the webpage"
          },
          {
            "id": "web-adv-8-b",
            "label": "B",
            "text": "The browser serves stale cached content immediately while asynchronously fetching and updating the cache in the background"
          },
          {
            "id": "web-adv-8-c",
            "label": "C",
            "text": "The browser deletes all local storage caches if the user does not visit the website for more than seven days"
          },
          {
            "id": "web-adv-8-d",
            "label": "D",
            "text": "The server rejects all subsequent client requests until the background cache validation process completes"
          }
        ],
        "correctOptionId": "web-adv-8-b",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "stale-while-revalidate-caching",
        "explanationAfterAnswer": "stale-while-revalidate tells clients/CDNs: 'If the resource is stale but within the revalidation window, serve the stale version instantly (zero latency) and trigger a background network fetch to revalidate and update the cache for next time.'"
      },
      {
        "id": "web-adv-9",
        "questionText": "In database isolation levels, what concurrency phenomenon does 'Snapshot Isolation' eliminate compared to 'Read Committed'?",
        "options": [
          {
            "id": "web-adv-9-a",
            "label": "A",
            "text": "Deadlocks, by forcing all database transactions to execute sequentially in single-threaded lockstep"
          },
          {
            "id": "web-adv-9-b",
            "label": "B",
            "text": "Disk space fragmentation, by compressing database index files into read-only binary archives"
          },
          {
            "id": "web-adv-9-c",
            "label": "C",
            "text": "Non-Repeatable Reads, by providing transactions with a consistent snapshot of data as of the transaction start time"
          },
          {
            "id": "web-adv-9-d",
            "label": "D",
            "text": "Network latency, by replicating database tables directly into client browser memory partitions"
          }
        ],
        "correctOptionId": "web-adv-9-c",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "snapshot-isolation-mvcc",
        "explanationAfterAnswer": "Under Read Committed, re-reading a row mid-transaction can return different values if another transaction committed changes (Non-Repeatable Read). Snapshot Isolation uses MVCC to ensure all reads see a consistent snapshot from the transaction's start."
      },
      {
        "id": "web-adv-10",
        "questionText": "How does HTTP/3 with QUIC eliminate the Head-of-Line (HoL) blocking issue present in HTTP/2?",
        "options": [
          {
            "id": "web-adv-10-a",
            "label": "A",
            "text": "By requiring web servers to cache all website assets in local browser memory before accepting connections"
          },
          {
            "id": "web-adv-10-b",
            "label": "B",
            "text": "By establishing separate physical fiber optic connections for every individual image loaded by the webpage"
          },
          {
            "id": "web-adv-10-c",
            "label": "C",
            "text": "By compressing all HTTP request headers into fixed-size 32-bit integer binary identifiers"
          },
          {
            "id": "web-adv-10-d",
            "label": "D",
            "text": "By multiplexing streams over UDP with independent packet loss recovery per stream instead of a single shared TCP stream"
          }
        ],
        "correctOptionId": "web-adv-10-d",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "quic-http3-hol-blocking",
        "explanationAfterAnswer": "HTTP/2 multiplexes streams over a single TCP connection; a single lost packet stalls the entire TCP window across all streams. HTTP/3 runs over QUIC (UDP), so packet loss on one stream only pauses that individual stream while others continue unimpeded."
      }
    ]
  },
  "software": {
    "beginner": [
      {
        "id": "soft-beg-1",
        "questionText": "What is the time complexity of searching for an element in an unsorted array of size N?",
        "options": [
          {
            "id": "soft-beg-1-a",
            "label": "A",
            "text": "O(N) linear time, because in the worst case every element must be inspected sequentially from start to end"
          },
          {
            "id": "soft-beg-1-b",
            "label": "B",
            "text": "O(1) constant time, because direct index lookups retrieve elements instantly regardless of array size"
          },
          {
            "id": "soft-beg-1-c",
            "label": "C",
            "text": "O(log N) logarithmic time, because the search space can be repeatedly halved using binary comparisons"
          },
          {
            "id": "soft-beg-1-d",
            "label": "D",
            "text": "O(N^2) quadratic time, because comparing array elements requires nested loop iterations across all pairs"
          }
        ],
        "correctOptionId": "soft-beg-1-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "array-linear-search-complexity",
        "explanationAfterAnswer": "In an unsorted array, there is no ordering to guide searches. Finding a specific element requires checking each position sequentially, leading to O(N) worst-case time complexity."
      },
      {
        "id": "soft-beg-2",
        "questionText": "What distinguishes a Stack from a Queue in fundamental computer science data structures?",
        "options": [
          {
            "id": "soft-beg-2-a",
            "label": "A",
            "text": "A Stack stores floating-point numbers in memory, while a Queue stores character string objects"
          },
          {
            "id": "soft-beg-2-b",
            "label": "B",
            "text": "A Stack follows Last-In-First-Out (LIFO) order, while a Queue follows First-In-First-Out (FIFO) order"
          },
          {
            "id": "soft-beg-2-c",
            "label": "C",
            "text": "A Stack requires continuous heap memory allocation, while a Queue operates exclusively on disk storage"
          },
          {
            "id": "soft-beg-2-d",
            "label": "D",
            "text": "A Stack permits random access by integer index, while a Queue requires hash table key lookups"
          }
        ],
        "correctOptionId": "soft-beg-2-b",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "stack-vs-queue-ordering",
        "explanationAfterAnswer": "A Stack inserts and removes items from the same end (LIFO - like a stack of plates). A Queue inserts items at the back and removes them from the front (FIFO - like a line of people waiting)."
      },
      {
        "id": "soft-beg-3",
        "questionText": "What is the primary function of an operating system kernel?",
        "options": [
          {
            "id": "soft-beg-3-a",
            "label": "A",
            "text": "To compile application source code into executable binary packages during software installation"
          },
          {
            "id": "soft-beg-3-b",
            "label": "B",
            "text": "To render graphical desktop windows, mouse pointers, and desktop background wallpapers"
          },
          {
            "id": "soft-beg-3-c",
            "label": "C",
            "text": "To manage core hardware resources including CPU scheduling, memory allocation, and device I/O"
          },
          {
            "id": "soft-beg-3-d",
            "label": "D",
            "text": "To automatically download and install web browser security extensions from public software stores"
          }
        ],
        "correctOptionId": "soft-beg-3-c",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "os-kernel-responsibilities",
        "explanationAfterAnswer": "The kernel is the core of the operating system that has complete control over everything in the system, managing hardware resources (CPU, RAM, block storage, peripherals) and mediating software access via system calls."
      },
      {
        "id": "soft-beg-4",
        "questionText": "In object-oriented programming, what does the concept of Encapsulation achieve?",
        "options": [
          {
            "id": "soft-beg-4-a",
            "label": "A",
            "text": "Allowing a single child class to inherit property definitions simultaneously from multiple parent classes"
          },
          {
            "id": "soft-beg-4-b",
            "label": "B",
            "text": "Automatically compiling source code into multiple distinct native operating system executable formats"
          },
          {
            "id": "soft-beg-4-c",
            "label": "C",
            "text": "Converting runtime memory data structures into static JSON files saved on persistent local hard drives"
          },
          {
            "id": "soft-beg-4-d",
            "label": "D",
            "text": "Bundling data and methods within an object while hiding internal implementation details from external access"
          }
        ],
        "correctOptionId": "soft-beg-4-d",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "oop-encapsulation-principle",
        "explanationAfterAnswer": "Encapsulation binds data and the methods that manipulate that data into a cohesive unit (class) while restricting direct external access to internal state, exposing only controlled public interfaces."
      },
      {
        "id": "soft-beg-5",
        "questionText": "What is the primary operational purpose of unit testing in software development?",
        "options": [
          {
            "id": "soft-beg-5-a",
            "label": "A",
            "text": "To test individual isolated functions or modules in isolation to ensure they produce expected outputs"
          },
          {
            "id": "soft-beg-5-b",
            "label": "B",
            "text": "To measure how many concurrent user requests a production database server can support before failure"
          },
          {
            "id": "soft-beg-5-c",
            "label": "C",
            "text": "To deploy compiled application binaries to cloud staging environments across multiple availability zones"
          },
          {
            "id": "soft-beg-5-d",
            "label": "D",
            "text": "To generate user documentation and API release notes automatically from database commit histories"
          }
        ],
        "correctOptionId": "soft-beg-5-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "unit-testing-fundamentals",
        "explanationAfterAnswer": "Unit testing verifies that small, isolated pieces of code (functions, methods) work correctly given defined inputs, catching regressions early in development before integration."
      },
      {
        "id": "soft-beg-6",
        "questionText": "A program enters an infinite recursion loop without a valid base case. What runtime error occurs?",
        "options": [
          {
            "id": "soft-beg-6-a",
            "label": "A",
            "text": "A Segmentation Fault, caused by physical memory chips overheating due to excessive mathematical calculations"
          },
          {
            "id": "soft-beg-6-b",
            "label": "B",
            "text": "A Stack Overflow error, because recursive function call frames exhaust the allocated thread call stack memory"
          },
          {
            "id": "soft-beg-6-c",
            "label": "C",
            "text": "A Deadlock exception, because two background threads acquire mutual exclusion locks in conflicting order"
          },
          {
            "id": "soft-beg-6-d",
            "label": "D",
            "text": "A Null Pointer Dereference, because the operating system deletes unreferenced variables from heap storage"
          }
        ],
        "correctOptionId": "soft-beg-6-b",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "recursion-stack-overflow",
        "explanationAfterAnswer": "Each recursive call pushes a new stack frame (return address, arguments, local variables) onto the execution stack. Without a terminating base case, the stack exceeds its allocated memory limit, triggering a stack overflow."
      },
      {
        "id": "soft-beg-7",
        "questionText": "Why do relational databases create B-Tree indexes on frequently queried table columns?",
        "options": [
          {
            "id": "soft-beg-7-a",
            "label": "A",
            "text": "To compress character string fields into binary format to minimize total hard drive storage usage"
          },
          {
            "id": "soft-beg-7-b",
            "label": "B",
            "text": "To eliminate the need for primary key constraints and unique index definitions across related tables"
          },
          {
            "id": "soft-beg-7-c",
            "label": "C",
            "text": "To allow the query optimizer to locate rows in logarithmic time O(log N) rather than scanning the full table"
          },
          {
            "id": "soft-beg-7-d",
            "label": "D",
            "text": "To automatically convert unstructured JSON payloads into normalized third normal form relations"
          }
        ],
        "correctOptionId": "soft-beg-7-c",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "database-btree-indexes",
        "explanationAfterAnswer": "B-Tree indexes maintain sorted balanced trees of keys and row pointers, allowing search, range queries, and ordering in O(log N) disk reads, avoiding expensive O(N) full table scans."
      },
      {
        "id": "soft-beg-8",
        "questionText": "In version control with Git, what is the effect of running `git checkout -b feature/login`?",
        "options": [
          {
            "id": "soft-beg-8-a",
            "label": "A",
            "text": "It deletes the remote feature branch and reverts local tracked files to the previous commit state"
          },
          {
            "id": "soft-beg-8-b",
            "label": "B",
            "text": "It merges all commits from the 'feature/login' branch into the main production branch automatically"
          },
          {
            "id": "soft-beg-8-c",
            "label": "C",
            "text": "It pushes all uncommitted local code changes directly to the remote repository on the central server"
          },
          {
            "id": "soft-beg-8-d",
            "label": "D",
            "text": "It creates a new branch named 'feature/login' and immediately switches your working directory to it"
          }
        ],
        "correctOptionId": "soft-beg-8-d",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "git-branching-workflow",
        "explanationAfterAnswer": "The `-b` flag tells Git to create a new branch with the specified name and immediately switch the HEAD pointer and working tree to point to this new branch."
      },
      {
        "id": "soft-beg-9",
        "questionText": "A sorting algorithm must guarantee stable sorting of records with identical keys. Which algorithm is naturally stable?",
        "options": [
          {
            "id": "soft-beg-9-a",
            "label": "A",
            "text": "Merge Sort, which preserves the relative original input order of elements with equal key values"
          },
          {
            "id": "soft-beg-9-b",
            "label": "B",
            "text": "Heap Sort, which organizes array values into binary max-heaps using non-adjacent element swaps"
          },
          {
            "id": "soft-beg-9-c",
            "label": "C",
            "text": "Quick Sort with in-place Lomuto partitioning, which swaps distant elements across pivot values"
          },
          {
            "id": "soft-beg-9-d",
            "label": "D",
            "text": "Selection Sort, which iteratively finds the minimum element and swaps it with the current position"
          }
        ],
        "correctOptionId": "soft-beg-9-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "sorting-algorithm-stability",
        "explanationAfterAnswer": "A sorting algorithm is stable if it preserves the original relative order of records with equal keys. Merge Sort divides and merges subarrays while carefully prioritizing elements from the left subarray when keys match, preserving stability."
      },
      {
        "id": "soft-beg-10",
        "questionText": "What is the primary memory management difference between Stack memory and Heap memory in compiled languages (e.g. C/Rust)?",
        "options": [
          {
            "id": "soft-beg-10-a",
            "label": "A",
            "text": "Stack memory stores global shared databases, while Heap memory stores local CPU instruction registers"
          },
          {
            "id": "soft-beg-10-b",
            "label": "B",
            "text": "Stack allocations are fast and automatically freed on function return, while Heap allocations are dynamic and persistent"
          },
          {
            "id": "soft-beg-10-c",
            "label": "C",
            "text": "Stack memory is stored on external persistent solid-state drives, while Heap memory resides in L1 cache"
          },
          {
            "id": "soft-beg-10-d",
            "label": "D",
            "text": "Stack memory allows arbitrary runtime resizing of arrays, while Heap memory requires fixed compile-time sizes"
          }
        ],
        "correctOptionId": "soft-beg-10-b",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "stack-vs-heap-memory",
        "explanationAfterAnswer": "Stack memory is managed automatically by the CPU call stack; variables are pushed on function call and popped on return (very fast). Heap memory is allocated dynamically at runtime (malloc/new) and persists until explicitly freed or garbage-collected."
      }
    ],
    "intermediate": [
      {
        "id": "soft-int-1",
        "questionText": "How does a Hash Table achieve average-case O(1) time complexity for key lookup operations?",
        "options": [
          {
            "id": "soft-int-1-a",
            "label": "A",
            "text": "By sorting all key-value entries sequentially in memory and performing binary searches on each request"
          },
          {
            "id": "soft-int-1-b",
            "label": "B",
            "text": "By compressing key strings into 8-bit binary masks that are evaluated simultaneously by SIMD CPU registers"
          },
          {
            "id": "soft-int-1-c",
            "label": "C",
            "text": "By using a hash function to map keys to numerical array indices, allowing direct bucket memory access"
          },
          {
            "id": "soft-int-1-d",
            "label": "D",
            "text": "By storing data in balanced red-black binary search trees that self-rebalance after each read mutation"
          }
        ],
        "correctOptionId": "soft-int-1-c",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "hash-table-mechanics",
        "explanationAfterAnswer": "A hash function computes an integer hash code from the key, which is modulated to an array bucket index. Under a good hash distribution and low load factor, this allows direct array indexing in O(1) average time."
      },
      {
        "id": "soft-int-2",
        "questionText": "In concurrent programming, what is a 'Race Condition' and how does it compromise software correctness?",
        "options": [
          {
            "id": "soft-int-2-a",
            "label": "A",
            "text": "A condition where two threads execute identical calculations simultaneously, wasting CPU cycles unnecessarily"
          },
          {
            "id": "soft-int-2-b",
            "label": "B",
            "text": "A condition where software execution speed is restricted by the read latency of mechanical hard drive disks"
          },
          {
            "id": "soft-int-2-c",
            "label": "C",
            "text": "A condition where network latency between microservices exceeds the timeout threshold of the load balancer"
          },
          {
            "id": "soft-int-2-d",
            "label": "D",
            "text": "A condition where output depends on non-deterministic timing of concurrent threads accessing shared mutable state"
          }
        ],
        "correctOptionId": "soft-int-2-d",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "race-condition-concurrency",
        "explanationAfterAnswer": "A race condition occurs when multiple threads concurrently read and write shared data without synchronization, causing the final program state to depend unpredictably on thread scheduling."
      },
      {
        "id": "soft-int-3",
        "questionText": "What distinguishes a process from a thread in modern multitasking operating systems?",
        "options": [
          {
            "id": "soft-int-3-a",
            "label": "A",
            "text": "Processes have isolated virtual memory address spaces, while threads within a process share the same address space"
          },
          {
            "id": "soft-int-3-b",
            "label": "B",
            "text": "Processes execute on graphics processing units, while threads execute exclusively on central processing unit cores"
          },
          {
            "id": "soft-int-3-c",
            "label": "C",
            "text": "Processes are managed entirely by application code, while threads require dedicated kernel hypervisor runtimes"
          },
          {
            "id": "soft-int-3-d",
            "label": "D",
            "text": "Processes cannot communicate over networks, while threads possess built-in TCP/IP socket protocol stacks"
          }
        ],
        "correctOptionId": "soft-int-3-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "process-vs-thread-memory",
        "explanationAfterAnswer": "A process is an execution unit with its own private address space, file descriptors, and security context. Threads are lightweight execution units within a process that share code, heap memory, and global variables, but have distinct call stacks."
      },
      {
        "id": "soft-int-4",
        "questionText": "A service experiences a memory leak where memory usage grows continuously until the OS kills it. How is this diagnosed?",
        "options": [
          {
            "id": "soft-int-4-a",
            "label": "A",
            "text": "Increase the swap partition size on the disk so that leaking allocations never exhaust physical system RAM"
          },
          {
            "id": "soft-int-4-b",
            "label": "B",
            "text": "Inspect memory heap snapshots using a profiler to identify uncollected objects retained by active references"
          },
          {
            "id": "soft-int-4-c",
            "label": "C",
            "text": "Restart the application server container every fifteen minutes using an automated cron background job"
          },
          {
            "id": "soft-int-4-d",
            "label": "D",
            "text": "Convert all relational database table schemas from InnoDB into MyISAM to eliminate foreign key overhead"
          }
        ],
        "correctOptionId": "soft-int-4-b",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "memory-leak-profiling",
        "explanationAfterAnswer": "Memory leaks occur when allocated objects that are no longer needed remain reachable from GC roots (event listeners, caches, closures). Heap dumps and memory profilers capture object retention paths to isolate the leak."
      },
      {
        "id": "soft-int-5",
        "questionText": "In API design, what does 'Idempotence' mean and why is it critical for distributed network calls?",
        "options": [
          {
            "id": "soft-int-5-a",
            "label": "A",
            "text": "The API endpoint encrypts all payload bodies using symmetric keys before sending responses across network routes"
          },
          {
            "id": "soft-int-5-b",
            "label": "B",
            "text": "The API endpoint automatically translates incoming JSON payloads into binary protocol buffer representations"
          },
          {
            "id": "soft-int-5-c",
            "label": "C",
            "text": "Making the same request multiple times produces the same system state as making it once, making retries safe"
          },
          {
            "id": "soft-int-5-d",
            "label": "D",
            "text": "The API endpoint processes requests in constant time O(1) regardless of the size of the request body payload"
          }
        ],
        "correctOptionId": "soft-int-5-c",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "idempotency-distributed-systems",
        "explanationAfterAnswer": "An operation is idempotent if f(f(x)) = f(x). In networks where timeouts occur, clients can safely retry idempotent requests (such as HTTP PUT, DELETE, or payments with idempotency keys) without risking duplicate processing."
      },
      {
        "id": "soft-int-6",
        "questionText": "What problem does the Dependency Injection design pattern solve in modular software systems?",
        "options": [
          {
            "id": "soft-int-6-a",
            "label": "A",
            "text": "It compresses compiled binary executable files to minimize memory consumption during cold application starts"
          },
          {
            "id": "soft-int-6-b",
            "label": "B",
            "text": "It replaces asynchronous Promise calls with synchronous blocking routines to prevent thread context switching"
          },
          {
            "id": "soft-int-6-c",
            "label": "C",
            "text": "It prevents database deadlocks by forcing all SQL queries to execute within a single global transaction lock"
          },
          {
            "id": "soft-int-6-d",
            "label": "D",
            "text": "It decouples components by passing dependencies from the outside rather than hardcoding them inside classes"
          }
        ],
        "correctOptionId": "soft-int-6-d",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "dependency-injection-decoupling",
        "explanationAfterAnswer": "Dependency Injection inverts control: objects receive their dependencies (e.g. database client, logger) via constructors or setters, making classes decoupled, testable with mocks, and easily configurable."
      },
      {
        "id": "soft-int-7",
        "questionText": "How does a thread-safe Read-Write Lock (RWLock) improve concurrent throughput over a mutual exclusion lock (Mutex)?",
        "options": [
          {
            "id": "soft-int-7-a",
            "label": "A",
            "text": "By allowing multiple reader threads to access shared state concurrently while requiring exclusive access for writers"
          },
          {
            "id": "soft-int-7-b",
            "label": "B",
            "text": "By converting all write operations into asynchronous background thread execution passes without blocking"
          },
          {
            "id": "soft-int-7-c",
            "label": "C",
            "text": "By caching shared state variables in CPU L1 hardware registers to eliminate physical memory reads"
          },
          {
            "id": "soft-int-7-d",
            "label": "D",
            "text": "By eliminating the requirement for lock acquisition when running on multi-core operating system platforms"
          }
        ],
        "correctOptionId": "soft-int-7-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "read-write-locks-concurrency",
        "explanationAfterAnswer": "A standard mutex allows only one thread at a time, serializing reads. An RWLock allows arbitrary numbers of reader threads to access data simultaneously, acquiring an exclusive lock only when a thread needs to mutate data."
      },
      {
        "id": "soft-int-8",
        "questionText": "What is the primary architectural difference between REST and gRPC for inter-service communication?",
        "options": [
          {
            "id": "soft-int-8-a",
            "label": "A",
            "text": "REST requires dedicated UDP transport protocols, while gRPC communicates exclusively over unencrypted websockets"
          },
          {
            "id": "soft-int-8-b",
            "label": "B",
            "text": "REST uses text-based JSON over HTTP/1.1, while gRPC uses binary Protocol Buffers over HTTP/2 with strong contracts"
          },
          {
            "id": "soft-int-8-c",
            "label": "C",
            "text": "REST is restricted to internal microservices, while gRPC is designed strictly for public browser client interfaces"
          },
          {
            "id": "soft-int-8-d",
            "label": "D",
            "text": "REST enforces strict compile-time type validation, while gRPC operates without any schema definitions"
          }
        ],
        "correctOptionId": "soft-int-8-b",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "grpc-vs-rest-protocols",
        "explanationAfterAnswer": "REST typically sends human-readable JSON payloads over HTTP/1.1. gRPC uses HTTP/2 multiplexing, binary serialization via Protocol Buffers (.proto), and code-generated typed stubs, delivering higher throughput and lower serialization overhead."
      },
      {
        "id": "soft-int-9",
        "questionText": "How does copy-on-write (COW) optimization improve the efficiency of the `fork()` system call in Unix/Linux?",
        "options": [
          {
            "id": "soft-int-9-a",
            "label": "A",
            "text": "By compressing all child process memory allocations into swap partitions on local solid-state drives"
          },
          {
            "id": "soft-int-9-b",
            "label": "B",
            "text": "By compiling the child process source code directly into kernel machine bytecode during the call"
          },
          {
            "id": "soft-int-9-c",
            "label": "C",
            "text": "By sharing memory pages read-only between parent and child until one process modifies a page, avoiding full copies"
          },
          {
            "id": "soft-int-9-d",
            "label": "D",
            "text": "By terminating the parent process immediately so that the child can inherit all physical memory hardware"
          }
        ],
        "correctOptionId": "soft-int-9-c",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "fork-copy-on-write-os",
        "explanationAfterAnswer": "Copy-on-write duplicates page tables, pointing both parent and child to the same physical memory pages marked read-only. Only when either process writes to a page does the MMU trap, allocating a new physical copy of that specific page."
      },
      {
        "id": "soft-int-10",
        "questionText": "What condition is required to produce a Deadlock in a multi-threaded application (Coffman conditions)?",
        "options": [
          {
            "id": "soft-int-10-a",
            "label": "A",
            "text": "A single thread running in an infinite loop while holding a lock on an uninitialized memory pointer"
          },
          {
            "id": "soft-int-10-b",
            "label": "B",
            "text": "Two threads attempting to read from the same database table using unindexed sequential select queries"
          },
          {
            "id": "soft-int-10-c",
            "label": "C",
            "text": "A worker thread exceeding its maximum allocated stack memory limit while processing a recursive calculation"
          },
          {
            "id": "soft-int-10-d",
            "label": "D",
            "text": "Mutual exclusion, hold and wait, no preemption, and circular wait existing simultaneously among threads"
          }
        ],
        "correctOptionId": "soft-int-10-d",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "deadlock-coffman-conditions",
        "explanationAfterAnswer": "A deadlock can occur if and only if all four Coffman conditions hold: Mutual Exclusion (exclusive resource hold), Hold and Wait (holding while waiting for others), No Preemption (resources cannot be forcibly confiscated), and Circular Wait."
      }
    ],
    "advanced": [
      {
        "id": "soft-adv-1",
        "questionText": "In high-performance systems programming, what is False Sharing in multi-core CPU architectures and how is it resolved?",
        "options": [
          {
            "id": "soft-adv-1-a",
            "label": "A",
            "text": "Independent variables on the same cache line modified by different cores invalidate each other's L1 cache; pad to cache line"
          },
          {
            "id": "soft-adv-1-b",
            "label": "B",
            "text": "Two threads attempting to read from the same socket file descriptor; resolve by creating duplicate network sockets"
          },
          {
            "id": "soft-adv-1-c",
            "label": "C",
            "text": "Virtual memory page tables overlapping in physical RAM; resolve by disabling kernel address space layout randomization"
          },
          {
            "id": "soft-adv-1-d",
            "label": "D",
            "text": "Operating system processes sharing environment variables; resolve by compiling binaries with static runtime libraries"
          }
        ],
        "correctOptionId": "soft-adv-1-a",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "false-sharing-cache-lines",
        "explanationAfterAnswer": "False sharing occurs when threads on different cores modify independent variables that reside within the same 64-byte cache line. Cache coherency protocols (MESI) repeatedly invalidate the cache line across cores. Aligning/padding data to 64 bytes eliminates this."
      },
      {
        "id": "soft-adv-2",
        "questionText": "How do lock-free data structures (e.g. lock-free queues) guarantee progress without using mutexes or semaphores?",
        "options": [
          {
            "id": "soft-adv-2-a",
            "label": "A",
            "text": "By disabling hardware interrupts on all CPU cores whenever a thread enters a critical execution section"
          },
          {
            "id": "soft-adv-2-b",
            "label": "B",
            "text": "By using atomic hardware instructions like Compare-And-Swap (CAS) in retry loops, ensuring at least one thread makes progress"
          },
          {
            "id": "soft-adv-2-c",
            "label": "C",
            "text": "By converting all pointer operations into read-only transaction snapshots evaluated in GPU memory"
          },
          {
            "id": "soft-adv-2-d",
            "label": "D",
            "text": "By assigning dedicated physical memory hardware modules to each thread to eliminate memory bus sharing"
          }
        ],
        "correctOptionId": "soft-adv-2-b",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "lock-free-cas-mechanics",
        "explanationAfterAnswer": "Lock-free structures use atomic primitives (CAS, LL/SC). If multiple threads attempt an atomic update simultaneously, one succeeds and others fail and retry. This guarantees system-wide progress without thread suspension or priority inversion."
      },
      {
        "id": "soft-adv-3",
        "questionText": "What is the ABA problem in lock-free concurrent programming and what is the standard solution?",
        "options": [
          {
            "id": "soft-adv-3-a",
            "label": "A",
            "text": "Two threads deadlock by acquiring Lock A then Lock B in reverse order; resolve by sorting lock acquisition orders"
          },
          {
            "id": "soft-adv-3-b",
            "label": "B",
            "text": "A memory allocator runs out of 64-bit address space; resolve by switching from heap memory to thread stack memory"
          },
          {
            "id": "soft-adv-3-c",
            "label": "C",
            "text": "A pointer changes from A to B and back to A; a CAS succeeds assuming no change; resolve using tagged pointers with version counters"
          },
          {
            "id": "soft-adv-3-d",
            "label": "D",
            "text": "A CPU branch predictor fails to speculative execute nested loop iterations; resolve by unrolling loop structures"
          }
        ],
        "correctOptionId": "soft-adv-3-c",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "aba-problem-tagged-pointers",
        "explanationAfterAnswer": "In the ABA problem, thread 1 reads value A. Before thread 1 executes CAS(A, new), other threads change A to B and back to A. CAS succeeds because pointer values match, though intermediate state was modified. Tagged pointers (pointer + monotonic counter) fix this."
      },
      {
        "id": "soft-adv-4",
        "questionText": "In the Linux kernel, how does the Completely Fair Scheduler (CFS) determine which task to run next on a CPU?",
        "options": [
          {
            "id": "soft-adv-4-a",
            "label": "A",
            "text": "It executes tasks in strict round-robin order based on the physical process identifier assigned at boot time"
          },
          {
            "id": "soft-adv-4-b",
            "label": "B",
            "text": "It assigns all available CPU cycles to whichever process opened the greatest number of network socket handles"
          },
          {
            "id": "soft-adv-4-c",
            "label": "C",
            "text": "It randomizes task execution order using hardware random number generators to avoid thread starvation"
          },
          {
            "id": "soft-adv-4-d",
            "label": "D",
            "text": "It tracks virtual runtime (vruntime) in a red-black tree, always selecting the runnable task with the smallest vruntime"
          }
        ],
        "correctOptionId": "soft-adv-4-d",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "linux-cfs-vruntime-scheduler",
        "explanationAfterAnswer": "CFS models an 'ideal multi-tasking CPU'. It tracks each task's virtual runtime (vruntime), weighted by its nice value. Tasks are indexed in a time-ordered red-black tree; the leftmost node (smallest vruntime) is always picked next."
      },
      {
        "id": "soft-adv-5",
        "questionText": "How does the Linux `io_uring` asynchronous I/O interface achieve massive throughput gains over legacy `epoll` and `aio`?",
        "options": [
          {
            "id": "soft-adv-5-a",
            "label": "A",
            "text": "By using shared-memory ring buffers between user space and kernel space, submitting and completing I/O with zero syscalls"
          },
          {
            "id": "soft-adv-5-b",
            "label": "B",
            "text": "By disabling kernel security checks and executing user space application code directly in CPU ring 0"
          },
          {
            "id": "soft-adv-5-c",
            "label": "C",
            "text": "By compressing all network packet payloads into binary protocol buffers before transmitting them to devices"
          },
          {
            "id": "soft-adv-5-d",
            "label": "D",
            "text": "By restricting all asynchronous disk writes to execute sequentially in single-threaded lockstep mode"
          }
        ],
        "correctOptionId": "soft-adv-5-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "io-uring-ring-buffers",
        "explanationAfterAnswer": "io_uring uses two ring buffers (Submission Queue and Completion Queue) shared between userspace and kernel. Applications enqueue requests and reap completions via atomic memory operations without context-switching into the kernel via syscalls."
      },
      {
        "id": "soft-adv-6",
        "questionText": "Why is Memory Ordering (Sequential Consistency vs Acquire-Release semantics) critical in C++11 and Rust concurrency?",
        "options": [
          {
            "id": "soft-adv-6-a",
            "label": "A",
            "text": "Operating systems delete unreferenced global variables if memory addresses are not assigned in sequential order"
          },
          {
            "id": "soft-adv-6-b",
            "label": "B",
            "text": "Compilers and out-of-order CPUs reorder instructions; explicit memory barriers prevent observing invalid state across cores"
          },
          {
            "id": "soft-adv-6-c",
            "label": "C",
            "text": "Network routing switches drop TCP packets unless payload bytes are ordered sequentially in local RAM memory"
          },
          {
            "id": "soft-adv-6-d",
            "label": "D",
            "text": "Hardware cache controllers require memory addresses to be multiples of 1024 bytes to execute read operations"
          }
        ],
        "correctOptionId": "soft-adv-6-b",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "memory-ordering-acquire-release",
        "explanationAfterAnswer": "Modern superscalar CPUs and optimizing compilers aggressively reorder independent memory reads and writes. Acquire-release memory ordering provides synchronization guarantees (preventing reordering across the fence) without the performance overhead of seq_cst."
      },
      {
        "id": "soft-adv-7",
        "questionText": "What mechanism does Garbage Collection with Generational Hypothesis (e.g. V8, JVM) exploit to minimize pause times?",
        "options": [
          {
            "id": "soft-adv-7-a",
            "label": "A",
            "text": "All objects in memory are assigned permanent physical hardware addresses that never require garbage collection"
          },
          {
            "id": "soft-adv-7-b",
            "label": "B",
            "text": "Garbage collectors convert allocated heap objects into static binary files stored on local solid-state drives"
          },
          {
            "id": "soft-adv-7-c",
            "label": "C",
            "text": "Most allocated objects die young; frequent fast minor collections scan young gen while old gen is collected rarely"
          },
          {
            "id": "soft-adv-7-d",
            "label": "D",
            "text": "The runtime terminates all active threads whenever total allocated heap memory exceeds one gigabyte"
          }
        ],
        "correctOptionId": "soft-adv-7-c",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "generational-garbage-collection",
        "explanationAfterAnswer": "The weak generational hypothesis states that the vast majority of objects die shortly after allocation. Generational collectors segregate heap into Young and Old generations, running fast minor collections on the young space where most objects are reclaimed quickly."
      },
      {
        "id": "soft-adv-8",
        "questionText": "In distributed database log-structured storage engines (e.g. LSM-Trees in RocksDB), why are writes faster than in B-Trees?",
        "options": [
          {
            "id": "soft-adv-8-a",
            "label": "A",
            "text": "Writes bypass the file system entirely and stream binary data directly across unencrypted local network sockets"
          },
          {
            "id": "soft-adv-8-b",
            "label": "B",
            "text": "Writes delete all existing historical table data before committing new transaction entries to disk partitions"
          },
          {
            "id": "soft-adv-8-c",
            "label": "C",
            "text": "Writes convert relational SQL tables into unindexed text files that require zero index maintenance overhead"
          },
          {
            "id": "soft-adv-8-d",
            "label": "D",
            "text": "Writes append sequentially to an in-memory MemTable and write-ahead log, avoiding expensive in-place random disk seeks"
          }
        ],
        "correctOptionId": "soft-adv-8-d",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "lsm-tree-write-amplification",
        "explanationAfterAnswer": "B-Trees require random in-place updates across disk blocks, causing heavy write amplification and random I/O. LSM-trees transform writes into fast sequential appends to an in-memory MemTable and WAL, flushing immutable SSTables to disk in bulk."
      },
      {
        "id": "soft-adv-9",
        "questionText": "What specific trade-off does the Raft consensus algorithm make compared to Multi-Paxos regarding log compaction and leadership?",
        "options": [
          {
            "id": "soft-adv-9-a",
            "label": "A",
            "text": "Raft enforces strong leadership with strictly linear log append flows, making it simpler to reason about than Paxos"
          },
          {
            "id": "soft-adv-9-b",
            "label": "B",
            "text": "Raft eliminates the mathematical requirement for quorum majorities when electing cluster leader instances"
          },
          {
            "id": "soft-adv-9-c",
            "label": "C",
            "text": "Raft allows multiple leaders to commit conflicting log entries concurrently across separate cluster partitions"
          },
          {
            "id": "soft-adv-9-d",
            "label": "D",
            "text": "Raft requires all cluster nodes to possess identical hardware clock crystals synchronized to UTC time"
          }
        ],
        "correctOptionId": "soft-adv-9-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "raft-vs-paxos-consensus",
        "explanationAfterAnswer": "Paxos allows log entries to be chosen out of order and stitched together later. Raft enforces strong leader invariants: log entries flow unidirectionally from leader to followers, and a leader is never elected unless it contains all committed entries, simplifying formal reasoning."
      },
      {
        "id": "soft-adv-10",
        "questionText": "How does the Two-Generals Problem demonstrate the impossibility of guaranteed consensus over an unreliable network?",
        "options": [
          {
            "id": "soft-adv-10-a",
            "label": "A",
            "text": "Two military generals cannot agree on an attack time if their mechanical watch clocks drift by five seconds"
          },
          {
            "id": "soft-adv-10-b",
            "label": "B",
            "text": "No finite exchange of acknowledgments over an unreliable link can guarantee both parties know the other agreed"
          },
          {
            "id": "soft-adv-10-c",
            "label": "C",
            "text": "Network routing switches drop packets whenever two servers attempt to open TCP connections simultaneously"
          },
          {
            "id": "soft-adv-10-d",
            "label": "D",
            "text": "Symmetric cryptographic algorithms fail to decrypt data if messages are transmitted across wireless networks"
          }
        ],
        "correctOptionId": "soft-adv-10-b",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "two-generals-problem-consensus",
        "explanationAfterAnswer": "The Two-Generals thought experiment proves that two processes communicating over an uncoordinated, lossy channel cannot reach guaranteed common knowledge: the last messenger to acknowledge can never be certain their acknowledgment was received."
      }
    ]
  }
};
