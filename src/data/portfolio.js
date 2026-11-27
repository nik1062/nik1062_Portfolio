export const profile = {
  name: "Nikunj Kumar",
  role: "Full-Stack Developer",
  location: "Chennai, Tamil Nadu",
  email: "nikunjkumar1062@gmail.com",
  phone: "+91 93342 98148",
  github: "https://github.com/nik1062",
  linkedin: "https://www.linkedin.com/in/nikunj-kumar-ba2728332",
  resume: "/assets/resume/Nikunj-Kumar-FullStack-Resume.pdf",
  headline: "Full-stack developer building AI-powered web, data, automation, and product systems.",
  summary:
    "B.Tech IT student at Anna University with hands-on work across React, Node.js, Python, Firebase, MongoDB, Power BI, Flutter, cloud deployment, and AI automation.",
  metrics: [
    ["10+", "Projects shipped"],
    ["15+", "Certificates"],
    ["1st", "AI Hackathon"]
  ]
};

export const projectCategories = ["All", "Featured", "Full Stack", "AI/ML", "Data Analytics", "DevOps", "Mobile", "Frontend", "Automation"];

export const projects = [
  {
    slug: "recoverforge",
    title: "RecoverForge",
    year: "2026",
    status: "Featured",
    category: "DevOps",
    repo: "https://github.com/nik1062/RecoverForge",
    summary:
      "Autonomous event-driven payment recovery agent for failed checkouts with raw buffer HMAC-SHA256 signature verification, X-Event-Id deduplication, and atomic MongoDB cadence locks.",
    problem:
      "Over 20% of online checkouts fail due to 3D-Secure timeouts, UPI app drop-offs, and transient gateway glitches. Standard merchant notifications are cryptic error codes, and manual recovery outreach is impossible at scale.",
    outcome:
      "Built for Razorpay AI Buildathon (Track 3). Features 48-hr dynamic link TTLs, 3-tier exponential retry (+1, +3, +7d), and zero contact on fraud flags.",
    tags: ["Node.js", "Express", "MongoDB", "Razorpay SDK", "OpenAI GPT-4o-mini", "Docker Compose", "AWS EC2"],
    highlights: ["Razorpay Buildathon Track 3", "Timing-safe HMAC-SHA256 verification", "Atomic findOneAndUpdate locks", "Dynamic 48h payment links"],
    visual: "security"
  },
  {
    slug: "codemeet-ai",
    title: "CodeMeet AI",
    year: "2026",
    status: "Featured",
    category: "Full Stack",
    repo: "https://github.com/nik1062",
    summary:
      "Real-time technical interview platform featuring conflict-free CRDT synchronization (Yjs), multi-party WebRTC video/audio mesh, and an integrated Monaco code editor.",
    problem:
      "Traditional technical interview setups require juggling separate coding pads, disjointed video calls, and manual note-taking, leading to editing conflicts, high audio-video latency, and zero automated assessment.",
    outcome:
      "Achieved sub-50ms keystroke sync latency with 100% conflict-free CRDT resolution for up to 6 concurrent participants.",
    tags: ["React", "Node.js", "Yjs (CRDT)", "WebSockets", "LiveKit (WebRTC)", "Monaco Editor", "Docker"],
    highlights: ["Multiplayer Monaco code editor", "Yjs CRDT delta synchronization", "LiveKit SFU video & audio mesh", "Keystroke replay telemetry"],
    visual: "ai"
  },
  {
    slug: "medisync-pos",
    title: "MediSync (ClinicOS)",
    year: "2026",
    status: "Featured",
    category: "Full Stack",
    repo: "https://github.com/nik1062/MediSync-POS",
    summary:
      "Cross-platform patient mobile app (Flutter/Riverpod) and clinic POS system with real-time OPD token queue, dual-token JWT authentication, and ACID billing transactions.",
    problem:
      "Outpatient clinics suffer from congested waiting rooms, desynchronized token numbers, and detached billing registers, creating long patient wait times and administrative reconciliation errors.",
    outcome:
      "Sub-second token queue sync across mobile and reception displays with zero counter race conditions and PostgreSQL ACID consistency.",
    tags: ["Flutter", "Dart", "Riverpod", "React", "Node.js", "PostgreSQL", "Socket.io", "Docker"],
    highlights: ["Flutter mobile patient app", "Dual-token JWT auth rotation", "Socket.io real-time token queue", "PostgreSQL ACID billing"],
    visual: "data"
  },
  {
    slug: "coldmailforge",
    title: "ColdMailForge",
    year: "2026",
    status: "Featured",
    category: "Full Stack",
    repo: "https://github.com/nik1062/ColdMailForge",
    summary:
      "AI cold outreach SaaS platform with Razorpay credit ledger, multi-cadence sequence generator, and automated follow-up scheduling.",
    problem:
      "Generic cold email templates have abysmal reply rates (<2%). Early-stage founders waste hours drafting follow-up cadences and lack a reliable system to automate sequences.",
    outcome:
      "Delivered a production-ready SaaS engine with integrated Razorpay billing, transactional credit deductions, and 3-stage cadence synthesis.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "OpenAI GPT-4o-mini", "Docker"],
    highlights: ["Razorpay credit ledger engine", "Dual-tier 3-stage sequence generator", "Admin audit & verification dashboard", "Dockerized deployment"],
    visual: "automation"
  },
  {
    slug: "spendlens-ai-spend-audit",
    title: "SpendLens - AI Spend Audit",
    year: "2026",
    status: "Featured",
    category: "AI/ML",
    repo: "https://github.com/nik1062/Ai-spend-audit",
    live: "https://spendlens.vercel.app",
    summary:
      "A TypeScript product that audits AI tool spending for startup teams and suggests savings by comparing tools, pricing, and usage patterns.",
    problem:
      "Startup teams often subscribe to overlapping AI tools without a clear view of monthly cost, duplicated features, or switching opportunities.",
    outcome:
      "Built a structured audit experience with pricing data, prompts, metrics, tests, and product documentation that makes the project feel like a real SaaS prototype.",
    tags: ["TypeScript", "AI Tools", "Product Docs", "Testing"],
    highlights: ["Architecture documentation", "Pricing/economics model", "Prompt and metrics docs", "GitHub Pages enabled"],
    visual: "ai"
  },
  {
    slug: "restropro-saas-pos",
    title: "RESTROPro SaaS POS",
    year: "2026",
    status: "Case Study",
    category: "Full Stack",
    repo: "https://github.com/nik1062/Resturant_POS-system",
    summary:
      "Restaurant POS system for cafes, hotels, food trucks, and restaurants with React frontend, Express backend, MySQL database, and deployment planning.",
    problem:
      "Small restaurants need fast order handling, billing, menu control, and inventory visibility without a heavy enterprise system.",
    outcome:
      "Designed as a SaaS-style POS with frontend/backend/database separation, making it one of the strongest full-stack projects in your public GitHub.",
    tags: ["React", "Express", "MySQL", "Docker"],
    highlights: ["Frontend/backend separation", "Database folder", "SaaS positioning", "Restaurant operations domain"],
    visual: "food"
  },
  {
    slug: "smart-library-management",
    title: "Smart Library Management",
    year: "2026",
    status: "Academic Pro",
    category: "Full Stack",
    repo: "https://github.com/nik1062/SmartLibraryManagement-",
    summary:
      "Full-stack library management application using React, FastAPI, MongoDB, and object-oriented backend principles.",
    problem:
      "Libraries need a simple way to manage books, members, issue/return flows, and records with reliable backend structure.",
    outcome:
      "A good proof project for backend thinking because it combines React UI, Python FastAPI, MongoDB, and OOP design.",
    tags: ["React", "FastAPI", "MongoDB", "OOP"],
    highlights: ["Python backend", "MongoDB database", "OOP-oriented design", "Docs included"],
    visual: "library"
  },
  {
    slug: "finvault-finance-dashboard",
    title: "FinVault Finance Dashboard",
    year: "2026",
    status: "Live",
    category: "Data Analytics",
    repo: "https://github.com/nik1062/FINANCE-DASHBOARD",
    live: "https://finance-dashboard-pink-gamma.vercel.app",
    summary:
      "Modern responsive finance dashboard built with React and charting, focused on clean visual reporting and dashboard UI structure.",
    problem:
      "Finance data is easier to understand when metrics, trends, and categories are presented in a focused dashboard experience.",
    outcome:
      "Shows your dashboard/data visualization side and pairs well with Power BI and analytics certifications.",
    tags: ["React", "Charts", "Dashboard", "Analytics"],
    highlights: ["Live Vercel demo", "Finance domain", "Responsive layout", "Dashboard storytelling"],
    visual: "data"
  },
  {
    slug: "focusflow-study-tracker",
    title: "FocusFlow Study Tracker",
    year: "2026",
    status: "Mobile",
    category: "Mobile",
    repo: "https://github.com/nik1062/studytrackerapp",
    live: "https://studytrackerapp-one.vercel.app",
    summary:
      "Flutter study tracker with session tracking, goals, achievements, and gamification for productivity-focused learners.",
    problem:
      "Students need a lightweight way to track study consistency, focus sessions, goals, and progress.",
    outcome:
      "Adds mobile development depth to your portfolio and shows you can build beyond web apps.",
    tags: ["Flutter", "Dart", "Productivity", "Gamification"],
    highlights: ["Cross-platform app", "Goal tracking", "Gamified study flow", "Live web preview"],
    visual: "mobile"
  },
  {
    slug: "n8n-email-assistant",
    title: "n8n Email Assistant Agent",
    year: "2025",
    status: "Automation",
    category: "Automation",
    repo: "https://github.com/nik1062/n8n-agents",
    summary:
      "Workflow automation agent using Google Gemini and Gmail integration to draft and send professional emails from structured prompts.",
    problem:
      "Writing repeat professional emails manually slows down repetitive communication workflows.",
    outcome:
      "A compact but memorable automation project that fits your AI agent and n8n learning direction.",
    tags: ["n8n", "Gemini", "Gmail", "Automation"],
    highlights: ["Workflow JSON included", "Screenshot included", "AI agent positioning", "Practical productivity use case"],
    visual: "automation"
  },
  {
    slug: "health-cost-prediction",
    title: "Health Cost Prediction",
    year: "2025",
    status: "ML",
    category: "Data Analytics",
    repo: "https://github.com/nik1062/-Linear-Regression-Health-Costs-Calculator",
    summary:
      "Linear regression model that predicts healthcare costs from insurance-style demographic features and evaluates error with MAE.",
    problem:
      "Healthcare cost estimation is a useful regression problem for practicing feature handling, model training, and evaluation.",
    outcome:
      "Good supporting proof for Python, data preprocessing, and machine learning fundamentals.",
    tags: ["Python", "Regression", "Scikit-learn", "MAE"],
    highlights: ["Regression workflow", "Model evaluation", "Healthcare dataset", "Python ML basics"],
    visual: "security"
  },
  {
    slug: "private-project-showcase",
    title: "Private Project Showcase",
    year: "2026",
    status: "Private Repo",
    category: "DevOps",
    summary:
      "Reserved section for your best private project once you share the name, stack, screenshots, and a safe description.",
    problem:
      "Some strong projects cannot expose source code publicly, but they can still be presented honestly through case studies.",
    outcome:
      "We can show the product thinking, architecture, screenshots, and your role without exposing private files.",
    tags: ["Private", "Case Study", "Screenshots", "Demo on request"],
    highlights: ["No public source required", "Can show screenshots", "Can use private-repo badge", "Great for serious work"],
    visual: "devops",
    private: true
  }
];

export const skills = [
  { name: "React", group: "Frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", group: "Frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", group: "Frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5", group: "Frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", group: "Frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Tailwind", group: "Frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", group: "Backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", group: "Backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "FastAPI", group: "Backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Python", group: "AI/Data", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MongoDB", group: "Database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", group: "Database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Firebase", group: "Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Docker", group: "DevOps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", group: "Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Flutter", group: "Mobile", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Git", group: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", group: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }
];

export const skillGroups = [
  {
    index: "01",
    title: "Frontend Engineering",
    copy: "React, TypeScript, JavaScript, HTML, CSS, Tailwind, Vite, responsive UI, accessibility, and product-oriented interfaces."
  },
  {
    index: "02",
    title: "Backend & Databases",
    copy: "Node.js, Express.js, FastAPI, REST APIs, MongoDB, MySQL, Firebase, authentication, and data modelling."
  },
  {
    index: "03",
    title: "AI, ML & Analytics",
    copy: "Python, Pandas, NumPy, Scikit-learn, ChatGPT/Gemini workflows, Power BI dashboards, and data storytelling."
  },
  {
    index: "04",
    title: "Automation, Cloud & Mobile",
    copy: "n8n agents, Docker basics, GitHub Actions, AWS EC2, Linux, Firebase Hosting, Vercel, Netlify, and Flutter."
  }
];

export const credentials = [
  {
    type: "Achievement",
    title: "First Prize - NEURA '25 AI Hackathon",
    issuer: "MNM Jain Engineering College",
    date: "Sep 2025",
    copy: "AI-based automation innovation aligned with UN SDG-4.",
    link: "/assets/certificates/NEURA-25-AI-Hackathon.pdf"
  },
  {
    type: "Simulation",
    title: "GenAI Powered Data Analytics",
    issuer: "Forage",
    date: "Oct 2025",
    copy: "EDA, risk profiling, delinquency prediction, and AI collections strategy.",
    link: "/assets/certificates/GenAI-Data-Analytics-Forage.pdf"
  },
  {
    type: "Certification",
    title: "Google Analytics Certification",
    issuer: "Google Skillshop",
    date: "Dec 2024",
    copy: "GA4 setup, reports, measurement, and marketing insight foundations.",
    link: "/assets/certificates/Google-Analytics-Certification.pdf"
  },
  {
    type: "Machine Learning",
    title: "Intro to Machine Learning",
    issuer: "Kaggle / ML Learning",
    date: "Jun 2025",
    copy: "Foundational ML workflow and model-building practice.",
    link: "/assets/certificates/Intro-to-Machine-Learning.png",
    image: "/assets/certificates/Intro-to-Machine-Learning.png"
  }
];

export const timeline = [
  {
    time: "2023 - 2027",
    title: "B.Tech Information Technology",
    copy: "Anna University, Chennai. CGPA 8.5 / 10 with focus on DBMS, OS, web technologies, DSA, and AI/ML."
  },
  {
    time: "2025",
    title: "NEURA '25 AI Hackathon Winner",
    copy: "Secured first prize for an AI automation and productivity project with practical education impact."
  },
  {
    time: "2025 - 2026",
    title: "Full-stack + Product Expansion",
    copy: "Building React, Node, Firebase, FastAPI, MongoDB, dashboards, automation agents, Flutter apps, and cloud-ready workflows."
  }
];
