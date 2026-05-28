import {
  Home,
  User,
  Code2,
  Zap,
  Award,
  FileText,
  BookOpen,
  Sparkles,
  Mail
} from "lucide-react";

export const navItems = [
  ["Home", "/", Home],
  ["About", "/about", User],
  ["Projects", "/projects", Code2],
  ["Skills", "/skills", Zap],
  ["Credentials", "/credentials", Award],
  ["Resume", "/resume", FileText],
  ["Blog", "/blog", BookOpen],
  ["Now", "/now", Sparkles],
  ["Contact", "/contact", Mail]
];

export const resumeHub = [
  {
    title: "Full Stack Resume",
    role: "React, Node, Firebase, AI/data projects",
    href: "/assets/resume/Nikunj-Kumar-FullStack-Resume.pdf"
  },
  {
    title: "Data Analytics Resume",
    role: "Python, SQL, Excel, dashboards, EDA",
    href: "/assets/resume/Nikunj-Kumar-Data-Analytics-Resume.pdf"
  },
  {
    title: "DevOps Resume",
    role: "Linux, Docker, GitHub Actions, AWS EC2",
    href: "/assets/resume/Nikunj-Kumar-DevOps-Resume.pdf"
  },
  {
    title: "Mobile Resume",
    role: "Flutter, Firebase, productivity apps",
    href: "/assets/resume/Nikunj-Kumar-Mobile-Resume.pdf"
  }
];

export const blogPosts = [
  {
    title: "How SpendLens became a product-style AI audit tool",
    category: "AI Product",
    read: "5 min",
    copy: "A build note on turning AI tool pricing, prompts, and metrics into a useful product workflow."
  },
  {
    title: "Designing RESTROPro as a SaaS POS system",
    category: "Full Stack",
    read: "6 min",
    copy: "What makes a restaurant POS more than a CRUD app: roles, billing, menu control, and database thinking."
  },
  {
    title: "My NEURA '25 AI Hackathon experience",
    category: "Hackathon",
    read: "4 min",
    copy: "How I scoped, built, and presented an AI automation idea that won first prize."
  },
  {
    title: "Building an n8n email assistant with Gemini",
    category: "Automation",
    read: "4 min",
    copy: "A practical workflow for transforming prompts into professional email drafts and Gmail actions."
  },
  {
    title: "Power BI and finance dashboards as portfolio proof",
    category: "Data",
    read: "5 min",
    copy: "Why dashboards should tell a story, not just show charts."
  },
  {
    title: "Dockerizing a MERN-style project for deployment",
    category: "DevOps",
    read: "5 min",
    copy: "Notes on environment variables, build steps, image size, and deployment confidence."
  }
];

export const pageMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.28 }
};
