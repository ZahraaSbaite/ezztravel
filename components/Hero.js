export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[94vh] flex-col items-center justify-center overflow-hidden bg-surface-2 px-6 py-28 text-center text-fg"
    >
      {/* ambient sky glow, echoes the intro */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 120%, rgba(198,161,91,0.24) 0%, rgba(198,161,91,0.07) 24%, rgba(34,31,29,0) 46%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[30%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* faint contrail echo */}
      <div
        className="pointer-events-none absolute left-[-10%] top-[22%] h-px w-[55%] bg-gradient-to-r from-transparent via-skyblue-light/30 to-transparent"
        style={{ transform: "rotate(-8deg)" }}
      />

      {/* vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 180px 60px rgb(var(--vignette) / 0.55)" }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className="animate-fade-up opacity-0 [animation-delay:0.15s]"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="relative mx-auto w-[220px] animate-float md:w-[260px]">
            <div className="absolute inset-0 rounded-full bg-gold/25 blur-3xl" />
            <img
              src="/logo.png"
              alt="Ezz Travel"
              className="relative w-full object-contain drop-shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>

        <p
          className="mt-4 animate-fade-up font-mono text-xs tracking-[0.4em] text-gold/80 opacity-0 [animation-delay:0.35s]"
          style={{ animationFillMode: "forwards" }}
        >
          EZZ TRAVEL · TRAVEL AGENCY · BEIRUT · ABIDJAN
        </p>

        <h1
          className="mx-auto mt-6 max-w-3xl animate-fade-up font-display text-4xl leading-[1.1] tracking-tight opacity-0 [animation-delay:0.45s] md:text-6xl"
          style={{ animationFillMode: "forwards" }}
        >
          Where every journey feels{" "}
          <span className="bg-gold-foil bg-clip-text text-transparent">
            first class
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl animate-fade-up text-fg/70 opacity-0 [animation-delay:0.6s]"
          style={{ animationFillMode: "forwards" }}
        >
          Tailored trips, VIP airport meet and assist, visas, and spiritual
          travel — planned end to end, with discretion and care at every
          step.
        </p>

        <div
          className="mt-10 flex animate-fade-up flex-col gap-4 opacity-0 [animation-delay:0.75s] sm:flex-row"
          style={{ animationFillMode: "forwards" }}
        >
          <a
            href="#contact"
            className="relative overflow-hidden rounded-sm bg-gold px-8 py-3 text-sm font-medium tracking-wide text-charcoal shadow-gold-glow transition-transform hover:-translate-y-0.5 hover:bg-gold-light"
          >
            Book Your Trip
          </a>
          <a
            href="#services"
            className="rounded-sm border border-edge/30 px-8 py-3 text-sm text-fg transition-colors hover:border-gold hover:text-gold"
          >
            See services
          </a>
        </div>

        <div
          className="mt-14 flex animate-fade-up items-center gap-3 text-fg/50 opacity-0 [animation-delay:0.95s]"
          style={{ animationFillMode: "forwards" }}
        >
          <span className="h-px w-10 bg-gold/40" />
          <span className="font-mono text-[10px] tracking-[0.3em]">
            20+ YEARS · 40+ DESTINATIONS
          </span>
          <span className="h-px w-10 bg-gold/40" />
        </div>
      </div>

      {/* wing accents, echo the logo mark */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/2 h-6 w-40 -translate-x-1/2 animate-fade-up opacity-0 [animation-delay:1.05s] md:w-56"
        style={{ animationFillMode: "forwards" }}
        viewBox="0 0 220 40"
        fill="none"
      >
        <path d="M0,30 Q40,6 80,20 Q100,4 110,18 Q120,4 140,20 Q180,6 220,30" stroke="#2E6C8E" strokeWidth="2" opacity="0.6" />
        <path d="M0,34 Q40,14 80,26 Q100,12 110,24 Q120,12 140,26 Q180,14 220,34" stroke="#B24339" strokeWidth="2" opacity="0.5" />
      </svg>
    </section>
  );
}
