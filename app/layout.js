import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CivicAI — Public Services Assistant for Tunisia",
  description: "AI-powered guide to Tunisian public administration — passports, business registration, scholarships, and more.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body style={{ margin: 0, padding: 0, background: "#0d0d0d" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}