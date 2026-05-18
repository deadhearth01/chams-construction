import {
  AboutCommitment,
  AboutIntro,
  AboutVision,
  AboutWhatWeDo,
  ButtonLink,
  ChamsAcronym,
  OnSiteBoard,
  PageHero,
  PageShell,
  Reveal,
  StatBlock,
  TeamOnSitePhoto,
} from "../components/Site";

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="/ About"
        title="Building with purpose,"
        italic="delivering with precision."
        text="A Singapore-based construction and renovation partner — interior, commercial, civil, and M&E works delivered with discipline and a long-term mindset."
      />

      {/* Intro */}
      <section className="px-5 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <AboutIntro />
        </div>
      </section>

      {/* CHAMS philosophy — sticky animated acronym */}
      <ChamsAcronym />

      {/* Site image break (branded) */}
      <section className="px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <OnSiteBoard />
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="px-5 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <AboutWhatWeDo />
        </div>
      </section>

      {/* Commitment */}
      <section className="px-5 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <AboutCommitment />
        </div>
      </section>

      {/* Team photo break (Contact2.png — natural aspect, raw PNG) */}
      <section className="px-5 pb-12 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <TeamOnSitePhoto />
        </div>
      </section>

      {/* Stats */}
      <StatBlock />

      {/* Vision */}
      <section className="px-5 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <AboutVision />
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-8 md:p-16">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
                <div>
                  <p className="eyebrow">/ Talk to us</p>
                  <h2 className="mt-5 font-display text-4xl leading-[1.04] tracking-tight md:text-6xl md:leading-[1.02]">
                    Got a project<br />
                    <span className="font-display-italic text-[var(--gold-deep)]">
                      in motion?
                    </span>
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/contact-us">Start a project</ButtonLink>
                  <ButtonLink href="/services" variant="outline">
                    View services
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
