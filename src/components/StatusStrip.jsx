import React, { useEffect, useState } from "react";
import { GitCommit, ShieldCheck, CheckCircle2 } from "lucide-react";
import { profile } from "../data/portfolio";

export default function StatusStrip() {
  const [latestCommit, setLatestCommit] = useState({
    message: "feat(recoverforge): atomic lock queue for webhook cadence",
    repo: "nik1062/RecoverForge",
    hash: "e049e15",
    time: "recently"
  });

  useEffect(() => {
    let isMounted = true;
    const fetchLatestCommit = async () => {
      try {
        const res = await fetch("https://api.github.com/users/nik1062/events/public", {
          headers: { Accept: "application/vnd.github.v3+json" }
        });
        if (!res.ok) return;
        const events = await res.json();
        const pushEvent = events.find((e) => e.type === "PushEvent" && e.payload?.commits?.length > 0);
        if (pushEvent && isMounted) {
          const commit = pushEvent.payload.commits[pushEvent.payload.commits.length - 1];
          const date = new Date(pushEvent.created_at);
          const timeAgo = formatTimeAgo(date);
          setLatestCommit({
            message: commit.message.split("\n")[0].slice(0, 52),
            repo: pushEvent.repo.name,
            hash: commit.sha.slice(0, 7),
            time: timeAgo
          });
        }
      } catch (err) {
        // Graceful fallback remains in state
      }
    };

    fetchLatestCommit();
    return () => {
      isMounted = false;
    };
  }, []);

  function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return (
    <aside className="system-status-strip" aria-label="System status & recent activity">
      <div className="container status-strip-inner">
        <div className="status-indicator-group">
          <span className="live-pulse-badge">
            <span className="pulse-dot" aria-hidden="true" />
            <span>{profile.systemStatus.state}</span>
          </span>

          <span className="commit-stream">
            <GitCommit size={14} className="text-muted" aria-hidden="true" />
            <span className="text-muted">Last Commit:</span>
            <span className="commit-hash">{latestCommit.hash}</span>
            <span className="commit-text">
              <strong>{latestCommit.repo.replace("nik1062/", "")}</strong>: "{latestCommit.message}"
            </span>
            <span className="text-muted">({latestCommit.time})</span>
          </span>
        </div>

        <div className="status-badges-right">
          <span className="ci-pill">
            <CheckCircle2 size={13} style={{ color: "var(--status-green)" }} />
            <span>CI: Passing</span>
          </span>
          <span className="ci-pill">
            <ShieldCheck size={13} style={{ color: "var(--accent)" }} />
            <span>Vercel Edge</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
