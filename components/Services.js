import SectionHeading from "./SectionHeading";

const services = [
  {
    title: "First-class ticketing",
    description: "Personalized flight booking and reservations.",
  },
  {
    title: "Worldwide visa assistance",
    description: "Hassle-free support for Schengen, China, and beyond.",
  },
  {
    title: "Elite travel packages",
    description: "Tailor-made getaways built around your lifestyle.",
  },
  {
    title: "VIP meet and assist",
    description: "Airport lounge access, private car, royal treatment.",
  },
  {
    title: "Ziara and Omra VIP",
    description: "Spiritual journeys with elegance, comfort, and care.",
  },
  {
    title: "Global cargo",
    description: "Air freight, sea cargo, and express delivery.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-surface-2 px-6 py-28 text-fg">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(198,161,91,0.5), transparent)" }}
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="SERVICES" title="What we handle for you" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-gold/15 bg-gold/10 md:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative bg-surface-2 p-8 transition-colors duration-300 hover:bg-panel"
            >
              <span className="font-mono text-xs text-gold/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg text-gold transition-colors group-hover:text-gold-light">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg/60">{service.description}</p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold to-crimson transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
