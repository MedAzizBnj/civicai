"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navLogo}>
          <span style={{ color: "#1D9E75" }}>◆</span> CivicAI
        </div>
        <div style={styles.navLinks}>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#services" style={styles.navLink}>Services</a>
          <a href="#how" style={styles.navLink}>How it works</a>
          <button onClick={() => router.push("/chat")} style={styles.navBtn}>
            Try CivicAI →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🇹🇳 Built for Tunisia</div>
          <h1 style={styles.heroTitle}>
            Your AI guide to<br />
            <span style={styles.heroGreen}>Tunisian public services</span>
          </h1>
          <p style={styles.heroSub}>
            Passports, business registration, scholarships, health insurance —
            instant answers grounded in official government sources.
            No more navigating 10 different ministry websites.
          </p>
          <div style={styles.heroBtns}>
            <button onClick={() => router.push("/chat")} style={styles.btnPrimary}>
              Ask CivicAI →
            </button>
            <a href="#about" style={styles.btnSecondary}>Learn more</a>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.stat}><span style={styles.statNum}>7</span><span style={styles.statLabel}>Services covered</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><span style={styles.statNum}>3</span><span style={styles.statLabel}>Languages</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><span style={styles.statNum}>100%</span><span style={styles.statLabel}>Official sources</span></div>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.chatPreview}>
            <div style={styles.chatBar}>
              <span style={styles.chatDot} />
              <span style={{ ...styles.chatDot, background: "#f59e0b" }} />
              <span style={{ ...styles.chatDot, background: "#1D9E75" }} />
              <span style={styles.chatTitle}>CivicAI</span>
            </div>
            <div style={styles.chatMsg}>
              <div style={styles.chatBubbleAi}>How can I renew my passport in Tunisia?</div>
            </div>
            <div style={styles.chatMsg}>
              <div style={styles.chatBubbleUser}>
                To renew your passport, you need your old passport, CIN (original + copy), 2 recent photos, and proof of fee payment...
                <div style={styles.sourceTag}>📄 passport renewal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / CREATOR */}
      <section id="about" style={styles.about}>
        <div style={styles.aboutInner}>
          <div style={styles.aboutText}>
            <div style={styles.sectionLabel}>The creator</div>
            <h2 style={styles.sectionTitle}>Mohamed Aziz Ben Jannet</h2>
            <p style={styles.aboutDesc}>
              Full-stack AI engineer based in Tunisia. I built CivicAI because navigating 
              Tunisian public administration is unnecessarily hard — information is scattered, 
              outdated, or unavailable in one place.
            </p>
            <p style={styles.aboutDesc}>
              CivicAI is my answer: a RAG-powered assistant that retrieves answers directly 
              from official government sources and responds in Arabic, French, or English — 
              so every Tunisian can get the information they need, in the language they prefer.
            </p>
            <div style={styles.techStack}>
              {["FastAPI", "RAG", "ChromaDB", "Next.js", "Docker", "Railway"].map(t => (
                <span key={t} style={styles.techTag}>{t}</span>
              ))}
            </div>
            <div style={styles.socialLinks}>
              <a href="https://github.com/MedAzizBnj" target="_blank" style={styles.socialBtn}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/mohamed-aziz-ben-jannet-442075387/" target="_blank" style={styles.socialBtn}>
                LinkedIn
              </a>
            </div>
          </div>
          <div style={styles.aboutImageWrap}>
            <img src="/Mohamed.png" alt="Mohamed Aziz Ben Jannet" style={styles.aboutImg} />
            <div style={styles.aboutImgGlow} />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={styles.services}>
        <div style={styles.sectionLabel}>What CivicAI knows</div>
        <h2 style={styles.sectionTitle}>Services covered</h2>
        <p style={styles.sectionSub}>All answers grounded in official Tunisian government sources</p>
        <div style={styles.serviceGrid}>
          {[
            { icon: "🛂", title: "Passport Renewal", desc: "Documents, fees, processing time, where to apply" },
            { icon: "🪪", title: "National ID (CIN)", desc: "First issuance, renewal, lost or damaged cards" },
            { icon: "🚗", title: "Driver's License", desc: "How to get it, renewal, categories explained" },
            { icon: "🏢", title: "Business Registration", desc: "SARL, SUARL, SA — steps, documents, RNE process" },
            { icon: "💰", title: "Tax Registration", desc: "Matricule fiscal, obligations, where to register" },
            { icon: "🎓", title: "Scholarships", desc: "National grants, application process, deadlines" },
            { icon: "🏥", title: "Health Insurance", desc: "CNAM affiliation, coverage, how to get your card" },
          ].map((s) => (
            <div key={s.title} className="service-card" style={styles.serviceCard}>
              <div style={styles.serviceIcon}>{s.icon}</div>
              <div style={styles.serviceTitle}>{s.title}</div>
              <div style={styles.serviceDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={styles.how}>
        <div style={styles.sectionLabel}>Under the hood</div>
        <h2 style={styles.sectionTitle}>How CivicAI works</h2>
        <div style={styles.steps}>
          {[
            { num: "01", title: "You ask a question", desc: "In English, French, or Arabic — however you prefer" },
            { num: "02", title: "We search official sources", desc: "Your question is matched against curated government documents using vector search" },
            { num: "03", title: "AI answers with citations", desc: "Llama 3.3 generates a grounded answer, citing exactly which source it used" },
          ].map((s) => (
            <div key={s.num} style={styles.step}>
              <div style={styles.stepNum}>{s.num}</div>
              <div style={styles.stepTitle}>{s.title}</div>
              <div style={styles.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to try it?</h2>
        <p style={styles.ctaSub}>Free, instant, no account required</p>
        <button onClick={() => router.push("/chat")} style={styles.btnPrimary}>
          Ask CivicAI →
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}><span style={{ color: "#1D9E75" }}>◆</span> CivicAI</div>
        <div style={styles.footerSub}>Built by Mohamed Aziz Ben Jannet · Tunisia · 2026</div>
        <div style={styles.footerLinks}>
          <a href="https://github.com/MedAzizBnj/civilai-backend-" target="_blank" style={styles.footerLink}>GitHub</a>
          <a href="/chat" style={styles.footerLink}>Try the app</a>
        </div>
      </footer>
    </div>
  );
}

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  .service-card:hover { transform: translateY(-4px); border-color: #1D9E75 !important; }
  .service-card { transition: transform 0.2s ease, border-color 0.2s ease; }
`;

const styles = {
  page: { background: "#0a0a0a", color: "#eaeaea", fontFamily: "sans-serif", overflowX: "hidden" },

  // NAV
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", transition: "all 0.3s ease" },
  navScrolled: { background: "rgba(10,10,10,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #1a1a1a", padding: "14px 60px" },
  navLogo: { fontSize: 18, fontWeight: 700, color: "#fff" },
  navLinks: { display: "flex", alignItems: "center", gap: 32 },
  navLink: { color: "#aaa", textDecoration: "none", fontSize: 14, transition: "color 0.2s" },
  navBtn: { background: "#1D9E75", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 14, cursor: "pointer", fontWeight: 600 },

  // HERO
  hero: { minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 60px 80px", gap: 60, maxWidth: 1200, margin: "0 auto" },
  heroContent: { flex: 1 },
  heroBadge: { display: "inline-block", background: "#0F2D1E", color: "#1D9E75", padding: "6px 14px", borderRadius: 999, fontSize: 13, marginBottom: 24, border: "1px solid #1D9E7540" },
  heroTitle: { fontSize: 56, fontWeight: 800, lineHeight: 1.15, marginBottom: 24, color: "#fff" },
  heroGreen: { color: "#1D9E75" },
  heroSub: { fontSize: 18, color: "#888", lineHeight: 1.7, marginBottom: 40, maxWidth: 520 },
  heroBtns: { display: "flex", gap: 16, marginBottom: 48 },
  btnPrimary: { background: "#1D9E75", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 16, cursor: "pointer", fontWeight: 600 },
  btnSecondary: { background: "transparent", color: "#aaa", border: "1px solid #333", padding: "14px 32px", borderRadius: 10, fontSize: 16, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center" },
  heroStats: { display: "flex", gap: 32, alignItems: "center" },
  stat: { display: "flex", flexDirection: "column", gap: 4 },
  statNum: { fontSize: 28, fontWeight: 700, color: "#1D9E75" },
  statLabel: { fontSize: 12, color: "#666" },
  statDivider: { width: 1, height: 40, background: "#222" },

  // CHAT PREVIEW
  heroImage: { flex: 1, display: "flex", justifyContent: "center" },
  chatPreview: { background: "#141414", borderRadius: 16, border: "1px solid #2a2a2a", overflow: "hidden", width: "100%", maxWidth: 420, boxShadow: "0 40px 80px rgba(0,0,0,0.5)" },
  chatBar: { background: "#0d0d0d", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #1a1a1a" },
  chatDot: { width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" },
  chatTitle: { marginLeft: 8, fontSize: 13, color: "#666" },
  chatMsg: { padding: "16px" },
  chatBubbleAi: { background: "#1a1a1a", padding: "12px 14px", borderRadius: "4px 12px 12px 12px", fontSize: 14, color: "#aaa", marginBottom: 12 },
  chatBubbleUser: { background: "#0F2D1E", border: "1px solid #1D9E7530", padding: "12px 14px", borderRadius: "12px 4px 12px 12px", fontSize: 14, color: "#eaeaea", lineHeight: 1.6 },
  sourceTag: { marginTop: 8, fontSize: 11, color: "#1D9E75", background: "#0a1a12", padding: "3px 8px", borderRadius: 999, display: "inline-block" },

  // ABOUT
  about: { padding: "100px 60px", maxWidth: 1200, margin: "0 auto" },
  aboutInner: { display: "flex", gap: 80, alignItems: "center" },
  aboutText: { flex: 1 },
  sectionLabel: { fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#1D9E75", marginBottom: 16 },
  sectionTitle: { fontSize: 40, fontWeight: 700, color: "#fff", marginBottom: 24, lineHeight: 1.2 },
  sectionSub: { fontSize: 16, color: "#666", marginBottom: 48, textAlign: "center" },
  aboutDesc: { fontSize: 16, color: "#888", lineHeight: 1.8, marginBottom: 16 },
  techStack: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24, marginBottom: 24 },
  techTag: { background: "#1a1a1a", color: "#aaa", padding: "4px 12px", borderRadius: 6, fontSize: 13, border: "1px solid #2a2a2a" },
  socialLinks: { display: "flex", gap: 12 },
  socialBtn: { background: "#1a1a1a", color: "#aaa", padding: "8px 20px", borderRadius: 8, fontSize: 14, textDecoration: "none", border: "1px solid #2a2a2a" },
  aboutImageWrap: { position: "relative", flexShrink: 0 },
  aboutImg: { width: 320, height: 380, objectFit: "cover", borderRadius: 16, position: "relative", zIndex: 1, border: "2px solid #1D9E7530" },
  aboutImgGlow: { position: "absolute", top: 20, left: 20, right: -20, bottom: -20, background: "#1D9E75", borderRadius: 16, opacity: 0.08, zIndex: 0 },

  // SERVICES
  services: { padding: "100px 60px", background: "#080808", textAlign: "center" },
  serviceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto", textAlign: "left" },
  serviceCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, padding: "24px", cursor: "pointer" },
  serviceIcon: { fontSize: 28, marginBottom: 12 },
  serviceTitle: { fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 8 },
  serviceDesc: { fontSize: 13, color: "#666", lineHeight: 1.6 },

  // HOW
  how: { padding: "100px 60px", maxWidth: 1000, margin: "0 auto", textAlign: "center" },
  steps: { display: "flex", gap: 40, marginTop: 60 },
  step: { flex: 1, textAlign: "left", padding: "32px", background: "#111", borderRadius: 12, border: "1px solid #1a1a1a" },
  stepNum: { fontSize: 36, fontWeight: 800, color: "#1D9E7530", marginBottom: 16 },
  stepTitle: { fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 12 },
  stepDesc: { fontSize: 14, color: "#666", lineHeight: 1.7 },

  // CTA
  cta: { textAlign: "center", padding: "100px 60px", background: "#0F2D1E" },
  ctaTitle: { fontSize: 40, fontWeight: 700, color: "#fff", marginBottom: 16 },
  ctaSub: { fontSize: 16, color: "#1D9E75", marginBottom: 40 },

  // FOOTER
  footer: { padding: "40px 60px", borderTop: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" },
  footerLogo: { fontSize: 16, fontWeight: 700 },
  footerSub: { fontSize: 13, color: "#555" },
  footerLinks: { display: "flex", gap: 24 },
  footerLink: { color: "#555", textDecoration: "none", fontSize: 13 },
};