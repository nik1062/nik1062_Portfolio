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
    ["20+", "Projects shipped"],
    ["15+", "Certificates"],
    ["1st", "AI Hackathon"]
  ]
};

export const projectCategories = ["All", "Featured", "Full Stack", "AI/ML", "Data Analytics", "DevOps", "Mobile", "Frontend", "Automation"];

export const projects = [
  {
    slug: "coldmailforge-ai-saas",
    title: "ColdMailForge AI SaaS",
    year: "2026",
    status: "Featured",
    category: "Full Stack",
    repo: "https://github.com/nik1062/ColdMailForge",
    summary:
      "An AI-powered SaaS platform for writing hyper-personalized cold emails and automated follow-up sequences using GPT-4o.",
    problem:
      "Businesses struggle to write personalized outreach at scale, leading to low reply rates and inefficient cold email campaigns.",
    outcome:
      "Built a complete SaaS with OpenAI integration, a 3-part automated follow-up series, Razorpay credit system, and a full admin dashboard.",
    tags: ["React", "Node.js", "OpenAI GPT-4o", "Razorpay", "MongoDB", "Docker"],
    highlights: ["AI-powered personalization", "Automated follow-up series", "Payment integration", "Admin management panel"],
    visual: "ai"
  },
  {
    slug: "metro-mirchi-magic-platform",
    title: "Metro Mirchi Magic Platform",
    year: "2026",
    status: "Featured",
    category: "Full Stack",
    repo: "https://github.com/nik1062/METRO-MIRCHI-MAGIC",
    summary:
      "A comprehensive restaurant management and food ordering platform featuring menu exploration, reservations, and real-time tracking.",
    problem:
      "Modern restaurants need a unified digital solution for online ordering, table bookings, and automated billing to streamline operations.",
    outcome:
      "Developed a modern platform with customer and admin portals, hall reservation systems, and automated PDF/thermal receipt generation.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "shadcn/ui"],
    highlights: ["Real-time order tracking", "Hall/Table reservation", "Automated billing system", "Business analytics dashboard"],
    visual: "food"
  },
  {
    slug: "book-recommendation-engine",
    title: "Book Recommendation Engine",
    year: "2025",
    status: "ML",
    category: "AI/ML",
    repo: "https://github.com/nik1062/BOOK-RECOMMENDATION-ENGINE-USING-KNN",
    summary:
      "Machine learning engine that recommends books based on 1.1 million user ratings using the K-Nearest Neighbors (KNN) algorithm.",
    problem:
      "Users often find it difficult to discover new books that match their specific tastes among millions of available titles.",
    outcome:
      "Implemented a KNN-based model with cosine similarity that provides highly accurate matches by processing a massive user-book rating matrix.",
    tags: ["Python", "KNN Algorithm", "Pandas", "Scikit-learn"],
    highlights: ["1.1M ratings processed", "Cosine similarity matching", "Optimized rating pivot table", "Accurate 5-book discovery"],
    visual: "library"
  },
  {
    slug: "vedaai-assessment-generator",
    title: "VEDAAI - AI Assessment Generator",
    year: "2026",
    status: "Featured",
    category: "AI/ML",
    repo: "https://github.com/nik1062/VEDAAI",
    summary:
      "An intelligent educational tool that automates high-quality assessment creation from PDF or text source documents using AI.",
    problem:
      "Educators spend significant time manually drafting questions and assessments from long source materials.",
    outcome:
      "Built a tool that instantly transforms documents into structured, multi-format assessments, significantly reducing teacher workload.",
    tags: ["AI", "NLP", "Education Tech", "Python"],
    highlights: ["Automated question generation", "PDF/Text processing", "Structured assessment export", "AI-driven logic"],
    visual: "ai"
  },
  {
    slug: "pdf-to-website-builder",
    title: "PDF-to-Website Builder",
    year: "2026",
    status: "Featured",
    category: "Frontend",
    repo: "https://github.com/nik1062/PDF-to-Website-Builder",
    summary:
      "A specialized tool that analyzes PDF content to generate responsive website structures and layouts automatically.",
    problem:
      "Manually translating content from documents into website layouts is time-consuming and prone to design inconsistency.",
    outcome:
      "Built a rapid prototyping tool using React and TypeScript that streamlines document-to-web conversion.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn-ui"],
    highlights: ["Document analysis", "Responsive layout generation", "Rapid prototyping", "Modern UI components"],
    visual: "data"
  },
  {
    slug: "movie-watchlist-app",
    title: "Personal Movie Watchlist",
    year: "2025",
    status: "Frontend",
    category: "Frontend",
    repo: "https://github.com/nik1062/MOVIE_APP",
    summary:
      "A dynamic movie discovery application with real-time OMDB API integration and persistent favorite management.",
    problem:
      "Film enthusiasts need a simple, fast way to search for movies and keep track of a personal watchlist across sessions.",
    outcome:
      "Developed a clean JavaScript application with persistent storage and live data fetching for an interactive user experience.",
    tags: ["JavaScript", "OMDB API", "Local Storage", "Responsive UI"],
    highlights: ["Real-time movie search", "Persistent watchlist", "Dynamic poster fetching", "Minimalist interface"],
    visual: "mobile"
  },
  {
    slug: "mellonpass-password-manager",
    title: "MellonPass Password Manager",
    year: "2026",
    status: "Case Study",
    category: "Full Stack",
    repo: "https://github.com/nik1062/WEB",
    summary:
      "A secure, end-to-end encrypted password management system with a Svelte frontend and Django backend.",
    problem:
      "Users need a reliable, private way to manage credentials across devices without relying on centralized, non-encrypted services.",
    outcome:
      "Developed a robust security-first application featuring Svelte/TypeScript frontend and a Django-powered secure server.",
    tags: ["Svelte", "Django", "Security", "Encryption"],
    highlights: ["End-to-end encryption", "Cross-platform web client", "Secure Django API", "TypeScript safety"],
    visual: "security"
  },
  {
    slug: "eduhub-learning-platform",
    title: "EduHub Learning Platform",
    year: "2025",
    status: "Mobile",
    category: "Mobile",
    repo: "https://github.com/nik1062/EDU_HUB-FLUTTER",
    summary:
      "A comprehensive mobile educational hub built with Flutter for students to access resources, track courses, and manage their learning journey.",
    problem:
      "Student resources are often fragmented across different platforms, making it hard to maintain a centralized learning flow.",
    outcome:
      "Created a unified Flutter application that consolidates learning materials and student progress in a clean, modern mobile interface.",
    tags: ["Flutter", "Firebase", "Mobile Dev", "EduTech"],
    highlights: ["Cross-platform mobile app", "Resource management", "Learning tracking", "Firebase integration"],
    visual: "mobile"
  },
  {
    slug: "furnishkart-ecommerce",
    title: "FurnishKart E-commerce",
    year: "2025",
    status: "Live",
    category: "Full Stack",
    repo: "https://github.com/nik1062/FURNISHKART",
    summary:
      "Full-stack e-commerce marketplace for furniture, featuring product catalogs, cart management, and secure checkout flows.",
    problem:
      "Furniture retailers need a specialized online presence that handles large catalogs and smooth customer transactions.",
    outcome:
      "Built a scalable marketplace prototype that demonstrates a complete user journey from browsing to purchase.",
    tags: ["React", "Node.js", "MongoDB", "E-commerce"],
    highlights: ["Product catalog", "Cart management", "Checkout flow", "Full-stack integration"],
    visual: "data"
  },
  {
    slug: "nova-voice-assistant",
    title: "Nova Voice Assistant",
    year: "2025",
    status: "Automation",
    category: "Automation",
    repo: "https://github.com/nik1062/NOVA-PYTHON",
    summary:
      "A customizable Python-based voice assistant capable of handling desktop tasks, web searches, and personalized automation.",
    problem:
      "Repetitive desktop tasks and quick information retrieval can be streamlined through voice-activated automation.",
    outcome:
      "Developed a personal assistant that understands voice commands and executes Python scripts to automate daily workflows.",
    tags: ["Python", "Speech Recognition", "Automation", "Desktop Scripting"],
    highlights: ["Voice command parsing", "Desktop automation", "Web search integration", "Customizable scripts"],
    visual: "automation"
  },
  {
    slug: "sms-text-classifier",
    title: "SMS Text Classifier",
    year: "2025",
    status: "ML",
    category: "AI/ML",
    repo: "https://github.com/nik1062/NEURAL-NETWORK-SMS-TEXT-CLASSIFIER",
    summary:
      "Neural network model built to classify SMS messages as either ham or spam using natural language processing techniques.",
    problem:
      "Spam SMS messages are a constant nuisance and security risk that require automated filtering.",
    outcome:
      "Trained a high-accuracy neural network that effectively identifies and filters spam based on text patterns.",
    tags: ["Python", "Neural Networks", "NLP", "TensorFlow"],
    highlights: ["Text classification", "NLP preprocessing", "Neural network training", "High accuracy filtering"],
    visual: "security"
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
  { name: "Flask", group: "Backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "Python", group: "AI/Data", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MongoDB", group: "Database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", group: "Database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Firebase", group: "Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Docker", group: "DevOps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", group: "Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Linux", group: "DevOps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Bash", group: "DevOps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name: "GitHub Actions", group: "DevOps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
  { name: "Nginx", group: "DevOps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Flutter", group: "Mobile", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Git", group: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", group: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Postman", group: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "npm", group: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" }
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
