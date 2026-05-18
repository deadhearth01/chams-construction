import {
  ButtonLink,
  OurWorkShowcase,
  PageHero,
  PageShell,
  Reveal,
} from "../components/Site";

export default function OurWorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="/ Selected work"
        title="Built for Singapore's"
        italic="statutory boards & industries."
        text="Five live case studies — JTC, LTA, HDB, PUB and Micron — civil, infrastructure and commercial M&E works delivered by CHAMS Construction across the island."
      />

      {/* Immersive scroll showcase — sticky client rail + parallax case studies */}
      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <OurWorkShowcase />
        </div>
      </section>

      {/* Capability bar */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Civil & Infrastructure", "Roadworks, drainage, reinforcement, structural access"],
                ["Industrial Estates", "JTC zones, Jurong Island, petrochemical-adjacent works"],
                ["Water & Utilities", "Pipelines, sewerage, drainage, flood mitigation"],
                ["Commercial M&E", "HVAC, electrical, lighting, building maintenance"],
              ].map(([title, text]) => (
                <div key={title} className="bg-[var(--paper)] p-7 md:p-9">
                  <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold-deep)]">
                    {title}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[var(--ash)] md:text-base md:leading-7">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-10 md:p-16">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
                <div>
                  <p className="eyebrow">/ Live brief</p>
                  <h2 className="mt-5 font-display text-4xl leading-[1.02] md:text-6xl">
                    Got a project<br />
                    <span className="font-display-italic text-[var(--gold-deep)]">in motion?</span>
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/contact-us">Send the brief</ButtonLink>
                  <ButtonLink href="/services" variant="outline">View services</ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
