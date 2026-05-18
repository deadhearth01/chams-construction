"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import {
  ButtonLink,
  ContactForm,
  PageShell,
  Reveal,
} from "../components/Site";
import { contact } from "../data";

const promises = [
  {
    n: "01",
    title: "Reply within 1 business day",
    text: "A senior site lead — not a chatbot — reads your brief and gets back with next steps.",
  },
  {
    n: "02",
    title: "Site walk-through, no charge",
    text: "For commercial and civil jobs we schedule a free site survey before any quote.",
  },
  {
    n: "03",
    title: "Scoped, line-item quote",
    text: "You get a written quote with scope, materials, manpower and timeline — not a single lump sum.",
  },
  {
    n: "04",
    title: "One point of contact",
    text: "A dedicated lead manages your project from first call through final handover.",
  },
];

const channelNotes = [
  ["Mon – Sat", "8:30 am – 6:00 pm SGT"],
  ["Project enquiries", "Quoted within 1 – 3 working days"],
  ["Manpower bookings", "Same-day callback for active sites"],
  ["After-hours rectification", "Available on request"],
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <PageShell>
      {/* ─── Hero — handshake photo + opening line ─── */}
      <section ref={heroRef} className="relative px-5 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="eyebrow">/ Contact · Singapore</p>
          </Reveal>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal>
              <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-[var(--navy)]">
                Let's talk.<br />
                <span className="font-display-italic text-[var(--gold-deep)]">
                  Start where the work begins.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                Project enquiries, quote requests, manpower bookings or a quick site
                question — share the brief and a senior lead from CHAMS replies
                within one business day.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="#brief">Send a brief</ButtonLink>
                <ButtonLink href={contact.phoneHref} variant="outline">
                  Call us
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Wide handshake photo — intrinsic 1672:941, raw PNG */}
          <motion.figure
            style={{ y: heroY, opacity: heroFade }}
            className="relative mt-12 overflow-hidden rounded-sm border border-[color:var(--line)] md:mt-16"
          >
            <img
              src="/contact/contach1.png"
              alt="CHAMS site lead shaking hands with a client on a Singapore worksite at sunset"
              width={1672}
              height={941}
              loading="eager"
              decoding="async"
              className="block h-auto w-full"
            />
            <figcaption className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 md:p-6">
              <span className="rounded-full bg-[var(--navy)]/85 px-3 py-1 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--paper)] backdrop-blur-sm md:text-[11px]">
                / Partnership · Day one
              </span>
              <span className="hidden rounded-full bg-[var(--paper)]/85 px-3 py-1 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--navy)] backdrop-blur-sm md:inline-flex md:text-[11px]">
                Singapore
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ─── What happens when you write in — 4 numbered promises ─── */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">/ What you'll get</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
                A real reply.<br />
                <span className="font-display-italic text-[var(--gold-deep)]">
                  A real plan.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                Every brief is read by a senior site lead. No bots, no junior triage —
                just a straight conversation about your site, your timeline and your
                budget.
              </p>
            </Reveal>

            <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
              {promises.map((b, i) => (
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

      {/* ─── Reach the crew — team-walking photo + direct channels ─── */}
      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Team photo — intrinsic 1586:992, raw PNG */}
            <Reveal>
              <figure className="relative overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--cream)]">
                <img
                  src="/contact/Contact2.png"
                  alt="CHAMS Construction project leads walking on a Singapore worksite at sunset"
                  width={1586}
                  height={992}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
                <div className="pointer-events-none absolute left-4 top-4">
                  <span className="rounded-full bg-[var(--paper)]/85 px-3 py-1 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--navy)] backdrop-blur-sm md:text-[11px]">
                    / Direct line
                  </span>
                </div>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow">/ Reach the crew</p>
                <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
                  No gatekeepers.<br />
                  <span className="font-display-italic text-[var(--gold-deep)]">
                    Just the team.
                  </span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
                  Call, email or drop in. The same project leads who run the sites
                  pick up the phone.
                </p>
              </Reveal>

              {/* Direct channel cards */}
              <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
                <a
                  href={contact.phoneHref}
                  className="group flex flex-col gap-3 bg-[var(--paper)] p-6 transition-colors hover:bg-[var(--cream)]"
                >
                  <span className="grid size-10 place-items-center rounded-full border border-[color:var(--line)] text-[var(--navy)] transition group-hover:border-[var(--navy)] group-hover:bg-[var(--navy)] group-hover:text-[var(--paper)]">
                    <Phone size={16} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--ash)]">
                    / Phone
                  </span>
                  <span className="font-display text-lg tracking-tight text-[var(--navy)] md:text-xl">
                    {contact.phone}
                  </span>
                </a>
                <a
                  href={contact.emailHref}
                  className="group flex flex-col gap-3 bg-[var(--paper)] p-6 transition-colors hover:bg-[var(--cream)]"
                >
                  <span className="grid size-10 place-items-center rounded-full border border-[color:var(--line)] text-[var(--navy)] transition group-hover:border-[var(--navy)] group-hover:bg-[var(--navy)] group-hover:text-[var(--paper)]">
                    <Mail size={16} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--ash)]">
                    / Email
                  </span>
                  <span className="break-all font-display text-base tracking-tight text-[var(--navy)] md:text-lg">
                    {contact.email}
                  </span>
                </a>
                <div className="flex flex-col gap-3 bg-[var(--paper)] p-6 sm:col-span-2">
                  <span className="grid size-10 place-items-center rounded-full border border-[color:var(--line)] text-[var(--navy)]">
                    <MapPin size={16} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--ash)]">
                    / Office
                  </span>
                  <span className="font-display text-base leading-snug tracking-tight text-[var(--navy)] md:text-lg">
                    {contact.address}
                  </span>
                </div>
              </div>

              {/* Hours / response notes */}
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
                className="mt-8 grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2"
              >
                {channelNotes.map(([label, value]) => (
                  <motion.li
                    key={label}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="bg-[var(--paper)] p-5"
                  >
                    <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold-deep)]">
                      {label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--navy)] md:text-base">
                      {value}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Brief / form ─── */}
      <section id="brief" className="scroll-mt-32 bg-[var(--navy)] px-5 py-20 text-[var(--paper)] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)]">
              / Send the brief
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight">
              Tell us about<br />
              <span className="font-display-italic text-[var(--gold)]">
                your next site.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[var(--paper)]/75 md:text-lg md:leading-8">
              Share the scope, location and rough timeline. We'll come back with
              questions, then a written quote.
            </p>

            <div className="mt-8 space-y-4 border-t border-white/15 pt-6">
              <div className="flex items-start gap-4">
                <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--gold)]">01</span>
                <span className="text-sm leading-6 text-[var(--paper)]/85 md:text-base">
                  We read your brief within the day.
                </span>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--gold)]">02</span>
                <span className="text-sm leading-6 text-[var(--paper)]/85 md:text-base">
                  A senior lead calls to scope the work and book a site walk.
                </span>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--gold)]">03</span>
                <span className="text-sm leading-6 text-[var(--paper)]/85 md:text-base">
                  Written quote with line-items, manpower and timeline.
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="text-[var(--ink)]">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
