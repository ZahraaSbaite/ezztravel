import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#specialties", label: "Specialties" },
  { href: "/blog", label: "Blog" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-surface/95 shadow-[0_1px_0_rgba(198,161,91,0.15)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="/#home" className="group flex items-center gap-2.5">
          <img
            src="/logo-mark.png"
            alt="Ezz Travel"
            className="h-9 w-auto object-contain drop-shadow-[0_4px_16px_rgba(198,161,91,0.35)] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-lg tracking-[0.03em] text-fg">
            Ezz Travel
          </span>
        </a>
        <ul className="hidden gap-9 text-sm text-fg/80 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/#contact"
            className="rounded-sm border border-gold px-4 py-2 text-sm tracking-wide text-gold transition-all hover:bg-gold hover:text-night hover:shadow-gold-glow"
          >
            Contact us
          </a>
        </div>
      </nav>
    </header>
  );
}
