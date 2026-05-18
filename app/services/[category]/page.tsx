import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ButtonLink,
  PageShell,
  Reveal,
  ServicesCategoryShowcase,
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
  const path = `/services/${cat.slug}`;
  return {
    title: cat.name,
    description: cat.summary,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${cat.name} · CHAMS Construction Singapore`,
      description: cat.summary,
      images: [{ url: cat.cover, width: 1536, height: 1024, alt: cat.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.name} · CHAMS Construction Singapore`,
      description: cat.summary,
      images: [cat.cover],
    },
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

  const SITE = "https://chamsconstruction.com";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${SITE}/services/${category.slug}`,
      },
    ],
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.name,
    description: category.summary,
    provider: { "@id": `${SITE}/#organization` },
    areaServed: { "@type": "Country", name: "Singapore" },
    serviceType: category.name,
    url: `${SITE}/services/${category.slug}`,
    image: `${SITE}${category.cover}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.name,
      itemListElement: category.subservices.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
          url: `${SITE}/services/${category.slug}/${s.slug}`,
        },
      })),
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
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

      {/* Inline sub-services with sticky pill nav + essentials */}
      <section className="px-5 pb-12 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <ServicesCategoryShowcase category={category} />
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
