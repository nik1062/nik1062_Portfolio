import { GoogleGenerativeAI } from "@google/generative-ai";
import { Project } from "../models/Project.js";
import { Blog } from "../models/Blog.js";

function fallbackAssistant(question) {
  const q = question.toLowerCase();
  if (q.includes("project")) return "Nikunj's flagship projects include ColdMailForge AI SaaS, Metro Mirchi Platform, VEDAAI, and MellonPass.";
  if (q.includes("skill") || q.includes("stack")) return "Nikunj specializes in React, Node, Python, MongoDB, and AI workflow automation.";
  if (q.includes("contact")) return "Reach Nikunj at nikunjkumar1062@gmail.com or +91 93342 98148.";
  return "I'm Nikunj's assistant! Ask me about his projects, skills, or how to contact him.";
}

export const getAnswer = async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ ok: false, error: "Question required" });

  const apiKey = process.env.GEMINI_API_KEY;

  // Dynamic Context Building
  let dynamicProjects = "Currently loading projects...";
  let dynamicBlogs = "Currently loading blogs...";

  try {
    const [pList, bList] = await Promise.all([
      Project.find().select('title category summary -_id').limit(10),
      Blog.find().select('title category copy -_id').limit(5)
    ]);

    if (pList.length > 0) dynamicProjects = pList.map(p => `- ${p.title} (${p.category}): ${p.summary}`).join('\n');
    if (bList.length > 0) dynamicBlogs = bList.map(b => `- ${b.title} (${b.category}): ${b.copy}`).join('\n');
  } catch (err) {
    console.error("Context fetch error:", err);
  }

  const portfolioContext = `
You are Nikunj Kumar's Portfolio AI Assistant. Answer questions about Nikunj Kumar concisely (1-2 sentences). 
If asked something unrelated to the portfolio, politely decline.

Background:
Nikunj is a Full-Stack Developer specializing in AI automation and modern web apps. B.Tech IT at Anna University (2023-2027), CGPA 8.5.

Latest Projects (from Database):
${dynamicProjects}

Latest Blog Posts:
${dynamicBlogs}

Skills: React, Node, Python, MongoDB, Firebase, Tailwind, AI Agents.
Contact: nikunjkumar1062@gmail.com, +91 93342 98148.
`;

  if (!apiKey) {
    console.log("GEMINI_API_KEY not found. Using fallback assistant.");
    return res.json({ ok: true, answer: fallbackAssistant(question) });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: portfolioContext
    });

    const result = await model.generateContent(question);
    const answer = result.response.text();
    
    return res.json({ ok: true, answer });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.json({ ok: true, answer: fallbackAssistant(question) });
  }
};
