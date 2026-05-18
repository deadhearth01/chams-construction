import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  ButtonLink,
  PageShell,
  Reveal,
} from "../../components/Site";
import { servicesTree } from "../../data";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return servicesTree.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: slug } = await params;
  const cat = servicesTree.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} · CHAMS Construction`,
    description: cat.summary,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: slug } = await params;
  const category = servicesTree.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative px-5 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <nav className="flex items-center gap-3 font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--ash)] md:text-[11px]">
              <Link href="/services" className="hover:text-[var(--navy)]">
                / Services
              </Link>
              <span>/</span>
              <span className="text-[var(--gold-deep)]">{category.name}</span>
            </nav>
          </Reveal>

          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal>
              <h1 className="font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.96] tracking-tight text-[var(--navy)]">
                {category.name.split(" ")[0]}<br />
                <span className="font-display-italic text-[var(--gold-deep)]">
                  {category.name.split(" ").slice(1).join(" ").toLowerCase()}.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold-deep)]">
                {category.tagline}
              </p>
              <p className="mt-4 max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                {category.summary}
              </p>
            </Reveal>
          </div>

          {/* Cover photo */}
          <Reveal delay={0.15}>
            <figure className="mt-12 overflow-hidden rounded-sm border border-[color:var(--line)] md:mt-16">
              <img
                src={category.cover}
                alt={category.name}
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

      {/* Sub-service cards */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">/ Sub-services</p>
                <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
                  {category.subservices.length} disciplines,<br />
                  <span className="font-display-italic text-[var(--gold-deep)]">
                    one supervised team.
                  </span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[var(--ash)] md:text-base md:leading-7">
                Each sub-service ships as a complete scope, run by the same site lead
                end-to-end.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:gap-10">
            {category.subservices.map((sub, i) => (
              <Reveal key={sub.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${category.slug}/${sub.slug}`}
                  className="group block overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--paper)] transition-colors hover:border-[var(--navy)]"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={sub.cover}
                      alt={sub.name}
                      width={1402}
                      height={1122}
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.28em] uppercase text-white/85 md:text-[11px]">
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur transition group-hover:bg-[var(--gold)] group-hover:text-[var(--navy)]">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold-deep)]">
                      {sub.tagline}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight text-[var(--navy)] md:text-3xl">
                      {sub.name}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[var(--ash)] md:text-base md:leading-7">
                      {sub.summary}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[color:var(--line)] pt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--navy)]/70 md:text-[11px]">
                      {sub.essentials.map((e) => (
                        <li key={e.slug}>{e.name}</li>
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
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-10 md:p-16">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
                <div>
                  <p className="eyebrow">/ Brief us</p>
                  <h2 className="mt-5 font-display text-4xl leading-[1.02] md:text-6xl">
                    Plan a {category.name.toLowerCase().split(" ")[0]}<br />
                    <span className="font-display-italic text-[var(--gold-deep)]">
                      scope with us.
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
