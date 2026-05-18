import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import {
  ButtonLink,
  PageShell,
  Reveal,
} from "../../../components/Site";
import { servicesTree } from "../../../data";

type Params = { category: string; subservice: string };

export function generateStaticParams(): Params[] {
  return servicesTree.flatMap((c) =>
    c.subservices.map((s) => ({ category: c.slug, subservice: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: catSlug, subservice: subSlug } = await params;
  const cat = servicesTree.find((c) => c.slug === catSlug);
  const sub = cat?.subservices.find((s) => s.slug === subSlug);
  if (!sub || !cat) return {};
  return {
    title: `${sub.name} — ${cat.name} · CHAMS Construction`,
    description: sub.summary,
  };
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: catSlug, subservice: subSlug } = await params;
  const category = servicesTree.find((c) => c.slug === catSlug);
  const sub = category?.subservices.find((s) => s.slug === subSlug);
  if (!category || !sub) notFound();

  const otherSubs = category.subservices.filter((s) => s.slug !== sub.slug);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative px-5 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <nav className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--ash)] md:text-[11px]">
              <Link href="/services" className="hover:text-[var(--navy)]">
                / Services
              </Link>
              <span>/</span>
              <Link
                href={`/services/${category.slug}`}
                className="hover:text-[var(--navy)]"
              >
                {category.name}
              </Link>
              <span>/</span>
              <span className="text-[var(--gold-deep)]">{sub.name}</span>
            </nav>
          </Reveal>

          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal>
              <h1 className="font-display text-[clamp(2.4rem,7.5vw,5.5rem)] leading-[0.98] tracking-tight text-[var(--navy)]">
                {sub.name}
              </h1>
              <p className="mt-4 font-display-italic text-xl text-[var(--gold-deep)] md:text-2xl">
                {sub.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                {sub.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact-us">Request a quote</ButtonLink>
                <ButtonLink
                  href={`/services/${category.slug}`}
                  variant="outline"
                >
                  Back to {category.name.split(" ")[0]}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Cover photo */}
          <Reveal delay={0.15}>
            <figure className="mt-12 overflow-hidden rounded-sm border border-[color:var(--line)] md:mt-16">
              <img
                src={sub.cover}
                alt={sub.name}
                width={1536}
                height={1024}
                loading="eager"
                decoding="async"
                className="block h-auto w-full"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Essentials */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">/ Essentials</p>
                <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
                  What&apos;s included<br />
                  <span className="font-display-italic text-[var(--gold-deep)]">
                    in this scope.
                  </span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[var(--ash)] md:text-base md:leading-7">
                Each essential service below ships as part of a {sub.name.toLowerCase()} package.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 flex flex-col gap-12 md:gap-16 lg:gap-20">
            {sub.essentials.map((e, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal key={e.slug}>
                  <div
                    className={`grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <figure className="overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--cream)]">
                      <img
                        src={e.image}
                        alt={e.name}
                        width={1402}
                        height={1122}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                    </figure>
                    <div className="relative">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold-deep)]">
                          / {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-12 bg-[color:var(--line)]" />
                        <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--ash)]">
                          Essential
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-[clamp(1.85rem,4.5vw,3.25rem)] leading-[1.04] tracking-tight text-[var(--navy)]">
                        {e.name}
                      </h3>
                      <p className="mt-5 max-w-xl text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                        {e.text}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[color:var(--line)] pt-4 text-sm text-[var(--navy)]/85">
                        <span className="inline-flex items-center gap-2">
                          <Check size={14} className="text-[var(--gold-deep)]" />
                          Site-led delivery
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Check size={14} className="text-[var(--gold-deep)]" />
                          Supervised execution
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Check size={14} className="text-[var(--gold-deep)]" />
                          BCA-aligned standards
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other sub-services in same category */}
      {otherSubs.length > 0 && (
        <section className="border-t border-[color:var(--line)] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <p className="eyebrow">/ More in {category.name}</p>
              <h2 className="mt-5 font-display text-3xl leading-[1.04] tracking-tight md:text-5xl">
                Other {category.name.toLowerCase()}<br />
                <span className="font-display-italic text-[var(--gold-deep)]">
                  we deliver.
                </span>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {otherSubs.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.05}>
                  <Link
                    href={`/services/${category.slug}/${s.slug}`}
                    className="group block overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--paper)] transition-colors hover:border-[var(--navy)]"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={s.cover}
                        alt={s.name}
                        width={1402}
                        height={1122}
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    </div>
                    <div className="flex items-center justify-between gap-3 p-5 md:p-6">
                      <h3 className="font-display text-lg leading-tight tracking-tight text-[var(--navy)] md:text-xl">
                        {s.name}
                      </h3>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[color:var(--line)] text-[var(--navy)] transition group-hover:border-[var(--navy)] group-hover:bg-[var(--navy)] group-hover:text-[var(--paper)]">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-10 md:p-16">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
                <div>
                  <p className="eyebrow">/ Brief us</p>
                  <h2 className="mt-5 font-display text-4xl leading-[1.02] md:text-6xl">
                    Plan a {sub.name.toLowerCase()}<br />
                    <span className="font-display-italic text-[var(--gold-deep)]">
                      package with us.
                    </span>
                  </h2>
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
