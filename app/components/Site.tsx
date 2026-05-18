"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, type Variants, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  contact,
  navItems,
  serviceCategories,
  roleOptions,
  workItems,
  stats,
  principles,
  featuredServices,
  sectorCards,
  aboutBullets,
  visionMissionValues,
  chamsPhilosophy,
  aboutWhatWeDo,
  aboutCommitment,
  featuredProjects,
  type Service,
} from "../data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────
// Reveal — viewport-triggered fade up
// ─────────────────────────────────────────────────────────────
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// SplitHeadline — word-by-word reveal for display titles
// ─────────────────────────────────────────────────────────────
export function SplitHeadline({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const words = text.split(" ");
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.h1
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

// ─────────────────────────────────────────────────────────────
// Header — minimal sticky, animated underline, services mega menu
// ─────────────────────────────────────────────────────────────
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-[var(--paper)]/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="border-b border-[color:var(--line-soft)]">
          <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-5 md:h-28 md:px-10">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Chams Construction"
                width={260}
                height={174}
                className="h-16 w-auto object-contain md:h-20"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-9 text-[13px] tracking-wide lg:flex">
              {navItems.map((item) =>
                item.label === "Services" ? (
                  <button
                    key={item.label}
                    onMouseEnter={() => setServicesOpen(true)}
                    onClick={() => setServicesOpen((v) => !v)}
                    className="group relative flex items-center gap-1 py-2 text-[var(--ink)] hover:text-[var(--gold)]"
                  >
                    <span>Services</span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    />
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--ink)] transition-all duration-500 group-hover:w-full" />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative py-2 text-[var(--ink)] hover:text-[var(--gold)]"
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--ink)] transition-all duration-500 group-hover:w-full" />
                  </Link>
                ),
              )}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase text-[var(--paper)] transition hover:bg-[var(--gold)] hover:text-[var(--navy)]"
              >
                Start a project
                <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-[color:var(--line)] lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <motion.div
          initial={false}
          animate={servicesOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onMouseLeave={() => setServicesOpen(false)}
          className="overflow-hidden border-b border-[color:var(--line)] bg-[var(--paper)]/95 backdrop-blur-md"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.5fr_1fr_1fr]">
              <div>
                <p className="eyebrow">Index</p>
                <p className="mt-4 font-display text-3xl leading-tight">
                  Two divisions.<br />
                  <span className="font-display-italic text-[var(--gold)]">One standard.</span>
                </p>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm"
                >
                  View all services <ArrowUpRight size={14} />
                </Link>
              </div>
              {serviceCategories.map((cat) => (
                <div key={cat.key}>
                  <p className="eyebrow">{cat.label}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{cat.title}</h3>
                  <ul className="mt-5 space-y-2">
                    {cat.services.map((s) => (
                      <li key={s.title}>
                        <Link
                          href={`/services#${cat.key}-${slug(s.title)}`}
                          onClick={() => setServicesOpen(false)}
                          className="group flex items-center justify-between gap-3 border-b border-[color:var(--line-soft)] py-2 text-sm text-[var(--ink)] transition hover:border-[var(--ink)]"
                        >
                          <span>{s.title}</span>
                          <ArrowUpRight
                            size={14}
                            className="opacity-0 transition group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="h-24 md:h-28" />
    </>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <motion.div
      initial={false}
      animate={open ? { x: 0 } : { x: "100%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[60] bg-[var(--ink)] text-[var(--paper)]"
    >
      <div className="flex h-20 items-center justify-between px-5 md:px-10">
        <Image
          src="/logo.png"
          alt="Chams Construction"
          width={140}
          height={94}
          className="h-10 w-auto object-contain brightness-0 invert"
        />
        <button onClick={onClose} className="grid size-10 place-items-center rounded-full border border-white/20" aria-label="Close menu">
          <X size={18} />
        </button>
      </div>
      <nav className="px-5 md:px-10">
        {navItems.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="group flex items-baseline justify-between border-b border-white/10 py-6"
          >
            <span className="font-mono text-xs text-white/40">0{i + 1}</span>
            <span className="font-display text-4xl">{item.label}</span>
            <ArrowUpRight size={20} className="opacity-50 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
          </Link>
        ))}
      </nav>
      <div className="mt-12 px-5 md:px-10">
        <p className="eyebrow text-white/40">Contact</p>
        <a href={contact.phoneHref} className="mt-3 block font-display text-2xl">{contact.phone}</a>
        <a href={contact.emailHref} className="mt-1 block text-white/70">{contact.email}</a>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-[color:var(--line)] bg-[var(--paper)] text-[var(--navy)]">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 md:px-10">
        <Reveal>
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow">/ Get in touch</p>
              <h2 className="mt-5 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98]">
                Let&apos;s build<br />
                <span className="font-display-italic text-[var(--gold-deep)]">something solid.</span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <p className="max-w-md text-lg leading-8 text-[var(--ash)] lg:text-right">
                Project enquiries, quote requests, and manpower bookings — we reply within
                one business day.
              </p>
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--navy)] px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-[var(--paper)] btn-shadow transition hover:bg-[var(--gold)] hover:text-[var(--navy)]"
              >
                Start an enquiry
                <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-[color:var(--line)] pt-12 lg:grid-cols-[1fr_1fr_1fr]">
          <Reveal>
            <Image
              src="/logo.png"
              alt="Chams Construction"
              width={360}
              height={244}
              className="h-28 w-auto object-contain md:h-32"
            />
            <p className="mt-6 max-w-sm text-sm leading-7 text-[var(--ash)]">
              Singapore construction partner for commercial industrial works, interior
              renovation, and skilled manpower supply.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">/ Navigate</p>
            <ul className="mt-5 space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="nav-underline inline-flex items-center gap-2 py-1 text-base text-[var(--navy)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="eyebrow">/ Reach us</p>
            <a href={contact.phoneHref} className="mt-5 flex items-center gap-3 text-base">
              <Phone size={14} className="text-[var(--gold-deep)]" /> {contact.phone}
            </a>
            <a href={contact.emailHref} className="mt-3 flex items-center gap-3 text-base">
              <Mail size={14} className="text-[var(--gold-deep)]" /> {contact.email}
            </a>
            <div className="mt-3 flex items-start gap-3 text-sm leading-6 text-[var(--ash)]">
              <MapPin size={14} className="mt-1 shrink-0 text-[var(--gold-deep)]" />
              {contact.address}
            </div>
          </Reveal>
        </div>
      </div>

      {/* City silhouette */}
      <div className="relative mt-16">
        <Image
          src="/footer-image.png"
          alt="Singapore skyline"
          width={2172}
          height={724}
          sizes="100vw"
          className="block h-auto w-full object-contain object-bottom"
          priority={false}
        />
      </div>

      <div className="bg-[var(--navy)] px-5 py-5 text-[var(--paper)] md:px-10">
        <p className="w-full text-center text-[11px] tracking-[0.16em] uppercase text-white/70">
          Crafted with ♥ love{" "}
          <a
            href="https://www.theavni.studio/"
            target="_blank"
            rel="noreferrer"
            className="text-white transition hover:text-[var(--gold)]"
          >
            AVNI Studio
          </a>
        </p>
        <div className="mx-auto mt-3 flex max-w-[1400px] flex-col gap-3 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Chams Construction Pte. Ltd. All rights reserved.</p>
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/55">
            Singapore — 648363
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 6 }).map((_, i) => (
    <span key={i} className="mx-10 inline-flex items-center gap-10 whitespace-nowrap">
      <span className="font-display text-4xl text-[var(--navy)] md:text-6xl">{text}</span>
      <span className="size-2 rounded-full bg-[var(--gold)]" />
    </span>
  ));
  return (
    <div className="border-y border-[color:var(--line)] py-6">
      <div className="tape-marquee">
        {items}
        {items}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PageShell + Hero
// ─────────────────────────────────────────────────────────────
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  italic,
}: {
  eyebrow: string;
  title: string;
  text: string;
  italic?: string;
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <div className="mt-6">
          <SplitHeadline
            text={title}
            className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.96] tracking-tight"
          />
          {italic && (
            <Reveal delay={0.6}>
              <p className="font-display-italic mt-2 text-[clamp(2.6rem,8vw,7rem)] leading-[0.96] tracking-tight text-[var(--gold)]">
                {italic}
              </p>
            </Reveal>
          )}
        </div>
        <Reveal delay={0.4}>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-[var(--ash)]">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────────────────────
export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  const base =
    "group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-[12px] tracking-[0.2em] uppercase transition sm:justify-start";
  if (variant === "outline") {
    return (
      <Link href={href} className={`${base} border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]`}>
        {children}
        <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    );
  }
  return (
    <Link href={href} className={`${base} bg-[var(--ink)] text-[var(--paper)] btn-shadow hover:bg-[var(--gold)] hover:text-[var(--navy)]`}>
      {children}
      <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// ImagePlaceholder — refined editorial frame
// ─────────────────────────────────────────────────────────────
export function ImagePlaceholder({ label, tall = false }: { label: string; tall?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className={`image-frame relative overflow-hidden rounded-sm ${tall ? "min-h-[560px]" : "min-h-[340px]"}`}>
      <motion.div style={{ y }} className="absolute inset-0 grain" />
      <div className="absolute inset-5 border border-[var(--ink)]/15" />
      <div className="absolute left-5 top-5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--ink)]/45">
        Chams · Site
      </div>
      <div className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--ink)]/45">
        {label}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CtaImage — full-bleed image used inside the dark CTA card
// File: /public/cta.jpg (warm-tone fallback shows if absent)
// ─────────────────────────────────────────────────────────────
export function CtaImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden rounded-sm">
      {/* warm fallback */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1f2a4a] via-[#3c2a18] to-[#c9941a]" />

      {/* real image */}
      <motion.div
        style={{ y, backgroundImage: "url('/cta.png')" }}
        className="absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat"
      />

      {/* gradient overlay for caption legibility */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[var(--navy-deep)]/80 via-transparent to-black/25" />

      {/* spacer */}
      <div className="relative z-[3] aspect-[16/7] min-h-[260px]" />

      {/* corner marks */}
      <div className="absolute left-5 top-5 z-[3] font-mono text-[10px] tracking-[0.3em] uppercase text-white/85">
        Chams · Site
      </div>
      <div className="absolute bottom-5 right-5 z-[3] font-mono text-[10px] tracking-[0.3em] uppercase text-white/85">
        Reach out — 24 hr response
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HomeHero — full bleed with parallax stat strip
// ─────────────────────────────────────────────────────────────
export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <>
      <section
        ref={ref}
        className="relative isolate -mt-24 overflow-hidden md:-mt-28"
        style={{ minHeight: "100svh" }}
      >
        {/* Solid fallback */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f5e9c8] via-[#caa46a] to-[#2a1d10]" />

        {/* Background image */}
        <motion.div
          style={{ y: bgY, backgroundImage: "url('/hero.png')" }}
          className="absolute inset-0 z-[1] bg-cover bg-[position:30%_center] bg-no-repeat md:bg-[position:65%_center]"
        />

        {/* Gradient overlays for readability */}
        <motion.div
          style={{ opacity: fade }}
          className="absolute inset-0 z-[2] bg-gradient-to-b from-white/60 via-white/20 to-black/40"
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-white/65 via-white/15 to-transparent md:from-white/75 md:via-white/25" />

        {/* Foreground content */}
        <div className="relative z-10 flex min-h-[100svh] flex-col">
          <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pt-28 pb-20 md:px-10 md:pt-36 md:pb-24">
            <div className="max-w-2xl lg:max-w-3xl">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="size-2 shrink-0 rounded-full bg-[var(--gold)]" />
                  <p className="eyebrow text-[10px] text-[var(--navy)]/85 md:text-[11px]">
                    Singapore · Construction partner
                  </p>
                </div>
              </Reveal>
              <div className="mt-5 md:mt-6">
                <SplitHeadline
                  text="Building Landmarks"
                  className="font-display block text-[clamp(1.85rem,6.5vw,4.5rem)] leading-[1.02] tracking-tight text-[var(--navy)]"
                />
                <SplitHeadline
                  text="with Modern Expertise."
                  delay={0.25}
                  className="font-display-italic mt-1 block text-[clamp(1.85rem,6.5vw,4.5rem)] leading-[1.02] tracking-tight text-[var(--gold-deep)]"
                />
              </div>
              <Reveal delay={0.5}>
                <p className="mt-6 max-w-lg text-sm leading-6 text-[var(--navy)]/90 md:mt-7 md:text-lg md:leading-7">
                  Commercial and interior construction, delivered with discipline across Singapore.
                </p>
              </Reveal>
              <Reveal delay={0.7}>
                <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
                  <ButtonLink href="/contact-us">Get in touch</ButtonLink>
                  <Link
                    href="/services"
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-[var(--navy)]/40 bg-white/40 px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-[var(--navy)] backdrop-blur transition hover:border-[var(--navy)] hover:bg-[var(--navy)] hover:text-white sm:justify-start"
                  >
                    Explore services
                    <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="grid size-10 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur"
            >
              <ChevronDown size={16} className="text-white" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// AboutBlock — left content + right team image, used on Home
// ─────────────────────────────────────────────────────────────
export function AboutBlock() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      {/* Left: About content */}
      <div>
        <Reveal>
          <p className="eyebrow">/ About us</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,4.25rem)] leading-[1.02] tracking-tight">
            Built for safety,<br />
            <span className="font-display-italic text-[var(--gold-deep)]">quality, and compliance.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--ash)]">
            CHAMS Construction Pte. Ltd. is a Singapore-based construction and engineering
            services company, providing comprehensive solutions in redecoration, waterproofing,
            electrical, and structural works — delivered with discipline, on schedule, and
            built to last.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <ul className="mt-10 space-y-3 border-t border-[color:var(--line)] pt-6">
            {aboutBullets.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-4 border-b border-[color:var(--line-soft)] pb-3 text-base leading-7 text-[var(--navy)]"
              >
                <span className="mt-1 font-mono text-[11px] tracking-[0.2em] text-[var(--gold-deep)]">
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-10">
            <ButtonLink href="/about">Read about us</ButtonLink>
          </div>
        </Reveal>
      </div>

      {/* Right: team image */}
      <Reveal delay={0.2} y={60}>
        <TeamImage />
      </Reveal>
    </div>
  );
}

function TeamImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <div ref={ref} className="lg:sticky lg:top-32">
      <div className="relative overflow-hidden rounded-sm border border-[color:var(--line)]">
        <motion.div style={{ y }} className="relative aspect-[4/5] w-full">
          <Image
            src="/team.png"
            alt="Chams Construction team on site"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </motion.div>
        {/* corner marks */}
        <div className="pointer-events-none absolute inset-4 border border-white/25" />
        <div className="absolute left-5 top-5 font-mono text-[10px] tracking-[0.3em] uppercase text-white/85">
          / The crew
        </div>
        <div className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.3em] uppercase text-white/85">
          
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-[var(--ash)]">
        <p className="font-mono tracking-widest uppercase">/ Site supervisors &amp; trades</p>
        <p className="font-mono tracking-widest uppercase">Chams Construction</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Vision / Mission / Core Values — used on Home below About
// ─────────────────────────────────────────────────────────────
export function VisionMissionValues() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] lg:grid-cols-3">
      {visionMissionValues.map((item, i) => (
        <Reveal key={item.key} delay={i * 0.08} className="bg-[var(--paper)]">
          <div className="h-full p-10">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--gold-deep)]">
                / 0{i + 1}
              </p>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--ash)]">
                {item.label}
              </span>
            </div>
            <h3 className="mt-8 font-display text-3xl leading-tight">{item.label}.</h3>
            <p className="mt-4 text-base leading-7 text-[var(--ash)]">{item.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ChamsAcronym — scroll-pinned letter board + per-letter reveal
// Used on /about page
// ─────────────────────────────────────────────────────────────
export function ChamsAcronym() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  return (
    <section
      ref={wrapRef}
      className="relative bg-[var(--navy)] text-[var(--paper)]"
    >
      {/* decorative noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_20%_20%,#fff_0,transparent_50%)]" />

      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-20 md:px-10 md:pt-32 md:pb-32">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold)] md:text-[11px]">
            / Our strength
          </p>
          <h2 className="mt-4 font-display text-3xl leading-[1.04] tracking-tight md:mt-5 md:text-7xl md:leading-[0.98]">
            The CHAMS<br />
            <span className="font-display-italic text-[var(--gold)]">philosophy.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/70 md:mt-6 md:text-lg md:leading-8">
            Five letters. One standard. Every project at Chams Construction is shaped
            by these five principles — scroll to reveal each one.
          </p>
        </Reveal>

        {/* Mobile sticky letter strip */}
        <div className="sticky top-24 z-20 -mx-5 mt-10 border-y border-white/10 bg-[var(--navy)]/95 px-5 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              {chamsPhilosophy.map((p, i) => {
                const isActive = i === active;
                return (
                  <motion.span
                    key={p.letter}
                    animate={{
                      color: isActive ? "var(--gold)" : "rgba(255,255,255,0.22)",
                      scale: isActive ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-2xl leading-none tracking-tight"
                  >
                    {p.letter}
                  </motion.span>
                );
              })}
            </div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/55">
              {String(active + 1).padStart(2, "0")} / 05
            </p>
          </div>
          <motion.div
            animate={{ width: `${((active + 1) / chamsPhilosophy.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 h-px bg-[var(--gold)]"
          />
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 lg:mt-20 lg:grid-cols-[0.55fr_1fr] lg:items-start">
          {/* Desktop sticky letter board */}
          <div className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
            <div className="relative">
              <div className="flex flex-col items-start gap-2">
                {chamsPhilosophy.map((p, i) => {
                  const isActive = i === active;
                  return (
                    <div key={p.letter} className="relative flex items-baseline gap-4">
                      <motion.span
                        animate={{
                          color: isActive ? "var(--gold)" : "rgba(255,255,255,0.18)",
                          x: isActive ? 8 : 0,
                        }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display block text-[clamp(4rem,12vw,9rem)] leading-[0.85] tracking-tight"
                      >
                        {p.letter}
                      </motion.span>
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display-italic text-2xl text-[var(--gold)] md:text-3xl"
                      >
                        — {p.word}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-8 font-mono text-[11px] tracking-[0.28em] uppercase text-white/45">
                {String(active + 1).padStart(2, "0")} / 05
              </p>
            </div>
          </div>

          {/* Letter cards */}
          <div className="space-y-16 md:space-y-20">
            {chamsPhilosophy.map((p, i) => (
              <ChamsLetterCard
                key={p.letter}
                index={i}
                letter={p.letter}
                word={p.word}
                text={p.text}
                onEnter={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChamsLetterCard({
  index,
  letter,
  word,
  text,
  onEnter,
}: {
  index: number;
  letter: string;
  word: string;
  text: string;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);

  const letters = word.split("");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative border-l border-white/10 pl-5 md:pl-10"
    >
      {/* Mobile-only giant letter prefix */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="lg:hidden"
      >
        <span className="font-display block text-[clamp(4rem,20vw,6rem)] leading-[0.85] tracking-tight text-[var(--gold)]">
          {letter}
        </span>
      </motion.div>

      <p className="mt-3 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold)] md:mt-0 md:text-[11px]">
        / 0{index + 1} — {letter}
      </p>

      {/* Word letter-by-letter reveal — single parent observer */}
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
        }}
        className="mt-3 font-display text-[clamp(1.85rem,7vw,4.5rem)] leading-[1] tracking-tight md:mt-4"
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30, rotateX: -40 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="inline-block whitespace-pre"
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// AboutIntro — copy block used at top of /about
// ─────────────────────────────────────────────────────────────
export function AboutIntro() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
      <div>
        <Reveal>
          <p className="eyebrow">/ Building with purpose</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-4xl leading-[1.04] tracking-tight md:text-6xl md:leading-[1.02]">
            Building with purpose.<br />
            <span className="font-display-italic text-[var(--gold-deep)]">
              Delivering with precision.
            </span>
          </h2>
        </Reveal>
      </div>
      <div className="space-y-6 text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
        <Reveal delay={0.15}>
          <p>
            Chams Construction is a Singapore-based construction and renovation company
            delivering high-quality solutions across interior works, commercial
            construction, and M&amp;E services. Our approach is built on discipline,
            technical expertise, and a commitment to excellence in every project.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p>
            From small-scale renovations to complex commercial and industrial works, we
            focus on safe, efficient, reliable construction tailored to our clients&apos;
            needs.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="font-display-italic text-xl text-[var(--navy)] md:text-2xl">
            Construction is not just about building structures — it is about building
            trust, long-term value, and lasting relationships.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// OnSiteBoard — branded site signage image break
// File: /public/about-team.png (warm fallback shows if absent)
// ─────────────────────────────────────────────────────────────
export function OnSiteBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden rounded-sm">
      {/* warm fallback */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a2654] via-[#3c2a18] to-[#c9941a]" />

      {/* image */}
      <motion.div
        style={{ y, backgroundImage: "url('/about-team.png')" }}
        className="absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat"
      />

      {/* overlay */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[var(--navy-deep)]/80 via-transparent to-black/20" />

      {/* spacer */}
      <div className="relative z-[3] aspect-[3/2] min-h-[320px] md:aspect-[16/7] md:min-h-[440px]" />

      {/* caption */}
      <div className="absolute left-5 top-5 z-[3] font-mono text-[10px] tracking-[0.3em] uppercase text-white/85 md:left-8 md:top-8">
        / On site
      </div>
      <div className="absolute bottom-5 left-5 right-5 z-[3] flex items-end justify-between md:bottom-8 md:left-8 md:right-8">
        <p className="font-display text-2xl leading-tight text-white md:text-4xl">
          Built by Chams.<br />
          <span className="font-display-italic text-[var(--gold)]">Backed by site teams.</span>
        </p>
        <p className="hidden font-mono text-[10px] tracking-[0.3em] uppercase text-white/85 md:block">
          Singapore · 2025
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AboutWhatWeDo — service list with numbered rows
// ─────────────────────────────────────────────────────────────
export function AboutWhatWeDo() {
  return (
    <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-start">
      <Reveal>
        <p className="eyebrow">/ What we do</p>
        <h2 className="mt-5 font-display text-4xl leading-[1.04] tracking-tight md:text-6xl md:leading-[1.02]">
          A full-stack<br />
          <span className="font-display-italic text-[var(--gold-deep)]">
            construction partner.
          </span>
        </h2>
        <p className="mt-6 max-w-md text-base leading-7 text-[var(--ash)] md:text-lg md:leading-8">
          Seven disciplines, one supervised team — from first survey through final
          handover.
        </p>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)]">
        {aboutWhatWeDo.map((item, i) => (
          <Reveal key={item} delay={i * 0.05} className="bg-[var(--paper)]">
            <div className="group flex items-center justify-between gap-6 px-6 py-5 md:px-8 md:py-6">
              <div className="flex items-center gap-5">
                <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--gold-deep)]">
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg leading-tight text-[var(--navy)] md:text-2xl">
                  {item}
                </span>
              </div>
              <span className="h-px w-8 bg-[var(--ash)]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--gold)]" />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AboutCommitment — checked bullets
// ─────────────────────────────────────────────────────────────
export function AboutCommitment() {
  return (
    <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-start">
      <Reveal>
        <p className="eyebrow">/ Our commitment</p>
        <h2 className="mt-5 font-display text-4xl leading-[1.04] tracking-tight md:text-6xl md:leading-[1.02]">
          What every<br />
          <span className="font-display-italic text-[var(--gold-deep)]">
            project carries.
          </span>
        </h2>
      </Reveal>

      <ul className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-2">
        {aboutCommitment.map((item, i) => (
          <Reveal key={item} delay={i * 0.06} className="bg-[var(--paper)]">
            <li className="flex items-start gap-4 p-6 md:p-8">
              <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-[var(--navy)] bg-[var(--paper)] text-[var(--navy)]">
                <Check size={14} />
              </span>
              <span className="font-display text-lg leading-tight text-[var(--navy)] md:text-2xl">
                {item}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AboutVision — pulled quote on navy with anchored team photo
// ─────────────────────────────────────────────────────────────
export function AboutVision() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-sm bg-[var(--navy)] text-[var(--paper)]">
        <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-[var(--gold)]/15 blur-3xl" />
        <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          {/* Quote */}
          <div className="relative px-6 py-14 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)]">
              / Our vision
            </p>
            <p className="mt-6 max-w-xl font-display text-3xl leading-[1.15] tracking-tight md:text-5xl md:leading-[1.1]">
              To become a{" "}
              <span className="font-display-italic text-[var(--gold)]">
                trusted and recognised
              </span>{" "}
              construction partner in Singapore — known for reliability, quality, and{" "}
              <span className="font-display-italic text-[var(--gold)]">
                modern construction excellence.
              </span>
            </p>

            <div className="mt-10 flex items-center gap-6">
              <span className="h-px w-12 bg-[var(--gold)]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--paper)]/60">
                Built in Singapore
              </span>
            </div>
          </div>

          {/* Team photo — intrinsic 1672:941, raw PNG, no Next/Image re-encode */}
          <div className="relative aspect-[1672/941] w-full lg:aspect-auto lg:self-stretch">
            <img
              src="/about-team-large.png"
              alt="CHAMS construction team gathered on-site"
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 block h-full w-full object-cover object-center"
            />
            <span className="pointer-events-none absolute bottom-4 right-4 hidden h-px w-16 bg-[var(--gold)] lg:block" />
            <span className="pointer-events-none absolute bottom-4 right-4 hidden h-16 w-px bg-[var(--gold)] lg:block" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────────────────────
// Capabilities (sectors strip)
// ─────────────────────────────────────────────────────────────
export function CapabilityStrip() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-3">
      {sectorCards.map((card, i) => (
        <Reveal key={card.title} delay={i * 0.1} className="bg-[var(--paper)]">
          <div className="group relative h-full p-10">
            <div className="flex items-center justify-between">
              <card.icon size={32} className="text-[var(--ink)]" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--ash)]">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-10 font-display text-3xl leading-tight">{card.title}</h3>
            <p className="mt-4 text-base leading-7 text-[var(--ash)]">{card.text}</p>
            <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--ink)] transition-all duration-700 group-hover:w-full" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Services overview (used on Home) — two stacked blocks with
// auto-cycling image slideshow tied to active service
// ─────────────────────────────────────────────────────────────
const SLIDESHOW_INTERVAL = 1600;

function ServicePreviewBlock({
  categoryKey,
  reversed = false,
}: {
  categoryKey: string;
  reversed?: boolean;
}) {
  const category = serviceCategories.find((c) => c.key === categoryKey);
  const [active, setActive] = useState(0);
  const blockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(blockRef, { once: false, margin: "-25%" });

  useEffect(() => {
    if (!inView || !category) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % category.services.length);
    }, SLIDESHOW_INTERVAL);
    return () => clearInterval(id);
  }, [inView, category]);

  if (!category) return null;
  const services = category.services;
  const activeService = services[active];

  const Info = (
    <div className="flex flex-col p-8 md:p-12">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{category.label}</p>
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--ash)]">
          {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-display text-[clamp(1.85rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
        {category.title}
      </h3>
      <p className="mt-4 max-w-md text-base leading-7 text-[var(--ash)]">{category.intro}</p>

      <ul className="mt-8 space-y-1 border-t border-[color:var(--line)] pt-2">
        {services.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group flex w-full items-center justify-between gap-4 border-b border-[color:var(--line-soft)] py-3 text-left text-base transition"
              >
                <span className="flex flex-1 items-center gap-4">
                  <span
                    className={`relative h-px shrink-0 transition-all duration-500 ${
                      isActive ? "w-10 bg-[var(--gold)]" : "w-4 bg-[var(--ash)]/40"
                    }`}
                  />
                  <s.icon
                    size={16}
                    className={isActive ? "text-[var(--gold)]" : "text-[var(--ash)]"}
                  />
                  <span
                    className={
                      isActive
                        ? "font-semibold text-[var(--navy)]"
                        : "text-[var(--navy)]/70 group-hover:text-[var(--navy)]"
                    }
                  >
                    {s.title}
                  </span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <Link
          href={`/services#${category.key}`}
          className="group inline-flex items-center gap-2 border-b border-[var(--navy)] pb-1 text-sm font-medium text-[var(--navy)] transition hover:gap-3"
        >
          Open category <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );

  const Slideshow = (
    <div className="relative min-h-[360px] overflow-hidden bg-[var(--navy)] md:min-h-[520px]">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          initial={false}
          animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={i === 0}
          />
        </motion.div>
      ))}

      {/* Gradient overlay for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />

      {/* Corner marks */}
      <div className="absolute left-4 top-4 font-mono text-[9px] tracking-[0.25em] uppercase text-white/85 md:left-5 md:top-5 md:text-[10px] md:tracking-[0.3em]">
        / Now showing
      </div>
      <div className="absolute right-4 top-4 hidden font-mono text-[9px] tracking-[0.25em] uppercase text-white/85 sm:block md:right-5 md:top-5 md:text-[10px] md:tracking-[0.3em]">
        {category.title}
      </div>

      {/* Active caption */}
      <motion.div
        key={activeService.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 left-4 right-4 text-white md:bottom-5 md:left-5 md:right-5"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
          / {String(active + 1).padStart(2, "0")}
        </p>
        <p className="mt-2 font-display text-xl leading-tight md:text-3xl">
          {activeService.title}
        </p>
        <p className="mt-2 max-w-md text-[13px] leading-5 text-white/80 md:text-sm md:leading-6">
          {activeService.description}
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="absolute bottom-4 left-4 flex gap-1.5 md:bottom-5 md:left-auto md:right-5">
        {services.map((_, i) => (
          <span
            key={i}
            className={`h-1 transition-all duration-500 ${
              i === active ? "w-6 bg-[var(--gold)]" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Reveal>
      <div
        ref={blockRef}
        className={`grid overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--paper)] lg:grid-cols-2 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {Info}
        {Slideshow}
      </div>
    </Reveal>
  );
}

export function ServicesPreview() {
  return (
    <div className="space-y-10">
      <ServicePreviewBlock categoryKey="commercial" />
      <ServicePreviewBlock categoryKey="interior" reversed />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Service category & accordion — used on /services
// ─────────────────────────────────────────────────────────────
export function ServiceCategoryBlock({ categoryKey }: { categoryKey: string }) {
  const category = serviceCategories.find((c) => c.key === categoryKey);
  if (!category) return null;
  return (
    <section id={category.key} className="border-t border-[color:var(--line)] py-16 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.45fr_1fr]">
          <Reveal>
            <p className="eyebrow">{category.label}</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-7xl md:leading-[0.98]">
              {category.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-[var(--ash)]">{category.intro}</p>
          </Reveal>
          <div className="flex flex-col">
            {category.services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.05}>
                <ServiceRow service={service} index={i} categoryKey={category.key} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, index, categoryKey }: { service: Service; index: number; categoryKey: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div id={`${categoryKey}-${slug(service.title)}`} className="border-b border-[color:var(--line)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-6 py-7 text-left"
      >
        <span className="font-mono text-xs text-[var(--ash)] tracking-widest">
          / {String(index + 1).padStart(2, "0")}
        </span>
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-[color:var(--line)] text-[var(--ink)] transition group-hover:border-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]">
          <service.icon size={18} />
        </span>
        <span className="flex-1">
          <span className="font-display block text-2xl leading-tight md:text-3xl">
            {service.title}
          </span>
          <span className="mt-1 block max-w-2xl text-sm leading-6 text-[var(--ash)]">
            {service.description}
          </span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[color:var(--line)]">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="grid gap-px bg-[color:var(--line)] pb-6 md:grid-cols-2">
          {service.sub.map((sub, i) => (
            <div key={sub.title} className="bg-[var(--paper)] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--gold)]">
                  · {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-xl">{sub.title}</h4>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--ash)]">{sub.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// OurWorkShowcase — immersive scroll case-study sections with
// sticky client-rail, parallax photos, animated scope reveal
// ─────────────────────────────────────────────────────────────

function ProjectCase({
  project,
  index,
  onActive,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reverse = index % 2 === 1;

  // parallax for the photo (desktop only — disabled on touch for perf)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // notify rail of active section — wider tolerance on mobile (shorter sections)
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <section
      ref={ref}
      id={`case-${project.client.toLowerCase()}`}
      className="relative scroll-mt-[140px] py-10 md:scroll-mt-32 md:py-20 lg:py-28"
    >
      <div
        className={`grid items-center gap-6 sm:gap-8 md:gap-12 lg:grid-cols-2 lg:gap-20 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[3/2] overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--cream)]">
            <motion.div style={{ y: photoY }} className="absolute inset-0 -my-[6%]">
              <img
                src={project.image}
                alt={project.imageAlt}
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover object-center"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            <div className="absolute left-3 top-3 font-mono text-[9px] tracking-[0.28em] uppercase text-white/85 md:left-4 md:top-4 md:text-[10px]">
              / Case {project.index}
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.28em] uppercase text-white/85 md:bottom-4 md:right-4 md:text-[10px]">
              {project.sector}
            </div>
          </div>
          <span
            className={`pointer-events-none absolute -z-[1] hidden h-32 w-32 bg-[var(--gold)]/35 blur-2xl lg:block ${
              reverse ? "-right-6 -top-6" : "-left-6 -bottom-6"
            }`}
          />
        </motion.div>

        {/* Content column */}
        <div className="relative">
          <Reveal y={20}>
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--gold-deep)] md:text-[11px] md:tracking-[0.28em]">
                / Client {project.index}
              </span>
              <span className="hidden h-px w-12 bg-[color:var(--line)] sm:block" />
              <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--ash)] md:text-[11px] md:tracking-[0.28em]">
                {project.sector}
              </span>
            </div>

            <p className="mt-4 font-display text-lg tracking-tight text-[var(--navy)] md:mt-5 md:text-2xl">
              {project.fullName}
            </p>
            <p className="mt-1 font-display-italic text-sm text-[var(--ash)] md:text-base">
              {project.tagline}
            </p>

            <h2 className="mt-4 font-display text-[clamp(1.75rem,7vw,4rem)] leading-[1.04] tracking-tight text-[var(--navy)] md:mt-6">
              {project.title}
              <br />
              <span className="font-display-italic text-[var(--gold-deep)]">
                {project.italic}
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--ash)] md:mt-6 md:text-lg md:leading-8">
              {project.summary}
            </p>
          </Reveal>

          {/* Scope bullets — stagger reveal */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
            }}
            className="mt-6 grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 md:mt-8"
          >
            {project.scope.map((item) => (
              <motion.li
                key={item}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="flex items-start gap-3 bg-[var(--paper)] p-4 md:p-5"
              >
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-[var(--gold-deep)]" />
                <span className="text-[13px] leading-5 text-[var(--navy)] md:text-base md:leading-6">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Meta row */}
          <Reveal delay={0.1} y={20}>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[color:var(--line)] pt-5 md:mt-8 md:flex md:flex-wrap md:items-center md:gap-x-8 md:gap-y-3">
              <div>
                <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[var(--ash)] md:text-[10px] md:tracking-[0.28em]">
                  Location
                </p>
                <p className="mt-1 text-[13px] leading-snug text-[var(--navy)] md:text-base">
                  {project.location}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[var(--ash)] md:text-[10px] md:tracking-[0.28em]">
                  Status
                </p>
                <p className="mt-1 text-[13px] leading-snug text-[var(--navy)] md:text-base">
                  {project.year}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[var(--ash)] md:text-[10px] md:tracking-[0.28em]">
                  Sector
                </p>
                <p className="mt-1 text-[13px] leading-snug text-[var(--navy)] md:text-base">
                  {project.sector}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function OurWorkShowcase() {
  const [active, setActive] = useState(0);
  const pillsRef = useRef<HTMLDivElement>(null);

  // page-level progress for the top bar
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // keep the active pill in view on mobile
  useEffect(() => {
    if (!pillsRef.current) return;
    const el = pillsRef.current.querySelector<HTMLAnchorElement>(
      `[data-pill="${active}"]`
    );
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky in-page navigator (sits under main header) */}
      <div className="sticky top-24 z-30 -mx-5 border-y border-[color:var(--line)] bg-[var(--paper)]/92 backdrop-blur md:-mx-10 md:top-28">
        {/* Top gold progress strip */}
        <div className="h-[2px] w-full bg-transparent">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full origin-left bg-[var(--gold)]"
          />
        </div>

        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-5 py-3 md:px-10 md:py-4">
          <div
            ref={pillsRef}
            className="-mx-1 flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none lg:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredProjects.map((p, i) => {
              const isActive = i === active;
              return (
                <a
                  key={p.client}
                  href={`#case-${p.client.toLowerCase()}`}
                  data-pill={i}
                  className={`group inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors md:px-4 md:py-2 md:text-sm ${
                    isActive
                      ? "border-[var(--navy)] bg-[var(--navy)] text-[var(--paper)]"
                      : "border-[color:var(--line)] bg-[var(--paper)] text-[var(--navy)] hover:border-[var(--navy)]"
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] tracking-[0.22em] md:text-[10px] md:tracking-[0.28em] ${
                      isActive ? "text-[var(--gold)]" : "text-[var(--gold-deep)]"
                    }`}
                  >
                    {p.index}
                  </span>
                  <span className="tracking-tight">{p.client}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case studies stream */}
      <div>
        {featuredProjects.map((p, i) => (
          <ProjectCase
            key={p.client}
            project={p}
            index={i}
            onActive={setActive}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WorkGrid — horizontal carousel, single card in view + arrow nav
// ─────────────────────────────────────────────────────────────
export function WorkGrid() {
  const [active, setActive] = useState(0);
  const total = workItems.length;
  const item = workItems[active];

  const go = (dir: 1 | -1) => {
    setActive((i) => (i + dir + total) % total);
  };

  return (
    <Reveal>
      <div className="overflow-hidden rounded-sm border border-[color:var(--line)] bg-[var(--paper)]">
        {/* Carousel viewport */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${active * 100}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            {workItems.map((w, i) => (
              <div key={w.title} className="grid w-full shrink-0 grid-cols-1 gap-0 lg:grid-cols-[1.05fr_1fr]">
                {/* Image */}
                <div className="image-frame relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[520px]">
                  <div className="absolute inset-4 border border-[var(--navy)]/15" />
                  <div className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--navy)]/55">
                    / {String(i + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--navy)]/55">
                    {w.category}
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-col justify-between gap-8 p-8 md:p-12 lg:p-14">
                  <div>
                    <p className="eyebrow">{w.category}</p>
                    <h3 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
                      {w.title}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-7 text-[var(--ash)]">
                      {w.text}
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/our-work"
                      className="group inline-flex items-center gap-2 border-b border-[var(--navy)] pb-1 text-sm font-medium text-[var(--navy)] transition hover:gap-3"
                    >
                      View project <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-6 border-t border-[color:var(--line)] px-6 py-5 md:px-10">
          {/* Counter + progress */}
          <div className="flex items-center gap-5">
            <p className="font-mono text-sm tracking-widest text-[var(--navy)]">
              <span className="text-[var(--gold-deep)]">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="mx-2 text-[var(--ash)]">/</span>
              <span className="text-[var(--ash)]">{String(total).padStart(2, "0")}</span>
            </p>
            <div className="hidden h-px w-32 bg-[color:var(--line)] sm:block md:w-56">
              <motion.div
                animate={{ width: `${((active + 1) / total) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-[var(--gold)]"
              />
            </div>
            <p className="hidden text-xs uppercase tracking-[0.25em] text-[var(--ash)] md:block">
              {item.category}
            </p>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="group grid size-12 place-items-center rounded-full border border-[color:var(--line)] text-[var(--navy)] transition hover:border-[var(--navy)] hover:bg-[var(--navy)] hover:text-[var(--paper)]"
            >
              <ArrowUpRight
                size={16}
                className="-rotate-[225deg] transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="group grid size-12 place-items-center rounded-full bg-[var(--navy)] text-[var(--paper)] transition hover:bg-[var(--gold)] hover:text-[var(--navy)]"
            >
              <ArrowUpRight
                size={16}
                className="rotate-45 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────────────────────
// Stats — large editorial number block
// ─────────────────────────────────────────────────────────────
export function StatBlock() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-count]");
    items.forEach((item) => {
      const target = parseFloat(item.dataset.count || "0");
      const obj = { value: 0 };
      const suffix = item.dataset.suffix || "";
      gsap.to(obj, {
        value: target,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 85%", once: true },
        onUpdate: () => {
          item.textContent = `${Math.round(obj.value)}${suffix}`;
        },
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  const items: { value: number; suffix: string; label: string }[] = [
    { value: 100, suffix: "+", label: "Projects delivered" },
    { value: 15, suffix: "+", label: "Years of expertise" },
    { value: 50, suffix: "+", label: "Trusted partners" },
    { value: 98, suffix: "%", label: "Client satisfaction" },
  ];

  return (
    <section ref={wrapRef} className="border-y border-[color:var(--line)] bg-[var(--ink)] px-5 py-24 text-[var(--paper)] md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow text-white/40">/ Track record</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.04] md:text-7xl md:leading-[0.98]">
            By the numbers,<br />
            <span className="font-display-italic text-[var(--gold)]">consistently delivered.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-4">
          {items.map((it) => (
            <div key={it.label}>
              <p
                className="font-display text-6xl md:text-8xl"
                data-count={it.value}
                data-suffix={it.suffix}
              >
                0{it.suffix}
              </p>
              <div className="divider mt-4 bg-white/20" />
              <p className="mt-3 text-sm tracking-wide text-white/70">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Principles — circle nodes connected by an animated path
// drawn from step 1 → 4 as the section scrolls into view
// ─────────────────────────────────────────────────────────────
export function Principles() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });

  const arrowPctH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const arrowPctV = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative">
      {/* Desktop — horizontal flow */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Circles row */}
          <div className="relative z-10 grid grid-cols-4 gap-6">
            {principles.map((p, i) => (
              <PrincipleStep
                key={p.title}
                index={i}
                total={principles.length}
                number={p.number}
                title={p.title}
                text={p.text}
                scrollYProgress={scrollYProgress}
                layout="horizontal"
              />
            ))}
          </div>

          {/* Connector path — centered on the circle row */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 z-0 -translate-y-1/2 px-[12.5%]">
            <div className="relative h-px w-full bg-[color:var(--line)]">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: "left center" }}
                className="absolute inset-0 h-px bg-[var(--gold)]"
              />
              <motion.div
                style={{ left: arrowPctH, opacity: arrowOpacity }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="grid size-7 place-items-center rounded-full bg-[var(--gold)] text-[var(--navy)] shadow-[0_0_0_4px_rgba(232,185,35,0.18)]">
                  <ArrowUpRight size={14} className="rotate-45" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — vertical flow */}
      <div className="md:hidden">
        <div className="relative pl-16">
          {/* Vertical connector */}
          <div className="pointer-events-none absolute left-7 top-7 bottom-7 w-px -translate-x-1/2 bg-[color:var(--line)]">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top center" }}
              className="absolute inset-0 w-px bg-[var(--gold)]"
            />
            <motion.div
              style={{ top: arrowPctV, opacity: arrowOpacity }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="grid size-7 place-items-center rounded-full bg-[var(--gold)] text-[var(--navy)] shadow-[0_0_0_4px_rgba(232,185,35,0.18)]">
                <ArrowUpRight size={14} className="rotate-[135deg]" />
              </div>
            </motion.div>
          </div>

          <div className="space-y-10">
            {principles.map((p, i) => (
              <PrincipleStep
                key={p.title}
                index={i}
                total={principles.length}
                number={p.number}
                title={p.title}
                text={p.text}
                scrollYProgress={scrollYProgress}
                layout="vertical"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrincipleStep({
  index,
  total,
  number,
  title,
  text,
  scrollYProgress,
  layout,
}: {
  index: number;
  total: number;
  number: string;
  title: string;
  text: string;
  scrollYProgress: MotionValue<number>;
  layout: "horizontal" | "vertical";
}) {
  const start = index / total;
  const progress = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);

  if (layout === "horizontal") {
    return (
      <div className="flex flex-col items-center text-center">
        <PrincipleCircle number={number} progress={progress} />
        <p className="mt-6 font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--gold-deep)]">
          / {number}
        </p>
        <h3 className="mt-3 font-display text-2xl leading-tight">{title}</h3>
        <p className="mt-3 max-w-[18rem] text-sm leading-6 text-[var(--ash)]">{text}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -left-16 top-0">
        <PrincipleCircle number={number} progress={progress} />
      </div>
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--gold-deep)]">
        / {number}
      </p>
      <h3 className="mt-2 font-display text-2xl leading-tight">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--ash)]">{text}</p>
    </div>
  );
}

function PrincipleCircle({
  number,
  progress,
}: {
  number: string;
  progress: MotionValue<number>;
}) {
  const bgOpacity = useTransform(progress, [0, 1], [0, 1]);
  const ringScale = useTransform(progress, [0, 1], [0.92, 1]);
  return (
    <div className="relative grid size-14 place-items-center rounded-full border-2 border-[var(--navy)] bg-[var(--paper)]">
      <motion.div
        style={{ opacity: bgOpacity, scale: ringScale }}
        className="absolute inset-0 rounded-full bg-[var(--gold)]"
      />
      <span className="relative font-display text-sm font-bold tracking-tight text-[var(--navy)]">
        {number}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tag strip — for popular requests
// ─────────────────────────────────────────────────────────────
export function FeaturedTags() {
  return (
    <Reveal>
      <div className="rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-8">
        <p className="eyebrow">/ Popular requests</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {featuredServices.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-[color:var(--line)] px-4 py-2 text-sm tracking-wide text-[var(--ink)] transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────────────────────
// Contact panel + forms
// ─────────────────────────────────────────────────────────────
export function ContactPanel() {
  return (
    <div className="rounded-sm bg-[var(--ink)] p-10 text-[var(--paper)]">
      <p className="eyebrow text-white/40">/ Contact</p>
      <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
        Talk to<br />
        <span className="font-display-italic text-[var(--gold)]">Chams Construction.</span>
      </h2>
      <p className="mt-6 max-w-md leading-8 text-white/70">
        Discuss a project, request a quote, or arrange skilled manpower for an upcoming
        site.
      </p>
      <div className="mt-10 space-y-5">
        <a href={contact.phoneHref} className="group flex items-center gap-4 text-lg">
          <span className="grid size-10 place-items-center rounded-full border border-white/20 transition group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)]">
            <Phone size={16} />
          </span>
          {contact.phone}
        </a>
        <a href={contact.emailHref} className="group flex items-center gap-4 text-lg">
          <span className="grid size-10 place-items-center rounded-full border border-white/20 transition group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)]">
            <Mail size={16} />
          </span>
          {contact.email}
        </a>
        <div className="flex items-start gap-4 text-base text-white/75">
          <span className="grid size-10 place-items-center rounded-full border border-white/20">
            <MapPin size={16} />
          </span>
          {contact.address}
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--ash)]">
      {children}
    </span>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-10"
    >
      <p className="eyebrow">/ Enquiry form</p>
      <h3 className="mt-3 font-display text-3xl">Send a message.</h3>
      <div className="mt-8 grid gap-6">
        <label className="block">
          <FieldLabel>Name</FieldLabel>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 block w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
          />
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <FieldLabel>Phone</FieldLabel>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 block w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
            />
          </label>
          <label className="block">
            <FieldLabel>Email</FieldLabel>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 block w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
            />
          </label>
        </div>
        <label className="block">
          <FieldLabel>Service required</FieldLabel>
          <select
            required
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="mt-2 block w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceCategories.flatMap((c) =>
              c.services.map((s) => (
                <option key={`${c.key}-${s.title}`} value={`${c.title} — ${s.title}`}>
                  {c.title} — {s.title}
                </option>
              )),
            )}
          </select>
        </label>
        <label className="block">
          <FieldLabel>Project details</FieldLabel>
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-2 block min-h-32 w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-[var(--paper)] btn-shadow transition hover:bg-[var(--gold)] hover:text-[var(--navy)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending" : "Send enquiry"}
        <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
      {status === "success" && (
        <p className="mt-4 text-sm text-[var(--gold-deep)]">Enquiry sent. Check your inbox for confirmation.</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-[#8a3a18]">{error || "Failed to send. Try again."}</p>
      )}
    </form>
  );
}

export function CareerForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    experience: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", role: "", experience: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-[color:var(--line)] bg-[var(--paper)] p-10"
    >
      <p className="eyebrow">/ Application</p>
      <h3 className="mt-3 font-display text-3xl">Apply to the crew.</h3>
      <div className="mt-8 grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <FieldLabel>Full name</FieldLabel>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 block w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
            />
          </label>
          <label className="block">
            <FieldLabel>Phone</FieldLabel>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 block w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
            />
          </label>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <FieldLabel>Email</FieldLabel>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 block w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
            />
          </label>
          <label className="block">
            <FieldLabel>Preferred role</FieldLabel>
            <select
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="mt-2 block w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
            >
              <option value="" disabled>
                Select a role
              </option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <FieldLabel>Experience & availability</FieldLabel>
          <textarea
            required
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="mt-2 block min-h-32 w-full border-b border-[color:var(--line)] bg-transparent pb-2 text-lg focus:border-[var(--ink)]"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-[var(--paper)] btn-shadow transition hover:bg-[var(--gold)] hover:text-[var(--navy)] disabled:opacity-60"
      >
        {status === "sending" ? "Submitting" : "Submit application"}
        <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
      {status === "success" && (
        <p className="mt-4 text-sm text-[var(--gold-deep)]">Application submitted. Check your inbox.</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-[#8a3a18]">{error || "Failed to send. Try again."}</p>
      )}
    </form>
  );
}

// re-export stats for any page that needs them
export { stats };
