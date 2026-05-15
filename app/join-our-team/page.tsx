import {
  CareerForm,
  ImagePlaceholder,
  PageHero,
  PageShell,
  Reveal,
} from "../components/Site";

const roles = [
  "General workers",
  "Construction labour",
  "Skilled technicians",
  "Electricians",
  "Plumbers",
  "Painters",
  "Site supervisors",
  "Warehouse assistants",
  "Industrial workers",
  "Maintenance staff",
  "Cleaning crew",
  "Helpers & support",
];

export default function JoinOurTeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="/ Careers"
        title="Join the crew,"
        italic="build with us."
        text="Chams Construction is hiring skilled tradespeople, supervisors, and general workforce for active commercial and interior projects across Singapore."
      />

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1fr]">
          <Reveal>
            <div>
              <ImagePlaceholder label="Site teams — Singapore" tall />
              <div className="mt-8 rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-8">
                <p className="eyebrow">/ Roles we hire for</p>
                <ul className="mt-5 grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
                  {roles.map((role, i) => (
                    <li key={role} className="flex items-center justify-between bg-[var(--paper)] px-4 py-3 text-sm">
                      <span>{role}</span>
                      <span className="font-mono text-[10px] text-[var(--ash)] tracking-widest">
                        / {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <CareerForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
