export const cloudQuestions = {
  beginner: [
    {
      id: "cld-beg-1",
      questionText: "What distinguishes Infrastructure as a Service (IaaS) from Platform as a Service (PaaS)?",
      options: [
        { id: "cld-beg-1-a", label: "A", text: "IaaS provides raw virtual compute and networking where users manage OS, while PaaS provides managed runtimes for code" },
        { id: "cld-beg-1-b", label: "B", text: "IaaS is hosted exclusively on private on-premise hardware, while PaaS is deployed across public cloud data centers" },
        { id: "cld-beg-1-c", label: "C", text: "IaaS requires specialized container orchestration engines, while PaaS operates purely on bare-metal physical servers" },
        { id: "cld-beg-1-d", label: "D", text: "IaaS bills customers based on application user counts, while PaaS bills based on static network IP reservations" }
      ],
      correctOptionId: "cld-beg-1-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "iaas-vs-paas",
      explanationAfterAnswer: "Under IaaS (e.g. AWS EC2, GCP Compute Engine), providers manage physical hardware and virtualization, while users manage OS, runtime, and applications. Under PaaS (e.g. Heroku, Elastic Beanstalk), the provider manages OS, patching, and runtimes."
    },
    {
      id: "cld-beg-2",
      questionText: "What is the primary operational advantage of containerization over traditional virtual machines?",
      options: [
        { id: "cld-beg-2-a", label: "A", text: "Containers eliminate the need for network routing protocols by assigning identical MAC addresses to all host workloads" },
        { id: "cld-beg-2-b", label: "B", text: "Containers share the host operating system kernel, resulting in faster startup times and lower resource overhead" },
        { id: "cld-beg-2-c", label: "C", text: "Containers provide absolute physical hardware isolation by dedicating separate CPU sockets to each running process" },
        { id: "cld-beg-2-d", label: "D", text: "Containers prevent software dependency conflicts by embedding complete hypervisor kernels inside image layers" }
      ],
      correctOptionId: "cld-beg-2-b",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "containers-vs-vms",
      explanationAfterAnswer: "VMs run full guest operating systems on top of a hypervisor, consuming gigabytes of RAM. Containers share the host OS kernel and isolate user space using cgroups and namespaces, achieving lightweight, sub-second startups."
    },
    {
      id: "cld-beg-3",
      questionText: "What is the primary purpose of a cloud Content Delivery Network (CDN)?",
      options: [
        { id: "cld-beg-3-a", label: "A", text: "To encrypt and store transactional database records across geographically separated relational storage clusters" },
        { id: "cld-beg-3-b", label: "B", text: "To dynamically balance internal worker thread workloads across clustered multi-core virtual machines" },
        { id: "cld-beg-3-c", label: "C", text: "To cache static content at distributed edge points of presence, reducing latency for global end users" },
        { id: "cld-beg-3-d", label: "D", text: "To execute continuous integration build pipelines whenever developers push source code to Git repositories" }
      ],
      correctOptionId: "cld-beg-3-c",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "cdn-architecture",
      explanationAfterAnswer: "CDNs cache static assets (images, JavaScript, CSS, video) on edge servers geographically closer to users, reducing round-trip latency and offloading origin web servers."
    },
    {
      id: "cld-beg-4",
      questionText: "What is the core principle of Infrastructure as Code (IaC) tools like Terraform?",
      options: [
        { id: "cld-beg-4-a", label: "A", text: "Compiling high-level programming language code directly into machine-executable binary microcode" },
        { id: "cld-beg-4-b", label: "B", text: "Managing and provisioning cloud infrastructure resources through version-controlled declarative configuration files" },
        { id: "cld-beg-4-c", label: "C", text: "Automatically generating frontend user interfaces directly from relational database schema definitions" },
        { id: "cld-beg-4-d", label: "D", text: "Monitoring container resource utilization and terminating processes that exceed allocated memory quotas" }
      ],
      correctOptionId: "cld-beg-4-b",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "iac-fundamentals",
      explanationAfterAnswer: "IaC treats infrastructure provisioning identically to software development: resources are defined in declarative configuration files (like HCL or YAML), versioned in Git, tested, and automated consistently."
    },
    {
      id: "cld-beg-5",
      questionText: "In cloud computing architectures, what distinguishes horizontal scaling from vertical scaling?",
      options: [
        { id: "cld-beg-5-a", label: "A", text: "Horizontal scaling adds more instances of a resource, while vertical scaling upgrades the CPU and RAM of an existing instance" },
        { id: "cld-beg-5-b", label: "B", text: "Horizontal scaling migrates workloads to overseas regions, while vertical scaling retains data in local availability zones" },
        { id: "cld-beg-5-c", label: "C", text: "Horizontal scaling replaces containerized workloads with bare-metal servers, while vertical scaling uses virtual machines" },
        { id: "cld-beg-5-d", label: "D", text: "Horizontal scaling increases storage capacity on disk arrays, while vertical scaling increases network bandwidth" }
      ],
      correctOptionId: "cld-beg-5-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "horizontal-vs-vertical-scaling",
      explanationAfterAnswer: "Scaling out (horizontal) adds more nodes/instances to a distributed pool. Scaling up (vertical) increases the hardware resources (cores, memory) of a single node, which hits physical limits and requires downtime."
    },
    {
      id: "cld-beg-6",
      questionText: "An application experiences sudden morning traffic spikes that cause response timeouts. Which cloud solution addresses this automatically?",
      options: [
        { id: "cld-beg-6-a", label: "A", text: "Configuring an Auto Scaling Group paired with an Application Load Balancer to dynamically launch instances based on metrics" },
        { id: "cld-beg-6-b", label: "B", text: "Migrating the entire application database from a relational MySQL engine to a single self-hosted flat file store" },
        { id: "cld-beg-6-c", label: "C", text: "Manually executing system shutdown and restart commands across all production server instances each morning" },
        { id: "cld-beg-6-d", label: "D", text: "Re-indexing database tables to reduce storage disk usage during high-concurrency client authentication events" }
      ],
      correctOptionId: "cld-beg-6-a",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "autoscaling-load-balancing",
      explanationAfterAnswer: "Auto Scaling policies monitor metrics (such as CPU utilization or request count per target) and automatically provision or terminate compute instances behind a load balancer to match demand."
    },
    {
      id: "cld-beg-7",
      questionText: "Why should developers store container image layers and artifacts in private container registries rather than public registries?",
      options: [
        { id: "cld-beg-7-a", label: "A", text: "Public container registries automatically compress images into legacy tarball archives that cannot run in Kubernetes" },
        { id: "cld-beg-7-b", label: "B", text: "Private registries protect proprietary code, enforce access controls, and scan images for known security vulnerabilities" },
        { id: "cld-beg-7-c", label: "C", text: "Public registries restrict container execution to a maximum runtime duration of sixty seconds per container instance" },
        { id: "cld-beg-7-d", label: "D", text: "Private registries eliminate network latency entirely by embedding container images inside local CPU L3 cache memory" }
      ],
      correctOptionId: "cld-beg-7-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "container-registry-security",
      explanationAfterAnswer: "Private registries (like AWS ECR, GCP Artifact Registry, or Harbor) restrict image access via IAM, prevent public leakage of proprietary code/dependencies, and provide automated vulnerability scanning."
    },
    {
      id: "cld-beg-8",
      questionText: "What is the primary role of a reverse proxy like Nginx in a microservices deployment?",
      options: [
        { id: "cld-beg-8-a", label: "A", text: "To compile TypeScript frontend applications into static HTML files during continuous delivery pipeline runs" },
        { id: "cld-beg-8-b", label: "B", text: "To terminate TLS, handle request routing, and balance incoming HTTP traffic across internal upstream services" },
        { id: "cld-beg-8-c", label: "C", text: "To manage relational database backups and automate cross-region table replication schedules" },
        { id: "cld-beg-8-d", label: "D", text: "To assign static IP addresses to physical motherboard network adapters inside private data centers" }
      ],
      correctOptionId: "cld-beg-8-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "reverse-proxy-architecture",
      explanationAfterAnswer: "Reverse proxies sit between external clients and backend microservices, handling TLS termination, URL path-based routing, caching, rate limiting, and load distribution across internal service instances."
    },
    {
      id: "cld-beg-9",
      questionText: "A team needs to securely connect their on-premise corporate data center to an AWS Virtual Private Cloud (VPC). Which solution is best?",
      options: [
        { id: "cld-beg-9-a", label: "A", text: "Configuring an IPsec Site-to-Site VPN or dedicated AWS Direct Connect link into a Virtual Private Gateway" },
        { id: "cld-beg-9-b", label: "B", text: "Opening port 22 and port 3389 publicly across all private subnet route tables to enable remote management" },
        { id: "cld-beg-9-c", label: "C", text: "Assigning public IPv4 addresses to all internal database instances and whitelisting the corporate office router IP" },
        { id: "cld-beg-9-d", label: "D", text: "Deploying a public HTTP proxy server without authentication on an EC2 instance in a public subnet" }
      ],
      correctOptionId: "cld-beg-9-a",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "hybrid-cloud-connectivity",
      explanationAfterAnswer: "An IPsec Site-to-Site VPN creates an encrypted tunnel over the internet between on-premise routers and the VPC gateway. For dedicated, consistent low-latency throughput, Direct Connect provides a private physical fiber link."
    },
    {
      id: "cld-beg-10",
      questionText: "In cloud object storage (e.g. AWS S3), what is the difference between standard storage and glacier storage classes?",
      options: [
        { id: "cld-beg-10-a", label: "A", text: "Standard stores structured relational tables, while Glacier stores uncompressed video recordings and disk images" },
        { id: "cld-beg-10-b", label: "B", text: "Standard provides immediate millisecond access at higher storage cost, while Glacier offers low-cost archive with retrieval latency" },
        { id: "cld-beg-10-c", label: "C", text: "Standard enforces end-to-end client encryption, while Glacier stores all archived files in plaintext format" },
        { id: "cld-beg-10-d", label: "D", text: "Standard replicates data across continents, while Glacier is restricted to a single physical hard drive partition" }
      ],
      correctOptionId: "cld-beg-10-b",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "object-storage-tiers",
      explanationAfterAnswer: "S3 Standard is designed for active, frequently accessed data with millisecond latency. Glacier tiers offer significantly lower storage costs for cold backups, with retrieval times ranging from minutes to hours."
    }
  ],

  intermediate: [
    {
      id: "cld-int-1",
      questionText: "How does a Kubernetes Service of type 'ClusterIP' enable internal service discovery between pods?",
      options: [
        { id: "cld-int-1-a", label: "A", text: "By allocating a stable internal virtual IP address backed by iptables or IPVS rules that proxy traffic to matching pod endpoints" },
        { id: "cld-int-1-b", label: "B", text: "By exposing the target pod port directly to the public internet using an external cloud provider network load balancer" },
        { id: "cld-int-1-c", label: "C", text: "By opening a static host port on every physical worker node across the entire container cluster" },
        { id: "cld-int-1-d", label: "D", text: "By deploying a dedicated reverse proxy sidecar container inside every application pod namespace" }
      ],
      correctOptionId: "cld-int-1-a",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "k8s-clusterip-service",
      explanationAfterAnswer: "ClusterIP creates a stable internal IP inside the cluster. Kube-proxy configures iptables or IPVS rules on all nodes to route traffic directed at the Service IP to healthy pods matching the service selector."
    },
    {
      id: "cld-int-2",
      questionText: "In continuous deployment, what defines a 'Blue-Green' deployment strategy?",
      options: [
        { id: "cld-int-2-a", label: "A", text: "Gradually shifting a small percentage of user traffic to the new version before rolling out to the rest of the fleet" },
        { id: "cld-int-2-b", label: "B", text: "Running two identical production environments and switching the router or load balancer to the new version instantly" },
        { id: "cld-int-2-c", label: "C", text: "Stopping all active production instances simultaneously and deploying the new release in place during a maintenance window" },
        { id: "cld-int-2-d", label: "D", text: "Deploying code updates exclusively to staging clusters while keeping production systems running on legacy branches" }
      ],
      correctOptionId: "cld-int-2-b",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "blue-green-deployment",
      explanationAfterAnswer: "Blue-Green maintains two identical environments: Blue (current production) and Green (new release). Once Green passes verification, the load balancer switches traffic to Green instantly, allowing immediate rollback if issues arise."
    },
    {
      id: "cld-int-3",
      questionText: "What is the primary role of a Dead Letter Queue (DLQ) in an asynchronous message queue architecture (e.g. AWS SQS)?",
      options: [
        { id: "cld-int-3-a", label: "A", text: "To store messages that repeatedly fail processing after a maximum retry threshold for isolation and debugging" },
        { id: "cld-int-3-b", label: "B", text: "To compress message payloads into gzip format to reduce message transmission costs across VPC endpoints" },
        { id: "cld-int-3-c", label: "C", text: "To route urgent high-priority messages ahead of existing messages in First-In-First-Out queues" },
        { id: "cld-int-3-d", label: "D", text: "To automatically encrypt all unread messages with asymmetric public keys before consumer delivery" }
      ],
      correctOptionId: "cld-int-3-a",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "dlq-message-processing",
      explanationAfterAnswer: "When a message cannot be processed successfully after a configured number of retries (e.g. due to schema errors or corrupt data), the queue isolates it in a DLQ to prevent blocking consumer pipelines."
    },
    {
      id: "cld-int-4",
      questionText: "Why is an internal Terraform state file lock (using DynamoDB or remote backends) critical in team environments?",
      options: [
        { id: "cld-int-4-a", label: "A", text: "It prevents concurrent terraform apply executions from corrupting the infrastructure state and causing race conditions" },
        { id: "cld-int-4-b", label: "B", text: "It automatically converts declarative Terraform HCL code into compiled native Go binaries during continuous deployment" },
        { id: "cld-int-4-c", label: "C", text: "It compresses the remote state file using gzip encryption to avoid exceeding cloud storage quota limits" },
        { id: "cld-int-4-d", label: "D", text: "It terminates running EC2 instances whenever a developer modifies local configuration variables without review" }
      ],
      correctOptionId: "cld-int-4-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "terraform-state-locking",
      explanationAfterAnswer: "Without state locking, two team members or CI pipelines executing 'terraform apply' concurrently could modify the state file simultaneously, resulting in state corruption and conflicting cloud resource states."
    },
    {
      id: "cld-int-5",
      questionText: "How does an ingress controller (such as Nginx Ingress or Traefik) route external traffic into a Kubernetes cluster?",
      options: [
        { id: "cld-int-5-a", label: "A", text: "By monitoring Kubernetes Ingress resources and dynamically configuring an internal reverse proxy to forward traffic to Services" },
        { id: "cld-int-5-b", label: "B", text: "By rewriting kernel network namespace routes on every worker node using specialized custom eBPF bytecode programs" },
        { id: "cld-int-5-c", label: "C", text: "By creating a dedicated external hardware load balancer instance for every individual pod created in the cluster" },
        { id: "cld-int-5-d", label: "D", text: "By assigning public internet IP addresses directly to individual container network interfaces within the pod network" }
      ],
      correctOptionId: "cld-int-5-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "k8s-ingress-controller",
      explanationAfterAnswer: "An Ingress Controller runs as a pod inside the cluster, watching the Kubernetes API for Ingress rules (hostnames, paths). It configures its internal routing table to proxy traffic directly to matching service endpoints."
    },
    {
      id: "cld-int-6",
      questionText: "An application cluster running in a single Availability Zone crashes during a localized power failure. What architecture prevents this downtime?",
      options: [
        { id: "cld-int-6-a", label: "A", text: "Deploying workloads across a Multi-AZ architecture behind a regional load balancer with cross-zone automated failover" },
        { id: "cld-int-6-b", label: "B", text: "Increasing the local server power supply wattage and installing larger uninterruptible power supply batteries" },
        { id: "cld-int-6-c", label: "C", text: "Migrating the workload from a containerized environment to a single oversized bare-metal server instance" },
        { id: "cld-int-6-d", label: "D", text: "Configuring the application to run all background processing tasks on ephemeral spot instance workers" }
      ],
      correctOptionId: "cld-int-6-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "multi-az-high-availability",
      explanationAfterAnswer: "Availability Zones are physically separated facilities with independent power, cooling, and networking. Distributing instances across multiple AZs ensures that a failure in one zone is absorbed by healthy instances in another."
    },
    {
      id: "cld-int-7",
      questionText: "In observability, what is the role of OpenTelemetry in modern distributed systems?",
      options: [
        { id: "cld-int-7-a", label: "A", text: "To provide a standardized vendor-neutral framework for instrumenting, generating, and collecting metrics, logs, and traces" },
        { id: "cld-int-7-b", label: "B", text: "To automate container image building and vulnerability patching inside continuous delivery pipelines" },
        { id: "cld-int-7-c", label: "C", text: "To execute synthetic user interface regression tests against staging cluster environments prior to release" },
        { id: "cld-int-7-d", label: "D", text: "To automatically provision cloud infrastructure resources using declarative configuration templates" }
      ],
      correctOptionId: "cld-int-7-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "opentelemetry-observability",
      explanationAfterAnswer: "OpenTelemetry (OTel) is a Cloud Native Computing Foundation (CNCF) standard providing unified APIs, SDKs, and tooling to capture distributed traces, metrics, and logs across services without vendor lock-in."
    },
    {
      id: "cld-int-8",
      questionText: "What security risk occurs if a cloud compute instance uses an IAM role with wildcard permissions (`Action: *`, `Resource: *`)?",
      options: [
        { id: "cld-int-8-a", label: "A", text: "If the instance is compromised, the attacker can leverage its metadata credentials to control all cloud account resources" },
        { id: "cld-int-8-b", label: "B", text: "The instance will experience severe CPU degradation due to continuous IAM permission matrix evaluation overhead" },
        { id: "cld-int-8-c", label: "C", text: "The cloud provider will automatically revoke the instance's network access after seventy-two hours of activity" },
        { id: "cld-int-8-d", label: "D", text: "Database query response times will degrade because queries will require multi-factor authorization approvals" }
      ],
      correctOptionId: "cld-int-8-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "iam-overprivileged-roles",
      explanationAfterAnswer: "Instances access credentials via the instance metadata service. If an overly permissive role (like AdministratorAccess) is attached, any compromise of the application (e.g. via RCE or SSRF) yields full cloud account takeover."
    },
    {
      id: "cld-int-9",
      questionText: "How does a Circuit Breaker pattern (e.g. Resilience4j) protect distributed microservices during upstream service degradation?",
      options: [
        { id: "cld-int-9-a", label: "A", text: "By tripping to an open state after repeated failures, immediately returning fallback responses to prevent cascading failures" },
        { id: "cld-int-9-b", label: "B", text: "By automatically launching additional worker container instances to overwhelm the failing upstream dependency with requests" },
        { id: "cld-int-9-c", label: "C", text: "By re-routing all network packets through unencrypted UDP sockets to bypass timeout inspection firewalls" },
        { id: "cld-int-9-d", label: "D", text: "By terminating database connections permanently and restarting the primary cloud virtual machine host" }
      ],
      correctOptionId: "cld-int-9-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "circuit-breaker-resilience",
      explanationAfterAnswer: "When an upstream dependency fails repeatedly, the circuit breaker opens, failing fast without making network calls. This preserves caller threads/memory and prevents cascading failure across the architecture."
    },
    {
      id: "cld-int-10",
      questionText: "What problem is solved by implementing database connection pooling (e.g. PgBouncer) in high-concurrency microservices?",
      options: [
        { id: "cld-int-10-a", label: "A", text: "It prevents database exhaustion by reusing a fixed pool of established connections across thousands of incoming client requests" },
        { id: "cld-int-10-b", label: "B", text: "It automatically replicates relational database tables across multi-cloud regions to eliminate physical latency" },
        { id: "cld-int-10-c", label: "C", text: "It converts relational SQL query results into NoSQL document formats before caching them in Redis memory" },
        { id: "cld-int-10-d", label: "D", text: "It eliminates the need for database authentication by allowing anonymous guest queries over local sockets" }
      ],
      correctOptionId: "cld-int-10-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "db-connection-pooling",
      explanationAfterAnswer: "Creating new database connections is expensive (forking backend processes, allocating memory, TLS handshakes). Connection poolers maintain a persistent pool of connections, preventing process explosion and server crashes."
    }
  ],

  advanced: [
    {
      id: "cld-adv-1",
      questionText: "In distributed consensus protocols (e.g. Raft used in etcd), how does leader election handle network partitions between cluster nodes?",
      options: [
        { id: "cld-adv-1-a", label: "A", text: "A candidate node must secure votes from a strict quorum majority (N/2 + 1) of all cluster nodes to become the legitimate leader" },
        { id: "cld-adv-1-b", label: "B", text: "The node with the lowest internal IP address automatically assumes leadership regardless of network connectivity" },
        { id: "cld-adv-1-c", label: "C", text: "Every isolated network partition elects its own independent leader and merges conflicting log states asynchronously" },
        { id: "cld-adv-1-d", label: "D", text: "The cluster delegates leadership selection to an external cloud metadata service via HTTP polling requests" }
      ],
      correctOptionId: "cld-adv-1-a",
      difficulty: "advanced",
      complexity: "fundamental",
      conceptTag: "raft-consensus-quorum",
      explanationAfterAnswer: "Raft requires a candidate to receive positive votes from a majority of nodes ((N/2) + 1). In a partition, only the partition containing the majority can elect a leader or commit entries, preventing split-brain states."
    },
    {
      id: "cld-adv-2",
      questionText: "How does eBPF-based container networking (such as Cilium) dramatically outperform standard iptables/kube-proxy implementations?",
      options: [
        { id: "cld-adv-2-a", label: "A", text: "By bypassing the kernel network stack entirely and streaming raw packet buffers over user space serial interfaces" },
        { id: "cld-adv-2-b", label: "B", text: "By attaching BPF programs directly to tc and socket layers with BPF maps, routing packets in O(1) without sequential iptables chains" },
        { id: "cld-adv-2-c", label: "C", text: "By compressing all TCP packet headers into UDP datagrams using proprietary proprietary compression algorithms" },
        { id: "cld-adv-2-d", label: "D", text: "By disabling container network namespace isolation to let all pods share a single host network device" }
      ],
      correctOptionId: "cld-adv-2-b",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "ebpf-cilium-kube-proxy",
      explanationAfterAnswer: "Kube-proxy with iptables evaluates rules sequentially, scaling with O(N) complexity as services grow. Cilium uses eBPF bytecode programs with hash-table lookups (O(1)), shortcutting routing at the socket and traffic control (tc) layers."
    },
    {
      id: "cld-adv-3",
      questionText: "In high-throughput distributed message brokers (e.g. Apache Kafka), what architectural design enables horizontal consumer throughput?",
      options: [
        { id: "cld-adv-3-a", label: "A", text: "Sharding topics into ordered partitions where each partition is consumed by exactly one consumer within a consumer group" },
        { id: "cld-adv-3-b", label: "B", text: "Storing all messages in an unpartitioned memory queue that broadcasts every record to all registered client nodes" },
        { id: "cld-adv-3-c", label: "C", text: "Enforcing synchronous two-phase commit transactions between all active consumers before committing offsets" },
        { id: "cld-adv-3-d", label: "D", text: "Deleting message records immediately upon receipt by the first consumer to free up broker memory buffers" }
      ],
      correctOptionId: "cld-adv-3-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "kafka-partition-parallelism",
      explanationAfterAnswer: "Kafka partitions topics. Within a consumer group, each partition is assigned to exactly one consumer thread. Scaling consumers up to the number of partitions provides parallel, ordered processing."
    },
    {
      id: "cld-adv-4",
      questionText: "What trade-off does the CAP theorem state distributed databases (e.g. Cassandra vs Spanner) must make during network partitions?",
      options: [
        { id: "cld-adv-4-a", label: "A", text: "A distributed system can guarantee at most two properties among Consistency, Availability, and Partition Tolerance simultaneously" },
        { id: "cld-adv-4-b", label: "B", text: "A system must sacrifice either encryption at rest or transport layer encryption whenever network latency exceeds fifty milliseconds" },
        { id: "cld-adv-4-c", label: "C", text: "Relational database tables must be converted into document store schemas whenever disk storage exceeds one terabyte" },
        { id: "cld-adv-4-d", label: "D", text: "Distributed systems cannot achieve high throughput without using synchronous atomic clocks on all physical hardware" }
      ],
      correctOptionId: "cld-adv-4-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "cap-theorem-distributed-systems",
      explanationAfterAnswer: "Network partitions (P) are unavoidable in distributed systems. When a partition occurs, the system must choose between returning an error or stale data (Availability vs Consistency)."
    },
    {
      id: "cld-adv-5",
      questionText: "In Kubernetes scheduling, what is the role of pod affinity and anti-affinity rules during node placement?",
      options: [
        { id: "cld-adv-5-a", label: "A", text: "To constrain which nodes pods can be scheduled on based on labels of pods already running on those nodes" },
        { id: "cld-adv-5-b", label: "B", text: "To dynamically adjust CPU limits and memory request reservations based on real-time pod resource usage" },
        { id: "cld-adv-5-c", label: "C", text: "To enforce mutual TLS encryption on all internal communication between pods within the same namespace" },
        { id: "cld-adv-5-d", label: "D", text: "To compile container image layers into native machine code directly on worker nodes before pod startup" }
      ],
      correctOptionId: "cld-adv-5-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "k8s-pod-affinity-rules",
      explanationAfterAnswer: "Pod affinity allows co-locating cooperating services (e.g. app and cache) on the same node or zone to minimize latency, while pod anti-affinity spreads replicas across nodes or failure domains to ensure resilience."
    },
    {
      id: "cld-adv-6",
      questionText: "How does Google Cloud Spanner achieve external consistency (serializability) across globally distributed multi-region clusters?",
      options: [
        { id: "cld-adv-6-a", label: "A", text: "By using TrueTime API with synchronized GPS receivers and atomic clocks to enforce monotonic commit timestamps" },
        { id: "cld-adv-6-b", label: "B", text: "By delegating all write transactions to a single centralized master database server located in a single data center" },
        { id: "cld-adv-6-c", label: "C", text: "By converting all transactions into eventually consistent asynchronous background gossip protocol exchanges" },
        { id: "cld-adv-6-d", label: "D", text: "By locking the entire database table structure whenever a client initiates a cross-region write operation" }
      ],
      correctOptionId: "cld-adv-6-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "spanner-truetime-consistency",
      explanationAfterAnswer: "TrueTime exposes clock uncertainty bounded to an interval [t.earliest, t.latest] using GPS and atomic clocks. By waiting out the uncertainty window (commit wait), Spanner guarantees that if T2 starts after T1 commits, T2 receives a higher timestamp."
    },
    {
      id: "cld-adv-7",
      questionText: "What condition leads to a 'Split-Brain' scenario in a distributed cluster with an even number of nodes (e.g. 4 nodes)?",
      options: [
        { id: "cld-adv-7-a", label: "A", text: "A symmetrical network partition divides the cluster into two equal halves (2 and 2), where neither or both claim authority" },
        { id: "cld-adv-7-b", label: "B", text: "A worker node runs out of physical disk space while processing continuous database backup snapshots" },
        { id: "cld-adv-7-c", label: "C", text: "The cluster orchestrator schedules container pods that exceed the maximum memory limits of the worker node" },
        { id: "cld-adv-7-d", label: "D", text: "A node clock drifts by two milliseconds during high-concurrency read-only database query execution" }
      ],
      correctOptionId: "cld-adv-7-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "split-brain-quorum-failure",
      explanationAfterAnswer: "In an even-node cluster (4 nodes), a 2-2 partition prevents either side from achieving a strict majority (>2). If misconfigured to allow 50% quorums, both partitions elect leaders and accept writes, causing irrecoverable state divergence."
    },
    {
      id: "cld-adv-8",
      questionText: "In service mesh architectures (e.g. Istio with Envoy), how is transparent mTLS enforced between microservices without app code changes?",
      options: [
        { id: "cld-adv-8-a", label: "A", text: "Envoy sidecar proxies intercept pod traffic via iptables PREROUTING/OUTPUT rules and perform mutual TLS handshakes" },
        { id: "cld-adv-8-b", label: "B", text: "The Linux kernel automatically encrypts all socket calls using pre-shared symmetric keys embedded in the bootloader" },
        { id: "cld-adv-8-c", label: "C", text: "The container runtime injects custom SSL certificate validation code into the compiled application bytecode" },
        { id: "cld-adv-8-d", label: "D", text: "The network router establishes dedicated physical fiber optic patch connections between worker nodes" }
      ],
      correctOptionId: "cld-adv-8-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "service-mesh-mtls-interception",
      explanationAfterAnswer: "Istio's init container configures iptables inside the pod network namespace to redirect all inbound and outbound TCP traffic to the local Envoy sidecar. Envoy handles TLS handshakes and certificate rotation transparently."
    },
    {
      id: "cld-adv-9",
      questionText: "What is the primary benefit of deploying an immutable infrastructure model in cloud production environments?",
      options: [
        { id: "cld-adv-9-a", label: "A", text: "Servers are never modified in-place; updates are deployed by replacing instances with newly built, tested images" },
        { id: "cld-adv-9-b", label: "B", text: "Servers are configured to reject all external network connections except those originating from physical SSH keys" },
        { id: "cld-adv-9-c", label: "C", text: "Operating systems are permanently locked in read-only RAM mode, preventing writing any logs to persistent disks" },
        { id: "cld-adv-9-d", label: "D", text: "Application dependencies are compiled directly into kernel firmware to eliminate runtime memory overhead" }
      ],
      correctOptionId: "cld-adv-9-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "immutable-infrastructure",
      explanationAfterAnswer: "Immutable infrastructure eliminates configuration drift. Rather than modifying running servers via SSH or patch scripts, new versioned images (AMIs/containers) are spun up and traffic redirected, enabling reliable, repeatable rollouts and rollbacks."
    },
    {
      id: "cld-adv-10",
      questionText: "How does a distributed tracing system (e.g. Jaeger) correlate requests across dozens of asynchronous microservices?",
      options: [
        { id: "cld-adv-10-a", label: "A", text: "By propagating unique TraceId and SpanId metadata via HTTP/gRPC headers across service boundaries and spans" },
        { id: "cld-adv-10-b", label: "B", text: "By recording screen video captures of server terminal sessions during user transaction execution" },
        { id: "cld-adv-10-c", label: "C", text: "By synchronizing database write transactions using global distributed hardware locks across physical racks" },
        { id: "cld-adv-10-d", label: "D", text: "By calculating MD5 hashes of client IP addresses and storing them in temporary memory caches" }
      ],
      correctOptionId: "cld-adv-10-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "distributed-tracing-context-propagation",
      explanationAfterAnswer: "Distributed tracing passes context headers (such as W3C TraceContext traceparent: trace-id, parent-span-id, flags) along with network requests, allowing a backend collector to assemble a DAG representing the entire call path."
    }
  ]
};
