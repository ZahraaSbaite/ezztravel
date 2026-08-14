"use client";

import { useRef } from "react";

export default function CategoryFilter({ categories, activeSlug }) {
  const scrollerRef = useRef(null);

  function scrollByAmount(amount) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="mt-10 flex items-center gap-2">
      <button
        type="button"
        onClick={() => scrollByAmount(-240)}
        aria-label="Scroll categories left"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-edge/20 text-fg/60 transition-colors hover:border-gold hover:text-gold"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="cat-scroll flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.cat-scroll::-webkit-scrollbar { display: none; }`}</style>
        <a
          href="/blog"
          className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors ${
            !activeSlug
              ? "border-gold bg-gold text-night"
              : "border-edge/20 text-fg/60 hover:border-gold hover:text-gold"
          }`}
        >
          All
        </a>
        {categories.map((c) => (
          <a
            key={c.id}
            href={`/blog?category=${c.slug}`}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors ${
              activeSlug === c.slug
                ? "border-gold bg-gold text-night"
                : "border-edge/20 text-fg/60 hover:border-gold hover:text-gold"
            }`}
          >
            {c.name}
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount(240)}
        aria-label="Scroll categories right"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-edge/20 text-fg/60 transition-colors hover:border-gold hover:text-gold"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
