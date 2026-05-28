import React, { useState } from "react";
import { Send } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { profile } from "../data/portfolio";
import { apiService } from "../services/api";
import { useToast } from "../components/ui/Toast";

export function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setLoading(true);

    try {
      await apiService.submitContact(payload);
      addToast("Message sent successfully!", "success");
      form.reset();
    } catch (error) {
      addToast(error.message || "Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Open to internships, collaborations, and useful projects." copy="Use the form, email, GitHub, or LinkedIn. The form connects to the Express backend." />
      <section className="section contact-card">
        <div>
          <h3>Let’s build something useful.</h3>
          <p>I am most interested in full-stack development, AI automation, data analytics, and junior DevOps internship roles.</p>
          <div className="contact-links vertical">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a>
            <a href={profile.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Message
            <textarea name="message" placeholder="Tell me what you want to build" rows="5" required />
          </label>
          <button type="submit" disabled={loading}>
            <Send size={16} />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </PageShell>
  );
}
