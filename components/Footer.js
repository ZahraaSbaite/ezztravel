export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-edge/10 bg-surface px-6 pb-10 pt-16 text-fg">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(198,161,91,0.6), transparent)" }}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <img src="/logo.png" alt="Ezz Travel" className="h-14 w-auto object-contain" />
          <p className="text-sm text-fg/60">Beirut, Lebanon · Abidjan, Ivory Coast</p>
        </div>
        <div className="text-sm text-fg/70">
          <p className="mb-2 font-mono text-[11px] tracking-[0.25em] text-gold">PHONE</p>
          <a
            href="https://wa.me/96181839155"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors hover:text-gold"
          >
            +961 81 839 155
          </a>
          <a
            href="https://wa.me/2250707016056"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors hover:text-gold"
          >
            +225 07 07 016 056
          </a>
          <a
            href="https://wa.me/2250707534308"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors hover:text-gold"
          >
            +225 07 07 534 308
          </a>
        </div>
        <div className="text-sm text-fg/70">
          <p className="mb-2 font-mono text-[11px] tracking-[0.25em] text-gold">EMAIL</p>
          <a href="mailto:Ezzedinep@hotmail.com" className="block transition-colors hover:text-gold">
            Ezzedinep@hotmail.com
          </a>
          <a href="mailto:abssobdeir@gmail.com" className="block transition-colors hover:text-gold">
            abssobdeir@gmail.com
          </a>
          <a
            href="https://www.instagram.com/ezztravell"
            className="mt-3 inline-flex items-center gap-2 transition-colors hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12 1.33Zm0 1.8c-3.15 0-3.5.01-4.74.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.73-.34.34-.55.67-.73 1.13-.14.35-.3.87-.34 1.83-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.83.18.46.39.79.73 1.13.34.34.67.55 1.13.73.35.14.87.3 1.83.34 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.73.34-.34.55-.67.73-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3.09 3.09 0 0 0-.73-1.13 3.09 3.09 0 0 0-1.13-.73c-.35-.14-.87-.3-1.83-.34-1.24-.06-1.59-.07-4.74-.07Zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86Zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26Zm5.13-1.98a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
            </svg>
            @ezztravell
          </a>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl text-center font-mono text-[10px] tracking-[0.25em] text-fg/30">
        EZZ TRAVEL
      </p>
    </footer>
  );
}
