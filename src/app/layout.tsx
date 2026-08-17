import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PasscodeGate from "@/components/PasscodeGate";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "LNM Command Center — SOETech",
  description: "Unified CRM, lead generation, sales pipeline, and AI agent dashboard for SOETech.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <PasscodeGate>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <div className="flex min-h-screen">
            <Sidebar />
            <div id="sidebar-overlay" className="sidebar-overlay" />
            <div className="flex-1 ml-[240px] main-content">
              <Header />
              <main id="main-content" className="p-4 lg:p-6" tabIndex={-1}>
                {children}
              </main>
            </div>
          </div>
        </PasscodeGate>
      </body>
    </html>
  );
}
