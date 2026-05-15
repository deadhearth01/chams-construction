import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AboutBlock,
  ButtonLink,
  CtaImage,
  FeaturedTags,
  HomeHero,
  PageShell,
  Principles,
  Reveal,
  ServicesPreview,
  StatBlock,
  VisionMissionValues,
  WorkGrid,
} from "./components/Site";

function GoldCta() {
  return (
    <Link
      href="/contact-us"
      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--gold)] px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-[var(--navy)] btn-shadow transition hover:bg-[var(--paper)] sm:w-auto sm:justify-start"
    >
      Start a project
      <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export default function Home() {
  return (
    <PageShell>
      <HomeHero />

      {/* 01 — About */}
      <section className="px-5 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <AboutBlock />
          <div className="mt-16">
            <VisionMissionValues />
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="px-5 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">/ 02 — Services</p>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.04] md:text-7xl md:leading-[0.98]">
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
      <section className="px-5 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-end">
            <Reveal>
              <p className="eyebrow">/ 03 — How we work</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-7xl md:leading-[0.98]">
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
      <section className="px-5 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">/ 04 — Selected work</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-7xl md:leading-[0.98]">
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
      <section className="px-5 pb-16 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="overflow-hidden rounded-sm bg-[var(--ink)] px-6 py-14 text-[var(--paper)] md:p-20">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-end">
                <div>
                  <p className="eyebrow text-white/40">/ Next project</p>
                  <h2 className="mt-5 font-display text-4xl leading-[1.02] md:text-7xl md:leading-[0.98]">
                    Have a site,<br />
                    <span className="font-display-italic text-[var(--gold-deep)]">a deadline, a need?</span>
                  </h2>
                </div>
                <div>
                  <p className="text-base leading-7 text-white/70 md:text-lg md:leading-8">
                    Send the brief. We&apos;ll respond with scope, schedule, and the team
                    sized to deliver it.
                  </p>
                  <div className="mt-7 md:mt-8">
                    <GoldCta />
                  </div>
                </div>
              </div>
              <div className="mt-12 md:mt-16">
                <CtaImage />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
