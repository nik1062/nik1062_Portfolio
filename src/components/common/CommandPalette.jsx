import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

export function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const commands = [
    ["projects", "/projects"],
    ["skills ai", "/skills"],
    ["resume", "/resume"],
    ["certificates", "/credentials"],
    ["contact", "/contact"],
    ["now", "/now"],
    ["blog", "/blog"],
    ["open coldmailforge", "/projects/coldmailforge-ai-saas"],
    ["open metro", "/projects/metro-mirchi-magic-platform"],
    ["open vedaai", "/projects/vedaai-assessment-generator"],
    ["open mellonpass", "/projects/mellonpass-password-manager"],
    ["open spendlens", "/projects/spendlens-ai-spend-audit"],
    ["open pos", "/projects/restropro-saas-pos"],
    ["open automation", "/projects/n8n-email-assistant"]
  ];
  const visible = commands.filter(([label]) => label.includes(query.toLowerCase()));

  function run(path) {
    navigate(path);
    setOpen(false);
    setQuery("");
  }

  return (
    <div className={`terminal-panel command-panel ${open ? "open" : ""}`} aria-live="polite">
      <div className="terminal-head">
        <span>command palette</span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette">
          <X size={18} />
        </button>
      </div>
      <label className="command-input">
        <Search size={16} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="projects, resume, skills ai..." autoFocus />
      </label>
      <div className="command-list">
        {visible.map(([label, path]) => (
          <button key={label} type="button" onClick={() => run(path)}>
            <span>$ {label}</span>
            <small>{path}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
