"use client";

import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

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
            className="hidden rounded-sm border border-gold px-4 py-2 text-sm tracking-wide text-gold transition-all hover:bg-gold hover:text-night hover:shadow-gold-glow sm:inline-block"
          >
            Contact us
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-edge/20 text-fg/70 transition-colors hover:border-gold hover:text-gold md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-night/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* slide-in drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] flex w-72 max-w-[80vw] flex-col border-l border-gold/20 bg-surface shadow-luxe transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4">
          <span className="font-display text-base text-fg">Menu</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-edge/20 text-fg/70 transition-colors hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-1 px-3 py-4 text-sm text-fg/80">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-sm px-3 py-3 transition-colors hover:bg-gold/10 hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
