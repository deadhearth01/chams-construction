import {
  AboutBlock,
  ButtonLink,
  FeaturedTags,
  HomeHero,
  ImagePlaceholder,
  PageShell,
  Principles,
  Reveal,
  ServicesPreview,
  StatBlock,
  VisionMissionValues,
  WorkGrid,
} from "./components/Site";

export default function Home() {
  return (
    <PageShell>
      <HomeHero />

      {/* 01 — About */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <AboutBlock />
          <div className="mt-16">
            <VisionMissionValues />
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">/ 02 — Services</p>
              <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[0.98] md:text-7xl">
                A complete<br />
                <span className="font-display-italic text-[var(--gold-deep)]">project stack.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <ButtonLink href="/services" variant="outline">
                All services
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14">
            <ServicesPreview />
          </div>
          <div className="mt-10">
            <FeaturedTags />
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatBlock />

      {/* Principles */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-end">
            <Reveal>
              <p className="eyebrow">/ 03 — How we work</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.98] md:text-7xl">
                Built right,<br />
                <span className="font-display-italic text-[var(--gold-deep)]">on schedule.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-md text-lg leading-8 text-[var(--ash)]">
                Four principles every Chams project lives by — from kickoff through handover
                and aftercare.
              </p>
            </Reveal>
          </div>
          <div className="mt-16">
            <Principles />
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">/ 04 — Selected work</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.98] md:text-7xl">
                Project-ready,<br />
                <span className="font-display-italic text-[var(--gold-deep)]">site-tested.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <ButtonLink href="/our-work" variant="outline">
                All projects
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14">
            <WorkGrid />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="overflow-hidden rounded-sm bg-[var(--ink)] px-8 py-20 text-[var(--paper)] md:p-20">
              <div className="grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:items-end">
                <div>
                  <p className="eyebrow text-white/40">/ Next project</p>
                  <h2 className="mt-5 font-display text-5xl leading-[0.98] md:text-7xl">
                    Have a site,<br />
                    <span className="font-display-italic text-[var(--gold-deep)]">a deadline, a need?</span>
                  </h2>
                </div>
                <div>
                  <p className="text-lg leading-8 text-white/70">
                    Send the brief. We&apos;ll respond with scope, schedule, and the team
                    sized to deliver it.
                  </p>
                  <div className="mt-8">
                    <ButtonLink href="/contact-us">Start a project</ButtonLink>
                  </div>
                </div>
              </div>
              <div className="mt-16">
                <ImagePlaceholder label="Reach out — 24 hr response" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
