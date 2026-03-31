import type { Metadata } from "next";
import { IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const syne = Syne({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sentinel — Multi-Agent AI Workspace",
  description: "Sentinel is a multi-agent workspace for managing multiple AI coding sessions simultaneously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${ibmPlexMono.variable} ${syne.variable} font-mono antialiased bg-[#08080a] text-[#f0eee8]`}
      >
        {children}
      </body>
    </html>
  );
}
