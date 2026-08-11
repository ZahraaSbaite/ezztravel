const stats = [
  { value: "20+", label: "Years of experience" },
  { value: "40+", label: "Destinations arranged" },
  { value: "2", label: "Offices — Beirut & Abidjan" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-surface px-6 py-28">
      {/* decorative watermark mark */}
      <img
        src="/logo-mark.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-10 w-[26rem] rotate-6 opacity-[0.05] md:w-[34rem]"
      />
      {/* oversized quotation glyph */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-display text-[13rem] leading-none text-fg/[0.045] md:text-[18rem]"
      >
        &rdquo;
      </span>

      <div className="relative mx-auto grid max-w-6xl gap-14 md:grid-cols-12 md:gap-x-16">
        {/* left rail: heading, pull-quote, stats */}
        <div className="md:sticky md:top-28 md:col-span-4 md:self-start">
          <div className="flex items-center gap-3 text-gold/70">
            <span className="h-px w-10 bg-current opacity-50" />
            <span className="font-mono text-[11px] tracking-[0.35em] text-gold">
              ABOUT
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-fg">
            Built on trust,
            <br />
            not popularity
          </h2>

          <p className="mt-7 border-l-2 border-gold/50 pl-5 font-display text-xl italic leading-relaxed text-fg/75">
            Discover the world with discretion, comfort, and priority.
          </p>

          <div className="mt-12 space-y-5">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex items-baseline gap-4 border-b border-edge/10 pb-4"
                style={{ marginLeft: `${i * 14}px` }}
              >
                <p className="font-display text-3xl text-gold">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-fg/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* right column: narrative */}
        <div className="md:col-span-8 md:pt-3">
          <p className="leading-[1.9] text-fg/70">
            <span className="float-left mr-3 mt-1 font-display text-7xl font-bold leading-[0.8] text-gold">
              E
            </span>
            <span className="font-bold text-gold">zz</span>{" "}
            <span className="text-gold">Travel</span>, we design every
            journey around the person taking it — from breathtaking
            honeymoons crafted exclusively for two, to VIP airport meet
            &amp; assist that turns arrival into part of the experience, to
            spiritual journeys arranged with elegance and care. Based in
            Beirut and Abidjan, we bring royal treatment to every stage of
            travel: flights, visas, transfers, and the details most
            agencies overlook.
          </p>

          <p className="mt-6 leading-[1.9] text-fg/70">
            Where discretion matters, like medical travel to Lebanon, we help
            clients navigate the details honestly, backed by real experience
            rather than promises. We believe every trip — and every love
            story — deserves to be unforgettable. That's why we handle
            everything from A to Z: tickets, hotels, transfers, experiences.
            You tell us what you dream of, we make it happen, your way.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
            <a
              href="tel:+96181839155"
              className="inline-flex items-center gap-2 rounded-sm border border-gold/40 px-5 py-2.5 text-sm text-fg transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:shadow-gold-glow"
            >
              Call +961 81 839 155
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
