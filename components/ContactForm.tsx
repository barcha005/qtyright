"use client";

import { useState } from "react";
import { contactEmail } from "../lib/site";

/**
 * Contact form without a backend: it composes an email in the visitor's
 * own mail app via mailto:. Nothing is sent to or stored on a server,
 * and the page copy says exactly that.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    const subj = encodeURIComponent(subject || "QtyRight contact");
    window.location.href = `mailto:${contactEmail}?subject=${subj}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        Your name
        <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>
      <label>
        Subject
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Calculator suggestion, correction, question…" />
      </label>
      <label>
        Message
        <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button type="submit">Open in your email app</button>
      <p style={{ color: "var(--muted)", fontSize: ".9rem", margin: 0 }}>
        This form opens your own email app with the message addressed to {contactEmail} —
        nothing is submitted to a server. Prefer to write directly? Email {contactEmail}.
      </p>
    </form>
  );
}
