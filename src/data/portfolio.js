export const profile = {
  name: "Nikunj Kumar",
  title: "Full-Stack & DevOps/SRE Engineer",
  institution: "Anna University, Chennai",
  degree: "B.Tech in Information Technology",
  graduationYear: "2027",
  cgpa: "8.5 / 10",
  founder: "Founder of Zorbit Studio",
  location: "Chennai, Tamil Nadu, India",
  email: "nikunjkumar1062@gmail.com",
  phone: "+91 93342 98148",
  github: "https://github.com/nik1062",
  linkedin: "https://www.linkedin.com/in/nikunj-kumar-6724b7272",
  resumes: {
    fullstack: "/assets/resume/Nikunj-Kumar-FullStack-Resume.pdf",
    devops: "/assets/resume/Nikunj-Kumar-DevOps-Resume.pdf",
    mobile: "/assets/resume/Nikunj-Kumar-Mobile-Resume.pdf",
    data: "/assets/resume/Nikunj-Kumar-Data-Analytics-Resume.pdf"
  },
  headline:
    "Final-year B.Tech IT student at Anna University, Chennai. Founder of Zorbit Studio. Engineering resilient full-stack platforms, real-time collaboration engines, and event-driven DevOps recovery agents.",
  summary:
    "I specialize in production-grade software: event-driven webhook pipelines with atomic locks, CRDT multiplayer sync with WebRTC, dual-token JWT auth, and containerized cloud deployments on AWS and Docker.",
  systemStatus: {
    state: "All Systems Operational",
    deployTarget: "Vercel Edge Network",
    ciStatus: "Passing (GitHub Actions)",
    availability: "Immediate for Campus Placements / SDE-1 / SRE"
  }
};

export const flagshipProjects = [
  {
    id: "recoverforge",
    slug: "recoverforge",
    title: "RecoverForge",
    badge: "Razorpay AI Buildathon · Track 3",
    tagline: "Autonomous event-driven payment recovery agent for failed checkouts",
    tracks: ["devops", "fullstack"],
    primaryTrack: "devops",
    problem:
      "Over 20% of Indian online checkouts fail due to 3D-Secure timeouts, UPI app drop-offs, and transient gateway glitches. Standard merchant notifications are cryptic error codes, and manual recovery outreach is impossible at scale.",
    architecture: {
      client: "React 18 merchant audit dashboard with live webhook activity feed and recovery timeline drawer",
      api: "Express raw buffer endpoint verifying HMAC-SHA256 signatures via crypto.timingSafeEqual with X-Razorpay-Event-Id idempotency",
      queue: "node-cron state machine with atomic MongoDB findOneAndUpdate locks managing 3-tier exponential cadence (+1, +3, +7 days)",
      db: "MongoDB integer-paise accounting ledger + OpenAI GPT-4o-mini telemetry classifier (with deterministic heuristic fallback)"
    },
    flowSteps: [
      { name: "Webhook Ingest", desc: "payment.failed raw stream + HMAC-SHA256" },
      { name: "Idempotency Gate", desc: "Deduplication via X-Razorpay-Event-Id" },
      { name: "AI Classifier", desc: "GPT-4o-mini categorizes failure mode" },
      { name: "Link Factory", desc: "Razorpay Payment Link (48-hr TTL, amount in paise)" },
      { name: "Cadence Dispatch", desc: "Atomic locks + 3-step exponential retry" }
    ],
    metric: "48-hr dynamic link TTL, 3-tier exponential retry (+1, +3, +7d), zero contact on fraud flags",
    stack: ["Node.js", "Express", "React", "MongoDB", "Razorpay SDK", "OpenAI GPT-4o-mini", "Docker Compose", "AWS EC2"],
    highlights: [
      "Built for Razorpay AI Buildathon (Track 3: AI Revenue Recovery)",
      "Timing-safe HMAC-SHA256 verification on raw HTTP request buffers",
      "Atomic database lock guards prevent race conditions in background cron cadences",
      "Zero-contact policy immediately drops outreach on fraud or opt-out tokens"
    ],
    repo: "https://github.com/nik1062/RecoverForge",
    live: null
  },
  {
    id: "codemeet-ai",
    slug: "codemeet-ai",
    title: "CodeMeet AI",
    badge: "Multiplayer Engine",
    tagline: "Real-time technical interview platform with CRDT sync & WebRTC grid",
    tracks: ["fullstack", "devops"],
    primaryTrack: "fullstack",
    problem:
      "Traditional technical interview setups require juggling separate coding pads, disjointed video calls, and manual note-taking, leading to editing conflicts, high audio-video latency, and zero automated assessment.",
    architecture: {
      client: "React 18 Monaco Editor wrapper with Zustand state store and custom LiveKit video grid (2 to 6+ participants)",
      api: "Node.js WebSocket gateway with Yjs CRDT room provider for concurrent conflict-free character sync",
      queue: "Worker-thread execution queue running in-browser code evaluation with paste-burst plagiarism detection",
      db: "Interview session logs, keystroke replay buffers, and automated grading reports"
    },
    flowSteps: [
      { name: "Monaco Client", desc: "Collaborative editor with dual named cursors" },
      { name: "Yjs CRDT Engine", desc: "Delta synchronization over persistent WebSockets" },
      { name: "LiveKit SFU", desc: "Low-latency WebRTC video & audio mesh" },
      { name: "Sandbox Runner", desc: "Isolated execution environment with timeout limits" },
      { name: "LLM Evaluator", desc: "Automated test verification & complexity score" }
    ],
    metric: "<50ms keystroke sync latency with 100% conflict-free CRDT resolution for up to 6 participants",
    stack: ["Node.js", "React", "Yjs (CRDT)", "WebSockets", "LiveKit (WebRTC)", "Zustand", "Zod", "Docker", "Jest"],
    highlights: [
      "Multiplayer Monaco code editor synchronized using Yjs Conflict-Free Replicated Data Types",
      "WebRTC video mesh powered by LiveKit SFU supporting multi-party interviews",
      "Real-time paste-burst detection and keystroke replay for academic integrity",
      "Dockerized sandbox runner for multi-language code evaluation"
    ],
    repo: "https://github.com/nik1062", // TODO: Update with direct CodeMeet AI repository link when public
    live: null // TODO: Update with live deployment URL
  },
  {
    id: "medisync-pos",
    slug: "medisync-pos",
    title: "MediSync (ClinicOS)",
    badge: "Unified Healthcare Platform",
    tagline: "Cross-platform patient mobile app & clinic POS with real-time OPD queue",
    tracks: ["fullstack", "devops"],
    primaryTrack: "fullstack",
    problem:
      "Outpatient clinics in India suffer from congested waiting rooms, desynchronized token numbers, and detached billing registers, creating long patient wait times and administrative reconciliation errors.",
    architecture: {
      client: "Flutter mobile app (Riverpod) for patient token booking + React clinic dashboard for front-desk operators",
      api: "Express.js REST backend with dual-token authentication (Access JWT + Refresh Token in HttpOnly cookies)",
      queue: "Socket.io real-time event bus broadcasting token status across patient devices and waiting-room displays",
      db: "PostgreSQL with Sequelize ORM executing ACID transactions for doctor consultations and POS invoices"
    },
    flowSteps: [
      { name: "Patient App", desc: "Flutter + Riverpod real-time appointment booking" },
      { name: "Auth Layer", desc: "Dual-token JWT (access + refresh rotation)" },
      { name: "Socket.io Bus", desc: "Live OPD queue status pushed to displays" },
      { name: "Doctor Portal", desc: "Consultation logs & digital prescription records" },
      { name: "POS Register", desc: "ACID billing transaction in PostgreSQL" }
    ],
    metric: "Sub-second token queue sync across mobile and clinic screens; zero counter race conditions",
    stack: ["Flutter", "Dart", "Riverpod", "React", "Node.js", "PostgreSQL", "Sequelize", "Socket.io", "Docker"],
    highlights: [
      "Dual-token authentication architecture with secure refresh token rotation",
      "Real-time WebSocket token queue connecting patient smartphones to reception screens",
      "PostgreSQL ACID-compliant billing engine with pharmacy and consult itemization",
      "Cross-platform Flutter build with modular state management using Riverpod"
    ],
    repo: "https://github.com/nik1062/MediSync-POS",
    live: null
  },
  {
    id: "coldmailforge",
    slug: "coldmailforge",
    title: "ColdMailForge",
    badge: "Production SaaS Engine",
    tagline: "AI cold outreach platform with Razorpay credit ledger & multi-cadence sequence generator",
    tracks: ["fullstack", "devops"],
    primaryTrack: "fullstack",
    problem:
      "Generic B2B cold email templates suffer from abysmal reply rates (<2%). Early-stage founders waste hours drafting multi-day follow-up cadences and lack a reliable system to automate sequences.",
    architecture: {
      client: "React 18 + Tailwind CSS application featuring live credit meter, sequence editor, and admin analytics",
      api: "Node.js Express backend with JWT auth, email OTP verification, and Razorpay webhook validation",
      queue: "Nodemailer dispatch queue configured with automated 3-cadence follow-up intervals (Day 3, Day 7, Day 14)",
      db: "MongoDB database tracking atomic credit deductions (50 free credits on signup) and email generation logs"
    },
    flowSteps: [
      { name: "User Auth", desc: "Email OTP verification + JWT session" },
      { name: "Credit Meter", desc: "Transactional credit check (50 credits on signup)" },
      { name: "AI Synthesis", desc: "GPT-4o-mini personalized cold copy generation" },
      { name: "Sequence Builder", desc: "Automated 3-step follow-up (Day 3, 7, 14)" },
      { name: "Razorpay Billing", desc: "Webhook-verified credit recharge engine" }
    ],
    metric: "3-stage cadence synthesis (Day 3, Day 7, Day 14) with transactional credit deduction",
    stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "OpenAI GPT-4o-mini", "Tailwind CSS", "Docker"],
    highlights: [
      "Integrated Razorpay billing engine with atomic credit decrement per generation",
      "Dual-tier sequence generator producing initial outreach plus 3 follow-ups",
      "Complete admin management dashboard for user verification, credit limits, and audit logs",
      "Containerized deployment via Docker Compose with isolated environment secrets"
    ],
    repo: "https://github.com/nik1062/ColdMailForge",
    live: null
  }
];

export const secondaryProjects = [
  {
    slug: "spendlens-ai-spend-audit",
    title: "SpendLens — AI Spend Audit",
    tracks: ["fullstack"],
    summary: "Audits AI tool spending for startup teams, comparing subscription redundancies and pricing curves.",
    stack: ["TypeScript", "React", "Testing", "Documentation"],
    repo: "https://github.com/nik1062/Ai-spend-audit",
    live: "https://spendlens.vercel.app"
  },
  {
    slug: "focusflow-study-tracker",
    title: "FocusFlow Study Tracker",
    tracks: ["fullstack"],
    summary: "Flutter-based productivity tracker with Pomodoro focus sessions, daily streaks, and streak gamification.",
    stack: ["Flutter", "Dart", "Firebase", "Gamification"],
    repo: "https://github.com/nik1062/studytrackerapp",
    live: "https://studytrackerapp-one.vercel.app"
  },
  {
    slug: "trading-bot",
    title: "Binance Futures Trading Bot",
    tracks: ["devops", "backend"],
    summary: "Python trading bot for Binance Futures Testnet with MARKET and LIMIT orders, input validation, and rigorous logging.",
    stack: ["Python", "Binance API", "Logging", "CLI"],
    repo: "https://github.com/nik1062/trading_bot"
  },
  {
    slug: "n8n-email-assistant",
    title: "n8n Workflow Automation Agent",
    tracks: ["devops"],
    summary: "AI automation pipeline combining Google Gemini and Gmail integration to parse and dispatch structured email workflows.",
    stack: ["n8n", "Gemini API", "Gmail Webhooks", "Automation"],
    repo: "https://github.com/nik1062/n8n-agents"
  }
];

export const skillsByTrack = {
  devops: [
    { name: "Docker & Compose", category: "Containers", note: "Containerized multi-tier microservices (backend, DB, worker)" },
    { name: "AWS (EC2, S3)", category: "Cloud Infra", note: "Virtual server management, security groups, SSH key deployment" },
    { name: "Linux & Bash", category: "OS / Scripting", note: "Systemd services, Cron jobs, shell automation, log rotation" },
    { name: "NGINX & Reverse Proxy", category: "Networking", note: "SSL termination, proxy pass headers, rate limiting" },
    { name: "GitHub Actions", category: "CI / CD", note: "Automated linting, test pipelines, and build validation" },
    { name: "PM2", category: "Process Management", note: "Cluster mode, zero-downtime reloads, memory leak guards" },
    { name: "Webhooks & HMAC-SHA256", category: "Event Security", note: "Timing-safe signature verification on raw stream buffers" },
    { name: "PostgreSQL & Sequelize", category: "Databases", note: "ACID transactions, relational indexing, schema migrations" }
  ],
  fullstack: [
    { name: "React 18 / 19", category: "Frontend Core", note: "Hooks, Concurrent Mode, custom stores, performance optimization" },
    { name: "Node.js & Express", category: "Backend Core", note: "RESTful architecture, raw buffer pipelines, middleware design" },
    { name: "TypeScript & JavaScript", category: "Languages", note: "Strict typing, async/await, ESNext, functional patterns" },
    { name: "Yjs & CRDTs", category: "Real-Time Sync", note: "Multiplayer state synchronization with zero merge conflicts" },
    { name: "WebSockets & Socket.io", category: "Networking", note: "Bidirectional event transport for live queues and chat" },
    { name: "LiveKit & WebRTC", category: "Media Streaming", note: "Selective Forwarding Unit (SFU) audio/video integration" },
    { name: "PostgreSQL & MongoDB", category: "Persistence", note: "Relational ACID consistency + Document flexibility" },
    { name: "Flutter & Riverpod", category: "Mobile", note: "Cross-platform reactive state management and native UI" }
  ]
};

export const credentials = [
  {
    type: "Award",
    title: "First Prize — NEURA '25 AI Hackathon",
    issuer: "MNM Jain Engineering College",
    date: "Sep 2025",
    copy: "Secured 1st place out of 25 teams for an AI automation system addressing UN SDG-4 with practical education impact.",
    link: "/assets/certificates/NEURA-25-AI-Hackathon.pdf"
  },
  {
    type: "Simulation",
    title: "GenAI Powered Data Analytics",
    issuer: "Forage",
    date: "Oct 2025",
    copy: "Executed EDA, risk profiling, delinquency prediction models, and automated collections strategy.",
    link: "/assets/certificates/GenAI-Data-Analytics-Forage.pdf"
  },
  {
    type: "Certification",
    title: "Google Analytics Certification",
    issuer: "Google Skillshop",
    date: "Dec 2024",
    copy: "GA4 property configuration, event attribution measurement, custom reporting, and telemetry analysis.",
    link: "/assets/certificates/Google-Analytics-Certification.pdf"
  },
  {
    type: "Certification",
    title: "Intro to Machine Learning",
    issuer: "Kaggle",
    date: "Jun 2025",
    copy: "Core ML workflows, regression models, feature engineering, and validation metrics.",
    link: "/assets/certificates/Intro-to-Machine-Learning.png"
  }
];

export const experienceTimeline = [
  {
    period: "2023 — 2027",
    role: "B.Tech in Information Technology",
    organization: "Anna University, Chennai",
    details: "CGPA 8.5 / 10. Core coursework: Operating Systems, Distributed Systems, Database Management Systems, Data Structures & Algorithms, Computer Networks, and Cloud Infrastructure."
  },
  {
    period: "2025 — Present",
    role: "Founder & Lead Engineer",
    organization: "Zorbit Studio",
    details: "Architecting and shipping production SaaS products and client systems, including ColdMailForge and restaurant management platforms."
  },
  {
    period: "2025",
    role: "Lead Hackathon Builder",
    organization: "NEURA '25 & Razorpay AI Buildathon",
    details: "Built RecoverForge (autonomous payment recovery agent) and won 1st Prize at NEURA '25 AI Hackathon for workflow automation."
  }
];
