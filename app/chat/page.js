"use client";

import { useState, useRef, useEffect } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const DEFAULT_RECENT = [
  "How to renew passport?",
  "Business registration docs",
  "Student scholarships 2025",
  "Health insurance eligibility",
];

const LANG_MAP = {
  EN: "en",
  FR: "fr",
  "عربي": "ar",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/ask`
  : "http://localhost:8000/api/ask";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Ask me anything about Tunisian public services — passports, business registration, scholarships, and more.",
      sources: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("EN");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [recentQuestions, setRecentQuestions] = useState(DEFAULT_RECENT);
  const scrollRef = useRef(null);

  // Load recent questions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("civilai_recent");
    if (saved) {
      try {
        setRecentQuestions(JSON.parse(saved));
      } catch {
        setRecentQuestions(DEFAULT_RECENT);
      }
    }
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function saveToRecent(question) {
    setRecentQuestions((prev) => {
      const filtered = prev.filter((q) => q !== question);
      const updated = [question, ...filtered].slice(0, 6);
      localStorage.setItem("civilai_recent", JSON.stringify(updated));
      return updated;
    });
  }

  async function handleSend(text) {
    const question = text ?? input;
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: question, sources: [] }]);
    setInput("");
    setLoading(true);
    saveToRecent(question);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          lang: LANG_MAP[lang] || "en",
          conversation_id: conversationId,
        }),
      });

      const data = await res.json();

      if (data.conversation_id) setConversationId(data.conversation_id);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong reaching the assistant. Please try again.", sources: [] },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleNewConversation() {
    setConversationId(null);
    setMessages([
      {
        role: "ai",
        text: "Ask me anything about Tunisian public services — passports, business registration, scholarships, and more.",
        sources: [],
      },
    ]);
  }

  return (
    <div style={styles.app}>
      <style>{animations}</style>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <span style={{ color: "#1D9E75" }}>◆</span> CivilAI
        </div>

        <button onClick={handleNewConversation} style={styles.newChatBtn}>
          + New conversation
        </button>

        <div style={styles.label}>Language</div>
        <div style={styles.langRow}>
          {["EN", "FR", "عربي"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="lang-btn"
              style={{
                ...styles.langBtn,
                ...(lang === l ? styles.langBtnActive : {}),
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div style={styles.label}>Recent</div>
        {recentQuestions.map((q) => (
          <div
            key={q}
            className="recent-item"
            style={styles.recentItem}
            onClick={() => handleSend(q)}
          >
            {q}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={styles.main}>
        <div style={styles.topbar}>
          <span style={{ fontWeight: 500 }}>Public Services Assistant</span>
          <span style={styles.badge}>Tunisia Gov Sources</span>
          {conversationId && (
            <span style={styles.convBadge}>Conversation active</span>
          )}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <SignInButton mode="modal">
              <button style={styles.signInBtn}>Sign in</button>
            </SignInButton>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        <div style={styles.messages} ref={scrollRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className="msg-row"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: m.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  ...styles.bubble,
                  ...(m.role === "user" ? styles.bubbleUser : styles.bubbleAi),
                }}
              >
                {m.text}
              </div>

              {/* Sources */}
              {m.role === "ai" && m.sources && m.sources.length > 0 && (
                <div style={styles.sourcesRow}>
                  {m.sources.map((s) => (
                    <span key={s} style={styles.sourceTag}>
                      📄 {s.replace(".md", "").replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="msg-row" style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ ...styles.bubble, ...styles.bubbleAi, display: "flex", gap: 5, padding: "14px 16px" }}>
                <span className="dot" style={styles.dot}></span>
                <span className="dot" style={{ ...styles.dot, animationDelay: "0.15s" }}></span>
                <span className="dot" style={{ ...styles.dot, animationDelay: "0.3s" }}></span>
              </div>
            </div>
          )}
        </div>

        <div style={styles.inputBar}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about public services..."
            style={styles.input}
            className="chat-input"
            dir={lang === "عربي" ? "rtl" : "ltr"}
          />
          <button onClick={() => handleSend()} style={styles.sendBtn} className="send-btn">
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

const animations = `
  .msg-row { animation: slideIn 0.25s ease-out; }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }
  .dot { animation: bounce 1.1s infinite; }
  .recent-item { transition: background 0.15s ease, color 0.15s ease; }
  .recent-item:hover { background: #1f1f1f; color: #fff; }
  .lang-btn { transition: background 0.15s ease, border-color 0.15s ease; }
  .chat-input { transition: border-color 0.15s ease; }
  .chat-input:focus { border-color: #1D9E75 !important; }
  .send-btn { transition: transform 0.12s ease, background 0.15s ease; }
  .send-btn:hover { background: #17875f; }
  .send-btn:active { transform: scale(0.92); }
`;

const styles = {
  app: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
    background: "#0d0d0d",
    color: "#eaeaea",
  },
  sidebar: {
    width: 220,
    borderRight: "1px solid #2a2a2a",
    background: "#141414",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  logo: { fontSize: 16, fontWeight: 600, paddingBottom: 12, borderBottom: "1px solid #2a2a2a" },
  newChatBtn: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#aaa",
    cursor: "pointer",
    textAlign: "left",
  },
  label: { fontSize: 11, textTransform: "uppercase", color: "#888", marginTop: 8 },
  langRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  langBtn: {
    fontSize: 12,
    padding: "4px 10px",
    borderRadius: 8,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#333",
    background: "#1a1a1a",
    color: "#aaa",
    cursor: "pointer",
  },
  langBtnActive: { background: "#0F6E56", color: "#fff", borderColor: "#1D9E75", borderWidth: "1px", borderStyle: "solid" },
  recentItem: {
    fontSize: 12,
    color: "#bbb",
    padding: "6px 8px",
    borderRadius: 8,
    cursor: "pointer",
  },
  main: { flex: 1, display: "flex", flexDirection: "column" },
  topbar: {
    padding: "12px 16px",
    borderBottom: "1px solid #2a2a2a",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  badge: { fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#0F6E56", color: "#fff" },
  convBadge: { fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#1a1a1a", color: "#555", border: "1px solid #333" },
  messages: { flex: 1, overflowY: "auto", padding: "1.5rem 1rem" },
  bubble: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  },
  bubbleAi: { background: "#1e1e1e", color: "#eaeaea", borderRadius: "4px 12px 12px 12px" },
  bubbleUser: { background: "#1D9E75", color: "#fff", borderRadius: "12px 4px 12px 12px" },
  sourcesRow: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6, paddingLeft: 4 },
  sourceTag: {
    fontSize: 11,
    padding: "2px 8px",
    borderRadius: 999,
    background: "#1a2a22",
    color: "#1D9E75",
    border: "1px solid #1D9E7540",
  },
  inputBar: { padding: "12px 16px", borderTop: "1px solid #2a2a2a", display: "flex", gap: 8 },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
    outline: "none",
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#1D9E75",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#1D9E75",
    display: "inline-block",
  },
  signInBtn: {
    fontSize: 12,
    padding: "6px 14px",
    borderRadius: 8,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#333",
    background: "#1a1a1a",
    color: "#aaa",
    cursor: "pointer",
  },
};