import type { Metadata } from "next";
import {
  ButtonLink,
  PageHero,
  PageShell,
  Reveal,
  ServicesIndexShowcase,
} from "../components/Site";

export const metadata: Metadata = {
  title: "Services — Commercial & Interior Construction Singapore",
  description:
    "CHAMS Construction services: commercial blasting, painting, electrical, plumbing, manpower supply; interior fit-out, plastering, electrical, painting and plumbing — all delivered with site discipline across Singapore.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Services — CHAMS Construction" },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="/ Services"
        title="Two divisions,"
        italic="end-to-end execution."
        text="Commercial industrial works and detailed interior renovation — supplied as a single, supervised, site-led capability across Singapore. Browse all sub-services below."
      />

      {/* All sub-services across both categories — sticky pill nav at top */}
      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <ServicesIndexShowcase />
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-10 md:p-16">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
                <div>
                  <p className="eyebrow">/ Scope discussion</p>
                  <h2 className="mt-5 font-display text-4xl leading-[1.02] md:text-6xl">
                    Have a service<br />
                    <span className="font-display-italic text-[var(--gold-deep)]">in mind?</span>
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--ash)]">
                    Share your site details and we&apos;ll come back with scope, timeline,
                    and manpower sized to your project.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/contact-us">Request a quote</ButtonLink>
                  <ButtonLink href="/our-work" variant="outline">View work</ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
