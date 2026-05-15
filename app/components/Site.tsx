"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  contact,
  navItems,
  serviceCategories,
  roleOptions,
  workItems,
  heroStats,
  stats,
  principles,
  featuredServices,
  sectorCards,
  aboutBullets,
  visionMission,
  coreValues,
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
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
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
    "group inline-flex items-center gap-3 rounded-full px-6 py-3 text-[12px] tracking-[0.2em] uppercase transition";
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
          <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pt-32 pb-24 md:px-10 md:pt-36">
            <div className="max-w-2xl lg:max-w-3xl">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-[var(--gold)]" />
                  <p className="eyebrow text-[var(--navy)]/85">
                    Singapore · Est. construction partner
                  </p>
                </div>
              </Reveal>
              <div className="mt-6">
                <SplitHeadline
                  text="Construction works,"
                  className="font-display block text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02] tracking-tight text-[var(--navy)]"
                />
                <SplitHeadline
                  text="done right."
                  delay={0.25}
                  className="font-display-italic mt-1 block text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02] tracking-tight text-[var(--gold-deep)]"
                />
              </div>
              <Reveal delay={0.5}>
                <p className="mt-7 max-w-lg text-base leading-7 text-[var(--navy)]/90 md:text-lg">
                  Commercial and interior construction, delivered with discipline across Singapore.
                </p>
              </Reveal>
              <Reveal delay={0.7}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/contact-us">Get in touch</ButtonLink>
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-3 rounded-full border border-[var(--navy)]/40 bg-white/40 px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-[var(--navy)] backdrop-blur transition hover:border-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
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

      {/* Stat strip below hero */}
      <section className="border-y border-[color:var(--line)] bg-[var(--paper)] px-5 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-px overflow-hidden bg-[color:var(--line)] md:grid-cols-4">
          {heroStats.map(([label, text], i) => (
            <Reveal key={label} delay={i * 0.08} className="bg-[var(--paper)]">
              <div className="p-8">
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--gold-deep)]">
                  / 0{i + 1}
                </p>
                <p className="mt-4 font-display text-3xl">{label}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--ash)]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// AboutBlock — left content + right email card, used on Home
// ─────────────────────────────────────────────────────────────
export function AboutBlock() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:items-start">
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

      {/* Right: email contact card */}
      <Reveal delay={0.2} y={60}>
        <div className="sticky top-32 overflow-hidden rounded-sm bg-[var(--navy)] p-10 text-[var(--paper)] md:p-12">
          {/* decorative corner mark */}
          <div className="absolute right-8 top-8 grid size-10 place-items-center rounded-full border border-white/15">
            <Mail size={16} className="text-[var(--gold)]" />
          </div>

          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)]">
            / Mail us
          </p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
            Project briefs, quote requests, and partnership enquiries — straight to our team.
          </p>

          <a
            href={contact.emailHref}
            className="group mt-10 block border-t border-white/15 pt-6"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/45">
              Drop us a line
            </p>
            <p className="mt-3 font-display text-[clamp(1.5rem,2.5vw,2.5rem)] leading-tight tracking-tight text-[var(--paper)] transition group-hover:text-[var(--gold)]">
              {contact.email}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-white/70 transition group-hover:text-[var(--gold)]">
              Send a message <ArrowUpRight size={14} />
            </span>
          </a>

          <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-sm text-white/70">
            <a href={contact.phoneHref} className="flex items-center gap-3">
              <Phone size={14} className="text-[var(--gold)]" />
              {contact.phone}
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={14} className="mt-1 shrink-0 text-[var(--gold)]" />
              <span className="leading-6">{contact.address}</span>
            </div>
          </div>

          {/* subtle gold band at bottom */}
          <div className="-mx-10 mt-10 h-[3px] w-[calc(100%+5rem)] bg-gradient-to-r from-[var(--gold)]/80 via-[var(--gold)] to-[var(--gold)]/40 md:-mx-12 md:w-[calc(100%+6rem)]" />
        </div>
      </Reveal>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Vision / Mission / Core Values — used on Home below About
// ─────────────────────────────────────────────────────────────
export function VisionMissionValues() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] lg:grid-cols-3">
      {visionMission.map((item, i) => (
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
      <Reveal delay={0.24} className="bg-[var(--paper)]">
        <div className="h-full p-10">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--gold-deep)]">
              / 03
            </p>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--ash)]">
              Core values
            </span>
          </div>
          <h3 className="mt-8 font-display text-3xl leading-tight">Core values.</h3>
          <ul className="mt-5 space-y-3">
            {coreValues.map((v) => (
              <li
                key={v.title}
                className="flex items-baseline gap-3 border-b border-[color:var(--line-soft)] pb-2 text-sm leading-6"
              >
                <span className="size-1.5 shrink-0 translate-y-1.5 rounded-full bg-[var(--gold)]" />
                <span>
                  <span className="font-semibold text-[var(--navy)]">{v.title}</span>{" "}
                  <span className="text-[var(--ash)]">— {v.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
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
// Services overview (used on Home)
// ─────────────────────────────────────────────────────────────
export function ServicesPreview() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] lg:grid-cols-2">
      {serviceCategories.map((cat, i) => (
        <Reveal key={cat.key} delay={i * 0.1} className="bg-[var(--paper)]">
          <Link href={`/services#${cat.key}`} className="group block h-full p-10">
            <p className="eyebrow">{cat.label}</p>
            <h3 className="mt-5 font-display text-4xl leading-tight md:text-5xl">{cat.title}</h3>
            <p className="mt-4 max-w-md text-base leading-7 text-[var(--ash)]">{cat.intro}</p>
            <ul className="mt-8 space-y-2">
              {cat.services.map((s) => (
                <li
                  key={s.title}
                  className="flex items-center justify-between border-b border-[color:var(--line-soft)] py-3 text-base"
                >
                  <span className="flex items-center gap-3">
                    <s.icon size={16} className="text-[var(--gold)]" />
                    {s.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                    {String(cat.services.indexOf(s) + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
            <span className="mt-8 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm transition group-hover:gap-3">
              Open category <ArrowUpRight size={14} />
            </span>
          </Link>
        </Reveal>
      ))}
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
    <section id={category.key} className="border-t border-[color:var(--line)] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.45fr_1fr]">
          <Reveal>
            <p className="eyebrow">{category.label}</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.98] md:text-7xl">
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
// WorkGrid — editorial cards
// ─────────────────────────────────────────────────────────────
export function WorkGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-2">
      {workItems.map((item, i) => (
        <Reveal key={item.title} delay={(i % 2) * 0.1} className="bg-[var(--paper)]">
          <div className="group relative h-full overflow-hidden p-8">
            <div className="image-frame relative mb-6 aspect-[4/3] overflow-hidden rounded-sm">
              <div className="absolute inset-4 border border-[var(--ink)]/15" />
              <div className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--ink)]/50">
                / 0{i + 1}
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--ink)]/50">
                {item.category}
              </div>
            </div>
            <p className="eyebrow">{item.category}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{item.title}</h3>
            <p className="mt-3 max-w-md text-base leading-7 text-[var(--ash)]">{item.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm transition group-hover:gap-3">
              View project <ArrowUpRight size={14} />
            </span>
          </div>
        </Reveal>
      ))}
    </div>
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
          <h2 className="mt-4 font-display text-5xl leading-[0.98] md:text-7xl">
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
// Principles
// ─────────────────────────────────────────────────────────────
export function Principles() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-2 lg:grid-cols-4">
      {principles.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.08} className="bg-[var(--paper)]">
          <div className="h-full p-8">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--gold)]">
              / {p.number}
            </p>
            <h3 className="mt-6 font-display text-3xl">{p.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--ash)]">{p.text}</p>
          </div>
        </Reveal>
      ))}
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
