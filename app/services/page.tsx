import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  ButtonLink,
  PageHero,
  PageShell,
  Reveal,
} from "../components/Site";
import { servicesTree } from "../data";

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="/ Services"
        title="Two divisions,"
        italic="end-to-end execution."
        text="Commercial industrial works and detailed interior renovation — supplied as a single, supervised, site-led capability across Singapore."
      />

      {/* Category panels */}
      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {servicesTree.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 0.1}>
                <Link
                  href={`/services/${cat.slug}`}
                  className="group block overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--paper)] transition-colors hover:border-[var(--navy)]"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={cat.cover}
                      alt={cat.name}
                      width={1536}
                      height={1024}
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute left-5 top-5 font-mono text-[10px] tracking-[0.28em] uppercase text-white/85 md:text-[11px]">
                      / {String(i + 1).padStart(2, "0")} · {cat.name.split(" ")[0]}
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                      <h2 className="font-display text-3xl leading-[1.04] tracking-tight md:text-5xl">
                        {cat.name}
                      </h2>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur transition group-hover:bg-[var(--gold)] group-hover:text-[var(--navy)]">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-6 p-7 md:p-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--gold-deep)]">
                        {cat.tagline}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-[var(--ash)] md:text-base md:leading-7">
                        {cat.summary}
                      </p>
                    </div>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
                      {cat.subservices.map((s) => (
                        <li
                          key={s.slug}
                          className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--navy)]/75"
                        >
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
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
