"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const techStack = [
  { name: "FastAPI", icon: "/icons/fastapi.png" },
  { name: "RAG Pipeline", icon: null },
  { name: "ChromaDB", icon: "/icons/ChromaDB.png" },
  { name: "Groq LLM", icon: null },
  { name: "Docker", icon: "/icons/Docker.png" },
  { name: "Railway", icon: "/icons/Railway.png" },
  { name: "Next.js", icon: "/icons/Next.js.png" },
  { name: "Vercel", icon: "/icons/Vercel.png" },
  { name: "sentence-transformers", icon: null },
  { name: "Python 3.11", icon: "/icons/Python.png" },
  { name: "CI/CD", icon: "/icons/CI-CD.png" },
];
  return (
    <div style={s.page}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }}>
        <div style={s.navName}>CIVICAI</div>
        <div style={s.navLinks}>
          <a href="#about" style={s.navLink}>ABOUT</a>
          <a href="#services" style={s.navLink}>SERVICES</a>
          <a href="#how" style={s.navLink}>HOW IT WORKS</a>
          <button onClick={() => router.push("/chat")} style={s.navBtn}>
            TRY CIVICAI
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroLeft}>
          <p style={s.heroTagline}>Public Services Assistant for Tunisia</p>
          <h1 style={s.heroTitle}>Mohamed Aziz<br />Ben Jannet</h1>
          <p style={s.heroSub}>
            I built CivicAI to make Tunisian public administration accessible to everyone —
            instant answers about passports, business registration, scholarships, and more,
            grounded in official government sources.
          </p>
          <button onClick={() => router.push("/chat")} style={s.heroCta}>
            TRY CIVICAI FREE
          </button>
        </div>
        <div style={s.heroRight}>
          <img src="/Mohamed.png" alt="Mohamed Aziz Ben Jannet" style={s.heroImg} />
        </div>
      </section>

{/* SCROLLING MARQUEE */}
<div style={s.marqueeWrapper}>
  <div className="marquee-track">
    {[...Array(2)].map((_, gi) => (
      <div key={gi} style={s.marqueeInner}>
        {techStack.filter(t => t.icon).map((t, i) => (
          <span key={`${t.name}-${i}`} style={s.marqueeTag}>
            <img src={t.icon} alt={t.name} style={s.marqueeIcon} title={t.name} />
          </span>
        ))}
      </div>
    ))}
  </div>
</div>
      {/* ABOUT CIVICAI */}
      <section id="about" style={s.section}>
        <div style={s.sectionInner}>
          <div style={s.sectionText}>
            <p style={s.sectionLabel}>WHAT IS CIVICAI</p>
            <h2 style={s.sectionTitle}>
              The single place Tunisians go to understand government procedures.
            </h2>
            <p style={s.sectionDesc}>
              CivicAI uses Retrieval-Augmented Generation (RAG) to answer questions about
              Tunisian public services. Instead of guessing, it retrieves the answer directly
              from curated official sources — then explains it clearly in English, French, or Arabic.
            </p>
            <p style={s.sectionDesc}>
              No more navigating 10 different ministry websites. No more outdated forum posts.
              Just accurate, sourced answers — instantly.
            </p>
            <button onClick={() => router.push("/chat")} style={s.sectionBtn}>
              ASK CIVICAI →
            </button>
          </div>
          <div style={s.sectionImage}>
            <div style={s.chatPreview}>
              <div style={s.chatHeader}>
                <span style={s.chatDot} />
                <span style={{ ...s.chatDot, background: "#f59e0b" }} />
                <span style={{ ...s.chatDot, background: "#22c55e" }} />
                <span style={s.chatHeaderTitle}>CivicAI</span>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={s.chatQ}>How do I renew my passport in Tunisia?</div>
                <div style={s.chatA}>
                  To renew your passport, bring your old passport, CIN (original + copy),
                  2 recent photos with white background, and proof of fee payment to your
                  local police station or Garde Nationale post.
                  <div style={s.chatSource}>📄 passport renewal · services.interieur.gov.tn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ ...s.section, background: "#f9f9f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
          <p style={s.sectionLabel}>WHAT CIVICAI COVERS</p>
          <h2 style={{ ...s.sectionTitle, marginBottom: 48 }}>
            7 essential Tunisian public services
          </h2>
          <div style={s.serviceGrid}>
            {[
              { icon: "🛂", title: "Passport Renewal", desc: "Documents, fees, processing time, where to apply" },
              { icon: "🪪", title: "National ID (CIN)", desc: "First issuance, renewal, lost or damaged" },
              { icon: "🚗", title: "Driver's License", desc: "How to obtain, renew, all categories" },
              { icon: "🏢", title: "Business Registration", desc: "SARL, SUARL — steps, documents, RNE" },
              { icon: "💰", title: "Tax Registration", desc: "Matricule fiscal, obligations, where to go" },
              { icon: "🎓", title: "Scholarships", desc: "National grants, deadlines, documents" },
              { icon: "🏥", title: "Health Insurance", desc: "CNAM affiliation, coverage, your card" },
            ].map(sv => (
              <div key={sv.title} className="scard" style={s.scard}>
                <div style={s.scardIcon}>{sv.icon}</div>
                <div style={s.scardTitle}>{sv.title}</div>
                <div style={s.scardDesc}>{sv.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={s.section}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
          <p style={s.sectionLabel}>UNDER THE HOOD</p>
          <h2 style={{ ...s.sectionTitle, marginBottom: 60 }}>How CivicAI works</h2>
          <div style={s.steps}>
            {[
              { num: "01", title: "You ask a question", desc: "In English, French, or Arabic — however you're most comfortable." },
              { num: "02", title: "We search official sources", desc: "Your question is matched against curated Tunisian government documents using vector search." },
              { num: "03", title: "AI answers with citations", desc: "Llama 3.3 generates a grounded answer and cites exactly which source it used." },
            ].map(st => (
              <div key={st.num} style={s.step}>
                <div style={s.stepNum}>{st.num}</div>
                <div style={s.stepTitle}>{st.title}</div>
                <div style={s.stepDesc}>{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATOR SECTION */}
      <section style={{ ...s.section, background: "#f9f9f9" }}>
        <div style={s.sectionInner}>
          <div style={s.sectionImage}>
            <img src="/Mohamed.png" alt="Mohamed Aziz Ben Jannet" style={s.creatorImg} />
          </div>
          <div style={s.sectionText}>
            <p style={s.sectionLabel}>THE CREATOR</p>
            <h2 style={s.sectionTitle}>Mohamed Aziz Ben Jannet</h2>
            <p style={s.sectionDesc}>
              Full-stack AI engineer based in Tunisia. I built CivicAI because I believe
              every Tunisian deserves clear, accurate information about their own government
              services — in the language they prefer, available instantly.
            </p>
            <p style={s.sectionDesc}>
              This project combines RAG pipelines, vector databases, multilingual LLMs,
              Docker containerization, and CI/CD — built from scratch, deployed publicly,
              and open for everyone to use.
            </p>
            <div style={s.creatorLinks}>
              <a href="https://github.com/MedAzizBnj" target="_blank" style={s.creatorBtn}>GitHub</a>
              <a href="https://www.linkedin.com/in/mohamed-aziz-ben-jannet-442075387/" target="_blank" style={s.creatorBtn}>LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <h2 style={s.ctaTitle}>Ready to try CivicAI?</h2>
        <p style={s.ctaSub}>Free · Instant · No account required · EN / FR / AR</p>
        <button onClick={() => router.push("/chat")} style={s.ctaBtn}>
          TRY CIVICAI FREE →
        </button>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerName}>CIVICAI</div>
        <div style={s.footerSub}>Built by Mohamed Aziz Ben Jannet · Tunisia · 2026</div>
        <div style={s.footerLinks}>
          <a href="https://github.com/MedAzizBnj/civilai-backend-" target="_blank" style={s.footerLink}>GitHub</a>
          <a href="/chat" style={s.footerLink}>Try the app</a>
        </div>
      </footer>
    </div>
  );
}

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #fff; }
  .scard:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.10); transform: translateY(-3px); }
  .scard { transition: all 0.2s ease; }
  a { color: inherit; }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 25s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const s = {
  page: { background: "#fff", color: "#1a1a1a", fontFamily: "'Helvetica Neue', Arial, sans-serif" },

  // NAV
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 60px", background: "rgba(255,255,255,0.95)", transition: "all 0.3s ease" },
  navScrolled: { boxShadow: "0 2px 20px rgba(0,0,0,0.08)", padding: "16px 60px" },
  navName: { fontSize: 20, fontWeight: 800, letterSpacing: 2, color: "#1a1a1a" },
  navLinks: { display: "flex", alignItems: "center", gap: 36 },
  navLink: { color: "#555", textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: 1.5 },
  navBtn: { background: "#1D9E75", color: "#fff", border: "none", padding: "10px 24px", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, cursor: "pointer", borderRadius: 4 },

  // HERO
  hero: { display: "flex", alignItems: "stretch", minHeight: "100vh", paddingTop: 80 },
  heroLeft: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 60px" },
  heroTagline: { fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#1D9E75", textTransform: "uppercase", marginBottom: 20 },
  heroTitle: { fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: "#1a1a1a", marginBottom: 28 },
  heroSub: { fontSize: 17, color: "#555", lineHeight: 1.8, maxWidth: 480, marginBottom: 40 },
  heroCta: { background: "#1D9E75", color: "#fff", border: "none", padding: "16px 36px", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: "pointer", borderRadius: 4, alignSelf: "flex-start" },
  heroRight: { flex: 1, overflow: "hidden", maxHeight: "100vh" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" },

  // SECTIONS
  section: { padding: "100px 0" },
  sectionInner: { maxWidth: 1100, margin: "0 auto", padding: "0 60px", display: "flex", gap: 80, alignItems: "center" },
  sectionText: { flex: 1 },
  sectionImage: { flex: 1 },
  sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#1D9E75", textTransform: "uppercase", marginBottom: 16 },
  sectionTitle: { fontSize: 36, fontWeight: 800, lineHeight: 1.2, color: "#1a1a1a", marginBottom: 24 },
  sectionDesc: { fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: 16 },
  sectionBtn: { background: "transparent", color: "#1D9E75", border: "2px solid #1D9E75", padding: "12px 28px", fontSize: 12, fontWeight: 700, letterSpacing: 2, cursor: "pointer", borderRadius: 4, marginTop: 16 },

  // CHAT PREVIEW
  chatPreview: { background: "#fff", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", border: "1px solid #eee", overflow: "hidden" },
  chatHeader: { background: "#f5f5f5", padding: "12px 16px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #eee" },
  chatDot: { width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" },
  chatHeaderTitle: { marginLeft: 8, fontSize: 13, color: "#888", fontWeight: 600 },
  chatQ: { background: "#f0f0f0", padding: "12px 16px", borderRadius: "4px 12px 12px 12px", fontSize: 14, color: "#555", marginBottom: 12 },
  chatA: { background: "#f0fdf8", border: "1px solid #1D9E7530", padding: "14px 16px", borderRadius: "12px 4px 12px 12px", fontSize: 14, color: "#1a1a1a", lineHeight: 1.7 },
  chatSource: { marginTop: 10, fontSize: 11, color: "#1D9E75", fontWeight: 600 },

  // SERVICES
  serviceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 },
  scard: { background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: "28px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  scardIcon: { fontSize: 28, marginBottom: 14 },
  scardTitle: { fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 },
  scardDesc: { fontSize: 13, color: "#777", lineHeight: 1.6 },

  // HOW
  steps: { display: "flex", gap: 40 },
  step: { flex: 1, borderTop: "3px solid #1D9E75", paddingTop: 28 },
  stepNum: { fontSize: 40, fontWeight: 800, color: "#eee", marginBottom: 16 },
  stepTitle: { fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 },
  stepDesc: { fontSize: 14, color: "#777", lineHeight: 1.7 },

  // CREATOR
  creatorImg: { width: "100%", borderRadius: 8, objectFit: "cover", maxHeight: 480 },
  creatorLinks: { display: "flex", gap: 12, marginTop: 24 },
  creatorBtn: { background: "#1a1a1a", color: "#fff", padding: "10px 24px", fontSize: 13, fontWeight: 600, textDecoration: "none", borderRadius: 4 },

  // CTA
  cta: { background: "#1D9E75", padding: "100px 60px", textAlign: "center" },
  ctaTitle: { fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 16 },
  ctaSub: { fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 40 },
  ctaBtn: { background: "#fff", color: "#1D9E75", border: "none", padding: "18px 48px", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: "pointer", borderRadius: 4 },

  // FOOTER
  footer: { padding: "40px 60px", borderTop: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" },
  footerName: { fontSize: 16, fontWeight: 800, letterSpacing: 2, color: "#1a1a1a" },
  footerSub: { fontSize: 13, color: "#aaa" },
  footerLinks: { display: "flex", gap: 24 },
  footerLink: { color: "#aaa", textDecoration: "none", fontSize: 13 },
  marqueeWrapper: { 
  overflow: "hidden", 
  borderTop: "1px solid #eee", 
  borderBottom: "1px solid #eee", 
  padding: "20px 0",
  background: "#fff",
},
marqueeInner: { 
  display: "flex", 
  gap: 16, 
  paddingRight: 16,
},
marqueeTag: { 
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5f5f5", 
  border: "1px solid #e5e5e5",
  padding: "12px 16px", 
  borderRadius: 8, 
  whiteSpace: "nowrap",
},
marqueeIcon: {
  width: 28,
  height: 28,
  objectFit: "contain",
},
};