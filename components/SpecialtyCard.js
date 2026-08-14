import SpecialtyIcon from "./SpecialtyIcon";

export default function SpecialtyCard({ item, onClose, onPrev, onNext, position }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-panel shadow-luxe">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-6 select-none font-display text-[11rem] leading-none text-gold/[0.06]"
      >
        {item.n}
      </span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-panel text-gold transition-colors hover:bg-gold hover:text-night"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {(onPrev || onNext) && (
        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous specialty"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-panel text-gold transition-colors hover:bg-gold hover:text-night"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          {position && (
            <span className="font-mono text-xs text-fg/40">{position}</span>
          )}
          <button
            type="button"
            onClick={onNext}
            aria-label="Next specialty"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-panel text-gold transition-colors hover:bg-gold hover:text-night"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}

      <div className="max-h-[85vh] overflow-y-auto p-10">
        <div className="relative flex items-center gap-4">
          <span className="font-display text-4xl text-gold/70">{item.n}</span>
          <span className="h-px flex-1 max-w-[7rem] bg-gold/40" />
        </div>

        <h3 className="relative mt-5 font-display text-4xl leading-tight text-fg">
          {item.title}
        </h3>
        <p className="relative mt-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
          {item.subtitle}
        </p>

        <p className="relative mt-5 text-lg leading-relaxed text-fg/70">{item.longDescription}</p>

        <span className="relative mt-7 block h-px w-24 bg-gold/30" />

        <div className="relative mt-6 grid gap-3">
          {item.features.map((f) => (
            <div
              key={f.title}
              className="group flex items-start gap-4 rounded-xl border border-gold/20 bg-gold/[0.04] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/[0.08] hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-panel text-gold transition-colors group-hover:border-gold">
                <SpecialtyIcon name={f.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg text-fg">{f.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg/60">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="/#contact"
          onClick={onClose}
          className="relative mt-9 flex w-full items-center justify-center gap-3 rounded-sm border border-gold px-6 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-gold transition-all hover:bg-gold hover:text-night hover:shadow-gold-glow"
        >
          {item.cta}
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
