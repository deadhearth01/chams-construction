"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useRef } from "react";
import {
  ButtonLink,
  CareerForm,
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

const benefits = [
  {
    n: "01",
    title: "Active site rotation",
    text: "Work across HDB, LTA, PUB and JTC sites — never stuck on one assignment.",
  },
  {
    n: "02",
    title: "Safety-first culture",
    text: "Full PPE provided. Toolbox briefings and supervisor sign-off on every job.",
  },
  {
    n: "03",
    title: "Skilled supervision",
    text: "Singapore-based project leads mentor crews from helper to tradesman, tradesman to supervisor.",
  },
  {
    n: "04",
    title: "Steady payroll",
    text: "On-time wages, transparent overtime, long-term roles — not project-by-project gigs.",
  },
];

const standards = [
  "Branded CHAMS site uniform issued",
  "Full safety PPE — helmet, vest, boots",
  "Daily toolbox briefings before work",
  "Supervised induction for new joiners",
  "Site discipline, on-time start, clean handover",
];

export default function JoinOurTeamPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <PageShell>
      {/* ─── Hero — copy + full-bleed team photo ─── */}
      <section ref={heroRef} className="relative px-5 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="eyebrow">/ Careers · Singapore</p>
          </Reveal>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal>
              <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-[var(--navy)]">
                Build with us.<br />
                <span className="font-display-italic text-[var(--gold-deep)]">
                  Wear the badge.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                CHAMS Construction is hiring tradespeople, supervisors and general
                workforce for active commercial, civil and interior projects across
                Singapore. Real sites. Real teams. Long-term roles.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="#apply">Apply now</ButtonLink>
                <ButtonLink href="#roles" variant="outline">
                  View roles
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Wide team photo — intrinsic 1672:941, raw PNG so it ships untouched */}
          <motion.figure
            style={{ y: heroY, opacity: heroFade }}
            className="relative mt-12 overflow-hidden rounded-sm border border-[color:var(--line)] md:mt-16"
          >
            <img
              src="/join-our-team/join-our-team.png"
              alt="CHAMS Construction full Singapore team gathered on-site at sunset"
              width={1672}
              height={941}
              loading="eager"
              decoding="async"
              className="block h-auto w-full"
            />
            <figcaption className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 md:p-6">
              <span className="rounded-full bg-[var(--navy)]/85 px-3 py-1 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--paper)] backdrop-blur-sm md:text-[11px]">
                / The crew · 2025
              </span>
              <span className="hidden rounded-full bg-[var(--paper)]/85 px-3 py-1 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--navy)] backdrop-blur-sm md:inline-flex md:text-[11px]">
                Singapore
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ─── Why CHAMS — 4 numbered tiles ─── */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">/ Why CHAMS</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
                Real sites.<br />
                <span className="font-display-italic text-[var(--gold-deep)]">
                  Real careers.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                Whether you're picking up your first tool or leading a crew, you'll
                be working on civil, commercial and interior projects that shape
                Singapore.
              </p>
            </Reveal>

            <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
              {benefits.map((b, i) => (
                <Reveal key={b.n} delay={i * 0.06} className="bg-[var(--paper)]">
                  <div className="group flex h-full flex-col gap-6 p-7 md:p-9">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold-deep)]">
                        / {b.n}
                      </span>
                      <span className="h-px w-8 bg-[var(--ash)]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--gold)]" />
                    </div>
                    <h3 className="font-display text-xl leading-tight text-[var(--navy)] md:text-2xl">
                      {b.title}
                    </h3>
                    <p className="text-sm leading-6 text-[var(--ash)] md:text-base md:leading-7">
                      {b.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Wear the badge — dress code photo + standards ─── */}
      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Dress code photo — intrinsic 1536:1024 (3:2), raw PNG */}
            <Reveal>
              <figure className="relative overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--cream)]">
                <img
                  src="/join-our-team/team-dress-code-photo.png"
                  alt="CHAMS Construction crew lined up in branded navy polo uniforms"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
                <div className="pointer-events-none absolute left-4 top-4">
                  <span className="rounded-full bg-[var(--paper)]/85 px-3 py-1 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--navy)] backdrop-blur-sm md:text-[11px]">
                    / Site uniform
                  </span>
                </div>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow">/ Standards</p>
                <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
                  One uniform,<br />
                  <span className="font-display-italic text-[var(--gold-deep)]">
                    one standard.
                  </span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                  Every CHAMS team member carries the badge. We issue uniforms and
                  PPE, run daily safety briefings, and supervise every site.
                </p>
              </Reveal>

              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
                  },
                }}
                className="mt-8 space-y-3"
              >
                {standards.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, x: -14 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-[var(--navy)] bg-[var(--paper)] text-[var(--navy)]">
                      <Check size={12} />
                    </span>
                    <span className="text-base leading-7 text-[var(--navy)] md:text-lg md:leading-8">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Roles we hire — navy panel ─── */}
      <section
        id="roles"
        className="scroll-mt-32 bg-[var(--navy)] px-5 py-20 text-[var(--paper)] md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)]">
                  / Roles we hire
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
                  Twelve seats,<br />
                  <span className="font-display-italic text-[var(--gold)]">
                    always open.
                  </span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[var(--paper)]/70 md:text-base md:leading-7">
                Active openings across our trades. Don't see your fit? Apply anyway —
                we hire ongoing.
              </p>
            </div>
          </Reveal>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.04, delayChildren: 0.1 },
              },
            }}
            className="mt-10 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 md:mt-14 lg:grid-cols-3"
          >
            {roles.map((role, i) => (
              <motion.li
                key={role}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="group flex items-center justify-between bg-[var(--navy)] px-5 py-5 transition-colors hover:bg-white/[0.04] md:px-7 md:py-6"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--gold)]">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base tracking-tight md:text-lg">
                    {role}
                  </span>
                </div>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ─── Apply form ─── */}
      <section id="apply" className="scroll-mt-32 px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">/ Apply</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
              Send your<br />
              <span className="font-display-italic text-[var(--gold-deep)]">
                application.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
              Tell us your role, your experience, and how to reach you. We screen
              applications weekly and reach out for a chat.
            </p>

            <div className="mt-8 rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-6 md:p-7">
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold-deep)]">
                / What happens next
              </p>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-[var(--navy)] md:text-base md:leading-7">
                <li className="flex gap-3">
                  <span className="font-mono text-[10px] text-[var(--ash)]">01</span>
                  We review your details within the week.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[10px] text-[var(--ash)]">02</span>
                  A site lead calls to walk through the role.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[10px] text-[var(--ash)]">03</span>
                  Pass the interview, get inducted, start work.
                </li>
              </ol>
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
