import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const interBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chams Construction — Commercial, Interior & Renovation Works",
  description:
    "Singapore-based construction partner for commercial blasting, painting, electrical, plumbing, interior fit-out, renovation, and skilled manpower supply.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interBody.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
