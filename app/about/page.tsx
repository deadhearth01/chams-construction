import {
  ButtonLink,
  CapabilityStrip,
  ImagePlaceholder,
  PageHero,
  PageShell,
  Principles,
  Reveal,
  StatBlock,
} from "../components/Site";

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="/ About"
        title="A construction partner,"
        italic="built for real worksites."
        text="Chams Construction Pte. Ltd. supports Singapore clients with commercial industrial works, interior renovation, and skilled manpower — delivered with site-led supervision and clean handover."
      />

      <section className="px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
            <Reveal>
              <ImagePlaceholder label="Chams team — on site" tall />
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow">/ Studio note</p>
                <h2 className="mt-5 font-display text-5xl leading-[0.98] md:text-6xl">
                  Workmanship,<br />
                  <span className="font-display-italic text-[var(--gold-deep)]">coordination, reliability.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 text-lg leading-8 text-[var(--ash)]">
                  We help property owners, businesses, main contractors, and facility teams
                  complete essential works with disciplined planning and clear communication.
                  From industrial coating systems to detailed interior renovation, our focus
                  stays the same — practical execution and a quiet handover.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
                  {[
                    ["Industrial", "Blasting, painting, electrical & plumbing"],
                    ["Interior", "Plastering, partitions, flooring, finishes"],
                    ["Manpower", "Skilled trades & general workforce"],
                    ["HDB", "Renovation, repair & maintenance"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-[var(--paper)] p-6">
                      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--gold-deep)]">
                        / Focus
                      </p>
                      <p className="mt-3 font-display text-2xl">{k}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--ash)]">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <div className="mt-10">
                  <ButtonLink href="/contact-us">Talk to the team</ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-end">
            <Reveal>
              <p className="eyebrow">/ Sectors</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.98] md:text-7xl">
                Three sectors,<br />
                <span className="font-display-italic text-[var(--gold-deep)]">one team.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-md text-lg leading-8 text-[var(--ash)]">
                Distinct disciplines, shared supervision. Every job carries the same
                standard from kickoff through final handover.
              </p>
            </Reveal>
          </div>
          <div className="mt-16">
            <CapabilityStrip />
          </div>
        </div>
      </section>

      <StatBlock />

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="eyebrow">/ Principles</p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.98] md:text-7xl">
              What every Chams<br />
              <span className="font-display-italic text-[var(--gold-deep)]">project lives by.</span>
            </h2>
          </Reveal>
          <div className="mt-16">
            <Principles />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
