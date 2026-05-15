import {
  ContactForm,
  ContactPanel,
  PageHero,
  PageShell,
  Reveal,
} from "../components/Site";

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="/ Contact"
        title="Tell us about"
        italic="your next site."
        text="Project enquiries, quote requests, and manpower bookings — share the brief and our team replies within one business day."
      />

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <ContactPanel />
          </Reveal>
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
