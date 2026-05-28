import React, { useState } from "react";
import { Bot } from "lucide-react";
import { apiService } from "../../services/api";

function localAssistant(question) {
  const q = question.toLowerCase();
  if (q.includes("best") || q.includes("project")) {
    return "Nikunj's strongest projects are SpendLens AI Spend Audit, RESTROPro SaaS POS, Smart Library Management, FinVault Finance Dashboard, FocusFlow, and the n8n Email Assistant.";
  }
  if (q.includes("resume")) return "Use the Resume Hub for Full Stack, Data Analytics, DevOps, and Mobile resumes.";
  if (q.includes("skill") || q.includes("full-stack")) return "Nikunj is strongest in React, Node/Express, Python, Firebase/MongoDB, dashboards, and automation workflows.";
  if (q.includes("certificate") || q.includes("certification")) return "Key proof includes NEURA '25 first prize, GenAI Data Analytics job simulation, Google Analytics Certification, and ML/Python learning certificates.";
  return "Nikunj is a full-stack developer with strong AI/data/automation support. Ask about projects, skills, resume, or certifications.";
}

export function AssistantSection() {
  const [question, setQuestion] = useState("What are Nikunj's best projects?");
  const [answer, setAnswer] = useState("Ask about projects, skills, resumes, certifications, or internship fit.");

  async function askAssistant(event) {
    event.preventDefault();
    try {
      const data = await apiService.askAssistant(question);
      setAnswer(data.answer);
    } catch {
      setAnswer(localAssistant(question));
    }
  }

  return (
    <section className="section assistant-section">
      <div>
        <p className="eyebrow">Signature Feature</p>
        <h2 className="section-title">Ask Nikunj’s portfolio anything.</h2>
      </div>
      <form onSubmit={askAssistant} className="assistant-card">
        <div className="assistant-input">
          <Bot size={22} />
          <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about projects, skills, resumes..." />
          <button type="submit">Ask</button>
        </div>
        <p>{answer}</p>
      </form>
    </section>
  );
}
