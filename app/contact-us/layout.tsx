import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CHAMS Construction Singapore — Get a Site Quote",
  description:
    "Talk to CHAMS Construction. Project enquiries, quote requests, manpower bookings and after-hours rectification — a senior site lead replies within one business day. +65 8117 4399.",
  alternates: { canonical: "/contact-us" },
  openGraph: { url: "/contact-us", title: "Contact CHAMS Construction" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
