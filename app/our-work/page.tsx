import {
  ButtonLink,
  PageHero,
  PageShell,
  Reveal,
  WorkGrid,
} from "../components/Site";

export default function OurWorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="/ Selected work"
        title="Recent projects,"
        italic="across sectors."
        text="Industrial coating, interior fit-out, plumbing, plastering, electrical works, and manpower deployment — a sampling of what Chams Construction has delivered across Singapore worksites."
      />

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <WorkGrid />
        </div>
      </section>

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
