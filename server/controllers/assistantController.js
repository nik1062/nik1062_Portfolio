import { GoogleGenerativeAI } from "@google/generative-ai";

const portfolioContext = `
You are Nikunj Kumar's Portfolio AI Assistant. Answer questions about Nikunj concisely and professionally (1-2 short sentences max). 
If asked something completely unrelated to the portfolio, politely decline and steer back to Nikunj's work.

Background:
Nikunj is a Full-Stack Developer specializing in AI automation, data, and modern web apps (MERN/Svelte). B.Tech IT at Anna University (2023-2027), CGPA 8.5. 

Key Projects:
- ColdMailForge AI SaaS (React, Node, GPT-4o)
- Metro Mirchi Magic Platform (Restaurant POS, Next/React)
- VEDAAI Assessment Generator (AI/Education)
- MellonPass (Svelte, Django encrypted password manager)
- Book Recommendation Engine (Python, KNN, 1.1M ratings)
- SpendLens AI Spend Audit
- EduHub Flutter Mobile App

Skills: React, Node, Python, MongoDB, Firebase, Tailwind, AI Agents (n8n/Gemini).
Contact: nikunjkumar1062@gmail.com, +91 93342 98148.
`;

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
  
  if (!apiKey) {
    console.log("GEMINI_API_KEY not found. Using fallback assistant.");
    return res.json({ ok: true, answer: fallbackAssistant(question) });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
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
