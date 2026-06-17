"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Ask me anything about Tunisian public services — passports, business registration, scholarships, and more." }
  ]);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
  }

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "1rem" }}>CivicAI</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Public Services Assistant for Tunisia</p>

      <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "1rem", minHeight: "300px", marginBottom: "1rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "12px", textAlign: m.role === "user" ? "right" : "left" }}>
            <span style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "10px",
              background: m.role === "user" ? "#1D9E75" : "#f1f1f1",
              color: m.role === "user" ? "#fff" : "#000",
              maxWidth: "80%"
            }}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything about public services..."
          style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSend}
          style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "#1D9E75", color: "#fff", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </main>
  );
}