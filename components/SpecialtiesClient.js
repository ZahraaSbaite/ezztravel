"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import SpecialtyModal from "./SpecialtyModal";
import SpecialtyCard from "./SpecialtyCard";

export default function SpecialtiesClient({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const active = items[activeIndex];

  function handleSelect(i) {
    setActiveIndex(i);
    setPanelOpen(true);
    setModalOpen(true);
  }

  if (!items || items.length === 0) return null;

  return (
    <section id="specialties" className="relative overflow-hidden bg-surface px-6 py-28 text-fg">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 15% 0%, rgba(198,161,91,0.14) 0%, rgba(34,31,29,0) 45%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="SPECIALTIES" title="What sets us apart" />

        <div
          className={
            panelOpen
              ? "mt-16 grid gap-6 lg:grid-cols-[minmax(0,42rem)_420px] lg:items-start lg:justify-center lg:gap-10"
              : "mx-auto mt-16 max-w-2xl"
          }
        >
          <div className="divide-y divide-edge/10 border-y border-edge/10">
            {items.map((item, i) => {
              const isActive = i === activeIndex && panelOpen;
              return (
                <div
                  key={item.n}
                  className={`group flex items-center gap-5 rounded-lg px-2 py-8 transition-all duration-300 sm:gap-8 sm:px-6 ${
                    isActive
                      ? "border border-gold/40 bg-gold/[0.03]"
                      : "border border-transparent hover:bg-gold/[0.03]"
                  }`}
                >
                  <span className="shrink-0 font-display text-4xl text-gold/40 sm:text-5xl">
                    {item.n}
                  </span>

                  <span className="relative hidden h-16 w-px shrink-0 bg-gold/25 sm:block">
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl text-fg sm:text-2xl">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg/60">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelect(i)}
                    aria-label={`More about ${item.title}`}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-gold transition-all duration-300 hover:translate-x-1 hover:border-gold ${
                      isActive ? "border-gold" : "border-gold/30"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {panelOpen && (
            <div className="hidden lg:sticky lg:top-28 lg:block">
              <SpecialtyCard item={active} onClose={() => setPanelOpen(false)} />
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden">
        {modalOpen && <SpecialtyModal item={active} onClose={() => setModalOpen(false)} />}
      </div>
    </section>
  );
}
