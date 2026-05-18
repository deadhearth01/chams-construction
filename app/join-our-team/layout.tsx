import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at CHAMS Construction — Join Our Singapore Site Teams",
  description:
    "Hiring across Singapore: tradespeople, supervisors, electricians, plumbers, painters and general workforce. Safety-first sites, on-time wages, long-term roles. Apply with CHAMS Construction.",
  alternates: { canonical: "/join-our-team" },
  openGraph: { url: "/join-our-team", title: "Careers — CHAMS Construction" },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
